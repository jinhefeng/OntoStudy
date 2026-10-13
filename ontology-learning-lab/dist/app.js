const lessons = [
  {
    id: 1,
    title: "从产品问题开始",
    subtitle: "工程本体论是什么？它和术语表、数据模型有什么不同？",
    category: "问题驱动",
    objectives: ["说清本体与词汇表、分类体系、数据模型和知识图谱的区别", "选定一个可验证的供热产品问题", "把本体放进现有 AI 与数字孪生架构"],
    points: [
      { title: "先定义领域里的“是什么”", body: "本体描述领域概念、关系、约束与含义，让不同系统对同一个对象有一致理解。它回答“有哪些对象、对象怎样关联、这些关系在什么条件下成立”。" },
      { title: "语义模型不等于存储方案", body: "词汇表解释术语，分类体系组织类别，数据模型服务某个系统结构，知识图谱承载实例关系。本体可以指导这些实现，但不等同于任何一种实现。" },
      { title: "本体是共享语义层", body: "它为 viHeating、viSTEP、LLM 与 Agent 提供可映射的业务语义，不替代供热机理、时序预测模型或工作流运行时。" },
      { title: "范围从一个问题切片开始", body: "选择能找到真实对象、关系和证据的产品问题。先界定边界，再判断哪些概念值得进入模型，避免一开始建模整个供热领域。" }
    ],
    scenario: "运维人员问“这条告警影响哪些用户？”这是一个可追溯、可验收的问题：从告警沿测点、设备、换热站和供热关系找到热用户，并给出证据。",
    deliverable: "目标问题与边界说明",
    insight: "如果一项模型工作无法回答具体的能力问题，就还没有找到合适的边界。",
    practiceType: "choice",
    practiceTitle: "选出更适合作为首个试点的做法",
    practiceHint: "先选一个可以用真实数据验证的产品问题。",
    prompt: "团队准备开始做本体。下面哪种起步方式最稳妥？",
    options: [
      "围绕“告警影响哪些用户”明确对象、关系和证据，再用真实数据验证一条业务切片。",
      "先把所有系统的数据表合并，再决定哪些字段需要语义。",
      "先选定图数据库和推理引擎，并把现有预测模型全部重写成 OWL。",
      "先维护一份统一术语表，暂时不讨论关系、约束和产品问题。"
    ],
    answer: 0,
    explanation: "从边界明确、能够验证的业务问题出发，能让概念、数据映射和验收保持一致。存储和工具选择可以在需求明确后再做。"
  },
  {
    id: 2,
    title: "拆开对象、类型与状态",
    subtitle: "概念、实例、属性、关系、状态、事件和观测各自是什么？",
    category: "概念基础",
    objectives: ["区分类型与具体实例", "识别关系、状态、事件和观测", "为身份、时间、空间和来源留出位置"],
    points: [
      { title: "类型说一类东西，实例指某一个对象", body: "“换热站”是类型，Station_03 是一座具体站。实例需要稳定身份；名称可以变化，也可能有别名。" },
      { title: "观测不是被观测属性", body: "SupplyWaterTemperature 是被观测属性，Sensor_047 是传感器，Observation_340 是带时间、数值、单位、来源和质量的一条观测。" },
      { title: "关系有方向，也有业务含义", body: "“换热站服务楼宇”和“楼宇由换热站服务”不能在没有规则时混用。建模时要注明关系方向、含义和适用条件。" },
      { title: "状态和事件带有时间语境", body: "“运行中”是某个有效时间内的状态；“告警发生”是事件。保留有效时间、来源和数据质量，才能解释模型结论。" }
    ],
    scenario: "看到字段“供水温度 72.4”，先问它来自哪个传感器、测的是什么属性、何时采集、单位和质量如何，而不是把这些语义都塞进一个测点名称。",
    deliverable: "供热概念词汇表 v0.1",
    insight: "把传感器、属性和观测拆开，才能追溯读数从哪里来、代表什么。",
    practiceType: "classify",
    practiceTitle: "给供热概念归类",
    practiceHint: "把类型、实例、状态、关系、事件和观测分开。",
    items: [
      { label: "换热站", answer: "类型" },
      { label: "Station_03", answer: "实例" },
      { label: "运行中", answer: "状态" },
      { label: "SupplyWaterTemperature（供水温度）", answer: "属性" },
      { label: "Sensor_047 monitors Valve_12", answer: "关系" },
      { label: "2026-10-13 08:15 采集到 72.4 °C", answer: "观测" },
      { label: "Alarm_A17 在 08:16 触发", answer: "事件" }
    ],
    explanation: "类型定义一类对象；实例是具体对象；状态有有效时间；观测是带时间和结果的数据；事件发生在某个时间点或区间。"
  },
  {
    id: 3,
    title: "用标准表达语义",
    subtitle: "从 RDF 三元组到 OWL 逻辑与 SHACL 数据约束",
    category: "标准与逻辑",
    objectives: ["读写 RDF 主语—谓语—宾语三元组", "知道 OWL 表达概念与逻辑、SHACL 校验数据", "理解开放世界假设与工程校验的边界"],
    points: [
      { title: "RDF 用三元组表达关系", body: "每条语句由主语、谓语和宾语组成，例如 Observation_340 madeBySensor Sensor_047。多条三元组连接成图。" },
      { title: "OWL 描述概念和逻辑公理", body: "OWL 可以定义类、属性及其逻辑关系。它适合描述语义和推理条件，不等同于把所有产品字段换一种语法存储。" },
      { title: "SHACL 检查数据形状", body: "SHACL 可约束某类节点必须有传感器、时间和数值等字段。校验失败表示数据不满足形状，不代表世界里该对象不存在。" },
      { title: "开放世界不把缺失当成否定", body: "RDF/OWL 中“图里没有这条关系”通常表示未知，而不是已证实不存在。产品验收要明确哪些缺失属于数据问题。" }
    ],
    scenario: "供水温度观测需要同时关联传感器、被观测属性、结果、时间、单位和来源；若缺少单位或时间，应由约束规则标出，而不是让 AI 猜测。",
    deliverable: "供热语义模型小样与校验规则",
    insight: "逻辑模型说明语义关系，数据约束负责检查某个产品场景所需的信息是否齐全。",
    practiceType: "rdf",
    practiceTitle: "补全一条温度观测",
    practiceHint: "补齐温度结果、观测时间和单位。",
    initial: [
      "ex:Observation_340 rdf:type sosa:Observation .",
      "ex:Observation_340 sosa:madeBySensor ex:Sensor_047 .",
      "ex:Observation_340 sosa:observedProperty ex:SupplyWaterTemperature ."
    ].join("\n"),
    checks: [
      { key: "rdf:type sosa:Observation", label: "声明实例是一条 SOSA Observation" },
      { key: "sosa:madeBySensor ex:Sensor_047", label: "关联传感器 Sensor_047" },
      { key: "sosa:observedProperty ex:SupplyWaterTemperature", label: "声明被观测属性" },
      { key: "sosa:hasSimpleResult", label: "记录数值结果" },
      { key: "sosa:resultTime", label: "记录观测时间" },
      { key: "ex:unit", label: "记录单位" }
    ],
    explanation: "观测、传感器、属性、数值、时间和单位各自承担不同语义；把它们分开后，才能校验和追溯。"
  },
  {
    id: 4,
    title: "用能力问题约束范围",
    subtitle: "让模型围绕可以回答、可以验证的问题成长",
    category: "本体工程",
    objectives: ["写出用户能够提出的能力问题", "用问题划定模型范围与验收边界", "把问题映射到概念、关系、数据来源和规则"],
    points: [
      { title: "能力问题是模型的验收入口", body: "例如“告警对应哪个测点？”“能否返回相关热用户及证据路径？”问题要能由模型和数据共同回答。" },
      { title: "从 10–20 个问题里找最小范围", body: "先收集问题，再按对象、关系、时间、来源等主题分组。第一版只纳入支撑优先场景的概念和关系。" },
      { title: "问题必须能映射到证据", body: "每个问题要说明需要哪些对象、关系、属性或规则。若数据来源不存在，就把它记为依赖或未知。" },
      { title: "边界也要写清楚", body: "本体负责对象语义、关系与约束；供热机理、预测算法和流程运行时仍由各自模型与系统承担。" }
    ],
    scenario: "如果要回答“这条告警影响哪些用户”，至少要知道告警对应的观测/测点、设备所在站点、站点服务范围，以及这些关系的数据来源和时间。",
    deliverable: "能力问题清单与模型范围",
    insight: "问题清单既是建模的边界，也是之后评估覆盖度的测试集。",
    practiceType: "questions",
    practiceTitle: "整理能力问题清单",
    practiceHint: "写满 10 条真实问题，并覆盖至少 4 类主题。",
    initial: [
      "告警对应哪个测点和设备？",
      "设备安装在哪座换热站？",
      "这座换热站服务哪些楼宇或热用户？",
      "结果依据的是哪条拓扑关系和哪个数据来源？",
      "关系在什么时间范围内有效？"
    ].join("\n"),
    explanation: "完整的能力问题清单通常有 10–20 条。问题要能落到具体概念、关系和证据，不能只写“系统要更智能”。"
  },
  {
    id: 5,
    title: "建模供热对象与拓扑",
    subtitle: "串起资产、管网、测点、告警、工单和运行策略",
    category: "供热领域建模",
    objectives: ["选定一条贯通产品与 AI 的业务切片", "区分对象关系与数据观察关系", "从告警沿有证据的拓扑找到影响对象"],
    points: [
      { title: "先建能支撑试点的对象", body: "初版可覆盖热源、管段、阀门、泵、换热站、楼宇、热用户、设备、传感器、测点、观测、告警、工单和运行策略。" },
      { title: "关系要体现真实业务语义", body: "例如 connectsTo、installedAt、monitors、serves、affects、handledBy、derivedFrom。写明方向和条件，避免模糊的“关联”。" },
      { title: "追溯结果必须保留路径", body: "从告警到热用户返回经过的关系、来源和时间。若边缺失、冲突或过期，要显式显示未知或待核实。" },
      { title: "本体和既有系统协作", body: "GIS、遥测、告警和主数据通过身份对齐与语义映射进入模型；无需一次性重建所有产品系统。" }
    ],
    scenario: "本练习使用虚构链路：Alarm_A17 → Observation_340 → Sensor_047 → Valve_12 → Station_03 → Building_08 → HeatUser_202。链路只演示结构，不代表真实运行数据。",
    deliverable: "供热领域本体 v0.1",
    insight: "影响范围不是模型“推测”的清单，而是可逐边检查的数据路径。",
    practiceType: "graph",
    practiceTitle: "运行告警影响路径追溯",
    practiceHint: "补全两条关系及来源、有效时间和核实状态；数据为虚构样例。",
    graph: {
      start: "Alarm_A17",
      targetType: "HeatUser",
      nodes: [
        { id: "Alarm_A17", type: "Alarm" },
        { id: "Observation_340", type: "Observation" },
        { id: "Sensor_047", type: "Sensor" },
        { id: "Valve_12", type: "Valve" },
        { id: "Station_03", type: "HeatExchangerStation" },
        { id: "Building_08", type: "Building" },
        { id: "HeatUser_202", type: "HeatUser" }
      ],
      edges: [
        { from: "Alarm_A17", relation: "attachedTo", to: "Observation_340", source: "告警样例", validTime: "2026-10-13T08:16:00+08:00", status: "verified" },
        { from: "Observation_340", relation: "madeBySensor", to: "Sensor_047", source: "遥测映射样例", validTime: "2026-10-13T08:15:00+08:00", status: "verified" },
        { from: "Sensor_047", relation: "monitors", to: "Valve_12", source: "设备台账样例", validTime: "2026-10-01/2027-01-01", status: "verified" },
        { from: "Valve_12", relation: "installedAt", to: "Station_03", source: "GIS 资产样例", validTime: "2026-10-01/2027-01-01", status: "verified" }
      ]
    },
    explanation: "遍历到用户后，仍要检查每条关系的来源、时间和质量。虚构练习结果不能替代真实产品数据。"
  },
  {
    id: 6,
    title: "把数据映射到语义",
    subtitle: "对齐身份、GIS、遥测、单位、时间、来源与质量",
    category: "数据语义映射",
    objectives: ["把源字段映射到清晰的语义概念", "为跨系统身份对齐保留稳定标识", "保留单位、有效时间、来源和数据质量"],
    points: [
      { title: "源字段不是语义概念本身", body: "temperature_val 可能映射到 sosa:hasSimpleResult，但还需说明观测对象、单位、时间和来源。" },
      { title: "身份对齐决定关系能否连起来", body: "不同系统里的站点编码要映射到同一站实例，同时保留源系统标识和对齐依据。" },
      { title: "时空和质量信息不可丢", body: "坐标、有效时间、采集时间、来源、单位和质量状态决定数据是否适用于某个判断。" },
      { title: "映射要可追踪、可版本化", body: "每个映射记录源系统、源字段、目标概念、转换规则和版本，变化时评估对试点的影响。" }
    ],
    scenario: "遥测系统给出设备编码、站点编码、温度值、采集时间和质量标志。映射后仍应能追到原始字段及所属系统。",
    deliverable: "数据映射表与样例数据集",
    insight: "映射不只是“字段改名”；它要解释字段值指向哪个对象、代表什么、何时有效。",
    practiceType: "mapping",
    practiceTitle: "为遥测字段选择语义目标",
    practiceHint: "把字段映射到标识、关系、结果、时间和质量语义。",
    mappings: [
      { source: "device_code · V-12", answer: "identifier" },
      { source: "station_id · S-03", answer: "installedAt" },
      { source: "temperature_val · 72.4", answer: "result" },
      { source: "collect_time · 08:15", answer: "resultTime" },
      { source: "quality_flag · estimated", answer: "quality" }
    ],
    mappingOptions: [
      { value: "identifier", label: "稳定标识 / assetIdentifier" },
      { value: "installedAt", label: "安装关系 / installedAt" },
      { value: "result", label: "观测结果 / hasSimpleResult" },
      { value: "resultTime", label: "观测时间 / resultTime" },
      { value: "quality", label: "质量状态 / qualityStatus" },
      { value: "unit", label: "单位 / unit" }
    ],
    explanation: "温度数字需要放在 Observation 语境里；设备编码和站点关系对应不同语义，质量标志也不能丢掉。"
  },
  {
    id: 7,
    title: "让 AI 有据可查地回答",
    subtitle: "把对象关系用于查询、解释、工具调用和受控执行",
    category: "产品与 AI 集成",
    objectives: ["让问答结果指向明确对象和关系", "返回可核对的证据路径与来源", "区分只读分析和有审批的写操作"],
    points: [
      { title: "语义给模型明确的“指向”", body: "用户说“这条告警影响谁”，系统先把告警、测点、设备、站点和用户对齐到共享对象，再组织答案。" },
      { title: "每个结论都带证据", body: "返回关系路径、数据来源和时间范围。冲突、缺失或过期关系要标为未知，不能由 LLM 补造成事实。" },
      { title: "Agent 使用受约束的动作接口", body: "查询、分析和写操作分级；写操作应有授权、审批和审计记录，并能说明它针对哪个对象。" },
      { title: "本体不替代工具运行时", body: "本体提供业务语义；检索、权限、编排、模型调用和工具执行仍属于应用与 Agent Runtime。" }
    ],
    scenario: "回答告警影响范围时，先输出结构化对象、证据和不确定项，再由 LLM 生成自然语言解释。不要让模型仅凭常识扩大影响范围。",
    deliverable: "本体驱动的 AI 交互原型",
    insight: "好的回答不仅告诉人“是什么”，还告诉人“凭什么这么说”。",
    practiceType: "response",
    practiceTitle: "编写带证据与不确定项的 Agent 结果",
    practiceHint: "补齐证据字段、不确定项和动作授权。",
    initial: {
      answer: "告警 Alarm_A17 沿设备关系追溯到换热站 Station_03，并服务 Building_08。",
      evidence: [
        {
          from: "Alarm_A17",
          relation: "attachedTo",
          to: "Observation_340"
        },
        {
          from: "Station_03",
          relation: "serves",
          to: "Building_08"
        }
      ],
      uncertainty: [],
      suggestedAction: { type: "write_command", requiresApproval: false }
    },
    explanation: "结构化证据使解释可以复核；不确定项和授权边界也是正确答案的一部分。"
  },
  {
    id: 8,
    title: "评估、治理与持续演进",
    subtitle: "用正确性、覆盖度、证据和兼容性管理模型变化",
    category: "评估与治理",
    objectives: ["用能力问题集验证模型和原型", "记录变更、兼容策略和责任边界", "区分已知事实、未知和冲突"],
    points: [
      { title: "对照问题集做回归评估", body: "测试对象定位、拓扑追溯、证据来源、时间范围和缺失数据处理。覆盖度提升不应以编造关系为代价。" },
      { title: "治理模型版本和映射影响", body: "记录变更理由、影响概念、映射兼容策略、负责人和生效时间，保留可回滚的版本。" },
      { title: "问题比数字更重要", body: "评分用于找到薄弱环节。若关键关系未经核实或未知项被隐藏，即使平均分很高也不能算通过。" },
      { title: "形成下一轮 backlog", body: "把无法回答的问题、质量缺口和需要真实数据验证的假设列入 backlog，按产品价值和风险排序。" }
    ],
    scenario: "评审告警追溯原型时，检查它是否返回真实路径、来源和时间，并在关系冲突时标出待核实，而不是输出确定性的用户清单。",
    deliverable: "评估报告、治理规则与 v0.2 backlog",
    insight: "可以说明“现在不知道”的模型，比猜对一半却不留证据的模型更可靠。",
    practiceType: "score",
    practiceTitle: "做一次模型试点评估",
    practiceHint: "按 1–5 分自评。证据可追溯和未知项处理是关键门槛。",
    scoreItems: [
      { key: "correctness", label: "对象与关系正确性" },
      { key: "coverage", label: "能力问题覆盖度" },
      { key: "evidence", label: "证据路径可追溯" },
      { key: "unknown", label: "缺失、冲突与未知处理" },
      { key: "governance", label: "版本、兼容与责任治理" }
    ],
    explanation: "高覆盖度不能掩盖错误关系。关键证据和未知项处理要达到门槛，才能进入下一轮产品验证。"
  }
];

