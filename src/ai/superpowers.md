# Superpowers

Superpowers 是一个 AI 编程助手的**方法论插件**，通过一组精心设计的 Markdown 文档来改变 AI 的行为模式。

## 目录结构

```bash
superpowers/
│
├── skills/                    ← 核心中的核心：14 个技能
│   ├── using-superpowers/     ← "调度器"：告诉 AI 如何发现和使用技能
│   ├── brainstorming/         ← 需求探索：苏格拉底式提问
│   ├── writing-plans/         ← 计划编写：2-5 分钟粒度
│   ├── subagent-driven-development/ ← 子代理驱动开发
│   ├── executing-plans/       ← 内联执行计划（无子代理时使用）
│   ├── test-driven-development/  ← TDD：先测试后实现
│   ├── systematic-debugging/  ← 系统调试：四阶段法
│   ├── verification-before-completion/ ← 完成前验证
│   ├── requesting-code-review/ ← 请求代码评审
│   ├── receiving-code-review/  ← 接收代码评审
│   ├── dispatching-parallel-agents/ ← 并行代理派发
│   ├── using-git-worktrees/   ← Git 工作树隔离
│   ├── finishing-a-development-branch/ ← 完成分支
│   └── writing-skills/        ← 元技能：如何创建新技能
│
├── hooks/                     ← 生命周期钩子
│   ├── hooks.json             ← Claude Code 的钩子声明
│   ├── hooks-cursor.json      ← Cursor 的钩子声明
│   ├── run-hook.cmd           ← 跨平台启动包装器
│   └── session-start          ← 核心：会话启动时注入技能
│
├── agents/                    ← Agent 角色定义
│   └── code-reviewer.md       ← 唯一的 Agent：代码审查员
│
├── commands/                  ← 已废弃的斜杠命令
│   ├── brainstorm.md          ← 指向 brainstorming 技能
│   ├── write-plan.md          ← 指向 writing-plans 技能
│   └── execute-plan.md        ← 指向 executing-plans 技能
│
├── docs/                      ← 文档
│   ├── plans/                 ← 实施计划存放处
│   ├── superpowers/           ← 项目自身的设计文档
│   └── testing.md             ← 技能测试指南
│
├── .claude-plugin/            ← Claude Code 插件清单
│   ├── plugin.json            ← 插件元信息
│   └── marketplace.json       ← 市场信息
│
├── .cursor-plugin/            ← Cursor 插件清单
├── .codex/                    ← OpenAI Codex 安装指南
├── .opencode/                 ← OpenCode 支持
│
├── tests/                     ← 测试套件
│
├── CLAUDE.md                  ← 贡献者指南（AI agent 必读）
├── AGENTS.md                  ← 符号链接，指向 CLAUDE.md
├── GEMINI.md                  ← Gemini CLI 入口
├── README.md                  ← 项目说明
├── RELEASE-NOTES.md           ← 详细的版本变更记录
├── package.json               ← 版本号（v5.0.7），零依赖
└── LICENSE                    ← MIT 许可证

```

## 七个核心工作流

```yaml
步骤 1: brainstorming（头脑风暴）
  输入：用户的模糊需求
  过程：苏格拉底式一问一答，理解意图、约束、成功标准
  输出：设计文档 docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md
  ↓
步骤 2: using-git-worktrees（创建隔离工作区）
  输入：已确认的设计
  过程：创建 git worktree，安装依赖，运行测试确认基线
  输出：干净的新分支 + 通过测试的工作区
  ↓
步骤 3: writing-plans（编写实施计划）
  输入：设计文档
  过程：拆分成 2-5 分钟粒度的任务，每步有完整代码和验证命令
  输出：计划文档 docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md
  ↓
步骤 4: subagent-driven-development（子代理驱动开发）
  输入：计划文档
  过程：每个任务派一个子代理 → 实现 → 双阶段评审（规格 + 质量）
  内含：test-driven-development（每个子代理遵循 TDD）
  输出：通过评审的代码 + 测试 + 提交记录
  ↓
步骤 5: requesting-code-review（请求代码评审）
  输入：已实现的代码
  过程：派子代理做最终的整体评审
  输出：评审报告（Critical / Important / Minor）
  ↓
步骤 6: verification-before-completion（完成前验证）
  贯穿全程的原则，不是单独一步
  规则：没有运行验证命令的输出就不能声称"完成"
  ↓
步骤 7: finishing-a-development-branch（完成分支）
  输入：全部测试通过的代码
  过程：验证 → 呈现 4 个选项 → 执行选择 → 清理
  输出：合并到主分支 / PR / 保留 / 丢弃
```

## cong "启动会话"到"AI获得技能"的完整链路

```bash
用户启动 Claude Code
       │
       ▼
Claude Code 扫描已安装的插件
       │
       ▼
找到 superpowers 插件，读取 .claude-plugin/plugin.json
       │
       ▼
plugin.json 指向 hooks/hooks.json
       │
       ▼
hooks.json 注册了 SessionStart 事件
       │
       ▼
触发条件匹配（startup）→ 执行 hooks/run-hook.cmd session-start
       │
       ▼
run-hook.cmd 找到 bash → 执行 hooks/session-start 脚本
       │
       ▼
session-start 读取 skills/using-superpowers/SKILL.md
       │
       ▼
把内容包装成 JSON，用 <EXTREMELY_IMPORTANT> 标签包裹
       │
       ▼
JSON 输出被 Claude Code 接收
       │
       ▼
内容注入到 AI 的上下文中
       │
       ▼
AI 的第一条回复就已经"有超能力了"

```

### 为什么只注入 `using-superpowers` 而不是所有技能

因为 using-superpowers 是"调度器"。它不教 AI 怎么做 TDD 或怎么调试，它教 AI 怎么发现和调用其他技能。
这是一种"懒加载"策略：启动时只注入调度器（约 100 行），其他技能在需要时按需加载。如果把所有 14 个技能都在启动时注入，会占用大量上下文窗口，挤压用户实际工作的空间。

```markdown
<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing,
you ABSOLUTELY MUST invoke the skill.
</EXTREMELY-IMPORTANT>
```
