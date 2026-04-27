# Personal Page (Vue + GitHub Pages)

一个基于 Vue 3 + TypeScript + Vite 的个人主页静态站，当前包含：

- 首页入口
- 博客页（含文章详情）

并预留了后续扩展区域（研究内容、学习笔记、个人爱好）。

## 本地开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
npm run preview
```

## 目录结构

```text
src/
	components/
		blog/
		layout/
	content/
		blog/
	data/
	router/
	views/
```

## 博客内容写法

博客文章放在 `src/content/blog`，使用 Markdown + Frontmatter：

```md
---
title: 文章标题
slug: unique-slug
summary: 文章摘要
publishedAt: 2026-04-28
tags: TagA, TagB
cover: /images/blog/example.png
status: published
---

正文内容...
```

## GitHub Pages 部署

已内置 GitHub Actions 工作流：

- 项目仓库自动使用 `/<repo-name>/` 作为构建 base
- 用户主页仓库（`<username>.github.io`）自动使用 `/` 作为构建 base

工作流文件：`.github/workflows/deploy.yml`