const studyContent = {
  1: {
    sections: [
      {
        title: "先把“本体”放回产品问题里理解",
        paragraphs: [
          "工程本体论是对某个领域中对象、类别、关系、属性和约束的明确描述。它不只是给名词下定义，还要说明对象怎样关联、关系何时成立，以及系统凭什么得出判断。它的价值来自能否让业务、数据和软件对同一件事使用一致语义。",
          "学习时可以先把本体想成一份共享的“语义合同”：运维人员说的换热站、GIS 中的站点、遥测里的站号和 AI 查询到的对象，最终要能指向同一个业务对象。合同清楚后，各系统仍可保留自己的表和接口，只需通过映射连接到这层语义。"
        ],
        bullets: ["对象：领域里被讨论的事物，例如 Alarm_A17、Station_03。", "关系：对象之间有业务含义的连接，例如告警关联观测、站点服务楼宇。", "约束：判断一条信息能否用于某个任务的规则，例如观测必须有时间与单位。"]
      },
      {
        title: "分清五种经常被混在一起的东西",
        paragraphs: [
          "术语表回答“这个词是什么意思”；分类体系回答“这些类别如何分层”；数据模型回答“某个系统如何组织和存储字段”；知识图谱回答“当前有哪些对象实例以及它们之间有哪些事实”。本体描述更通用的概念、关系与约束，可以指导数据模型和图谱，但不等于它们。",
          "例如，术语表可以解释“换热站”；分类树可以把它放进“供热设施”；业务数据库有一张站点表；知识图谱里有 Station_03。只有当我们进一步说明站点可以服务楼宇、关系有来源和有效时间、冲突时如何处理，语义模型才开始支撑工程判断。"
        ],
        bullets: ["问“有哪些词、怎样组织、怎样存、有哪些实例、关系为何成立”，通常就能识别当前讨论对象。"]
      },
      {
        title: "用边界控制第一版的大小",
        paragraphs: [
          "本体项目最常见的失控方式，是把“建一个完整的供热世界模型”当成第一步。更稳妥的做法是先选一个用户真实提出、能够找到数据验证的问题，再只建回答该问题所需的概念和关系。",
          "“告警影响哪些用户？”就是一条可验收的切片：要识别告警关联的观测和设备、设备所属站点、站点服务的楼宇或热用户，并在结果中返回依据。供热机理和预测算法继续由相应模型承担，本体不需要接管它们。"
        ],
        bullets: ["范围说明写清：目标问题、参与对象、需要的关系、数据来源、明确不负责的能力。"]
      }
    ],
    walkthrough: {
      title: "示例推演：从一个问句得到第一版范围",
      intro: "把“这条告警影响哪些用户？”拆成可检查的产品能力：",
      steps: ["输入：一条具体告警及其稳定标识。", "查找：告警关联哪条观测，观测由哪个传感器产生。", "沿关系：传感器监测哪个设备，设备位于哪座站，站点服务哪些楼宇。", "输出：热用户列表、每条路径的来源和有效时间；缺证据的部分标为未知。", "暂不纳入：供热负荷预测、控制策略优劣和自动下发操作。"],
      closing: "这条链路说明了第一版本体的边界：只建支撑告警定位、关系追溯和证据解释的语义。"
    },
    misconceptions: [
      { label: "“本体就是图数据库”", truth: "本体是语义约定，图数据库只是可能的存储方式；关系库、时序库和 GIS 也可以承载映射后的数据。" },
      { label: "“建模越全越好”", truth: "第一版以能力问题覆盖为准。不能支撑当前问题、也没有验证数据的概念先进入待办。" }
    ],
    resources: [
      { title: "Microsoft Fabric IQ：Ontology 概览", url: "https://learn.microsoft.com/en-us/fabric/iq/ontology/overview", note: "观察企业语义对象如何连接数据与应用。" },
      { title: "Palantir Foundry Ontology 概览", url: "https://www.palantir.com/docs/foundry/ontology/overview", note: "观察对象、关系和动作如何进入业务应用。" }
    ]
  },
  2: {
    sections: [
      {
        title: "类型、实例与身份",
        paragraphs: [
          "类型描述一类对象，实例是其中某一个具体对象。“换热站”是类型，Station_03 是实例。实例要有稳定身份；站名、简称或外部系统编码可能变化，因此名称不应被误当成唯一身份。",
          "跨系统映射时，GIS 的 S-03、遥测的 HX03 和主数据的 Station_03 可能指向同一站。要保留各自的源标识及对齐依据，才能解释这个对应关系是人工确认、主数据规则还是空间匹配得到的。"
        ],
        bullets: ["类型回答“它属于哪一类”；实例回答“具体是哪一个”。", "标识用于稳定引用；名称用于阅读和搜索，可能有别名。"]
      },
      {
        title: "属性、关系与值",
        paragraphs: [
          "属性通常描述一个对象自身的特征，如设备型号或安装日期；关系连接两个或更多对象，如 Sensor_047 monitors Valve_12。遇到一个值时，应先判断它是在描述对象、连接对象，还是记录一次观测。",
          "关系必须有方向和含义。Station_03 serves Building_08 表示站点服务楼宇；反向表达可用于查询，但不能把两个方向当作同一条未经定义的关系。"
        ],
        bullets: ["看到 station_id = S-03，先确认它是站点标识还是某条关系的外键。", "看到 72.4，不能仅凭数字判断它是供水温度、回水温度还是其他量。"]
      },
      {
        title: "状态、事件与观测都带时间",
        paragraphs: [
          "状态描述对象在一段有效时间内的情况，例如某阀门处于关闭状态；事件描述发生了什么，例如告警在 08:16 触发；观测记录某个时刻或区间测得的结果。三者的时间语义不同。",
          "温度读数不是传感器本身，也不是温度属性本身。它是一条 Observation：由某传感器产生，观察某属性，在某时刻得到某结果，并带单位、来源和质量信息。这样才能判断数据新旧和是否可用。"
        ],
        bullets: ["采集时间说明何时测得；有效时间说明某关系或状态何时在现实中成立。", "缺少时间、单位或质量标志时，应保留为不完整数据，而不是默默补值。"]
      }
    ],
    walkthrough: {
      title: "示例推演：拆解“供水温度 72.4”",
      intro: "把一个看似简单的字段还原为可追溯的语义对象：",
      steps: ["属性：SupplyWaterTemperature（供水温度）。", "传感器：Sensor_047；它监测 Valve_12 上的相关测点。", "观测：Observation_340，结果 72.4，单位 °C，采集时间 08:15。", "来源与质量：来自遥测系统，quality_flag 为 estimated。", "判断限制：estimated 表示估算值，使用者需要知道它不是未经处理的实测值。"],
      closing: "因此，72.4 不再是孤立数字，而是一个有对象、属性、时间、单位、来源和质量上下文的观测结果。"
    },
    misconceptions: [
      { label: "“状态就是属性”", truth: "属性可以是相对稳定的描述；状态通常需要说明在何时有效，且可能持续变化。" },
      { label: "“一个测点字段就包含全部含义”", truth: "传感器、被测属性和单次观测是不同对象，拆开后才便于校验与追溯。" }
    ],
    resources: [
      { title: "W3C SSN/SOSA 传感器与观测词汇", url: "https://www.w3.org/TR/vocab-ssn-2023/", note: "参考传感器、观测、结果和被观测属性的区分。" }
    ]
  },
  3: {
    sections: [
      {
        title: "RDF：用三元组组成一张图",
        paragraphs: [
          "RDF 的基本语句由主语、谓语和宾语组成：谁 — 通过什么关系 — 指向什么。例如 Observation_340 — madeBySensor — Sensor_047。许多语句共享节点后，就构成一张图。",
          "RDF 关注可标识的资源和关系。字面量适合承载文本、数值和时间等值；资源标识适合引用站点、传感器和属性。序列化格式可以不同，关键是语句表达的语义保持一致。"
        ],
        bullets: ["读三元组时先定位主语，再读谓语，最后确认宾语是什么。", "谓语应使用清晰、可复用的含义；模糊的 relatedTo 往往不足以支持产品判断。"]
      },
      {
        title: "OWL 讲概念与逻辑，SHACL 讲数据是否合格",
        paragraphs: [
          "OWL 可以定义类、属性、类之间的关系以及逻辑公理，帮助描述概念边界和可推导的分类。它不是产品表结构的替代品，也不负责保证每条业务数据都填齐所有字段。",
          "SHACL 用形状约束检查具体数据图。例如，本产品要求每条温度观测至少有传感器、时间、数值和单位，就可以在数据校验层检查这些条件。逻辑建模和数据质量校验承担不同任务。"
        ],
        bullets: ["OWL 问“语义上有哪些类型和逻辑关系”。", "SHACL 问“这批数据是否符合当前应用要求”。"]
      },
      {
        title: "开放世界假设与产品必填规则",
        paragraphs: [
          "在 RDF/OWL 的开放世界语境中，图里没有一条事实，通常只表示当前没有记录，不能自动推出事实为假。例如没有记录 Station_03 serves Building_08，不等于已经证明该站不服务这栋楼。",
          "产品仍然可以要求数据完整：如果告警解释必须给出可验证路径，就应通过数据契约或 SHACL 把来源、时间等设为应用门槛。工程上的必填校验，是为特定工作流规定质量要求，不会改变开放世界语义。"
        ],
        bullets: ["把“未知”“不适用”“明确为否”分开保存。", "先判断缺失是否影响当前任务，再决定阻断、降级还是提示人工核实。"]
      }
    ],
    walkthrough: {
      title: "示例推演：一条观测如何逐步变得可校验",
      intro: "先用图语句表达事实，再明确产品所需的数据条件：",
      steps: ["用 rdf:type 声明 Observation_340 是 SOSA Observation。", "用 madeBySensor 指向 Sensor_047，用 observedProperty 指向 SupplyWaterTemperature。", "用 hasSimpleResult、resultTime 和 unit 分别表达数值、时间与单位。", "业务校验再检查来源、单位和时间是否齐全、格式是否可接受。", "若关系没有记录，结果显示“未知/待补数据”，不直接生成否定结论。"],
      closing: "同一条观测因此可以被图语句表达、被逻辑模型理解、被数据形状校验，并对缺失保持诚实。"
    },
    misconceptions: [
      { label: "“OWL 自动替我们检查所有字段”", truth: "语义公理和应用数据完整性规则是两类工作；工程上通常需要单独设置校验形状。" },
      { label: "“没查到关系就是关系不存在”", truth: "需要明确证据才能作否定判断；普通缺失首先应视作未知。" }
    ],
    resources: [
      { title: "W3C RDF 1.1 Primer", url: "https://www.w3.org/TR/rdf11-primer/", note: "入门理解 RDF 图、三元组、资源与字面量。" },
      { title: "W3C OWL 2 Primer", url: "https://www.w3.org/TR/owl2-primer/", note: "学习类、属性与逻辑公理的表达方式。" },
      { title: "W3C SHACL", url: "https://www.w3.org/TR/shacl/", note: "查阅 RDF 图形状约束与校验概念。" }
    ]
  },
  4: {
    sections: [
      {
        title: "能力问题是可评审的需求句子",
        paragraphs: [
          "能力问题（Competency Question）用用户会提出的问题表达模型应该支持什么。它既是建模的输入，也能变成验收用例：如果问题无法回答，就检查是缺概念、缺关系、缺数据还是缺规则。",
          "一个好的问题要有明确对象、关系或判断条件。例如“Alarm_A17 关联哪条观测？”比“系统怎样更智能？”更可操作，因为可以具体检查结果是否指向一个观测实例和数据来源。"
        ],
        bullets: ["从用户的动词入手：定位、追溯、比较、解释、确认、筛选。", "为每个问题写出答案形态和证据来源，区分数据问题与模型问题。"]
      },
      {
        title: "从问题反推范围，不要先画大而全的类图",
        paragraphs: [
          "先收集约 10–20 个问题，再把它们按对象、关系、时间、证据和治理主题分组。重复问题可以合并；与试点无关的问题先保留在候选清单，不必立即扩展本体。",
          "把问题映射到回答步骤：需要哪些对象类型、关系、字段和校验规则？若关键数据目前没有来源，把它标成产品依赖或未知，而不是靠增加一个类来掩盖数据缺口。"
        ],
        bullets: ["一条问题至少关联一个预期答案和一条可检查的证据路径。", "优先覆盖高价值且有数据可验证的问题，形成最小闭环。"]
      },
      {
        title: "模块化、复用与版本治理",
        paragraphs: [
          "本体可以复用通用词汇，再扩展供热领域概念。复用标准时要理解原概念的范围，不能仅因名字相近就直接等同。模块化有助于把传感观测、资产拓扑、告警与治理边界分开。",
          "当概念或关系改名、拆分或增加约束时，要检查能力问题、源字段映射、应用查询和历史数据。版本记录需要包含变更理由、影响范围、生效时间和兼容方式。"
        ],
        bullets: ["将规范中的概念与本地扩展标清楚。", "建模前建立问题清单，改模后用同一清单回归验证。"]
      }
    ],
    walkthrough: {
      title: "示例推演：把一个问题映射成模型需求",
      intro: "用“这条告警影响哪些热用户？”示范从需求走到实现条件：",
      steps: ["答案：一组热用户，以及每位用户对应的路径。", "对象：Alarm、Observation、Sensor、Asset、Station、Building、HeatUser。", "关系：attachedTo、madeBySensor、monitors、installedAt、serves、contains。", "证据：每条边的来源、有效时间、质量状态。", "验收：给定样例告警，检查返回对象、路径和未知项；关系缺失时不编造结果。"],
      closing: "问题清单让需求、模型范围、数据依赖和验收测试都指向同一组可核实的产品问题。"
    },
    misconceptions: [
      { label: "“问题越多，范围越清楚”", truth: "数量本身不是质量。问题必须可回答、可映射到语义和数据，且与当前试点有关。" },
      { label: "“本体能解决不存在的数据”", truth: "模型能标出依赖和缺口，不能凭语义定义制造缺失的业务事实。" }
    ],
    resources: [
      { title: "W3C OWL 2 Primer", url: "https://www.w3.org/TR/owl2-primer/", note: "作为理解概念建模与逻辑表达的标准入门材料。" },
      { title: "ETSI SAREF 设计原则", url: "https://saref.etsi.org/principles.html", note: "了解跨领域标准复用与扩展时的设计考虑。" }
    ]
  },
  5: {
    sections: [
      {
        title: "先选贯通业务的一条供热切片",
        paragraphs: [
          "供热领域对象很多：热源、管段、阀门、泵、换热站、楼宇、热用户、传感器、观测、告警和工单。第一版只挑与“告警影响范围追溯”直接相关的对象，避免把整个运行管理体系一次建完。",
          "静态资产、动态观测和业务事件要区分。阀门是资产实例，阀门开度是状态或观测，告警是事件；它们之间需要明确关系，不能只把所有信息塞进一个设备记录。"
        ],
        bullets: ["对象身份必须能和主数据、GIS、遥测中的标识对应。", "根据问题决定是否纳入泵、管段、工单等概念；无关项先不扩展。"]
      },
      {
        title: "拓扑边必须有方向、来源和时间",
        paragraphs: [
          "图上的每条边都代表一个具体主张。Sensor_047 monitors Valve_12、Valve_12 installedAt Station_03 和 Station_03 serves Building_08 各自含义不同；方向也决定了追溯路径怎么走。",
          "关系不是永恒事实。管网重构、阀门更换、服务范围调整后，关系可能只在一段时间内有效。若不同来源给出冲突，图上应保留冲突状态和来源，而不是任意挑一条当事实。"
        ],
        bullets: ["建议为业务边保存 source、validTime、status 或质量依据。", "若追溯要双向查询，应明确逆关系规则，而不是随意反转有方向关系。"]
      },
      {
        title: "从路径到可以复核的影响结果",
        paragraphs: [
          "告警影响范围不是“图上能走到的全部节点”这么简单。系统需要说明采用了哪些关系、关系来自哪份拓扑或主数据、何时有效，以及这条链是否经过人工确认。",
          "因此输出应同时包含目标对象和路径。如果路径中断，返回已知的前半段和断点；如果边过期或冲突，明确标为待核实。这样的结果才能供运维人员复核。"
        ],
        bullets: ["遍历前限定可用关系类型和时间窗口。", "保留每条边的证据，便于之后定位错误或更新数据。"]
      }
    ],
    walkthrough: {
      title: "示例推演：从告警走到热用户",
      intro: "下面是教学用虚构路径；练习会要求补齐最后两条关系及证据：",
      steps: ["Alarm_A17 attachedTo Observation_340。", "Observation_340 madeBySensor Sensor_047；传感器 monitors Valve_12。", "Valve_12 installedAt Station_03。", "Station_03 serves Building_08，Building_08 contains HeatUser_202。", "检查每条边是否有来源、有效期且状态已核实；虚构结果不能当作真实产品影响范围。"],
      closing: "热用户名单由连续且可复核的关系边得到；任何断点都会限制结论范围，而不是由模型猜过去。"
    },
    misconceptions: [
      { label: "“图连通就代表业务关系成立”", truth: "图遍历只能沿已录入的边走；边的来源、时效和质量决定它能否用于判断。" },
      { label: "“告警附近的所有对象都受影响”", truth: "影响范围需要业务规则和经过验证的关系路径，不能依靠图距离猜测。" }
    ],
    resources: [
      { title: "Brick Schema 文档", url: "https://docs.brickschema.org/", note: "参考楼宇 HVAC 设备与测点的词汇设计，不直接等同于城镇供热管网模型。" },
      { title: "ETSI SAREF4ENER", url: "https://saref.etsi.org/saref4ener/v2.1.1/", note: "了解能源领域本体的概念复用与扩展。" },
      { title: "ETSI SAREF4BLDG", url: "https://saref.etsi.org/saref4bldg/v2.1.1/", note: "参考建筑领域设备与空间语义。" }
    ]
  },
  6: {
    sections: [
      {
        title: "映射不是改字段名",
        paragraphs: [
          "源系统字段只表达了局部的数据结构。temperature_val = 72.4 还没有说明它测量什么、属于哪条观测、使用什么单位、何时采集、来自哪台设备。映射要补全这些语义联系。",
          "每条映射至少记录源系统、源字段、目标概念、转换规则和版本。源值经过单位换算、编码规范化或时间转换后，也要能还原到原始值与处理过程。"
        ],
        bullets: ["把“列映射”与“实例身份对齐”分开记录。", "一个字段可能需要多个语义目标，多个源字段也可能共同生成一个规范化对象。"]
      },
      {
        title: "先对齐身份，再连接关系",
        paragraphs: [
          "GIS 中的 S-03 与遥测系统里的 HX03 可能指同一座换热站。若身份没有对齐，设备所属站点和站点服务楼宇的关系就无法稳定串接。应优先使用权威主标识，并保存源系统别名。",
          "匹配依据可能来自主数据映射表、人工确认、设备层级或地理位置。匹配置信度不足时，把对象标为待确认，不要为了让图连起来而强行合并。"
        ],
        bullets: ["同名不保证同一对象；异名也可能指向同一对象。", "保留来源标识、匹配规则和确认状态，支持撤销错误合并。"]
      },
      {
        title: "时空、单位和质量是解释的一部分",
        paragraphs: [
          "观测的采集时间和关系的有效时间不是一回事。前者说明数据何时产生，后者说明业务关系何时成立。空间坐标还可能有坐标系、精度和采集时间，不能只存一个裸数值。",
          "单位换算和质量标志直接影响结论。estimated、stale、invalid 等状态应映射到可解释的质量语义；不合格数据可以被过滤或降级，但应保留为何不采用的理由。"
        ],
        bullets: ["单位需要可识别且转换规则明确。", "保留质量标志，不要把估算值悄悄包装成实测值。"]
      }
    ],
    walkthrough: {
      title: "示例推演：遥测记录转成语义观测",
      intro: "假设源记录为 device_code=V-12、station_id=S-03、temperature_val=72.4、collect_time=08:15、quality_flag=estimated：",
      steps: ["用 device_code 找到 Valve_12，并保留遥测源标识。", "把 station_id 对齐到 Station_03，再表达 installedAt 关系。", "把 72.4 映射为一条观测结果，同时关联 SupplyWaterTemperature 和单位 °C。", "将 collect_time 规范化为带时区的时间；保留原始值与转换规则。", "把 estimated 映射为质量状态，使下游解释能说明该值是估算数据。"],
      closing: "映射后的数据能落入第五章的对象与关系中，同时保留判定它是否可用所需的完整上下文。"
    },
    misconceptions: [
      { label: "“把列名翻译成英文就完成映射了”", truth: "语义映射还需要身份、关系、单位、时间、来源、转换和质量信息。" },
      { label: "“低置信度匹配也先合并，后续再说”", truth: "错误合并会污染关系路径；应保留待确认状态和匹配证据。" }
    ],
    resources: [
      { title: "W3C SSN/SOSA 传感器与观测词汇", url: "https://www.w3.org/TR/vocab-ssn-2023/", note: "参考观测数据的对象关系与属性划分。" },
      { title: "ETSI SAREF 设计原则", url: "https://saref.etsi.org/principles.html", note: "参考通用语义与领域扩展的边界。" }
    ]
  },
  7: {
    sections: [
      {
        title: "先把自然语言问题落到明确对象",
        paragraphs: [
          "用户说“这条告警影响谁”，应用先通过标识、上下文或追问定位到 Alarm_A17，再沿允许的关系查找对象。语义层的价值，是减少模型把相似名称或常识误当成同一个对象。",
          "检索与遍历最好由确定性的查询或工具完成；LLM 负责理解用户意图、组织证据和解释限制。模型不应自行创造拓扑关系，也不应仅凭训练知识推断实时影响范围。"
        ],
        bullets: ["在回答前确认实体身份、查询范围和时间点。", "将模型可以引用的对象、关系与证据限定在实际查询返回结果中。"]
      },
      {
        title: "把证据和不确定性作为输出字段",
        paragraphs: [
          "结构化结果可以包含 answer、evidence、uncertainty 和 suggestedAction。每条 evidence 应指出 from、relation、to、source 和 time；这样用户能逐边检查结论。",
          "缺失关系、过期数据和来源冲突应写进 uncertainty。自然语言解释可以简洁，但不能把“未找到证据”改写成“确定没有影响”，也不能隐藏所采用的数据版本。"
        ],
        bullets: ["先生成可验证结构，再让 LLM 把结构改写成人能读懂的话。", "保存查询时间和数据版本，避免结果之后无法复现。"]
      },
      {
        title: "只读分析与写操作分级",
        paragraphs: [
          "查看关系、筛选告警和生成解释通常是只读操作；关闭阀门、派发工单或更改策略会改变现实系统。两者需要不同的权限、风险检查和审计要求。",
          "Agent 只能通过受约束的工具接口执行动作。写操作应检查操作者权限、目标对象、参数范围和审批状态，并记录谁在何时发起、依据是什么、实际执行结果如何。"
        ],
        bullets: ["在练习结果中显式区分 read_only 与需要审批的动作。", "本体提供动作对象和语义，不替代权限系统、流程和运行时安全控制。"]
      }
    ],
    walkthrough: {
      title: "示例推演：把追溯结果交给 AI 解释",
      intro: "应用先查询证据，Agent 再组织成答复：",
      steps: ["查询层返回 HeatUser_202 以及从 Alarm_A17 到该对象的有向路径。", "每条边附带来源、有效时间和核实状态。", "结果中列出一项不确定性：样例拓扑为演示数据，尚未对照真实 GIS。", "LLM 生成摘要时只引用结果结构，不扩展到未返回的用户。", "若建议生成工单，先显示待审批动作，不直接执行写操作。"],
      closing: "最终答复的内容受查询证据约束；语言模型负责解释，权限机制决定动作是否可执行。"
    },
    misconceptions: [
      { label: "“LLM 能看懂关系，就能自行补全拓扑”", truth: "语言模型可以解释证据，但实时业务事实必须来自受控数据源。" },
      { label: "“加一句需要审批就等于安全”", truth: "仍需权限校验、参数约束、审批流程和审计记录共同生效。" }
    ],
    resources: [
      { title: "Microsoft Fabric IQ：Ontology 概览", url: "https://learn.microsoft.com/en-us/fabric/iq/ontology/overview", note: "观察语义对象如何为分析和 AI 应用提供上下文。" },
      { title: "Palantir Foundry Ontology 概览", url: "https://www.palantir.com/docs/foundry/ontology/overview", note: "参考对象、关系、动作与应用权限的组合方式。" }
    ]
  },
  8: {
    sections: [
      {
        title: "用能力问题集检查正确性与覆盖度",
        paragraphs: [
          "评估不能只看图里有多少概念或关系。正确性要核对对象身份、关系方向和业务含义；覆盖度要检查优先能力问题是否能回答；证据质量要检查来源和时间；未知处理要看系统是否诚实暴露缺口。",
          "测试样例应包括正常路径、缺边、过期边、重复标识和冲突来源。将每种情况的预期结果写下来，之后模型或映射变更都用同一组场景回归。"
        ],
        bullets: ["高覆盖度不能抵消错误关系。", "证据路径与未知项是告警影响范围试点的关键质量门槛。"]
      },
      {
        title: "让模型变更可追踪、可兼容",
        paragraphs: [
          "关系从 serves 改名、来源规则调整或标识合并，都可能影响查询、数据映射和产品解释。变更记录要说明原因、影响概念、受影响问题、迁移方式、负责人和生效时间。",
          "需要兼容时可以保留旧属性映射一段时间、提供数据迁移规则或双版本查询。无法兼容时要明确升级窗口和验证责任，避免同一个字段在不同版本里悄悄改变含义。"
        ],
        bullets: ["每次变更建立前后对照和回滚条件。", "把标准复用、本地扩展和临时映射分别标识。"]
      },
      {
        title: "把未知和冲突变成下一轮工作",
        paragraphs: [
          "模型成熟不代表永远没有未知，而是缺证据时能给出边界清楚的结果。无法回答的问题应记录缺的是对象、关系、来源、质量还是权限，并指定后续负责人。",
          "下一轮 backlog 可按业务价值、数据准备度和错误风险排序。先解决能显著提高试点可靠性的缺口，再扩展更广的领域模型。"
        ],
        bullets: ["问题条目描述触发场景、当前结果、期望结果和依赖数据。", "评审结论需包含继续验证、带条件进入试点或暂停的理由。"]
      }
    ],
    walkthrough: {
      title: "示例推演：告警影响范围原型的评审门槛",
      intro: "用一条真实或脱敏样例，从四个维度判断是否可以进入下一轮：",
      steps: ["正确性：告警、观测、传感器、设备、站点和用户都对齐到正确实例。", "覆盖度：优先能力问题能够回答，关系方向与路径符合业务定义。", "证据：每条边能找到来源、有效时间和质量状态。", "未知与冲突：数据缺失或来源冲突时明确提示，并阻止无依据的确定性结论。", "治理：版本、映射负责人、变更记录和回滚方式齐备。"],
      closing: "评审结果把当前模型和数据的证据交给下一轮，形成从问题范围到真实验证、再到持续改进的闭环。"
    },
    misconceptions: [
      { label: "“平均分高就可以上线”", truth: "关键路径错误、证据不可追溯或未知被隐藏时，应作为门槛失败处理。" },
      { label: "“把未知都填上就能提高完整度”", truth: "未经证实的补值会降低可信度；应该先记录缺口及其解决责任。" }
    ],
    resources: [
      { title: "W3C RDF 1.1 Primer", url: "https://www.w3.org/TR/rdf11-primer/", note: "作为回顾基础图语义的材料。" },
      { title: "ETSI SAREF 设计原则", url: "https://saref.etsi.org/principles.html", note: "作为复用、扩展和演进领域模型的参考。" }
    ]
  }
};

