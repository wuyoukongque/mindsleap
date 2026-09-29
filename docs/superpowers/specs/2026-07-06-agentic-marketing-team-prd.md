# Agentic Marketing Team PRD

- 日期:2026-07-06
- 状态:Draft v2,待 Lincoln 确认后进入实施
- 前身:`2026-07-05-mindsleap-growth-cmo-os-design.md`(Codex 版设计,本文替代它作为实施依据)
- 已确认决策:平台无关双端可用,**现阶段以 Claude Code 为总控端** / 首切片 = 完整月度 Campaign(2026-08 月底深圳"AI 数字员工实战营 + 具身智能企业参访",日期待定)/ 迭代权限 L1+L2 自动、L3 提议制 / **MindsLeap 无专职 marketing staff:本系统即营销团队本身,Lincoln 为唯一人类判官** / 主目录 `cmo/` / **未来通信层接入飞书**(v1.5 通知 → v2 机器人,见 §16)

---

## 1. 一句话定义

建一支文件驱动的 Agentic Marketing Team:Lincoln 只与 **CMO Agent** 对话,说清目标和要求;CMO Agent 负责把目标翻译成任务,调度散落在各项目里的营销能力(官网、短视频、新闻、deck、分发……),质检产出,回收结果,并把每一次人类反馈沉淀为可复利的私有资产(Private Eval)。

**定位:系统即团队。** MindsLeap 当前没有专职 marketing staff——本系统不是营销团队的辅助工具,而是营销职能(marketing / branding / growth)本身。Lincoln 是唯一的人类战略输入者与终审判官;一切可机械化的环节都应尽早自动化,因为不存在"交给同事"这个兜底选项。

## 2. 为什么做(与 Codex 版的差异)

Codex 版把重心放在增长战略与月度 campaign 流程;本版把重心调整为**编排层 + 资产层**:

1. **编排层**:CMO 不吞并任何现有项目,通过 Registry + 文件总线调度它们。已有的 newsroom、短视频系统、GEO 方案、course-production skill 全部复用,不重写。
2. **资产层**:人类反馈不是"改改 skill"就完了。反馈首先冻结为 **Eval case**(源头资产),skill/标准文档是从 Eval 派生的编译产物。这是本系统区别于"一堆 prompt"的护城河。
3. 增长战略(offer 阶梯、目标客户、北极星)保留为 CMO 干活时读取的**上下文文档**,不再是系统本体。

### 2.1 复用清单(已有资产 → 在本系统中的角色)

| 已有资产 | 路径 | 在新系统中的角色 |
|---|---|---|
| newsroom 队列 + handoff 协议 | `newsroom/`(`handoff_spec.md`) | 文件总线的原型;news 能力直接挂接现有 `ready/` 队列 |
| 短视频生产系统 | `production/short-video-production-share/` | Registry 中第一个 `async_inbox` 重能力 |
| GEO 执行方案 | `website/GEO_EXECUTION_PLAN.md` | Brand OS 的品牌描述、实体关系、渠道策略直接引用它,不重写 |
| course-production skill | `skills/shared-skills/mindsleap-course-production/` | skill 结构范式("锁标准→按标准产出→QA→交付→规模化");其 deck 生产经验供 deck 能力复用 |
| 官网 + zhihu 分发 | `website/` | website / distribution 能力的落点 |
| **MindsLeap Design System** | 线上 `https://www.mindsleap.ai/design-system`;源码 `wuyoukongque/mindsleap.git` 内 `site/public/design-system/`;**已是 agent-readable skill(`mindsleap-design`)**,含色彩/字体 token、logo、图标、官网 UI kit、参数化 deck 模板 | 品牌视觉的唯一真相源;所有产出视觉物的能力必须加载它;未来成长为品牌资产管理系统(见 §7.6) |

复用但不受限:以上资产按 Registry 合约接入;不满足合约处(如缺 inbox/result 目录)做**增量补齐**,不做重写。

## 3. 目标与指标

### 3.1 北极星(季度结果指标,滞后)

```text
Qualified AI FDE Pipeline Value(合格 FDE 管道价值,RMB)
```

### 3.2 月度领先指标(campaign 优化的对象)

- 合格企业家报名数(1999 活动,带渠道标签)
- 约成的 39800 / FDE 诊断对话数
- 渠道级线索质量(按 lead_snapshot 记录)

**规则:月度循环只对领先指标优化;北极星用于季度校准,不用于月内决策。** 增长阶梯(短视频/文章/直播/转介 → 1999 → 9800 → 39800 → FDE)与目标客户定义沿用 Codex 版 §2–§3,收录于 `growth-os/`。

