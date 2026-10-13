#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${APP_DIR:-$(cd -- "$SCRIPT_DIR/.." && pwd)}"
REMOTE_NAME="${GIT_REMOTE_NAME:-origin}"
SERVICE_NAME="${CADDY_SERVICE:-caddy}"
LOCK_FILE="${TMPDIR:-/tmp}/ontostudy-update.lock"

log() {
  printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

die() {
  log "错误：$*"
  exit 1
}

command -v git >/dev/null 2>&1 || die "未找到 git。"
command -v flock >/dev/null 2>&1 || die "未找到 flock（通常由 util-linux 提供）。"
command -v systemctl >/dev/null 2>&1 || die "未找到 systemctl；此脚本需要由 systemd 管理 Caddy 的 Linux 服务器。"
SYSTEMCTL_BIN="$(command -v systemctl)"
git -C "$REPO_DIR" rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "项目目录不是 Git 仓库：$REPO_DIR"

exec 9>"$LOCK_FILE"
flock -n 9 || die "已有更新任务正在运行。"

CURRENT_BRANCH="$(git -C "$REPO_DIR" branch --show-current)"
[[ -n "$CURRENT_BRANCH" ]] || die "当前处于 detached HEAD；请先切换到要部署的分支。"
BRANCH="${GIT_BRANCH:-$CURRENT_BRANCH}"
[[ "$CURRENT_BRANCH" == "$BRANCH" ]] || die "当前分支是 '$CURRENT_BRANCH'，但目标分支是 '$BRANCH'；请先切换分支。"

git -C "$REPO_DIR" remote get-url "$REMOTE_NAME" >/dev/null 2>&1 || \
  die "找不到 Git 远程 '$REMOTE_NAME'。请让服务器仓库的 origin 指向 GitLab，或设置 GIT_REMOTE_NAME。"

if [[ -n "$(git -C "$REPO_DIR" status --porcelain)" ]]; then
  die "工作区有未提交改动；请先处理这些改动再更新。"
fi

if (( EUID != 0 )); then
  command -v sudo >/dev/null 2>&1 || die "需要 root 权限重启 Caddy，且未找到 sudo。"
  sudo -n -l "$SYSTEMCTL_BIN" restart "$SERVICE_NAME" >/dev/null 2>&1 || \
    die "当前用户不能免交互重启 '$SERVICE_NAME'；请配置对应 sudo 权限，或以 root 运行。"
fi

BEFORE="$(git -C "$REPO_DIR" rev-parse HEAD)"
log "从远端 '$REMOTE_NAME' 获取分支 '$BRANCH'。"
git -C "$REPO_DIR" fetch --prune "$REMOTE_NAME" \
  "refs/heads/$BRANCH:refs/remotes/$REMOTE_NAME/$BRANCH"

TARGET_REF="refs/remotes/$REMOTE_NAME/$BRANCH"
git -C "$REPO_DIR" show-ref --verify --quiet "$TARGET_REF" || \
  die "远端分支 '$REMOTE_NAME/$BRANCH' 不存在。"

log "快进更新本地分支。"
git -C "$REPO_DIR" merge --ff-only "$TARGET_REF"
AFTER="$(git -C "$REPO_DIR" rev-parse HEAD)"

if [[ "$BEFORE" == "$AFTER" ]]; then
  log "代码已经是最新版本。"
else
  log "代码已更新到 ${AFTER:0:12}。"
fi

log "重启 systemd 服务 '$SERVICE_NAME'。"
if (( EUID == 0 )); then
  "$SYSTEMCTL_BIN" restart "$SERVICE_NAME"
else
  sudo -n "$SYSTEMCTL_BIN" restart "$SERVICE_NAME"
fi

"$SYSTEMCTL_BIN" is-active --quiet "$SERVICE_NAME" || die "服务 '$SERVICE_NAME' 重启后未处于 active 状态。"
log "更新完成，Caddy 正在运行。"
