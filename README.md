# Koi · 技术手记

基于 [Astro](https://astro.build/) 与官方 [AstroPaper](https://github.com/satnaing/astro-paper) 模板配置的中文个人技术博客。沿用官方的字体、默认配色、首页布局与页面组件，修改站名、中文文案和文章内容；新增项目页复用官方 `Main` 与 `app-prose` 排版。

保留 Markdown / MDX 写作、文章目录、标签、归档、全文搜索、明暗主题、RSS 和站点地图。

源码仓库：<https://github.com/SZnine/SZnine.github.io>。

默认部署目标：<https://sznine.github.io/>。实际发布状态以仓库的 GitHub Actions 部署结果为准。

上游版本与本次定制记录见 [UPSTREAM.md](./UPSTREAM.md)，原始 MIT 许可保留在 [LICENSE](./LICENSE)。

## 先认识这份博客

| 入口 | 地址 | 内容 |
| --- | --- | --- |
| 首页 | `/` | 个人介绍、精选文章与最近更新 |
| 文章 | `/posts/` | 按日期整理的文章列表 |
| 项目 | `/projects/` | 项目介绍与相关记录；初版展示这个博客 |
| 关于 | `/about/` | 个人介绍与写作方向 |

另外提供 `/search/` 搜索、`/tags/` 标签、`/archives/` 归档和 `/rss.xml` 订阅。

首版包含三篇**可直接替换的示例文章**，列表描述和正文都注明示例身份，不代表作者已经完成相应项目或实验：

| 文件 | 用途 |
| --- | --- |
| `src/content/posts/agent-loop.md` | 展示 Agent 入门文章、分级标题与代码排版 |
| `src/content/posts/reproducible-notes.md` | 展示工程记录、列表和方案比较 |
| `src/content/posts/writing-with-markdown.mdx` | 介绍本站写作方式，并展示 MDX 组件与表格 |

## 在 WSL 或 Windows 中运行

### 1. 准备 Node.js 和 pnpm

需要 **Node.js >= 22.23.4**。项目通过 `packageManager` 固定使用 **pnpm 11.25.0**，依赖版本记录在 `pnpm-lock.yaml` 中。

下面的命令在 WSL 终端和 Windows PowerShell 中都可以执行：

```bash
node --version
npm install --global pnpm@11.25.0
pnpm --version
```

如果使用 WSL，在 WSL 内安装 Node.js、pnpm 并运行项目；如果使用 Windows，在 PowerShell 中完成同一组操作。两种环境分别安装依赖，避免共用由另一种环境生成的 `node_modules`。

### 2. 进入源码目录，安装依赖

将源码包解压到自己的目录，或先克隆仓库：

```bash
git clone https://github.com/SZnine/SZnine.github.io.git koi-astro-paper
```

进入包含 `package.json` 的项目根目录。下面的路径是示例，以实际保存位置为准。

WSL 路径示例：

```bash
cd ~/projects/koi-astro-paper
pnpm install --frozen-lockfile
pnpm dev
```

Windows PowerShell 路径示例：

```powershell
cd C:\projects\koi-astro-paper
pnpm install --frozen-lockfile
pnpm dev
```

默认访问 <http://localhost:4321>；如果端口被占用，以终端显示的地址为准。保持终端运行，修改文章后即可预览；按 `Ctrl+C` 停止。

开发与预览脚本保留了 Astro 的 `--ignore-lock` 参数，用于当前代理环境中的服务启动；安装依赖仍以 `pnpm-lock.yaml` 为准。

### 3. 检查正式构建

```bash
pnpm build
pnpm preview
```

`pnpm build` 依次执行 Astro 类型检查、静态页面生成、Pagefind 搜索索引生成，再把索引复制到开发环境可读取的位置。部署产物位于 `dist/`。

**全文搜索需要先执行一次完整的 `pnpm build`。** 单独运行 `pnpm dev` 或 `astro build` 都不会执行完整的搜索索引步骤。文章内容发生变化后，重新构建可以更新搜索结果；发布前用 `pnpm preview` 检查实际构建产物。

## 写一篇自己的文章

在 `src/content/posts/` 中新建文件，例如 `my-first-post.md`。使用 `.md` 写普通文章；需要导入 Astro 组件时使用 `.mdx`。

可以从下面的内容开始：

```markdown
---
title: "我的第一篇技术记录"
description: "说明文章解决什么问题，以及读完可以得到什么。"
pubDatetime: 2026-11-16T09:00:00+08:00
draft: true
tags:
  - 工程实践
  - 示例文章
---

先交代问题的背景与目标。

## 问题是什么

写清楚观察到的现象、预期行为和相关环境。

## 如何处理

记录实现方案、代码与关键取舍。

## 怎样验证

说明验证方法、实际结果与剩余问题。
```

- 将 `pubDatetime` 改成实际发布日期，并保持带时区的日期格式。
- `draft: true` 会把文章排除在文章列表、正式页面和搜索索引之外。准备发布时改成 `false`，或删除这一行。
- 将内容换成自己的文章后，可以删除 `示例文章` 标签及正文里的示例提示。
- 更新已有文章时，可增加 `modDatetime`，格式与 `pubDatetime` 相同。
- 可选的 `featured: true` 用于精选标记；`hideToc: true` 可隐藏单篇文章目录。

**本仓库公开。** `draft: true` 只控制网站是否展示文章，已提交到仓库的草稿源文件仍然公开。需要保密的草稿应留在仓库之外，整理好后再加入博客。

默认时区为 `Asia/Shanghai`。未来日期的文章需要在对应日期到来后重新构建才会出现在生产站点；日期字段本身不会启动后台发布任务。

文件名会参与文章网址。已经分享出去的文章，尽量保持文件名稳定。文章也可以放入子目录；目录如何影响 URL 由 `src/utils/getPostPaths.ts` 处理。

### 插入图片

建议把文章图片统一保存到 `public/images/`，例如 `public/images/agent-loop.png`。本站部署在 GitHub Pages 根地址，正文使用标准 Markdown 图片语法：

```markdown
![Agent 任务循环示意图](/images/agent-loop.png)
```

将图片文件与文章一起提交。不要保留 `C:\...`、临时截图目录或仅在个人电脑上存在的路径。若以后改为项目子目录站点，例如 `/blog/`，需要同步调整图片和内部链接的路径。

## 更快捷的写作方式

推荐 **VS Code + Front Matter CMS + GitHub Actions**。Front Matter CMS 是现成的 VS Code 扩展，负责文章列表、字段、草稿状态、图片与本地预览；文章仍保存为 Markdown / MDX，网页外观继续由 AstroPaper 决定。

**本项目尚未安装或配置 Front Matter CMS。** 接入时按 [Astro 官方集成说明](https://docs.astro.build/en/guides/cms/frontmatter-cms/) 和 [Front Matter 文档](https://frontmatter.codes/docs/) 设置，内容目录使用 `src/content/posts/`，字段对齐本站：

| 字段 | 含义 |
| --- | --- |
| `title` | 文章标题 |
| `description` | 文章摘要 |
| `pubDatetime` | 带时区的发布日期；本站不使用普通 Astro Blog 示例中的 `pubDate` |
| `draft` | 是否为草稿 |
| `tags` | 标签列表 |

Front Matter 提供 [Git 同步功能](https://frontmatter.codes/docs/git-integration/)，需要显式启用并完成本地 Git 身份验证。也可以直接使用 VS Code 的源代码管理面板提交、推送。

配置后的日常流程是：新建文章、填写信息和正文、插入图片、运行本地预览、提交并推送到 `main`，最后查看 GitHub Actions 是否部署成功。切换草稿状态或保存文件本身不会完成网站发布。

如果以后更需要浏览器里的写作后台，可以选择 [Pages CMS](https://pagescms.org/docs/quick-start/)。它通过仓库根目录的 `.pages.yml` 配置内容表单与媒体目录，使用托管服务时需要自行登录并授权 GitHub App 访问指定仓库。本项目目前未接入或授权 Pages CMS，也不包含自研 CMS。含 Astro 组件的复杂 MDX 文章优先在 VS Code 编辑。

## 修改站名和页面内容

| 位置 | 负责什么 |
| --- | --- |
| `astro-paper.config.ts` | 站名、描述、作者、正式网址、语言、时区、分页数量、功能开关、社交链接 |
| `astro.config.ts` | Astro 配置、MDX、站点地图、语言路由、代码高亮以及可选的部署子路径 |
| `src/pages/index.astro` | 沿用官方布局的首页文案与文章入口 |
| `src/pages/projects.astro` | 使用官方 `Main` / `app-prose` 组件的项目介绍与链接 |
| `src/content/pages/about.md` | 关于页正文 |
| `src/styles/theme.css` | 官方默认明暗配色与字体变量 |
| `src/styles/typography.css` | 官方文章正文、代码和表格样式 |
| `src/components/Header.astro`、`Footer.astro` | 官方页头导航与页脚组件，以及对应中文文案 |
| `src/i18n/lang/zh-CN.ts` | 中文界面文案 |
| `public/` | 直接发布的静态文件，包括图标与分享图片 |

字体沿用官方 **Google Sans Code**，由 Astro 在构建时获取并处理；构建环境需要能够获取配置所需的字体资源。站点保持官方默认配色和排版，不增加独立的外观样式层。当前默认分享图片为上游保留的 `public/default-og.jpg`。

社交链接默认为空。可在 `astro-paper.config.ts` 的 `socials` 中添加自己的 GitHub 等地址。替换项目资料时，同时更新项目页中的介绍与实际可访问的链接。

语言配置需要保持一致：`site.lang`、Astro 的 `locales/defaultLocale` 和翻译文件名当前均使用 `zh-CN`。

## 发布到 GitHub Pages

本站使用 [Astro 官方 GitHub Pages 部署方案](https://docs.astro.build/en/guides/deploy/github/)，工作流位于 `.github/workflows/deploy.yml`。推送到 `main` 时触发构建，也可以在 GitHub Actions 页面手动运行工作流。

首次设置时，在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。

工作流安装锁文件中的依赖，执行项目完整的 `pnpm build`，生成静态页面和 Pagefind 搜索索引，再上传、部署 `dist/`。在仓库的 **Actions** 页面确认部署任务成功后，再访问目标地址；本说明不代表当前部署已经成功。

仓库名 `SZnine.github.io` 对应用户根站点，默认地址为 `https://sznine.github.io/`，无需添加仓库名作为 `base`。以后迁移为普通项目仓库时，才需要按实际子路径调整 Astro 的 `base` 和页面资源引用。

### 使用自己的域名

在 GitHub Pages 完成自定义域名和 DNS 配置后，修改 `astro-paper.config.ts` 中的 `site.url`，然后重新构建、发布。正式网址会用于 canonical、RSS、站点地图和分享元数据，不能只修改浏览器访问域名而保留旧配置。

迁移后建议检查首页、文章深层链接、中文标签、搜索、RSS 和站点地图，确认它们都指向新地址。

## 后续更新

先保存自己的 Git 提交，再更新依赖或合并上游修改。升级后重新执行 `pnpm build` 并检查页面。上游模板更新与本站定制可能修改同一文件，需要比较差异和处理冲突；详细来源见 [UPSTREAM.md](./UPSTREAM.md)。