const chapterIntros = {
  1: "从“告警影响哪些用户”这个产品问题出发，理解工程本体论与术语表、数据模型等相邻概念的分工，并确定一个可以验证的试点范围。",
  2: "把供热场景里的名称和值拆成类型、实例、身份、属性、关系、状态、事件和观测，为后续建模建立清晰的概念词汇。",
  3: "学习用 RDF 表达对象事实，区分 OWL 的逻辑描述与 SHACL 的数据校验，并理解缺失信息为什么通常仍是未知。",
  4: "把用户真正会提出的问题整理成能力问题清单，再用问题反推本体范围、数据依赖和验收条件。",
  5: "围绕告警影响追溯选择必要的供热对象，建立有方向的拓扑关系，并为路径上的每条关系保留证据。",
  6: "将 GIS、主数据和遥测字段映射到供热语义对象，同时对齐身份并保留单位、时间、来源和质量。",
  7: "让 AI 基于明确对象和可追溯证据回答告警问题，并区分只读解释与需要授权的动作。",
  8: "用能力问题和真实场景评估模型与原型，整理治理规则、责任边界和下一轮改进计划。"
};

const chapterLeads = {
  1: "本章确定了试点问题和范围。下一章将把问题中的告警、观测、设备、站点和热用户拆成类型、实例、关系与观测。",
  2: "现在已经区分了对象、关系和观测。下一章将学习怎样用 RDF 把这些事实写成标准语句，并用 OWL 与 SHACL 描述逻辑和校验要求。",
  3: "我们已经知道如何表达语义、校验数据和保留未知。下一章将从用户提问出发，形成可验证的能力问题清单，进一步限定模型范围。",
  4: "能力问题已经明确系统需要回答什么。下一章将据此选择供热对象、定义拓扑关系，并组成可追溯的告警影响路径。",
  5: "第一版供热对象和关系已经成形。下一章将把 GIS、主数据和遥测里的真实字段映射进这张语义模型。",
  6: "对象与数据已经对齐，并保留了证据上下文。下一章将把它们用于 AI 查询和解释，同时明确动作的权限与审批边界。",
  7: "原型已经能够组织答案、证据和不确定项。下一章将用真实样例和能力问题评估其正确性、覆盖度与治理准备度。",
  8: "评估已把未解决问题整理为改进计划。下一轮可以从中选取高价值事项，重新检查问题范围，并继续迭代模型、数据映射和产品原型。"
};