### 3.3 系统级指标(衡量这套系统本身)

- 一次 campaign 中 Lincoln 亲自动手的环节数(应逐月下降)
- Eval case 累积数量与覆盖维度
- 子能力产出一次通过 QA 的比例(应逐月上升)

## 4. 使用者与人类闸门

| 角色 | 权限 |
|---|---|
| Lincoln | 唯一营销决策者与人类判官:战略输入、QA 终审、eval 标注、L3 proposal 审批、FDE 跟进;v1 期兼任 async 通道中继(跑重系统、每周线索录入) |
| AI agents(本系统) | 承担全部 marketing / branding / growth 执行职能 |
| 同事(非营销,可选) | 仅机械操作(如视频渲染的 pull-run-push);不做营销判断;不改 brand-os / evals / registry |

无 marketing staff 的直接推论:**自动化优先级高于一般系统**——执行力阶段 2(定时)、v1.5 飞书通知、v2 bot 表单,都是在替代"不存在的同事",不是锦上添花(见 §15 风险表、§16)。

**三条硬性人类闸门(任何 agent 无权自我放行):**

1. **事实与风险**:数据、案例、对外承诺,发布前必须人审。
2. **品牌**:新的对外表述(品牌描述、offer 说法)变更必须人审。
3. **FDE/高价值线索**:pipeline 判断与跟进动作必须人拍板。

## 5. 总体架构

```text
┌────────────────────────────────────────────────────────────┐
│ Lincoln ──目标/要求──▶ CMO Agent(无状态大脑,5 种模式)      │
└────────────────────────────────────────────────────────────┘
          │读                          │读/写
          ▼                            ▼
┌──────────────────┐   ┌──────────────────────────────────────┐
│ 上下文层          │   │ 资产层(会复利)                       │
│ brand-os/        │   │ evals/(Private Eval,四路反哺)        │
│ growth-os/       │   │ registry/(能力地图)                  │
└──────────────────┘   └──────────────────────────────────────┘
          │派任务/收结果(文件总线:task / result / index)
          ▼
┌────────────────────────────────────────────────────────────┐
│ 能力层(现有项目原地不动,经 inbox/result 挂接)               │
│ newsroom  short-video  website  deck  distribution  leads   │
└────────────────────────────────────────────────────────────┘
```

核心原则:

- **文件即真相**:CMO 是无状态的;连续性活在 task/result/index/evals 文件里,不活在对话上下文里。
- **不吞并**:现有项目保留自己的 git、脚本、目录;CMO 只经合约文件调用。
- **平台无关**:协议全部是纯文件(JSON/Markdown)。Codex 与 Claude Code 各有一份薄入口 skill,读同一套协议文件。任何一端能驱动全系统。

## 6. 核心机制:调度与反馈协议

### 6.1 三条调用通道

| 通道 | 触发方式 | 反馈路径 | 适用 |
|---|---|---|---|
| ① `sub_agent`(同步) | CMO 同轮 spawn 子 agent | 同轮返回 + 落盘 result | 新闻初稿、deck 文案、GEO metadata、落地页文案 |
| ② `async_inbox`(异步) | CMO 写 task 到目标项目 `inbox/` | 系统跑完写 result,CMO 下次唤醒对账读取 | 短视频系统等重能力 |
| ③ `scheduled`(定时) | 定时任务扫 inbox 自动执行 | 同 ② | ② 的自动化,v1 后期再开 |

②的执行拉动方式:v1 期以"CMO 备好任务 → 同事/Lincoln 去目标系统跑一次"为主(人肉中继),跑顺后升级为 ③。

### 6.2 Task Manifest(CMO → 子能力)

```jsonc
{
  "manifest_version": "cmo_task/v1",
  "task_id": "2026-08-short-video-preheat",     // 全局唯一,兼作幂等键
  "parent": "campaigns/2026-08-sz-bootcamp",
  "capability": "short_video",                   // 指向 registry 条目
  "invocation": "async_inbox",
  "status": "queued",
  "objective": "为8月底深圳AI数字员工实战营做预热短视频,驱动合格报名",
  "inputs": {                                    // 只给路径,不塞正文
    "brand_os": "cmo/brand-os/",
    "campaign": "cmo/campaigns/2026-08-sz-bootcamp/campaign_manifest.json"
  },
  "deliverables": [{ "type": "short_video_script", "count": 12 }],
  "quality_gates": ["single_core_judgment", "owner_relevance", "clear_event_cta", "fact_safety"],
  "constraints": { "deadline": "2026-08-05", "audience": "traditional_business_owner" },
  "output_dir": "cmo/campaigns/2026-08-sz-bootcamp/outputs/short_video/",
  "result_manifest": "cmo/campaigns/2026-08-sz-bootcamp/outputs/short_video/result_manifest.json"
}
```

