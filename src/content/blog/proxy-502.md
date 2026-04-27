---
title: 本地 Ollama 请求为什么会 502
slug: proxy-502-ollama
summary: 在本地开发 Agent 过程中的复盘记录：Clash 全局代理模式引起的本地请求异常转发及 502 错误排查与解决方案。
publishedAt: 2026-04-28
tags: Agent, Python, Clash, Proxy, Ollama
cover: /images/blog/proxy-localhost.png
status: published
---

## 1. 现象

在本地开发 Agent 时，我调用 `127.0.0.1:11434` 的 Ollama 接口，返回了 `502 Bad Gateway`。

触发条件非常稳定：

- 代理软件（Clash Verge）开了全局模式（Global）
- Python 客户端（`httpx` 或 `requests`）直接请求本地服务

## 2. 本质原因

流量异常转发背后的机制：

- 系统代理路径：Python 读取系统代理配置，把请求先发给本地代理端口（例如 `7897`）
- TUN 路径：即使应用不知道代理，也可能在网卡层被拦截

关键不在于“是否经过 Clash”，而在于 Clash 的模式：

- Rule 模式：会命中本地直连规则（`127.0.0.1` -> `DIRECT`）
- Global 模式：忽略规则，统一转发到远端代理

当请求被送到远端节点后，远端机器尝试访问它自己的 `127.0.0.1:11434`，自然连不上，于是返回 502。

## 3. 证据

下面这张图是我在 Clash Verge 中观察到的流量转发证据：

![Clash 全局模式转发证明](/images/blog/proxy-localhost.png)

## 4. NO_PROXY 的作用机制

当设置 `NO_PROXY=127.0.0.1,localhost` 后，HTTP 客户端会在发包前判定目标是否应绕过系统代理。

命中后会直接连本地，不再把请求交给 Clash 的代理端口，因此能绕开 Global 模式导致的远端转发。

## 5. 反思

在涉及本地服务（Ollama、本地向量库、本地调试 API）的项目里，建议双保险：

- 代码层显式禁用环境代理
- 环境层配置 NO_PROXY

```python
import httpx

client = httpx.Client(
    proxies={},
    trust_env=False,
)
```

