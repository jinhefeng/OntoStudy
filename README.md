# OntoStudy

本体论系统学习与产品落地项目，包含学习路线、项目规划和一个可离线使用的互动学习网站。

## 内容

- [`ontology-learning-lab/`](ontology-learning-lab/)：本体论学习工坊静态网站。
- [`ontology-learning-lab/README.md`](ontology-learning-lab/README.md)：网站功能与使用说明。
- [`本体论系统学习与产品落地路线图_v0.1.md`](本体论系统学习与产品落地路线图_v0.1.md)：学习与产品落地路线。
- [`Task Constitution.md`](Task%20Constitution.md)：项目任务约定与推进记录。

## 使用

无需安装依赖或启动服务，直接用浏览器打开 [`ontology-learning-lab/dist/index.html`](ontology-learning-lab/dist/index.html) 即可。学习进度和练习草稿保存在当前浏览器的本地存储中。

## 在远程服务器更新

[`scripts/update-from-gitlab.sh`](scripts/update-from-gitlab.sh) 用于 Linux + systemd 服务器：从当前 Git 远程获取当前分支的最新提交，快进更新项目，然后重启 `caddy` 服务。服务器仓库的 `origin` 应指向 GitLab；如果远程名或分支不同，可通过 `GIT_REMOTE_NAME`、`GIT_BRANCH` 设置。非 root 用户需要免交互 sudo 权限来重启 Caddy。

在项目目录中运行：

```bash
bash scripts/update-from-gitlab.sh
```
