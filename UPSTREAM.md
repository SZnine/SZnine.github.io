# 上游来源与维护记录

## 来源

| 项目 | 记录 |
| --- | --- |
| 上游仓库 | <https://github.com/satnaing/astro-paper> |
| 取用分支 | `main` |
| 上游提交 | [`4bc2dafac5405c6c4f06d1daba275e836e656097`](https://github.com/satnaing/astro-paper/commit/4bc2dafac5405c6c4f06d1daba275e836e656097) |
| 提交日期 | 2026-11-15 |
| 提交说明 | `docs: move latex and giscus setup to the custom slots` |
| 取用时的模板版本 | AstroPaper 7.2.0 |
| Astro 依赖声明 | `^7.4.8`，解析版本见 `pnpm-lock.yaml` |
| 原始许可 | [MIT License](./LICENSE)，`Copyright (c) 2023 Sat Naing` |

保留原始 `LICENSE`；本站 `package.json` 的名称和版本用于当前站点。

## 本站改动

- 配置站名、作者、`zh-CN` 中文界面、`Asia/Shanghai` 时区和正式地址 <https://sznine.github.io/>。
- 沿用官方默认明暗配色、Google Sans Code 字体、首页与文章布局及页面组件；项目页复用官方 `Main`、`app-prose`。
- 初始化时清空首页介绍、项目与关于页正文、站点描述和页脚版权文字，移除模板示例文章。
- 保留 Markdown / MDX、文章目录、标签、归档、Pagefind、RSS 和站点地图。
- 使用静态分享图片 `public/default-og.jpg`，关闭动态分享图片并移除固定 `/og.png` 生成路由。
- 包管理器固定为 `pnpm@11.25.0`，部署使用 Node.js 24；项目 Node.js 最低版本为 `22.23.4`。
- `.github/workflows/deploy.yml` 在 `main` 推送时构建并部署 GitHub Pages。
- 接入 Pages CMS，将文章、关于页和图片映射到实际内容目录，移除复制配置中不存在的站点设置与部署动作。
- 新文章默认 `draft: false`，使用可在首次创建时编辑的时间戳文件名，避免中文标题派生为空；后续编辑保持文件名稳定。
- 日期 schema 兼容 CMS 保存的带引号 ISO 字符串和 YAML 日期值，可选更新日期的空字符串或 `null` 统一作为未设置处理。
- 构建命令为 `astro check && astro build && node build-pagefind.mjs`。脚本清理旧搜索索引，没有已发布文章时跳过索引生成；搜索输入框随首篇文章构建恢复。
- 开发与预览命令保留 Astro 的 `--ignore-lock` 参数，以兼容当前预览环境。

## 内容维护

文章放在 `src/content/posts/`，沿用 `title`、`description`、`pubDatetime`、`modDatetime`、`draft`、`tags`、`featured` 等现有字段。图片放入 `public/images/`，当前根站点通过 `/images/…` 引用。

网页写作使用已接入的 [Pages CMS](https://app.pagescms.org/)。根目录 `.pages.yml` 提供文章、关于和图片入口，`settings.content.merge: true` 保留未暴露在表单中的已有字段。关于页只编辑正文，复杂 MDX 在本地维护。

在 `main` 分支保存会自动触发现有 GitHub Actions 发布。草稿默认关闭；开启后只隐藏网站上的文章，公开仓库中的源文件仍然可见。具体操作见 [README.md](./README.md)。

## 合并上游更新

先提交本站修改，再比较上游与本记录中提交之间的变化。重点检查 `astro-paper.config.ts`、`astro.config.ts`、`package.json`、内容 schema 与 `.pages.yml` 字段对齐、首页与公共组件、中文翻译，以及搜索构建逻辑。

合并后运行完整 `pnpm build`，检查空文章和正式文章页面、搜索、文章目录、主题切换、移动端布局，以及 RSS / sitemap 的正式地址。更新本文件中的上游提交和模板版本，保留许可证。