### 6.3 Result Manifest(子能力 → CMO)

```jsonc
{
  "manifest_version": "cmo_result/v1",
  "task_id": "2026-08-short-video-preheat",      // 回声对账
  "capability": "short_video",
  "status": "needs_human_review",                 // completed | needs_human_review | needs_revision | blocked
  "completed_at": "2026-08-03T18:30:00+08:00",
  "agent": "short-video-system",
  "outputs": [{ "type": "script_pack", "path": "outputs/short_video/scripts.md" }],
  "self_review": {                                // 第一层 QA(自检)
    "brand_voice": "pass",
    "owner_relevance": "pass",
    "fact_safety": "flag"                         // 事实类只能 flag,不能自我放行
  },
  "known_risks": ["第7条脚本引用行业数据,发布前需核实"],
  "missing_inputs": [],
  "next_action": "CMO 复核事实项"
}
```

### 6.4 Index(CMO 的账本)

每个 campaign 根下 `index.json`,是 CMO 的唯一真相表:

```jsonc
{
  "manifest_version": "cmo_index/v1",
  "campaign_id": "2026-08-sz-bootcamp",
  "tasks": [
    { "task_id": "...", "capability": "short_video", "invocation": "async_inbox",
      "state": "running", "dispatched_at": "...", "result_manifest": "outputs/short_video/result_manifest.json" }
  ]
}
```

**对账循环(CMO 每次被唤醒的第一个动作):**

```text
git pull                                   # 先同步:多人经 git 中继,对账前必须拉取最新 result
for task in index.tasks:
    if result_manifest 存在 → 读取,按 status 更新 state,归类(完成/待人审/需返工/阻塞)
    else → 仍在 queued/running;超过 stale_after(默认72h)标记"疑似卡住"
→ 向用户汇报差异 + 本轮建议动作
```

### 6.5 状态机与工程规则

```text
queued → dispatched → running → {completed | needs_human_review | failed/blocked}
completed/needs_human_review → CMO 六维复核 → {approved | approved_with_edits | needs_revision}
needs_revision → CMO 写 revision task(task_id-r2,retry_of 指回原任务)→ 回到 queued
```

- **幂等**:`result_manifest` 存在即视为已完成,重启后不重跑。
- **原子写**:result 先写 `.tmp` 再 rename。
- **重试有界**:同一任务最多 2 轮 revision,超限上报 Lincoln。
- **两套状态不混用**:自检状态(completed/needs_human_review/needs_revision/blocked)vs CMO 复核状态(approved/approved_with_edits/needs_revision/blocked)。

### 6.6 QA 六维(CMO 复核维度,同时是 eval 的维度轴)

1. Brand(符合 Brand OS 与设计系统)
2. Growth(推动用户进入下一 offer 阶段)
3. Customer(打动传统企业主/成长期 CEO,而非 AI 爱好者)
4. Fact & Risk(无夸大、无不实数据、无风险表述)——人类闸门
5. Channel(符合目标平台形态)
6. Pipeline(有助识别 39800/FDE 高价值机会)

## 7. 资产层:Private Eval(本系统的护城河)

### 7.1 原则

**反馈分叉,只有 Eval 是资产:**

```text
Lincoln 的一条 QA 反馈
 ├─ ① 修当前产出(用完即弃)
 ├─ ② 更新 policy:skill/标准文档(编译产物,可替换)
 └─ ③ 冻结为 eval case(源头资产,永不过时)   ← 必须发生
```

**Eval 是源代码,skill 是编译产物。** 换模型、换 skill、换运行时,Eval 不丢。

### 7.2 捕获机制:复核即捕获

Lincoln 在 QA gate 下判决(approved / needs_revision + 一句理由)的那一刻,CMO **顺手**把判决写成一条结构化 eval case。不设独立标注环节——人只照常审稿,资产在背后自动累积。`quality_review.md` 中每条判断必须对应一条 eval case。

### 7.3 Eval Case 格式

