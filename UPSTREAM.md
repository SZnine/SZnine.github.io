# 上游来源与定制记录

## 来源

本项目直接基于官方 AstroPaper 源码配置，保留所选官方模板的视觉风格与页面组件。

| 项目 | 记录 |
| --- | --- |
| 上游仓库 | <https://github.com/satnaing/astro-paper> |
| 取用分支 | `main` |
| 上游提交 | `4bc2dafac5405c6c4f06d1daba275e836e656097` |
| 提交日期 | 2026-11-15 |
| 提交说明 | `docs: move latex and giscus setup to the custom slots` |
| 取用时的模板版本 | AstroPaper 7.2.0 |
| 取用时的 Astro 依赖声明 | `^7.4.8`，具体解析版本见 `pnpm-lock.yaml` |
| 原始许可 | MIT License；`Copyright (c) 2023 Sat Naing` |

原始 [LICENSE](./LICENSE) 已保留。项目自身的 `package.json` 名称和版本用于这份定制站点，不等同于上游模板的版本号。

## 本次定制概要

- 将站点名称、作者、描述、时区和语言设置为 Koi 的中文技术博客配置。
- 保留官方首页、页头、页脚、文章列表和正文的布局与样式，仅替换相应中文文案和个人信息。
- 增加项目页面，复用官方 `Main` 与 `app-prose` 组件，并使用当前博客本身作为初始项目说明。
- 将上游示范内容替换为三篇带有明确示例标识的中文文章，以及中文关于页。
- 增加中文界面翻译，调整日期与交互文案。
- 沿用官方默认明暗配色、Google Sans Code 字体和页面组件，不增加独立的外观样式层。
- 字体继续由 Astro 在构建时获取并处理，构建环境需要能够获取相应字体资源；默认分享图片保留上游的 `public/default-og.jpg`。
- 关闭动态分享图片生成，使用上述静态默认图；移除仍会在构建时获取字体的固定 `/og.png` 生成路由，以避免当前环境中的图片生成请求失败。这不改变页面的视觉样式。
- 保留 Markdown / MDX、内容集合、代码高亮、文章目录、标签、归档、Pagefind、RSS 与站点地图。
- 固定 `pnpm@11.25.0`，保留依赖锁文件；默认部署目标设置为 `https://sznine.github.io/`。
- 使用依据 Astro 官方方案配置的 `.github/workflows/deploy.yml` 发布到 GitHub Pages，`main` 推送触发构建与部署；仓库 Pages 的 Source 应选择 GitHub Actions。实际上线状态以 Actions 部署结果为准。
- 开发和预览脚本使用 Astro 的 `--ignore-lock` 参数，让进程在当前托管预览环境中保持前台运行；生产构建脚本沿用上游流程。

示例文章用于说明本站内容结构和功能，不是用户已经发表的项目成果或实验记录。正式使用时可以直接替换。

## 写作与维护方式

推荐使用 VS Code 与现成的 Front Matter CMS 扩展编辑文章，再通过 Git 同步触发 GitHub Actions。当前仅提供接入建议，尚未安装或配置 Front Matter CMS；Pages CMS 是可选的后续网页编辑入口，尚未接入或授权。不自研内容管理后台，也不因选择编辑器改变 AstroPaper 的样式。

内容字段继续采用本站的 `title`、`description`、`pubDatetime`、`draft` 与 `tags` 等定义。普通文章使用 Markdown，图片建议放入 `public/images/`，在当前根站点通过 `/images/…` 引用。含组件的 MDX 内容优先在 VS Code 编辑。

仓库公开，`draft: true` 仅控制网站是否展示文章，不会隐藏仓库内的草稿源文件；私密草稿保存在仓库之外。

## 如何处理后续上游更新

上游的配置、组件、依赖或目录结构可能继续变化。更新前先提交或备份本站修改，并记录当前可用版本；随后比较上游变化与本项目的差异，选择需要合并的内容。

`astro.config.ts`、`astro-paper.config.ts`、公共布局和组件是可能发生冲突的位置。依赖升级也可能要求同步调整配置或内容格式，因此不要将合并上游描述成一键、无冲突的主题更新。

合并完成后，执行完整的 `pnpm build`，再检查中文路由、搜索索引、文章目录、主题切换、移动端布局，以及 RSS / sitemap 的正式地址。

