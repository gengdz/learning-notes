# Agent

## Agent 架构

构成为：LLM + Planning + Tool Use + Memory

### Planning

为什么需要规划

* 短视：缺乏全局观，容易在任务中偏离初始目标
* 逻辑跳跃：先 A，再 B，再 C，模型容易跳过中间步骤，然后幻觉出结果
* 不可控：有些流程是需要 SOP 的。

解决方案

* 自主推理模式：挖掘模型内部的思考潜力。
* 系统编排模式：构建外部的流程框架。

自主推理模式

| 模式                        | 实现方式                                                           | 核心 Prompt 或 伪代码示例                                                                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CoT（思维链）               | **Prompt 技巧**：无需改代码，只需在 Prompt 结尾加入“咒语”。        | **用户输入：** Q:【复杂数学题】 关键词语： A: Let's think step by step.（让我们一步步思考）                                                                                                                      |
| ReAct（推理+行动）          | **System Prompt 约束**：强制模型遵守「思考-行动-观察」的格式契约。 | **System Prompt 模板：** Use the following format: Question: [Input] Thought: I need to check... Action: [Tool_Name] Observation: [API_Result] ... (Repeat) Final Answer: [Result]                               |
| Plan & Execute（规划+执行） | **代码逻辑控制**：两步走架构：先生成 JSON 列表，再代码循环执行。   | **Python 伪代码：** `# 1. Planner` `plan_list = llm.gen("Goal: {X}. Return JSON steps")` `# 2. Executor` `for step in plan_list: context += tool.run(step)` `# 3. Final` `return llm.gen("Summarize {context}")` |
| Self-Reflection（自我反思） | **多轮对话 / 角色扮演**：引入“批评者”角色对上一步输出进行 Review。 | **Critic Prompt（质检员）：** Role: Code Reviewer Input: {Generated_Code} Task: Check for bugs & edge cases. If error: Explain clearly. **Reviser Prompt（修正者）：** Task: Rewrite code based on the feedback. |

系统编排模式

* workflow
* Multi-Agent (多智能体协作)

### Tool Use

#### Function Call

底层
JSON 化
保证参数与调用正确

#### MCP

中间层
统一接入和鉴权
解决 N\*M 问题

#### Skill

顶层
封装业务 SOP，并通过版本化与评测基线保证可演进性

### Memory

* 外部知识
* 短期记忆
* 长期记忆
* 状态管理State（流程控制）
