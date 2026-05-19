---
title: 给 MiMo-v2.5-Pro 补上眼睛：MiMo Vision MCP Server 开发实践
slug: mimo-vision-mcp
summary: 在 Claude Code 中使用 MiMo-v2.5-Pro 作为主模型时，发现它不支持图片识别，甚至会导致会话崩溃。为了解决这个问题，我开发了一个 MCP Server，让高性能的 Pro 模型也能"看到"图片。
publishedAt: 2026-05-19
tags: Claude Code, MCP, MiMo, Agent, Python
cover: /images/blog/mimo-vision.png
status: published
---

## 1. 起因

MiMo-v2.5-Pro 是一个非常强的代码模型，我在 Claude Code 中把它作为主力模型使用。但有一个让人头疼的问题：**它不支持图片输入**。

这不只是"发图片没反应"这么简单。在 Claude Code 中直接发送图片（比如拖入截图、粘贴报错截图），会触发如下错误：

```
There's an issue with the selected model (mimo-v2.5-pro[1m]).
It may not exist or you may not have access to it.
Run /model to pick a different model.
```

更严重的是，**这个错误会导致当前会话直接崩溃**，之后连普通文本对话也无法继续。

## 2. MiMo的模型能力差异

MiMo 系列中，支持图片输入的模型只有：

- `mimo-v2.5`
- `mimo-2.5-omni`

而 `mimo-v2.5-pro` **不支持图片识别**。

| 模型 | 代码能力 | 图片识别 |
|------|---------|---------|
| mimo-v2.5 | 中等 | ✅ 支持 |
| mimo-v2.5-pro | 很强 | ❌ 不支持 |
| mimo-2.5-omni | 中等 | ✅ 支持 |

这就形成了一个两难：选 Pro 就不能看图，选能看图的模型代码能力就下降。

## 3. 三种解法

| 方案 | 做法 | 优点 | 缺点 |
|------|------|------|------|
| 治标 | `/compact` 压缩上下文 | 快速恢复会话 | 之后仍不能发图片，且丢失上下文 |
| 治头 | 换成 `mimo-v2.5` 模型 | 原生支持图片 | 代码生成能力下降 |
| **治本** | **安装 MCP Server** | **兼顾 Pro 性能 + 图片识别** | 需要额外配置一次 |

## 4. 方案设计：MCP 借力

核心思路很简单：**主模型保持 Pro，图片识别通过 MCP 借助 mimo-v2.5 完成**。

```
用户发送图片
    ↓
Claude Code（mimo-v2.5-pro）—— 不直接处理图片
    ↓ 调用 MCP 工具
MiMo Vision MCP Server
    ↓ 转发给支持视觉的模型
mimo-2.5（支持多模态）—— 返回文字描述
    ↓
Claude Code 拿到文字描述，继续正常对话
```

两个模型互不干扰，Pro 负责思考和编码，mimo-v2.5 负责看图。

## 5. 实现

使用 Python + MCP SDK 构建，提供两个工具：

- `describe_image`：分析图片并返回文字描述
- `ocr_image`：提取图片中的文字（OCR）

支持三种图片输入方式：本地路径、URL、data URI。

关键依赖：
- `mcp>=1.0.0`：MCP 协议 SDK
- `httpx>=0.27.0`：调用 MiMo API

环境变量配置：

| 变量 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `MIMO_API_KEY` | 是 | - | MiMo API Key |
| `MIMO_API_BASE` | 否 | `https://token-plan-cn.xiaomimimo.com/anthropic` | API 地址 |
| `MIMO_MODEL` | 否 | `mimo-2.5` | 视觉模型名称 |

在 `settings.json` 中注册：

```json
{
  "mcpServers": {
    "mimo-vision": {
      "command": "python",
      "args": ["<path>/mimo_vision.py"],
      "env": {
        "MIMO_API_KEY": "your-api-key"
      }
    }
  }
}
```

## 6. 踩坑：系统级提示词是必须的

装完 MCP Server 后，我发现 Claude Code 遇到图片时**仍然会尝试用 Read 工具直接读取**，而不是调用 MCP 工具。这又会触发 Pro 模型的图片处理错误。

解决办法是在全局 `~/.claude/CLAUDE.md` 中加入提示词约束：

```markdown
# 图片读取规则
当模型为 mimov2.5pro 时，读取图片必须优先使用 mimo-vision MCP 提供的
`describe_image` 或 `ocr_image` 工具，不要用 Read 工具直接读取图片。
```

为什么是全局而不是项目级？因为这个问题与具体项目无关，只要主模型是 Pro，任何项目都会遇到。

## 7. 已知限制：VS Code 终端拖图

目前**没有找到办法**解决 VS Code 终端直接拖入图片识别的问题。

拖入图片后，Claude Code 会将图片直接内联发给主模型，绕过了 MCP 工具调用流程，触发如下报错：

![VS Code 终端拖入图片导致会话崩溃](/images/blog/vscode-drag-image-error.png)

此时不仅图片无法识别，**当前会话也会直接崩溃**，之后连普通文本对话都无法继续。

**替代方案：** 先将图片保存到本地文件，然后告诉 Claude 图片路径，它会通过 MCP 工具进行识别。

## 8. 总结

这个 MCP Server 解决了一个很实际的问题：**如何在 Claude Code 中同时获得高性能代码模型和图片识别能力**。

如果你也在用 MiMo-v2.5-Pro 或其他不支持多模态的模型，这个方案同样适用——只需要把 MCP Server 中的视觉模型换成你想要的即可。

项目地址：[mimo-vision-mcp](https://github.com/gbz666/mimo-vision-mcp)