const studyBridges = {
  1: [
    { title: "从定义走到辨析", body: "既然本体同时谈领域对象、关系和约束，它就容易被误认为术语表、分类树或数据模型。下一步要把这些相似物逐个区分，才能知道本体在产品里补充了什么语义。" },
    { title: "从辨析走到范围", body: "分清本体不等于存储方案后，建模的焦点就从“选什么工具”回到“要回答什么问题”。因此最后用告警追溯来限定第一版边界，只纳入回答它所必需的对象和证据。" }
  ],
  2: [
    { title: "从对象走到对象间的事实", body: "确定类型、实例和稳定身份后，我们才知道一句业务事实的两端分别指向谁。接下来把描述单个对象的属性，与连接两个对象的关系分开表达。" },
    { title: "从静态结构走到运行变化", body: "属性和关系先搭出对象图，但供热系统一直在运行：阀门状态会变，告警会发生，传感器会产生读数。因此还要引入状态、事件和观测，并分别说明它们的时间语境。" }
  ],
  3: [
    { title: "从事实表达走到规则", body: "RDF 三元组能把观测、传感器和属性连起来，但单靠这些事实还不清楚概念如何分类，也无法表达某个应用要求哪些字段齐全。于是需要继续区分 OWL 的逻辑描述与 SHACL 的数据校验。" },
    { title: "从校验走到未知的解释", body: "SHACL 能指出样例缺了时间或单位，却不能把缺失自动变成现实中的否定事实。理解这个边界后，才能同时做到产品校验严格、语义判断不武断，并把未知留给后续数据补齐。" }
  ],
  4: [
    { title: "从自然语言需求走到可建模问题", body: "能力问题先把用户意图变成一句可回答的话；但一句话还不能直接决定建哪些概念。接下来把问题拆到答案对象、需要的关系和可用证据，才看得出模型缺口在哪里。" },
    { title: "从映射走到治理", body: "问题映射揭示了首版范围和数据依赖；随着问题增加，概念还需要复用、模块化和变更记录来保持一致。于是这一章最后把范围、复用与版本管理合在一起，形成可持续的工程边界。" }
  ],
  5: [
    { title: "从范围走到对象", body: "能力问题已经规定要返回哪些用户、依据哪些路径，所以对象选择不再是列出所有供热设施，而是挑出支撑答案的那条业务切片。确定对象后，下一步才有明确的关系端点可以连接。" },
    { title: "从拓扑走到证据", body: "关系方向让系统知道如何从告警沿图遍历，但“能走到”还不等于“关系真实且当前有效”。因此需要给每条边补来源、时间和核实状态，再判断整条路径是否足以支撑结果。" }
  ],
  6: [
    { title: "从字段语义走到身份对齐", body: "把温度字段映射成观测结果，只说明这列值代表什么，还没有说明它属于哪台设备或哪座站。为了让第五章的拓扑真正连起来，必须先将不同系统的标识对齐到同一实例。" },
    { title: "从身份关系走到可信数据", body: "对象对齐后，字段才有正确的归属；但同一条观测仍可能过期、单位不同或质量不可靠。最后把时间、空间、单位、来源和质量补进映射，才能判断它是否可用于告警分析。" }
  ],
  7: [
    { title: "从提问走到受控查询", body: "自然语言先要落到具体告警和查询范围；否则“这条告警”可能指错对象。对象确认后，应用才能沿第六章准备好的映射查询事实，而不是让语言模型凭常识猜关系。" },
    { title: "从证据解释走到动作治理", body: "结构化证据足以支撑只读解释，但建议动作可能改变设备或工作流程。正因为输出会从“说明事实”跨到“影响现实”，最后必须把权限、审批和审计纳入同一交互设计。" }
  ],
  8: [
    { title: "从指标走到质量门槛", body: "能力问题集先告诉我们该评估哪些能力，但单看覆盖数量会掩盖错误路径。因此还要把正确性、来源时间和未知处理设为门槛，确认原型是否真的可信。" },
    { title: "从评估结果走到下一轮", body: "评估不仅给分，也暴露模型、数据或责任边界的缺口。把每项缺口写成有证据、有负责人、有版本影响的待办，课程的最后就自然回到下一轮的问题范围与模型改进。" }
  ]
};

const STORAGE_KEY = "ontology-learning-workshop.v1";
const COMMENTS_KEY = "ontology-learning-workshop.comments.v1";
const CONTENT_VERSION = 2;
const categories = ["类型", "实例", "状态", "属性", "关系", "观测", "事件"];
let state = loadState();
let comments = loadComments();
const initialLessonId = readHashId();
let isHome = !initialLessonId;
let activeId = initialLessonId || firstIncompleteId();
let selectedChoice = null;
let toastTimer;
let pendingSelection = null;
let activeCommentId = null;
let popoverAnchor = null;

const nav = document.getElementById("lesson-nav");
const lessonContainer = document.getElementById("lesson-container");
const lessonAside = document.getElementById("lesson-aside");
const workspace = document.querySelector(".workspace");
const appShell = document.querySelector(".app-shell");
const sidebar = document.querySelector(".sidebar");
const breadcrumbCurrent = document.getElementById("breadcrumb-current");

function emptyState() {
  return { contentVersion: CONTENT_VERSION, completed: [], exercises: {}, drafts: {}, ratings: {} };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    const completed = Array.isArray(parsed.completed) ? parsed.completed : [];
    const exercises = parsed.exercises && typeof parsed.exercises === "object" ? parsed.exercises : {};
    if (Number(parsed.contentVersion || 1) < CONTENT_VERSION) {
      [3, 4, 5, 7].forEach(function (id) {
        const key = "unit-" + id;
        if (exercises[key]) exercises[key] = { done: false, message: "本章练习已更新，请按新版要求重新提交。" };
      });
      return {
        contentVersion: CONTENT_VERSION,
        completed: completed.filter(function (id) { return [3, 4, 5, 7].indexOf(id) === -1; }),
        exercises: exercises,
        drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
        ratings: parsed.ratings && typeof parsed.ratings === "object" ? parsed.ratings : {}
      };
    }
    return {
      contentVersion: CONTENT_VERSION,
      completed: completed,
      exercises: exercises,
      drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
      ratings: parsed.ratings && typeof parsed.ratings === "object" ? parsed.ratings : {}
    };
  } catch (_) {
    return emptyState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {
    showToast("浏览器未能保存本地进度；当前页面仍可继续使用。");
  }
}