```jsonc
// cmo/evals/short_video/owner_relevance/case-0007.json
{
  "manifest_version": "cmo_eval/v1",
  "eval_id": "sv-owner-0007",
  "dimension": "owner_relevance",       // 绑定 QA 六维
  "capability": "short_video",
  "input": { "topic": "AI催收", "audience": "traditional_business_owner" },
  "candidate": "被评产出原文或路径",
  "verdict": "fail",                     // pass | fail | partial
  "reason": "开头讲模型能力,老板不关心;应从'货款催收'这类经营痛点切入",
  "rubric_delta": "钩子必须落在老板当下的经营痛点,不能从AI能力讲起",
  "labeled_by": "lincoln",
  "labeled_at": "2026-08-04",
  "source_task": "2026-08-short-video-preheat"
}
```

目录:`cmo/evals/<capability>/<dimension>/{case-*.json, RUBRIC.md, good/, bad/}`。`RUBRIC.md` 由 case 累积长出;`good/` 存满分范例。

### 7.4 四路反哺

1. **回归测试**:换模型/改 skill/批准 L3 proposal 前,跑相关 eval 集,不掉分才放行。
2. **判官校准**:CMO 六维 QA 用真实标注打分,越用越准。
3. **Few-shot 注入**:`good/` 范例注入子能力 skill(policy 从 eval 派生,方向不可逆)。
4. **规格书**:新能力入驻、新同事上手,读 eval 即知"什么叫好"。

### 7.5 两层校准(proxy vs ground truth)

- **Proxy(快)**:Lincoln 的品味判决,当天可得。
- **Ground truth(慢)**:市场真值——该内容实际带来的合格报名/诊断对话/FDE 意向(来自 `lead_snapshot.json` / `channel_metrics.json`)。
- **季度校准仪式**:回看"判为好的产出,实际转化是否更高";偏差处修正 RUBRIC。

### 7.6 品牌资产沉淀:Design System → 品牌资产管理系统

资产层有两种会复利的资产:Eval(判断资产,"什么叫好")与**品牌资产**(表达资产,"好的长什么样")。后者的载体是 MindsLeap Design System:

- **现状**:已上线 `https://www.mindsleap.ai/design-system`;源码在官网仓库 `wuyoukongque/mindsleap.git` 的 `site/public/design-system/`;**已是 user-invocable 的 agent skill(`mindsleap-design`)**——brand context、色彩/字体 token(单一品牌色 `#1e477c`)、logo(含 Founders Space 联合标)、图标、官网 UI kit、`deck-template/`(1920×1080,主题/logo/字体/密度参数化)、中英双语规范。
- **v1 用法(只引用,不改造)**:
  - `brand-os/design_system_sources.json` 记录 canonical:仓库、路径、线上 URL、本地工作副本位置。
  - **凡产出视觉物的能力(website、deck、短视频封面、活动物料)必须加载 `mindsleap-design` skill**;QA 六维中 Brand 维以它为判据。
  - Brand OS 由此拆成两半:**语言资产**(品牌描述/实体关系/GEO 关键词,源 = `GEO_EXECUTION_PLAN.md`)+ **视觉资产**(token/组件/模板,源 = design system)。brand-os 目录只做增量与指针,不复制两个源。
- **成长路径(v2+,已确认方向:品牌资产管理系统)**:
  1. **资产回流**:campaign 产出的合格视觉物(封面、deck、落地页组件、活动物料模板)经 QA 后登记回 design system,而不是散落在各 campaign outputs 里用完即弃;
  2. **与 eval 互链**:`evals/*/good/` 的满分范例与品牌资产互相引用,"什么是好的品牌表达"同时有判据和实例;
  3. **管理系统化**:资产库 + 使用规范 + 检索/看板,对内供 agents 与新人调用,对外可成为客户可见的品牌专业度展示。
- **注意**:本地存在两个工作副本(`/Users/lincoln/Claude-workspace/mindsleap-website/` 与 `/Users/lincoln/AI projects/mindsleap/`,同一 remote)——`design_system_sources.json` 必须指定唯一 canonical 工作副本,避免双写漂移(见 §17)。

### 7.7 归因纪律(ground truth 的采集,v1 一等交付物)

- 每个报名必须带渠道标签(短视频/文章/直播/转介/官网,渠道专属报名码或表单字段)。
- 每周一次、约 15 分钟的线索录入仪式(同事可执行),更新 `lead_snapshot.json`。
- campaign 结束时 CMO 汇总 `channel_metrics.json` 并写回顾。
- 没有这条纪律,评估闭环失效——视为系统级故障而非"数据暂缺"。

## 8. Agent Registry

`cmo/registry/agents.json`,每条能力一条记录:

