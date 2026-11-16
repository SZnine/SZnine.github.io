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
- 清空首页介绍、项目与关于页正文、站点描述和页脚版权文字，移除示例文章；文章目录保留 `.gitkeep`。
- 保留 Markdown / MDX、文章目录、标签、归档、Pagefind、RSS 和站点地图。
- 使用静态分享图片 `public/default-og.jpg`，关闭动态分享图片并移除固定 `/og.png` 生成路由。
- 包管理器固定为 `pnpm@11.25.0`，部署使用 Node.js 24；项目 Node.js 最低版本为 `22.23.4`。
- `.github/workflows/deploy.yml` 在 `main` 推送时构建并部署 GitHub Pages。
- 构建命令为 `astro check && astro build && node build-pagefind.mjs`。脚本清理旧搜索索引，没有已发布文章时跳过索引生成；搜索输入框随首篇文章构建恢复。
- 开发与预览命令保留 Astro 的 `--ignore-lock` 参数，以兼容当前预览环境。

## 内容维护

文章放在 `src/content/posts/`，沿用 `title`、`description`、`pubDatetime`、`modDatetime`、`draft`、`tags`、`featured` 等现有字段。图片放入 `public/images/`，当前根站点通过 `/images/…` 引用。

网页写作后台推荐 [Pages CMS](https://pagescms.org/docs/quick-start/)。后续以根目录 `.pages.yml` 映射上述目录与字段，设置 `settings.content.merge: true`，再登录并授权 GitHub App 访问本仓库。配置与授权待接入，文章仍由现有 Actions 发布。具体操作见 [README.md](./README.md)。

## 合并上游更新

先提交本站修改，再比较上游与本记录中提交之间的变化。重点检查 `astro-paper.config.ts`、`astro.config.ts`、`package.json`、内容 schema、首页与公共组件、中文翻译，以及搜索构建逻辑。

合并后运行完整 `pnpm build`，检查空文章和正式文章页面、搜索、文章目录、主题切换、移动端布局，以及 RSS / sitemap 的正式地址。更新本文件中的上游提交和模板版本，保留许可证。