function readHashId() {
  const match = window.location.hash.match(/^#unit-(\d+)$/);
  if (!match) return null;
  const id = Number(match[1]);
  return lessons.some(function (lesson) { return lesson.id === id; }) ? id : null;
}

function firstIncompleteId() {
  const next = lessons.find(function (lesson) { return !state.completed.includes(lesson.id); });
  return next ? next.id : lessons[0].id;
}

function currentLesson() {
  return lessons.find(function (lesson) { return lesson.id === activeId; }) || lessons[0];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function loadComments() {
  try {
    const parsed = JSON.parse(localStorage.getItem(COMMENTS_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(function (item) {
      return item && typeof item.id === "string" && lessons.some(function (lesson) { return lesson.id === Number(item.lessonId); }) &&
        (item.scope === "main" || item.scope === "lead") && Number.isInteger(item.start) && Number.isInteger(item.end) &&
        item.start >= 0 && item.end > item.start && typeof item.quote === "string" && typeof item.text === "string";
    });
  } catch (_) {
    return [];
  }
}

function saveComments() {
  try {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    updateCommentExportControl();
    return true;
  } catch (_) {
    showToast("浏览器未能保存批注，请检查本机存储空间。");
    return false;
  }
}

function updateCommentExportControl() {
  const button = document.getElementById("export-comments");
  const count = document.getElementById("comment-count");
  if (button) button.disabled = comments.length === 0;
  if (count) count.textContent = String(comments.length);
}

function getTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);
  return nodes;
}

function getTextOffsetWithin(root, container, offset) {
  const range = document.createRange();
  range.selectNodeContents(root);
  range.setEnd(container, offset);
  return range.toString().length;
}

function rangeFromOffsets(root, start, end) {
  const nodes = getTextNodes(root);
  let cursor = 0;
  let startNode = null;
  let endNode = null;
  let startOffset = 0;
  let endOffset = 0;
  nodes.some(function (node) {
    const next = cursor + node.nodeValue.length;
    if (!startNode && start >= cursor && start <= next) {
      startNode = node;
      startOffset = start - cursor;
    }
    if (end >= cursor && end <= next) {
      endNode = node;
      endOffset = end - cursor;
      return true;
    }
    cursor = next;
    return false;
  });
  if (!startNode || !endNode) return null;
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  return range;
}

function wrapTextRange(root, start, end, commentId) {
  const nodes = getTextNodes(root);
  const spans = [];
  let cursor = 0;
  nodes.forEach(function (node) {
    const nodeStart = cursor;
    const nodeEnd = cursor + node.nodeValue.length;
    const from = Math.max(start, nodeStart);
    const to = Math.min(end, nodeEnd);
    if (to > from) spans.push({ node: node, start: from - nodeStart, end: to - nodeStart });
    cursor = nodeEnd;
  });
  spans.reverse().forEach(function (span) {
    let target = span.node;
    if (span.end < target.nodeValue.length) target.splitText(span.end);
    if (span.start > 0) target = target.splitText(span.start);
    const mark = document.createElement("mark");
    mark.className = "annotation-highlight";
    mark.dataset.commentId = commentId;
    mark.setAttribute("role", "button");
    mark.setAttribute("tabindex", "0");
    mark.setAttribute("aria-label", "查看课程批注");
    target.parentNode.replaceChild(mark, target);
    mark.appendChild(target);
  });
}

function applyCommentMarks() {
  lessonContainer.querySelectorAll("mark.annotation-highlight").forEach(function (mark) {
    mark.parentNode.replaceChild(document.createTextNode(mark.textContent), mark);
  });
  const scopes = Array.from(lessonContainer.querySelectorAll("[data-annotation-scope]"));
  scopes.forEach(function (scope) {
    const scopeId = scope.dataset.annotationScope;
    comments.filter(function (comment) { return comment.lessonId === activeId && comment.scope === scopeId; })
      .slice().sort(function (a, b) { return b.start - a.start; })
      .forEach(function (comment) {
        const range = rangeFromOffsets(scope, comment.start, comment.end);
        if (range && range.toString() === comment.quote) wrapTextRange(scope, comment.start, comment.end, comment.id);
      });
  });
}

function closeAnnotationPopover() {
  const popover = document.getElementById("annotation-popover");
  popover.hidden = true;
  popover.innerHTML = "";
  activeCommentId = null;
  pendingSelection = null;
}

function placeAnnotationPopover(rect) {
  const popover = document.getElementById("annotation-popover");
  popoverAnchor = rect;
  popover.hidden = false;
  popover.style.left = Math.max(12, Math.min(rect.left, window.innerWidth - 344)) + "px";
  popover.style.top = Math.max(12, Math.min(rect.bottom + 9, window.innerHeight - 220)) + "px";
  requestAnimationFrame(function () {
    if (popover.hidden) return;
    const box = popover.getBoundingClientRect();
    let left = Math.min(Math.max(12, popoverAnchor.left), window.innerWidth - box.width - 12);
    let top = popoverAnchor.bottom + 9;
    if (top + box.height > window.innerHeight - 12) top = Math.max(12, popoverAnchor.top - box.height - 9);
    popover.style.left = left + "px";
    popover.style.top = top + "px";
  });
}

function openSelectionPrompt(selection) {
  pendingSelection = selection;
  activeCommentId = null;
  const popover = document.getElementById("annotation-popover");
  popover.innerHTML = '<div class="annotation-popover-head"><strong>为选中的内容添加批注</strong><button type="button" class="annotation-close" data-comment-action="close" aria-label="关闭">×</button></div>' +
    '<blockquote class="annotation-quote">' + escapeHtml(selection.quote) + '</blockquote>' +
    '<div class="annotation-actions"><button type="button" class="small-primary" data-comment-action="compose">写下批注</button><button type="button" class="small-secondary" data-comment-action="close">取消</button></div>';
  placeAnnotationPopover(selection.rect);
}

function openComment(comment, anchor) {
  activeCommentId = comment.id;
  pendingSelection = null;
  const popover = document.getElementById("annotation-popover");
  popover.innerHTML = '<div class="annotation-popover-head"><strong>课程批注 · 第 ' + comment.lessonId + ' 章</strong><button type="button" class="annotation-close" data-comment-action="close" aria-label="关闭">×</button></div>' +
    '<blockquote class="annotation-quote">' + escapeHtml(comment.quote) + '</blockquote>' +
    '<p class="annotation-comment-text">' + escapeHtml(comment.text).replace(/\n/g, "<br>") + '</p>' +
    '<div class="annotation-meta">' + escapeHtml(new Date(comment.updatedAt || comment.createdAt).toLocaleString("zh-CN")) + '</div>' +
    '<div class="annotation-actions"><button type="button" class="small-secondary" data-comment-action="edit">编辑</button><button type="button" class="small-secondary annotation-delete" data-comment-action="delete">删除</button></div>';
  placeAnnotationPopover(anchor);
}

function openCommentEditor(comment) {
  const popover = document.getElementById("annotation-popover");
  const isEditing = Boolean(comment);
  const quote = comment ? comment.quote : pendingSelection.quote;
  popover.innerHTML = '<div class="annotation-popover-head"><strong>' + (isEditing ? "编辑课程批注" : "写下课程批注") + '</strong><button type="button" class="annotation-close" data-comment-action="cancel-editor" aria-label="取消编辑">×</button></div>' +
    '<blockquote class="annotation-quote">' + escapeHtml(quote) + '</blockquote>' +
    '<label class="annotation-label" for="annotation-text">你的建议</label><textarea id="annotation-text" class="annotation-input" maxlength="2000" placeholder="指出需要澄清、补充或调整的内容">' + escapeHtml(comment ? comment.text : "") + '</textarea>' +
    '<div class="annotation-actions"><button type="button" class="small-primary" data-comment-action="save">保存批注</button><button type="button" class="small-secondary" data-comment-action="cancel-editor">取消</button></div>';
  placeAnnotationPopover(popoverAnchor);
  const input = document.getElementById("annotation-text");
  input.focus();
  if (isEditing) input.dataset.editing = comment.id;
}

function handleTextSelection() {
  const selection = window.getSelection();
  const scopeNodes = Array.from(lessonContainer.querySelectorAll("[data-annotation-scope]"));
  if (!selection || selection.isCollapsed || !selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  const scope = scopeNodes.find(function (node) {
    return node.contains(range.startContainer) && node.contains(range.endContainer);
  });
  if (!scope) return;
  const selectedText = range.toString();
  const leading = (selectedText.match(/^\s*/) || [""])[0].length;
  const trimmed = selectedText.trim();
  if (!trimmed) return;
  const beforeStart = document.createRange();
  beforeStart.selectNodeContents(scope);
  beforeStart.setEnd(range.startContainer, range.startOffset);
  const start = beforeStart.toString().length + leading;
  const end = start + trimmed.length;
  if (comments.some(function (comment) {
    return comment.lessonId === activeId && comment.scope === scope.dataset.annotationScope && start < comment.end && end > comment.start;
  })) return;
  const rect = range.getBoundingClientRect();
  const location = describeCommentLocation(scope, range, start, trimmed, activeId);
  openSelectionPrompt({ lessonId: activeId, scope: scope.dataset.annotationScope, start: start, end: end, quote: trimmed, location: location, rect: rect });
}

function findCommentBlock(scope, range) {
  const selector = "p, li, h3, h4, .walkthrough-close, .concept-bridge, .learning-point, .misconception, .resource-link, .study-section, .chapter-intro, .learning-card, .study-card, .walkthrough-card, .misconception-card, .resources-card, .chapter-lead";
  let element = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
    ? range.commonAncestorContainer
    : range.commonAncestorContainer.parentElement;
  while (element && scope.contains(element)) {
    if (element.matches(selector) && element.contains(range.startContainer) && element.contains(range.endContainer)) return element;
    if (element === scope) break;
    element = element.parentElement;
  }
  return scope;
}

function siblingTextPosition(element, suffix) {
  const siblings = Array.from(element.parentElement.children).filter(function (item) { return item.tagName === element.tagName; });
  return "第 " + (siblings.indexOf(element) + 1) + " " + suffix;
}

function describeCommentLocation(scope, range, start, quote, lessonId) {
  const block = findCommentBlock(scope, range);
  const locationParts = ["第 " + lessonId + " 章"];
  const intro = block.closest(".chapter-intro");
  if (scope.dataset.annotationScope === "lead") {
    const leadTitle = scope.querySelector(".chapter-lead strong");
    locationParts.push(leadTitle ? leadTitle.textContent.trim() : "章节衔接");
  } else if (intro) {
    locationParts.push("本章导读");
  } else {
    const card = block.closest(".learning-card, .study-card, .walkthrough-card, .misconception-card, .resources-card");
    const sectionLabel = card && card.querySelector(":scope > .section-label");
    if (sectionLabel) {
      const label = sectionLabel.cloneNode(true);
      const number = label.querySelector(".label-mark");
      if (number) number.remove();
      locationParts.push(label.textContent.trim());
    }
    const subsection = block.closest(".study-section") && block.closest(".study-section").querySelector(".study-section-heading h3") ||
      block.closest(".concept-bridge") && block.closest(".concept-bridge").querySelector("strong") ||
      block.closest(".walkthrough-card") && block.closest(".walkthrough-card").querySelector(":scope > h3") ||
      block.closest(".learning-point") && block.closest(".learning-point").querySelector("h3") ||
      block.closest(".misconception") && block.closest(".misconception").querySelector("h4") ||
      block.closest(".resource-link") && block.closest(".resource-link").querySelector("strong");
    if (subsection && subsection.textContent.trim() && locationParts[locationParts.length - 1] !== subsection.textContent.trim()) {
      locationParts.push(subsection.textContent.trim());
    }
  }

  let blockPosition = "本节内容";
  if (block.matches("p")) blockPosition = siblingTextPosition(block, "段");
  else if (block.matches("li")) blockPosition = siblingTextPosition(block, "条");
  else if (block.classList.contains("walkthrough-close")) blockPosition = "串联结果";
  else if (block.classList.contains("concept-bridge")) blockPosition = "推导连接段";
  else if (block.classList.contains("learning-point")) blockPosition = "要点卡片";
  else if (block.classList.contains("misconception")) blockPosition = "易混点卡片";
  else if (block.classList.contains("resource-link")) blockPosition = "延伸阅读条目";
  else if (block.matches("h3, h4")) blockPosition = "标题";
  if (locationParts[locationParts.length - 1] !== blockPosition) locationParts.push(blockPosition);

  const blockStart = getTextOffsetWithin(scope, block, 0);
  let localStart = Math.max(0, start - blockStart);
  const blockText = block.textContent || "";
  if (blockText.slice(localStart, localStart + quote.length) !== quote) {
    const foundAt = blockText.indexOf(quote);
    if (foundAt >= 0) localStart = foundAt;
  }
  const localEnd = Math.min(blockText.length, localStart + quote.length);
  const beforeStart = Math.max(0, localStart - 48);
  const afterEnd = Math.min(blockText.length, localEnd + 48);
  const compact = function (text) { return text.replace(/\s+/g, " ").trim(); };
  return {
    location: locationParts.join(" > "),
    contextBefore: compact(blockText.slice(beforeStart, localStart)),
    contextAfter: compact(blockText.slice(localEnd, afterEnd)),
    contextBeforeOmitted: beforeStart > 0,
    contextAfterOmitted: afterEnd < blockText.length
  };
}

function buildCommentScope(lesson, scopeId) {
  const scope = document.createElement("div");
  scope.dataset.annotationScope = scopeId;
  if (scopeId === "lead") {
    scope.innerHTML = renderChapterLead(lesson);
  } else {
    scope.innerHTML = renderChapterIntro(lesson) + renderScenarioIntro(lesson) + renderStudyContent(lesson);
  }
  return scope;
}

function resolveCommentLocation(comment, cache) {
  const cacheKey = comment.lessonId + ":" + comment.scope;
  if (!cache.has(cacheKey)) {
    const lesson = lessons.find(function (item) { return item.id === comment.lessonId; });
    cache.set(cacheKey, lesson ? buildCommentScope(lesson, comment.scope) : null);
  }
  const scope = cache.get(cacheKey);
  if (!scope) return null;
  let start = comment.start;
  let end = comment.end;
  let range = rangeFromOffsets(scope, start, end);
  if (!range || range.toString() !== comment.quote) {
    const fullText = scope.textContent || "";
    const firstMatch = fullText.indexOf(comment.quote);
    if (firstMatch >= 0 && fullText.indexOf(comment.quote, firstMatch + 1) < 0) {
      start = firstMatch;
      end = start + comment.quote.length;
      range = rangeFromOffsets(scope, start, end);
    }
  }
  if (!range || range.toString() !== comment.quote) {
    if (typeof comment.location === "string") {
      return {
        location: "原文位置待确认；此前记录为 " + comment.location,
        contextBefore: "",
        contextAfter: "",
        contextBeforeOmitted: false,
        contextAfterOmitted: false
      };
    }
    return null;
  }
  return describeCommentLocation(scope, range, start, comment.quote, comment.lessonId);
}

function createCommentId() {
  return "comment-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
}

function saveCurrentComment() {
  const input = document.getElementById("annotation-text");
  const text = input.value.trim();
  if (!text) {
    input.focus();
    showToast("先写下这条批注，再保存。");
    return;
  }
  const previousComments = comments.map(function (comment) { return Object.assign({}, comment); });
  const now = new Date().toISOString();
  const editingId = input.dataset.editing;
  if (editingId) {
    const comment = comments.find(function (item) { return item.id === editingId; });
    if (!comment) return closeAnnotationPopover();
    comment.text = text;
    comment.updatedAt = now;
  } else {
    comments.push({
      id: createCommentId(), lessonId: pendingSelection.lessonId, scope: pendingSelection.scope,
      start: pendingSelection.start, end: pendingSelection.end, quote: pendingSelection.quote,
      location: pendingSelection.location.location,
      contextBefore: pendingSelection.location.contextBefore,
      contextAfter: pendingSelection.location.contextAfter,
      contextBeforeOmitted: pendingSelection.location.contextBeforeOmitted,
      contextAfterOmitted: pendingSelection.location.contextAfterOmitted,
      text: text, createdAt: now, updatedAt: now
    });
  }
  if (!saveComments()) {
    comments = previousComments;
    updateCommentExportControl();
    return;
  }
  closeAnnotationPopover();
  applyCommentMarks();
  showToast(editingId ? "批注已更新。" : "批注已保存，选中文字已标记。" );
}

function exportComments() {
  if (!comments.length) return;
  const scopeCache = new Map();
  const ordered = comments.slice().sort(function (a, b) {
    return a.lessonId - b.lessonId || (a.scope === "lead" ? 1 : 0) - (b.scope === "lead" ? 1 : 0) || a.start - b.start;
  });
  const sections = lessons.map(function (lesson) {
    const items = ordered.filter(function (comment) { return comment.lessonId === lesson.id; });
    if (!items.length) return "";
    return "## 第 " + lesson.id + " 章 · " + lesson.title + "\n\n" + items.map(function (comment, index) {
      const location = resolveCommentLocation(comment, scopeCache);
      const path = location ? location.location : "原文位置待确认（未能匹配到当前章节文本）";
      const before = location ? (location.contextBeforeOmitted ? "…" : "") + location.contextBefore : "";
      const after = location ? location.contextAfter + (location.contextAfterOmitted ? "…" : "") : "";
      const excerpt = (before ? before + " " : "") + "⟦" + comment.quote + "⟧" + (after ? " " + after : "");
      const selectedText = comment.quote.split(/\r?\n/).map(function (line) { return "> " + line; }).join("\n");
      const contextQuote = excerpt.split(/\r?\n/).map(function (line) { return "> " + line; }).join("\n");
      const note = comment.text.split(/\r?\n/).map(function (line) { return "> " + line; }).join("\n");
      const created = new Date(comment.createdAt).toLocaleString("zh-CN");
      return "### 批注 " + String(index + 1).padStart(2, "0") + "\n\n**批注对象（精确选文）：**\n\n" + selectedText + "\n\n**原文位置：** " + path + "\n\n**原文定位上下文：**\n\n" + contextQuote + "\n\n**批注内容：**\n\n" + note + "\n\n**时间：** " + created;
    }).join("\n\n---\n\n");
  }).filter(Boolean);
  const readingGuide = "## AI 阅读说明\n\n- **批注对象（精确选文）** 是这条意见直接针对的原文，请以此判断反馈对象。\n- **原文定位上下文** 用于在课程中找回并核对位置；它包含选文前后的文字，不代表整段都是批注对象。上下文里的 `⟦…⟧` 标出精确选文，省略号 `…` 表示上下文有截断。\n- **原文位置** 按章节和页面内容提供定位线索；若标为“待确认”，表示无法从当前课程文本中可靠匹配，需结合精确选文人工查找。\n- **批注内容** 是学习者希望课程团队处理的意见。请将它与精确选文及原文位置一起理解；不要把定位上下文误读为学习者的批注。";
  const markdown = "# 本体论学习工坊 · 课程批注\n\n导出时间：" + new Date().toLocaleString("zh-CN") + "\n批注数量：" + ordered.length + "\n\n" + readingGuide + "\n\n" + sections.join("\n\n");
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ontology-study-comments-" + new Date().toISOString().slice(0, 10) + ".md";
  link.click();
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
}

function renderNav() {
  nav.innerHTML = lessons.map(function (lesson) {
    const done = state.completed.includes(lesson.id);
    const active = !isHome && activeId === lesson.id;
    return '<button class="nav-item' + (active ? " active" : "") + (done ? " done" : "") + '" type="button" data-nav="' + lesson.id + '" aria-current="' + (active ? "step" : "false") + '">' +
      '<span class="nav-number">' + String(lesson.id).padStart(2, "0") + '</span>' +
      '<span class="nav-title">' + escapeHtml(lesson.title) + '</span>' +
      '<span class="nav-status" aria-label="' + (done ? "已完成" : "未完成") + '">' + (done ? "✓" : "") + '</span>' +
      '</button>';
  }).join("");
  const doneCount = state.completed.length;
  document.getElementById("progress-count").textContent = doneCount + " / " + lessons.length;
  document.getElementById("progress-bar").style.width = (doneCount / lessons.length * 100) + "%";
  document.getElementById("progress-caption").textContent = doneCount === lessons.length
    ? "八个单元已完成，继续用真实场景验证"
    : doneCount === 0 ? "从一个真实问题开始" : "一步一步，把语义落到产品";
}

function renderPoints(lesson) {
  return lesson.points.map(function (point) {
    return '<article class="learning-point"><h3>' + escapeHtml(point.title) + '</h3><p>' + escapeHtml(point.body) + '</p></article>';
  }).join("");
}

function renderScenarioIntro(lesson) {
  return '<section class="learning-card scenario-card"><div class="section-label"><span class="label-mark">01</span>供热场景 · 本章要回答的问题</div>' +
    '<div class="scenario-box"><span class="scenario-icon" aria-hidden="true">◈</span><div><p>' + escapeHtml(lesson.scenario) + '</p></div></div></section>';
}

function renderLearningRecap(lesson) {
  return '<section class="learning-card recap-card"><div class="section-label"><span class="label-mark">06</span>本章要点回顾</div>' +
    '<div class="learning-grid">' + renderPoints(lesson) + '</div></section>';
}

function renderStudyContent(lesson) {
  const content = studyContent[lesson.id];
  const bridges = studyBridges[lesson.id] || [];
  const sections = content.sections.map(function (section, index) {
    const article = '<article class="study-section"><div class="study-section-heading"><span>' + String(index + 1).padStart(2, "0") + '</span><h3>' + escapeHtml(section.title) + '</h3></div>' +
      section.paragraphs.map(function (paragraph) { return '<p>' + escapeHtml(paragraph) + '</p>'; }).join("") +
      '<ul>' + section.bullets.map(function (bullet) { return '<li>' + escapeHtml(bullet) + '</li>'; }).join("") + '</ul></article>';
    const bridge = bridges[index];
    const connector = bridge
      ? '<div class="concept-bridge"><span class="bridge-arrow" aria-hidden="true">↓</span><div><strong>' + escapeHtml(bridge.title) + '</strong><p>' + escapeHtml(bridge.body) + '</p></div></div>'
      : "";
    return article + connector;
  }).join("");
  const walkthrough = content.walkthrough;
  const misconceptions = content.misconceptions.map(function (item) {
    return '<article class="misconception"><h4>' + escapeHtml(item.label) + '</h4><p>' + escapeHtml(item.truth) + '</p></article>';
  }).join("");
  const resources = content.resources.map(function (item) {
    return '<a class="resource-link" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer"><span><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.note) + '</small></span><i aria-hidden="true">↗</i></a>';
  }).join("");
  return '<section class="study-card"><div class="section-label"><span class="label-mark">02</span>知识点递进讲解</div>' +
    '<p class="study-lead">下面按推导顺序展开。每个连接段会说明前一个知识点留下了什么问题，以及下一步为何必要。</p>' +
    '<div class="study-sections">' + sections + '</div></section>' +
    '<section class="walkthrough-card"><div class="section-label"><span class="label-mark">03</span>供热案例推演</div><h3>' + escapeHtml(walkthrough.title) + '</h3><p class="walkthrough-intro">' + escapeHtml(walkthrough.intro) + '</p><ol>' +
    walkthrough.steps.map(function (step) { return '<li>' + escapeHtml(step) + '</li>'; }).join("") + '</ol>' +
    '<p class="walkthrough-close"><strong>串联结果</strong>' + escapeHtml(walkthrough.closing) + '</p></section>' +
    '<section class="misconception-card"><div class="section-label"><span class="label-mark">04</span>容易混淆</div><div class="misconception-grid">' + misconceptions + '</div></section>' +
    '<section class="resources-card"><div class="section-label"><span class="label-mark">05</span>延伸阅读</div><div class="resource-list">' + resources + '</div></section>' +
    renderLearningRecap(lesson);
}

function renderChapterIntro(lesson) {
  return '<section class="chapter-intro"><span class="intro-label">本章导读</span><p>' + escapeHtml(chapterIntros[lesson.id]) + '</p></section>';
}

function renderChapterLead(lesson) {
  return '<section class="chapter-lead" aria-label="下一章预告"><span class="lead-icon" aria-hidden="true">→</span><div><strong>' +
    (lesson.id < lessons.length ? "下一章预告 · 第 " + (lesson.id + 1) + " 章" : "下一轮学习") +
    '</strong><p>' + escapeHtml(chapterLeads[lesson.id]) + '</p></div></section>';
}

function makePracticeHeader(lesson, icon, tag) {
  return '<div class="practice-head">' +
    '<div class="practice-title-wrap"><span class="practice-icon" aria-hidden="true">' + icon + '</span>' +
    '<div class="practice-heading"><h3>' + escapeHtml(lesson.practiceTitle) + '</h3><p>' + escapeHtml(lesson.practiceHint) + '</p></div></div>' +
    '<span class="practice-tag">' + tag + '</span></div>';
}

function exerciseMarkup(lesson) {
  const id = lesson.id;
  const draftKey = "unit-" + id;
  const savedDraft = state.drafts[draftKey];
  let body = "";
  if (lesson.practiceType === "choice") {
    const choice = Number.isInteger(state.drafts[draftKey + "-choice"]) ? state.drafts[draftKey + "-choice"] : -1;
    selectedChoice = choice;
    body = '<p class="prompt">' + escapeHtml(lesson.prompt) + '</p><div class="choice-list">' +
      lesson.options.map(function (option, index) {
        const selected = choice === index;
        return '<button class="choice-option' + (selected ? " selected" : "") + '" type="button" data-choice="' + index + '">' +
          '<span class="choice-letter">' + String.fromCharCode(65 + index) + '</span><span>' + escapeHtml(option) + '</span></button>';
      }).join("") + '</div><div class="exercise-actions"><button class="small-primary" type="button" data-action="check-choice">检查答案</button></div>';
  } else if (lesson.practiceType === "classify") {
    body = '<p class="prompt">为每个条目选择最贴切的语义类别。</p><div class="mapping-list">' +
      lesson.items.map(function (item, index) {
        const selectedCategory = state.drafts[draftKey + "-class-" + index] || "";
        return '<label class="mapping-row"><span class="mapping-source">' + escapeHtml(item.label) + '</span><span class="mapping-arrow" aria-hidden="true">→</span>' +
          '<select class="mapping-select" data-classify="' + index + '" aria-label="为 ' + escapeHtml(item.label) + ' 选择类别"><option value="">选择类别</option>' +
          categories.map(function (category) { return '<option value="' + category + '"' + (selectedCategory === category ? " selected" : "") + '>' + category + '</option>'; }).join("") +
          '</select></label>';
      }).join("") + '</div><div class="exercise-actions"><button class="small-primary" type="button" data-action="check-classify">检查分类</button></div>';
  } else if (lesson.practiceType === "rdf") {
    body = '<p class="prompt">起始代码故意缺少数值、时间和单位。请补全三条 Turtle 语句，让观测满足产品所需的六类语义信息；每条语句以句点结束。</p>' +
      '<textarea class="code-editor" id="rdf-editor" spellcheck="false" aria-label="编辑温度观测的 Turtle 示例">' + escapeHtml(savedDraft || lesson.initial) + '</textarea>' +
      '<div class="editor-caption"><span>RDF / Turtle · 可直接编辑</span><span>编辑内容自动保存</span></div>' +
      '<div class="check-list" id="rdf-checks">' + lesson.checks.map(function (check) {
        return '<div class="check-row"><span class="check-symbol">○</span><span>' + escapeHtml(check.label) + '</span></div>';
      }).join("") + '</div><div class="exercise-actions"><button class="small-primary" type="button" data-action="check-rdf">校验观测模型</button><button class="small-secondary" type="button" data-action="reset-rdf">恢复示例</button></div>';
  } else if (lesson.practiceType === "questions") {
    body = '<p class="prompt">每行写一个可由数据与模型验证的问题。补充到 10 条以上，覆盖至少 4 类主题，并确保每行确实是一个问题。</p>' +
      '<textarea class="code-editor editor-short" id="questions-editor" spellcheck="false" aria-label="编辑能力问题清单">' + escapeHtml(savedDraft || lesson.initial) + '</textarea>' +
      '<div class="editor-caption"><span>能力问题清单 · 每行一题</span><span>编辑内容自动保存</span></div>' +
      '<div class="exercise-actions"><button class="small-primary" type="button" data-action="check-questions">检查问题清单</button><button class="small-secondary" type="button" data-action="reset-questions">恢复起始问题</button></div>';
  } else if (lesson.practiceType === "graph") {
    const graphText = savedDraft || JSON.stringify(lesson.graph, null, 2);
    body = '<p class="prompt">关系有方向。起始图缺少最后两条边，请补上 Station_03 serves Building_08 和 Building_08 contains HeatUser_202。每条边还要填写 source、validTime 和 status: verified。</p>' +
      '<textarea class="code-editor" id="graph-editor" spellcheck="false" aria-label="编辑告警影响关系图">' + escapeHtml(graphText) + '</textarea>' +
      '<div class="editor-caption"><span>JSON 图数据 · nodes + edges</span><span>编辑内容自动保存</span></div>' +
      '<div class="exercise-actions"><button class="small-primary" type="button" data-action="trace-graph">追溯影响路径</button><button class="small-secondary" type="button" data-action="reset-graph">恢复样例图</button></div>' +
      '<div id="path-output"></div>';
  } else if (lesson.practiceType === "mapping") {
    body = '<p class="prompt">为每个源字段选择语义目标。完整映射后才能提交。</p><div class="mapping-list">' +
      lesson.mappings.map(function (mapping, index) {
        const value = state.drafts[draftKey + "-map-" + index] || "";
        return '<label class="mapping-row"><span class="mapping-source">' + escapeHtml(mapping.source) + '</span><span class="mapping-arrow" aria-hidden="true">→</span>' +
          '<select class="mapping-select" data-map="' + index + '" aria-label="为 ' + escapeHtml(mapping.source) + ' 选择语义目标"><option value="">选择语义目标</option>' +
          lesson.mappingOptions.map(function (option) { return '<option value="' + option.value + '"' + (value === option.value ? " selected" : "") + '>' + escapeHtml(option.label) + '</option>'; }).join("") +
          '</select></label>';
      }).join("") + '</div><div class="exercise-actions"><button class="small-primary" type="button" data-action="check-mapping">校验字段映射</button></div>';
  } else if (lesson.practiceType === "response") {
    const responseText = savedDraft || JSON.stringify(lesson.initial, null, 2);
    body = '<p class="prompt">起始 JSON 故意遗漏证据来源、时间、不确定项和动作约束。请补齐结构，让每项结论都能追溯，并明确不确定项及动作权限。</p>' +
      '<textarea class="code-editor" id="response-editor" spellcheck="false" aria-label="编辑带证据的 Agent JSON 结果">' + escapeHtml(responseText) + '</textarea>' +
      '<div class="editor-caption"><span>JSON · 结构化证据输出</span><span>编辑内容自动保存</span></div>' +
      '<div class="exercise-actions"><button class="small-primary" type="button" data-action="check-response">检查证据输出</button><button class="small-secondary" type="button" data-action="reset-response">恢复示例</button></div>';
  } else if (lesson.practiceType === "score") {
    const ratings = state.ratings || {};
    body = '<p class="prompt">按当前证据自评。所有维度达到 4 分，且证据与未知项处理达到门槛，才建议进入下一轮验证。</p><div class="score-grid">' +
      lesson.scoreItems.map(function (item) {
        const value = Number.isInteger(ratings[item.key]) ? ratings[item.key] : 3;
        return '<div class="score-row"><label for="score-' + item.key + '">' + escapeHtml(item.label) + '</label>' +
          '<input type="range" id="score-' + item.key + '" min="1" max="5" step="1" value="' + value + '" data-score="' + item.key + '">' +
          '<output for="score-' + item.key + '">' + value + '</output></div>';
      }).join("") + '</div><div class="score-summary"><span>当前平均分</span><strong id="score-average">3.0 / 5</strong></div>' +
      '<div class="exercise-actions"><button class="small-primary" type="button" data-action="check-score">提交评估</button></div>';
  }
  const typeName = {
    choice: ["✦", "判断练习"], classify: ["⌘", "概念分类"], rdf: ["&lt;/&gt;", "编码练习"],
    questions: ["≡", "问题设计"], graph: ["↗", "关系图实验"], mapping: ["⇄", "映射练习"],
    response: ["{ }", "结构化输出"], score: ["◎", "评估练习"]
  }[lesson.practiceType];
  return '<section class="practice-card" aria-labelledby="practice-title">' +
    makePracticeHeader(lesson, typeName[0], typeName[1]) +
    '<div class="practice-body"><h3 id="practice-title" class="sr-only">' + escapeHtml(lesson.practiceTitle) + '</h3>' +
    body + '<p id="exercise-feedback" class="feedback" role="status">' + escapeHtml((state.exercises["unit-" + id] || {}).message || "") + '</p></div></section>';
}

function renderAside(lesson) {
  lessonAside.innerHTML =
    '<section class="aside-card"><div class="aside-label"><span>◎</span> 本单元目标</div><ul class="objective-list">' +
    lesson.objectives.map(function (objective) { return '<li>' + escapeHtml(objective) + '</li>'; }).join("") +
    '</ul></section>' +
    '<section class="aside-card output-card"><div class="aside-label"><span>↗</span> 本章产出</div><p>' + escapeHtml(lesson.deliverable) + '</p></section>' +
    '<section class="aside-card tip-card"><div class="aside-label"><span>✳</span> 一句话带走</div><p><strong>' + escapeHtml(lesson.insight) + '</strong></p></section>';
}

function renderLesson() {
  appShell.classList.remove("home-mode");
  sidebar.hidden = false;
  workspace.classList.remove("home-workspace");
  lessonAside.hidden = false;
  breadcrumbCurrent.textContent = "供热产品实践路径";
  const lesson = currentLesson();
  const done = state.completed.includes(lesson.id);
  const exerciseDone = Boolean((state.exercises["unit-" + lesson.id] || {}).done);
  lessonContainer.innerHTML =
    '<div class="lesson-heading"><div><div class="chapter-overline"><span class="chapter-number">' + String(lesson.id).padStart(2, "0") + '</span>' +
    '<span>UNIT ' + String(lesson.id).padStart(2, "0") + ' · ' + escapeHtml(lesson.category) + '</span></div>' +
    '<h2>' + escapeHtml(lesson.title) + '</h2><p class="lesson-subtitle">' + escapeHtml(lesson.subtitle) + '</p></div>' +
    '<span class="unit-state' + (done ? " done" : "") + '"><i class="unit-state-dot"></i>' + (done ? "已完成" : "进行中") + '</span></div>' +
    '<div class="annotation-scope" data-annotation-scope="main">' +
    renderChapterIntro(lesson) +
    renderScenarioIntro(lesson) +
    renderStudyContent(lesson) + '</div>' +
    exerciseMarkup(lesson) +
    '<div class="annotation-scope" data-annotation-scope="lead">' + renderChapterLead(lesson) + '</div>' +
    '<div class="lesson-footer"><div class="deliverable"><strong>完成产出</strong>' + escapeHtml(lesson.deliverable) + '</div>' +
    '<div class="footer-actions"><button id="prev-unit" class="step-button" type="button"' + (lesson.id === 1 ? " disabled" : "") + '>← 上一单元</button>' +
    '<button id="complete-unit" class="complete-button' + (done ? " done" : "") + '" type="button"' + (!exerciseDone && !done ? " disabled" : "") + '><span class="complete-check">' + (done ? "✓" : "○") + '</span>' + (done ? "已完成本章" : "完成本章") + '</button>' +
    '<button id="next-unit" class="step-button" type="button"' + (lesson.id === lessons.length ? " disabled" : "") + '>下一单元 →</button></div></div>';
  renderAside(lesson);
  renderNav();
  updateScoreAverage();
  applyCommentMarks();
  updateCommentExportControl();
}

function renderHome() {
  appShell.classList.add("home-mode");
  sidebar.hidden = false;
  workspace.classList.add("home-workspace");
  lessonAside.hidden = true;
  breadcrumbCurrent.textContent = "学习首页";
  const doneCount = lessons.filter(function (lesson) { return state.completed.includes(lesson.id); }).length;
  const nextLesson = lessons.find(function (lesson) { return !state.completed.includes(lesson.id); }) || lessons[0];
  const startLabel = doneCount === 0 ? "开始学习" : doneCount === lessons.length ? "回顾课程" : "继续学习";
  const startNote = doneCount === 0
    ? "从第 01 单元开始，先把问题说清楚"
    : doneCount === lessons.length ? "八个单元已完成，随时可以回顾" : "下一步：第 " + String(nextLesson.id).padStart(2, "0") + " 单元 · " + nextLesson.title;

  lessonContainer.innerHTML =
    '<section class="home-view" aria-labelledby="home-title">' +
      '<div class="home-hero">' +
        '<div class="home-hero-copy">' +
          '<p class="home-eyebrow"><span></span> ENGINEERING ONTOLOGY · LEARNING WORKSHOP</p>' +
          '<h1 id="home-title">让供热问题，<br>沿着证据找到答案</h1>' +
          '<p class="home-intro">从“这条告警影响哪些用户？”开始，用八个循序渐进的单元，学习如何把对象、关系、数据与规则连成可验证的语义模型。</p>' +
          '<div class="home-actions"><button class="home-primary" type="button" data-home-start>' + startLabel + '<span aria-hidden="true">→</span></button><a class="home-secondary" href="#home-course-path">浏览八个单元 <span aria-hidden="true">↓</span></a></div>' +
          '<p class="home-start-note">' + escapeHtml(startNote) + '</p>' +
        '</div>' +
        '<div class="home-route" aria-label="贯穿课程的供热告警追溯案例：告警、测点、设备、换热站、热用户">' +
          '<div class="route-heading"><span class="route-pulse"></span><span>课程贯穿案例</span><span class="route-case">供热追溯</span></div>' +
          '<div class="route-steps">' +
            '<div class="route-step"><span class="route-step-index">01</span><span><small>告警</small><strong>Alarm_A17</strong></span><i>↘</i></div>' +
            '<div class="route-step"><span class="route-step-index">02</span><span><small>测点与设备</small><strong>关联运行证据</strong></span><i>↘</i></div>' +
            '<div class="route-step"><span class="route-step-index">03</span><span><small>供热关系</small><strong>追溯影响路径</strong></span><i>↘</i></div>' +
            '<div class="route-step route-step-final"><span class="route-step-index">04</span><span><small>影响范围</small><strong>定位相关热用户</strong></span><span class="route-check">✓</span></div>' +
          '</div>' +
          '<p class="route-footnote">每一步都保留关系路径、数据来源与时间依据</p>' +
        '</div>' +
      '</div>' +
      '<section class="home-course" id="home-course-path" aria-labelledby="home-course-title">' +
        '<div class="home-section-heading"><div><p class="home-section-kicker">YOUR LEARNING PATH</p><h2 id="home-course-title">八个单元，逐步把语义落到产品</h2><p>从概念和标准，到数据映射、Agent 应用与治理评估。</p></div></div>' +
        '<div class="home-unit-grid">' + lessons.map(function (lesson) {
          const done = state.completed.includes(lesson.id);
          return '<button class="home-unit' + (done ? " is-done" : "") + '" type="button" data-home-unit="' + lesson.id + '" aria-label="打开第 ' + lesson.id + ' 单元：' + escapeHtml(lesson.title) + '">' +
            '<span class="home-unit-top"><span>UNIT ' + String(lesson.id).padStart(2, "0") + '</span><span class="home-unit-status">' + (done ? "✓ 已完成" : escapeHtml(lesson.category)) + '</span></span>' +
            '<strong>' + escapeHtml(lesson.title) + '</strong><span class="home-unit-arrow" aria-hidden="true">↗</span></button>';
        }).join("") + '</div>' +
      '</section>' +
      '<div class="home-note"><span class="home-note-icon" aria-hidden="true">✳</span><p><strong>打开即学，进度留在本机。</strong> 课程、练习和批注可离线使用；学习记录会保存在当前浏览器中。</p></div>' +
    '</section>';
  renderNav();
  updateCommentExportControl();
}

function renderAll() {
  if (isHome) renderHome();
  else renderLesson();
}

function navigateTo(id, updateHash) {
  if (!lessons.some(function (lesson) { return lesson.id === id; })) return;
  closeAnnotationPopover();
  isHome = false;
  activeId = id;
  selectedChoice = null;
  if (updateHash) history.replaceState(null, "", "#unit-" + id);
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome(updateHash) {
  closeAnnotationPopover();
  isHome = true;
  if (updateHash) history.replaceState(null, "", "#home");
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2600);
}

function updateFeedback(message, kind) {
  const feedback = document.getElementById("exercise-feedback");
  if (!feedback) return;
  feedback.textContent = message;
  feedback.className = "feedback" + (kind ? " " + kind : "");
}

function setExerciseResult(passed, message) {
  const key = "unit-" + activeId;
  state.exercises[key] = { done: passed, message: message };
  if (!passed) state.completed = state.completed.filter(function (id) { return id !== activeId; });
  saveState();
  updateFeedback(message, passed ? "success" : "error");
  renderNav();
  updateUnitControls();
}

function updateUnitControls() {
  const lesson = currentLesson();
  const done = state.completed.includes(lesson.id);
  const exerciseDone = Boolean((state.exercises["unit-" + lesson.id] || {}).done);
  const button = document.getElementById("complete-unit");
  const status = document.querySelector(".unit-state");
  if (button) {
    button.disabled = !exerciseDone && !done;
    button.classList.toggle("done", done);
    button.innerHTML = '<span class="complete-check">' + (done ? "✓" : "○") + '</span>' + (done ? "已完成本章" : "完成本章");
  }
  if (status) {
    status.classList.toggle("done", done);
    status.innerHTML = '<i class="unit-state-dot"></i>' + (done ? "已完成" : "进行中");
  }
}

function noteDraftChange(key, value) {
  state.drafts[key] = value;
  state.exercises["unit-" + activeId] = { done: false, message: "内容已更新，请重新提交练习。" };
  state.completed = state.completed.filter(function (id) { return id !== activeId; });
  saveState();
  updateFeedback("内容已更新，请重新提交练习。", "");
  renderNav();
  updateUnitControls();
}

function checkChoice() {
  if (selectedChoice === null || selectedChoice < 0) {
    updateFeedback("先选择一个答案，再检查。", "error");
    return;
  }
  const lesson = currentLesson();
  const buttons = document.querySelectorAll("[data-choice]");
  buttons.forEach(function (button, index) {
    button.classList.remove("correct", "incorrect");
    if (index === lesson.answer) button.classList.add("correct");
    if (index === selectedChoice && selectedChoice !== lesson.answer) button.classList.add("incorrect");
  });
  const passed = selectedChoice === lesson.answer;
  setExerciseResult(passed, passed ? "正确。 " + lesson.explanation : "再想一想。 " + lesson.explanation);
}

function checkClassification() {
  const lesson = currentLesson();
  let score = 0;
  lesson.items.forEach(function (item, index) {
    const select = document.querySelector('[data-classify="' + index + '"]');
    if (select && select.value === item.answer) score++;
  });
  const passed = score === lesson.items.length;
  setExerciseResult(passed, "正确 " + score + " / " + lesson.items.length + "。 " + (passed ? lesson.explanation : "再检查类型、实例、状态、关系、观测与事件的区别。"));
}

function checkRdf() {
  const lesson = currentLesson();
  const text = document.getElementById("rdf-editor").value;
  const lines = text.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(function (line) { return line && !line.startsWith("#"); });
  const wellFormed = lines.length >= 6 && lines.every(function (line) { return line.endsWith(".") && line.split(/\s+/).length >= 4; });
  const checks = lesson.checks.map(function (check) {
    return { label: check.label, pass: lines.some(function (line) {
      return line.startsWith("ex:Observation_340 ") && line.includes(check.key) && line.endsWith(".");
    }) };
  });
  const checklist = document.getElementById("rdf-checks");
  checklist.innerHTML = checks.map(function (check) {
    return '<div class="check-row' + (check.pass ? " pass" : "") + '"><span class="check-symbol">' + (check.pass ? "✓" : "○") + '</span><span>' + escapeHtml(check.label) + '</span></div>';
  }).join("");
  const passed = wellFormed && checks.every(function (check) { return check.pass; });
  const message = passed
    ? "校验通过：六类观测语义都已表达。这里是教学用的简化 Turtle 检查器，不是完整语法解析器。 " + lesson.explanation
    : "尚未通过。请为同一观测补齐六类语义，每条语句以句点结束。这里使用教学用的简化检查器。 " + lesson.explanation;
  setExerciseResult(passed, message);
}

function checkQuestions() {
  const lesson = currentLesson();
  const text = document.getElementById("questions-editor").value;
  const questions = text.split(/\r?\n/).map(function (item) { return item.trim(); }).filter(Boolean);
  const topicGroups = [
    ["告警"], ["测点", "观测", "传感器"], ["设备", "阀门"], ["换热站", "站点"],
    ["楼宇", "热用户", "用户"], ["路径", "关系"], ["来源", "数据"], ["时间", "有效期"],
    ["未知", "缺失"], ["冲突", "质量"]
  ];
  const covered = topicGroups.filter(function (group) {
    return group.some(function (topic) { return text.includes(topic); });
  });
  const looksLikeQuestion = function (question) {
    return /[？?]$/.test(question) || /(谁|哪个|哪些|什么|是否|能否|何时|如何|为什么|在哪里|多少)/.test(question);
  };
  const uniqueCount = new Set(questions.map(function (question) { return question.replace(/[？?。！!\s]/g, "").toLowerCase(); })).size;
  const questionCount = questions.filter(looksLikeQuestion).length;
  const passed = questions.length >= 10 && uniqueCount >= 10 && covered.length >= 4 && questionCount === questions.length;
  const feedback = "当前 " + questions.length + " 行、" + uniqueCount + " 条不重复问题，覆盖 " + covered.length + " 类主题；识别为问题的有 " + questionCount + " 条。需要至少 10 条、4 类，且每行都是可检验问题。";
  setExerciseResult(passed, (passed ? "问题清单达到练习门槛。 " : feedback + " ") + lesson.explanation);
}

function traceGraph() {
  const lesson = currentLesson();
  let graph;
  try {
    graph = JSON.parse(document.getElementById("graph-editor").value);
  } catch (_) {
    document.getElementById("path-output").innerHTML = '<div class="hint-box">JSON 格式有误，请检查引号、逗号和括号。</div>';
    setExerciseResult(false, "图数据无法解析为 JSON。");
    return;
  }
  const nodes = Array.isArray(graph.nodes) ? graph.nodes : [];
  const edges = Array.isArray(graph.edges) ? graph.edges : [];
  const byId = new Map(nodes.map(function (node) { return [node.id, node]; }));
  const targetIds = new Set(nodes.filter(function (node) { return node.type === graph.targetType; }).map(function (node) { return node.id; }));
  const queue = [[graph.start, []]];
  const visited = new Set();
  let found = null;
  while (queue.length) {
    const current = queue.shift();
    const id = current[0];
    const path = current[1];
    if (visited.has(id)) continue;
    visited.add(id);
    if (targetIds.has(id)) {
      found = path.concat([{ id: id, relation: "", edge: null }]);
      break;
    }
    edges.filter(function (edge) { return edge.from === id; }).forEach(function (edge) {
      if (!visited.has(edge.to) && byId.has(edge.to)) {
        queue.push([edge.to, path.concat([{ id: id, relation: edge.relation, edge: edge }])]);
      }
    });
  }
  const result = document.getElementById("path-output");
  if (!found) {
    result.innerHTML = '<div class="hint-box">没有找到从 ' + escapeHtml(graph.start || "起点") + ' 到 ' + escapeHtml(graph.targetType || "目标类型") + ' 的有向路径。检查边的方向和节点 ID。</div>';
    setExerciseResult(false, "目前没有找到通向热用户的完整路径。关系必须有方向，节点 ID 必须一致。");
    return;
  }
  const flow = found.map(function (item, index) {
    let html = '<span class="path-node">' + escapeHtml(item.id) + '</span>';
    if (index < found.length - 1) html += '<span class="path-arrow">— ' + escapeHtml(item.relation) + ' →</span>';
    return html;
  }).join("");
  const pathEdges = found.slice(0, -1).map(function (item) { return item.edge; });
  const evidenceComplete = pathEdges.length > 0 && pathEdges.every(function (edge) {
    return edge && typeof edge.source === "string" && edge.source.trim() &&
      typeof edge.validTime === "string" && edge.validTime.trim() && edge.status === "verified";
  });
  const evidenceRows = pathEdges.map(function (edge) {
    return '<div class="path-evidence"><strong>' + escapeHtml(edge.relation) + '</strong><span>' +
      escapeHtml(edge.source || "缺少来源") + ' · ' + escapeHtml(edge.validTime || "缺少有效时间") + ' · ' +
      escapeHtml(edge.status || "未核实") + '</span></div>';
  }).join("");
  result.innerHTML = '<div class="path-result"><strong>找到 ' + pathEdges.length + ' 条有向关系 · ' + escapeHtml(byId.get(found[found.length - 1].id).type) + '</strong><div class="path-flow">' + flow + '</div>' +
    '<div class="path-evidence-list">' + evidenceRows + '</div></div>';
  const passed = found.length >= 7 && evidenceComplete;
  const reason = found.length < 7
    ? "路径尚未覆盖告警、观测、传感器、设备、站点、楼宇与热用户这条完整链路。"
    : !evidenceComplete ? "路径已连通，但每条边都需要来源、有效时间和 verified 核实状态。" : "完整路径与逐边证据均已通过检查。";
  setExerciseResult(passed, reason + " " + lesson.explanation);
}

function checkMapping() {
  const lesson = currentLesson();
  let correct = 0;
  lesson.mappings.forEach(function (mapping, index) {
    const select = document.querySelector('[data-map="' + index + '"]');
    if (select && select.value === mapping.answer) correct++;
  });
  const passed = correct === lesson.mappings.length;
  setExerciseResult(passed, "正确 " + correct + " / " + lesson.mappings.length + "。 " + (passed ? lesson.explanation : "检查字段值代表的是标识、关系、结果、时间还是质量。"));
}

function checkResponse() {
  const lesson = currentLesson();
  let data;
  try {
    data = JSON.parse(document.getElementById("response-editor").value);
  } catch (_) {
    setExerciseResult(false, "JSON 格式无法解析，请检查引号、逗号和括号。");
    return;
  }
  const hasAnswer = typeof data.answer === "string" && data.answer.trim().length >= 8;
  const hasEvidence = Array.isArray(data.evidence) && data.evidence.length > 0;
  const evidenceComplete = hasEvidence && data.evidence.every(function (evidence) {
    return evidence.from && evidence.relation && evidence.to && evidence.source && evidence.time;
  });
  const hasUncertainty = Array.isArray(data.uncertainty) && data.uncertainty.length > 0;
  const actionSafe = data.suggestedAction && typeof data.suggestedAction.type === "string" &&
    (data.suggestedAction.type === "read_only" || data.suggestedAction.requiresApproval === true);
  const passed = hasAnswer && hasEvidence && evidenceComplete && hasUncertainty && actionSafe;
  setExerciseResult(passed, (passed ? "结构检查通过。 " : "还需要答案、完整证据、来源与时间、不确定项，以及受约束的动作类型。 ") + lesson.explanation);
}

function scoreValues() {
  const lesson = currentLesson();
  return lesson.scoreItems.map(function (item) {
    return Number((state.ratings || {})[item.key] || 3);
  });
}

function updateScoreAverage() {
  if (currentLesson().practiceType !== "score") return;
  const values = scoreValues();
  const average = values.reduce(function (sum, value) { return sum + value; }, 0) / values.length;
  const output = document.getElementById("score-average");
  if (output) output.textContent = average.toFixed(1) + " / 5";
}

function checkScore() {
  const lesson = currentLesson();
  const ratings = state.ratings || {};
  const values = lesson.scoreItems.map(function (item) { return Number(ratings[item.key] || 3); });
  const average = values.reduce(function (sum, value) { return sum + value; }, 0) / values.length;
  const gates = Number(ratings.evidence || 3) >= 4 && Number(ratings.unknown || 3) >= 4;
  const passed = average >= 4 && gates;
  const note = passed
    ? "自评达到建议门槛。请继续用真实样例和能力问题集复核。"
    : "平均分 " + average.toFixed(1) + "；需达到 4.0，且“证据路径可追溯”和“未知项处理”均不低于 4 分。";
  setExerciseResult(passed, note);
}

function checkExercise(action) {
  if (action === "check-choice") checkChoice();
  if (action === "check-classify") checkClassification();
  if (action === "check-rdf") checkRdf();
  if (action === "check-questions") checkQuestions();
  if (action === "trace-graph") traceGraph();
  if (action === "check-mapping") checkMapping();
  if (action === "check-response") checkResponse();
  if (action === "check-score") checkScore();
}

lessonContainer.addEventListener("click", function (event) {
  const homeStart = event.target.closest("[data-home-start]");
  if (homeStart) {
    navigateTo(firstIncompleteId(), true);
    return;
  }
  const homeUnit = event.target.closest("[data-home-unit]");
  if (homeUnit) {
    navigateTo(Number(homeUnit.dataset.homeUnit), true);
    return;
  }
  const annotation = event.target.closest("[data-comment-id]");
  if (annotation) {
    const comment = comments.find(function (item) { return item.id === annotation.dataset.commentId; });
    if (comment) openComment(comment, annotation.getBoundingClientRect());
    return;
  }
  const choice = event.target.closest("[data-choice]");
  if (choice) {
    selectedChoice = Number(choice.dataset.choice);
    state.drafts["unit-" + activeId + "-choice"] = selectedChoice;
    invalidateExercise();
    document.querySelectorAll("[data-choice]").forEach(function (button) { button.classList.toggle("selected", button === choice); });
    return;
  }
  const action = event.target.closest("[data-action]");
  if (action) {
    const name = action.dataset.action;
    if (name.indexOf("reset-") === 0) {
      const lesson = currentLesson();
      if (name === "reset-rdf") state.drafts["unit-" + activeId] = lesson.initial;
      if (name === "reset-questions") state.drafts["unit-" + activeId] = lesson.initial;
      if (name === "reset-graph") state.drafts["unit-" + activeId] = JSON.stringify(lesson.graph, null, 2);
      if (name === "reset-response") state.drafts["unit-" + activeId] = JSON.stringify(lesson.initial, null, 2);
      state.exercises["unit-" + activeId] = { done: false, message: "" };
      state.completed = state.completed.filter(function (id) { return id !== activeId; });
      saveState();
      renderLesson();
      showToast("已恢复本章起始内容。");
      return;
    }
    checkExercise(name);
    return;
  }
  if (event.target.id === "complete-unit") {
    const lesson = currentLesson();
    const exerciseDone = Boolean((state.exercises["unit-" + lesson.id] || {}).done);
    if (!exerciseDone) {
      showToast("先通过本章练习，再标记完成。");
      return;
    }
    if (!state.completed.includes(lesson.id)) state.completed.push(lesson.id);
    saveState();
    renderLesson();
    showToast("第 " + lesson.id + " 单元已完成。");
    return;
  }
  if (event.target.id === "prev-unit" && activeId > 1) {
    navigateTo(activeId - 1, true);
    return;
  }
  if (event.target.id === "next-unit" && activeId < lessons.length) navigateTo(activeId + 1, true);
});

lessonContainer.addEventListener("mouseup", handleTextSelection);
lessonContainer.addEventListener("touchend", handleTextSelection, { passive: true });
lessonContainer.addEventListener("keydown", function (event) {
  const annotation = event.target.closest && event.target.closest("[data-comment-id]");
  if (annotation && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    const comment = comments.find(function (item) { return item.id === annotation.dataset.commentId; });
    if (comment) openComment(comment, annotation.getBoundingClientRect());
  }
});

document.getElementById("annotation-popover").addEventListener("click", function (event) {
  const button = event.target.closest("[data-comment-action]");
  if (!button) return;
  const action = button.dataset.commentAction;
  if (action === "close") closeAnnotationPopover();
  if (action === "compose") openCommentEditor(null);
  if (action === "edit") {
    const comment = comments.find(function (item) { return item.id === activeCommentId; });
    if (comment) openCommentEditor(comment);
  }
  if (action === "save") saveCurrentComment();
  if (action === "cancel-editor") {
    const comment = comments.find(function (item) { return item.id === activeCommentId; });
    if (comment) openComment(comment, popoverAnchor);
    else closeAnnotationPopover();
  }
  if (action === "delete") {
    const previousComments = comments;
    comments = comments.filter(function (item) { return item.id !== activeCommentId; });
    if (saveComments()) {
      closeAnnotationPopover();
      applyCommentMarks();
      showToast("批注已删除。");
    } else {
      comments = previousComments;
      updateCommentExportControl();
    }
  }
});

document.addEventListener("pointerdown", function (event) {
  const popover = document.getElementById("annotation-popover");
  if (!popover.hidden && !popover.contains(event.target) && !event.target.closest("[data-comment-id]")) closeAnnotationPopover();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeAnnotationPopover();
});
window.addEventListener("scroll", function () {
  if (!document.getElementById("annotation-popover").hidden) closeAnnotationPopover();
}, { passive: true });

lessonContainer.addEventListener("input", function (event) {
  const lesson = currentLesson();
  if (event.target.matches("textarea")) {
    noteDraftChange("unit-" + activeId, event.target.value);
  }
  if (event.target.matches("[data-score]")) {
    const key = event.target.dataset.score;
    state.ratings[key] = Number(event.target.value);
    const output = document.querySelector('output[for="' + event.target.id + '"]');
    if (output) output.textContent = event.target.value;
    saveState();
    state.exercises["unit-" + activeId] = { done: false, message: "评分已更新，请重新提交评估。" };
    state.completed = state.completed.filter(function (id) { return id !== activeId; });
    saveState();
    updateFeedback("评分已更新，请重新提交评估。", "");
    updateScoreAverage();
    updateUnitControls();
  }
  if (lesson.practiceType === "score" && event.target.matches("[data-score]")) renderNav();
});

lessonContainer.addEventListener("change", function (event) {
  if (event.target.matches("[data-classify]")) {
    state.drafts["unit-" + activeId + "-class-" + event.target.dataset.classify] = event.target.value;
    invalidateExercise();
  }
  if (event.target.matches("[data-map]")) {
    state.drafts["unit-" + activeId + "-map-" + event.target.dataset.map] = event.target.value;
    invalidateExercise();
  }
});

function invalidateExercise() {
  state.exercises["unit-" + activeId] = { done: false, message: "选择已更新，请重新提交练习。" };
  state.completed = state.completed.filter(function (id) { return id !== activeId; });
  saveState();
  updateFeedback("选择已更新，请重新提交练习。", "");
  renderNav();
  updateUnitControls();
}

nav.addEventListener("click", function (event) {
  const button = event.target.closest("[data-nav]");
  if (button) navigateTo(Number(button.dataset.nav), true);
});

document.getElementById("export-comments").addEventListener("click", exportComments);

document.getElementById("reset-progress").addEventListener("click", function () {
  if (!window.confirm("确定清除本机保存的章节进度、练习草稿和评分吗？课程批注会保留。")) return;
  const wasHome = isHome;
  state = emptyState();
  saveState();
  if (wasHome) renderAll();
  else navigateTo(1, true);
  showToast("学习记录已清除。");
});

document.querySelector(".brand").addEventListener("click", function (event) {
  event.preventDefault();
  showHome(true);
});

window.addEventListener("hashchange", function () {
  if (window.location.hash === "#home") {
    if (!isHome) showHome(false);
    return;
  }
  const id = readHashId();
  if (id && (id !== activeId || isHome)) navigateTo(id, false);
  else if (!window.location.hash && !isHome) showHome(false);
});

renderAll();