```jsonc
{
  "id": "short_video",
  "status": "active",                    // active | stub | building
  "home": "production/short-video-production-share/",
  "capabilities": ["选题", "脚本", "字幕QA", "横竖版渲染", "平台文案"],
  "invocation": "async_inbox",
  "inbox": "production/short-video-production-share/inbox/",
  "required_inputs": ["brand_os", "campaign_manifest", "audience"],
  "deliverable_types": ["short_video_script", "platform_copy", "rendered_video"],
  "quality_gates": ["single_core_judgment", "owner_relevance", "fact_safety"],
  "operator": "lincoln",              // 无 marketing staff;待通道③定时化后移除人肉环节
  "eval_dir": "cmo/evals/short_video/"
}
```

### 8.1 初始条目

| id | status | invocation | 备注 |
|---|---|---|---|
| `news` | active | async_inbox | 挂接现有 `newsroom/`,协议已跑通 |
| `short_video` | active | async_inbox | 现有系统 + 补 `inbox/` 目录 |
| `website` | active | sub_agent | 落地页、SEO/GEO metadata、表单需求;落点 = 官网仓库 `mindsleap.git`;视觉必须加载 `mindsleap-design` skill |
| `distribution` | active | sub_agent | 渠道文案与发布计划(参照 GEO 方案渠道策略;zhihu-temp-publish 复用) |
| `deck` | building | sub_agent | 基础已具备:design-system `deck-template/`(1920×1080 参数化模板)+ `mindsleap-design` skill + course-production deck 经验;campaign 中边用边定型 |
| `livestream` | stub | sub_agent | 直播主题/流程/切片计划,v1 视 campaign 需要激活 |
| `lead_review` | active | sub_agent | 线索评分、pipeline 快照、跟进建议(读 lead_snapshot) |

注:`brand_review` 不设独立 agent,品牌一致性由 CMO 六维 QA 的 Brand 维承担 + 人类闸门。

## 9. CMO Agent 行为

五种模式(沿用 Codex 版 §11,按本版机制修订):

1. **Strategy**:给方向选项 + 推荐(campaign 主题、客户契合、39800/FDE 转化潜力)。
2. **Campaign Builder**:建 campaign 工作区 + campaign_manifest + 各 task manifest + index + QA 计划。
3. **Task Router**:选能力、派任务(按 6.2 写 task 文件)、登记 index。
4. **Review**:对账 → 六维复核 → 生成审核稿供 Lincoln 拍板 → **同步产出 eval case** → 需要时写 revision task。**CMO 准备判决,Lincoln 下判决**——CMO 无权对三条人类闸门自我放行。
5. **Retrospective**:渠道/线索/管道复盘,更新 growth-os 与 brand-os(L2),生成 L3 proposal(如需),推荐下月主题。

### 9.1 迭代权限(已确认)

| 级别 | 内容 | 权限 |
|---|---|---|
| L1 | 编排:派活、收活、对账、复核准备 | 自动 |
| L2 | 更新标准文档:growth-os、brand-os、RUBRIC.md、offer playbook | 自动(变更记录留痕;涉及对外品牌表述的变更仍过人类闸门) |
| L3 | 修改子 agent 的 SKILL.md / prompt 本体 | **提议制**:CMO 生成 diff 写入 `cmo/proposals/`,附动机与预期影响;Lincoln 批准 + 相关 eval 回归通过后才落地;全部版本化 |

## 10. 目录结构

```text
mindsleap/
  cmo/                                   # Agentic Marketing Team 主目录(新增,唯一新顶层目录)
    README.md                            # 人类可读:系统是什么、同事怎么参与(clone→pull-run-push 三步接入)
    CMO_AGENT.md                         # CMO 行为规范(平台无关的核心指令)
    machine.local.json                   # 本机根路径映射(如 videoeditting 仓库位置),不入库,.gitignore
    entrypoints/
      codex/SKILL.md                     # Codex 薄入口:加载 CMO_AGENT.md + 协议
      claude/SKILL.md                    # Claude Code 薄入口:同上
    protocol/
      handoff_spec.md                    # 本文 §6 的协议正文(newsroom spec 的推广版)
      templates/                         # task / result / index / eval / campaign 模板
    registry/
      agents.json
    brand-os/
      README.md                          # 双源指针:语言资产→GEO_EXECUTION_PLAN.md;视觉资产→design system
      design_system_sources.json         # canonical:仓库/路径/线上URL/唯一本地工作副本
      voice_and_messaging.md             # 增量:语气、禁用表述、风险红线
      offers.md                          # 1999/9800/39800/FDE 的标准说法
    growth-os/
      growth_ladder.md
      metrics.md                         # 含 §3 的领先/滞后指标拆分
      target_customers.md
      offer_playbooks/                   # 1999 / 9800 / 39800 / fde
    evals/
      <capability>/<dimension>/          # case-*.json, RUBRIC.md, good/, bad/
    proposals/                           # L3 提议(diff + 动机),待批
    campaigns/
      2026-08-sz-bootcamp/
        campaign_manifest.json
        strategy.md
        index.json
        tasks/                           # 各 task manifest(sub_agent 型)
        outputs/<capability>/            # 产出 + result_manifest.json
        leads/lead_snapshot.json
        performance/channel_metrics.json
        review/quality_review.md
        review/retrospective.md
  newsroom/                              # 原样保留;news 能力挂接
  production/short-video-production-share/
    inbox/                               # 增量补齐:接收 cmo task
  website/                               # 原样保留
```

命名说明:主目录定名 `cmo/`(已确认,2026-07-06)。协议内路径全部相对引用。

## 11. 运行时策略(平台无关,Claude Code 总控)

- **协议即产品**:task/result/index/eval/registry 全是纯 JSON/Markdown,不依赖任何运行时特性。
- **当前总控端 = Claude Code**(已确认):日常唤醒 CMO、派活、对账、QA 复核均在 Claude Code 进行,可用其 subagent/后台/定时能力实现通道①③。
- **双薄入口**:`entrypoints/claude/SKILL.md`(主)与 `entrypoints/codex/SKILL.md`(备)各 ≤1 页,只做三件事:声明触发条件、加载 `CMO_AGENT.md` 与 `protocol/handoff_spec.md`、说明本端的 spawn/定时能力映射。所有实质规则只写在 `CMO_AGENT.md` 一处,避免双端漂移。Codex 入口保留,保证随时可切换/并行。
- **端差异允许存在**:协议不感知端差异;换端不改任何协议文件。

## 12. V1 范围与里程碑

首切片 = **2026 年 8 月底深圳"AI 数字员工实战营 + 具身智能企业参访"完整 campaign**(已确认)。活动形式对标已办过的上海 AI 数字员工实战营,叠加深圳本地具身智能企业参访;深圳制造业/供应链企业主与目标客户画像(§3)高度契合。

- **日期锚点**:活动日期未定,工作假设 **2026-08-29(周六)**;确定后第一时间写入 `campaign_manifest.json`,全部 T-n 自动重排。按工作假设,T-21 = 8/08,正式预热 8 月上旬启动——比原设想多出约两周缓冲,用于 M0–M2 打稳协议和提前产出内容库存。

内部分四个里程碑降险,每周有可验收物:

### M0:骨架(7/07–7/12)

- **建 `marketing-os` 私有 git 仓库**(纳入 `cmo/` + `newsroom/` + `website/` 文档;`.gitignore` 排除嵌套仓库/大文件/venv),推 GitHub——evals 从第一天起有版本与备份
- `cmo/` 目录 + 协议正文 + 全部模板 + registry(7 条目)+ 双入口 skill
- brand-os / growth-os 初版(brand 描述指向 GEO 方案,不重写)
- 短视频系统补 `inbox/` 目录并推远端(已有 remote)
- **验收**:CMO 能被唤醒、读 registry、建一个演练 campaign 并派出一个演练 task(全链路 dry run);仓库可被第二台机器 clone 后完成同一 dry run

### M1:同步能力跑通(7/13–7/19)

- campaign 正式启动:campaign_manifest + strategy + index
- `news`、`website`、`distribution`、`deck` 四个 sub_agent 型任务派发并产出首稿
- 首轮 QA 复核 → **产生第一批 eval case**
- **验收**:≥1 个任务走完 queued→approved 全状态机;`evals/` 非空

### M2:异步能力跑通(7/20–7/31)

- `short_video` 任务经 async_inbox 派发;Lincoln(或可用的非营销同事)运行短视频系统,写回 result
- CMO 对账演示:换一次会话后仅凭磁盘重建全貌
- 报名渠道标签机制上线(归因纪律启动)
- 利用日期缓冲预产内容库存(实战营案例、具身智能参访预热角度)
- **验收**:async 通道全链路走通;对账在新会话中成功

### M3:活动执行与闭环(8/01–9 月中旬,按工作假设 T-21 = 8/08 进入正式预热)

- 预热内容按 QA 后发布;每周线索录入(Lincoln,15 分钟仪式);T-7 调整;活动执行(深圳,实战营 + 参访)
- T+1 lead_review 产出跟进清单;T+7 转化复盘;T+14 retrospective
- L2 反哺落地(growth-os/brand-os 更新);如有 L3 proposal 走审批
- v1.5 飞书单向通知视余力在本阶段试点(替代不存在的同事提醒链)
- **验收**:见 §13

## 13. V1 验收标准

1. Lincoln 用一段自然语言目标启动 campaign,CMO 产出完整工作区(manifest/strategy/tasks/index)。
2. ≥5 个能力任务经协议走完状态机(含 ≥1 个 async_inbox)。
3. 三条人类闸门全部实际发生过(有 quality_review 记录)。
4. `evals/` 累积 ≥30 条 case,覆盖 ≥3 个能力 × ≥3 个维度,≥2 个 RUBRIC.md 成形。
5. `lead_snapshot.json` 有带渠道标签的真实数据;retrospective 引用它得出下月建议。
6. README 与协议文档自足:用一个全新会话的 agent(或未来新人)实测,不靠口头解释即可完成一次 async 任务执行;每周线索录入仪式实际发生 ≥3 次。
7. 换一次会话(上下文清零)后,CMO 凭磁盘文件准确重建 campaign 状态。

## 14. 明确不做(v1)

沿用 Codex 版 §12 并补充:

- 完整 CRM、自动发布、支付/报名后端集成、付费投放优化、投资/JV 决策流、自动销售跟进
- 重写现有官网、newsroom、短视频、访谈工作流
- L3 自动落地(只到 proposal)
- 常驻进程/守护服务(定时任务通道 ③ 视 M2 情况决定是否在 v1 末尾试点)
- 多租户/对外开放的权限体系(仅目录约定:同事不写 brand-os/evals/registry)

## 15. 风险与缓解

| 风险 | 缓解 |
|---|---|
| 首切片选了全链路 campaign,范围偏大 | M0–M2 里程碑硬闸:M1 未过则 8 月 campaign 降级为"新闻+落地页+转介"最小链路,短视频转人工;活动在 8 月底,较原设想多两周缓冲 |
| **无 marketing staff,Lincoln 是唯一人类,精力单点** | 系统级指标"亲自动手环节数"每月复盘;凡机械环节进 backlog 优先转定时/bot;通道③与 v1.5 通知的优先级提升为"替代同事"级 |
| 异步通道依赖人肉中继(中继人=Lincoln),任务滞留 | index 的 stale_after 超时提醒;CMO 每次汇报待跑清单;M2 后尽快启用定时通道③ |
| 归因纪律执行不下去 | 定为一等交付物 + Lincoln 每周固定 15 分钟仪式;v2 起由飞书 bot 表单代劳 |
| 活动日期未定,节奏悬空 | 以 8/29 为工作假设先行;manifest 单点锚定,日期确定后 T-n 自动重排;预热内容按"日期无关"方式预产 |
| 双端入口漂移 | 实质规则单点存放于 CMO_AGENT.md;入口 skill 禁止携带规则 |
| eval 捕获流于形式 | 复核即捕获(不设独立标注);验收标准 4 硬性要求数量与覆盖 |
| 8 月活动本身的内容质量(系统≠品味) | M1 首稿即做人审 + eval;good/ 范例快速回注 skill;必要时 Lincoln 直接改稿并将差异冻为 case |

## 16. 部署与协作

本系统没有服务器、数据库和常驻后端。"部署"拆为三个独立问题:**工作区(git)、运行时(每机一次安装)、执行力(谁来唤醒)**,外加**访问层**(用户以什么形式使用)。

### 16.1 工作区部署:git 即生产环境

git 仓库同时充当四个角色:部署机制(clone 即部署)、同步总线(push/pull 即消息传递)、审计日志(每个 task/result/eval/审批都有 commit 历史)、备份容灾。

**仓库拓扑:**

```text
GitHub(私有)
├── marketing-os.git       ← 新建:cmo/ + newsroom/ + website/docs(纯文本协议层,系统本体)
├── mindsleap.git          ← 已有:官网 + design-system(品牌视觉真相源;website 能力的落点)
└── videoeditting.git      ← 已有:短视频系统,保持独立(大文件/venv 不并入)
```

- 三仓库按约定相对布局 clone 到同一父目录;各机差异由不入库的 `machine.local.json` 记录根路径映射。
- `.gitignore` 纪律:渲染产物、venv、大素材不入协议仓库;campaign `outputs/` 只入文本,视频成品存短视频仓库或网盘,manifest 存指针。
- 敏感数据:`leads/` 含客户公司与管道金额——私有仓库可接受,README 声明"含客户数据,不得转公开/授权外部协作者";若协作范围扩大,`leads/` 可拆独立小权限仓库(协议为路径引用,无需改动)。
- **无冲突保证**:目录所有权分区(index/tasks/evals/review 仅 CMO 写;各 `outputs/<capability>/` 仅对应能力写;同事仅写自己 operator 的 outputs 与 leads),不同写入者永不触碰同一文件,merge 冲突结构性不存在。

### 16.2 运行时部署:每机一次

```text
每台参与机器:装 Claude Code(主)/Codex CLI(备)+ 登录个人账号(API key 属人,不入库)
            → git clone marketing-os(需要时 + videoeditting)
            → 入口 skill 随仓库走,clone 即可用,零额外安装
```

若有非营销同事参与机械操作(如渲染),只需 `git pull → 跑熟悉的系统 → git push`,无需会用 agent;没有同事时该环节由 Lincoln 承担,并优先排入定时化。

### 16.3 执行力部署:三阶段

| 阶段 | 形态 | 说明 |
|---|---|---|
| 1(M0–M2) | 人肉唤醒 + git 中继 | Lincoln 在仓库唤醒 CMO;同事 pull-run-push;零基础设施 |
| 2(M2 后) | 单机定时 | launchd/cron 跑 `claude -p` headless 对账(通道③):自动扫 inbox、派 revision、备审核稿 |
| 3(v2) | 云端执行 | GitHub Actions / 云 agent 定时 checkout 执行,摆脱单机依赖;v1 不做 |

### 16.4 访问层演进(已确认:现在 Claude 总控,未来飞书通信)

按交互类型分层,不做单一 web 产品:

| 交互类型 | 场景 | 形态 |
|---|---|---|
| 深度对话 | 定战略、建 campaign、逐条 QA、复盘 | Claude Code(现在,长期保留) |
| 轻触发/审批/通知 | "待你审"提醒、手机批复、同事领任务、线索录入 | **飞书机器人**(v1.5→v2) |
| 状态总览 | campaign 看板、pipeline 漏斗、eval 累积 | 只读 web 看板,由 index/lead_snapshot 静态生成(v3,看需要) |

**演进节奏:**

```text
v1(现在)   仅 Claude Code。不写一行访问层代码。
v1.5(M3±) 单向通知:result 落盘/任务超时 → 飞书群 incoming webhook 推送
v2          双向机器人:飞书 bot 审批、领任务/交结果、bot 表单线索录入、状态问答
v3(可选)  只读 web 看板;深度对话的 web 形态由 Claude Code 官方 web/桌面端覆盖,不自建
```

**v2 桥接服务三铁律**(第一个常驻组件,写入架构约束):

1. **桥接服务是哑的**:仅做"IM 消息 ⇄ 文件"翻译,无业务逻辑、无状态;所有决策仍由 CMO 对账时做。换飞书/企微/Slack 只换适配器。
2. **bot 上每个动作 = 一个 commit**:手机审批落成 `review/approvals/*.json` 入库,审计链完整,eval 捕获照常发生(CMO 下次对账冻结为 case)。手机审批不得成为绕过资产沉淀的后门。
3. **人类闸门降级规则**:一键 approve 仅限低风险项;Fact & Risk/品牌表述/FDE 三类,bot 只推"摘要+风险点",批复必须附一句理由,否则打回 Claude Code 里审。

## 17. 待确认

已确认(2026-07-06):主目录 = `cmo/`;无 marketing staff,operator 默认 lincoln;活动 = 8 月底深圳"AI 数字员工实战营 + 具身智能企业参访"。

仍开放(均不阻塞 M0 开工):

1. **活动精确日期**(当前工作假设 2026-08-29):确定后写入 `campaign_manifest.json`,T-n 全部重排。
2. **深圳场 offer 细节**:定价是否沿用 1999?实战营营期长度?参访哪几家具身智能企业(涉及资源对接与预热内容素材)?——在 M1 campaign strategy 阶段定。
3. **是否有非营销同事可承担渲染等机械操作**:有则写入 registry `operator`;无则维持 lincoln + 优先定时化。
4. **官网仓库的 canonical 工作副本**:`/Users/lincoln/Claude-workspace/mindsleap-website/` 与 `/Users/lincoln/AI projects/mindsleap/` 指向同一 remote(`wuyoukongque/mindsleap.git`)——指定哪份为唯一活跃副本,写入 `design_system_sources.json` 与 `machine.local.json`,另一份归档或删除,避免双写漂移。
