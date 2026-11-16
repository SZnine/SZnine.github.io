# Koi · 技术手记

[线上博客](https://sznine.github.io/) · [GitHub 仓库](https://github.com/SZnine/SZnine.github.io) · [上游记录](./UPSTREAM.md)

使用官方 [AstroPaper](https://github.com/satnaing/astro-paper) 模板，部署到 GitHub Pages。文章和页面内容由本仓库维护。

## 本地运行

部署使用 **Node.js 24**，本地建议使用相同版本；项目最低要求为 `>=22.23.4`。包管理器固定为 **pnpm 11.25.0**。

```bash
npm install --global pnpm@11.25.0
git clone https://github.com/SZnine/SZnine.github.io.git koi-astro-paper
cd koi-astro-paper
pnpm install --frozen-lockfile
pnpm dev
```

默认开发地址为 <http://localhost:4321>，实际地址以终端输出为准。Windows PowerShell 和 WSL 均可运行；切换环境后重新安装依赖。

```bash
pnpm build
pnpm preview
```

`pnpm build` 执行 `astro check`、`astro build` 和 `build-pagefind.mjs`，产物位于 `dist/`。搜索索引由完整构建生成，文章更新后重新构建即可更新搜索结果。

没有已发布文章时，构建会清理旧搜索索引并跳过索引生成，搜索页不显示输入框。首篇文章发布并完成构建后，索引和搜索输入框自动恢复。

## 写文章

在 `src/content/posts/` 新建 `.md` 文件；需要导入组件时使用 `.mdx`。文章开头至少包含以下字段，正文接在第二个 `---` 后面：

```yaml
---
title: ""
description: ""
pubDatetime: 2026-11-16T00:00:00+08:00
draft: true
tags: []
---
```

填写标题、摘要和正文，将 `pubDatetime` 改为实际发布日期。准备发布时将 `draft` 改为 `false`，然后提交并推送。

| 字段          | 用途                                        |
| ------------- | ------------------------------------------- |
| `title`       | 文章标题                                    |
| `description` | 列表与页面元数据使用的摘要                  |
| `pubDatetime` | 带时区的发布日期，字段名不是 `pubDate`      |
| `modDatetime` | 可选，最近修改时间，格式同发布日期          |
| `draft`       | `true` 时不生成正式文章页、不加入列表和搜索 |
| `tags`        | 标签数组                                    |
| `featured`    | 可选，`true` 时加入首页精选                 |
| `hideToc`     | 可选，`true` 时隐藏文章目录                 |

默认时区为 `Asia/Shanghai`。未来日期的文章需要在日期到来后重新构建才会发布。文件名参与文章网址，文章发布后尽量保持文件名稳定。

公开仓库中的草稿源文件仍然公开，`draft` 只控制网站展示。

### 图片

图片放入 `public/images/`，正文通过 `/images/文件名` 引用，并与文章一起提交：

```markdown
![图片说明](/images/diagram.png)
```

## 网页写作后台

推荐接入 [Pages CMS](https://pagescms.org/docs/quick-start/)。它提供浏览器中的文章表单、富文本编辑和图片上传，将修改保存到 GitHub 仓库，沿用现有构建部署流程。

接入步骤：

1. 在仓库根目录添加 `.pages.yml`，将文章集合映射到 `src/content/posts/`。
2. 字段对齐上表，正文使用 `body` 富文本字段和 Markdown 格式；图片输入目录设为 `public/images`，输出路径设为 `/images`。
3. 设置 `settings.content.merge: true`，保留未纳入表单的已有 frontmatter 字段。
4. 打开 [app.pagescms.org](https://app.pagescms.org/)，通过 GitHub 登录，安装 GitHub App 并授权 `SZnine/SZnine.github.io`，选择 `main` 分支。
5. 保存文章后查看 GitHub Actions；构建部署完成后检查线上页面。

上述配置与授权待接入。复杂 MDX 组件内容使用源码编辑；Pages CMS 的富文本输出为 Markdown 或 HTML，MDX 通过代码字段编辑。

配置参考：[内容字段](https://pagescms.org/docs/configuration/content/) · [媒体路径](https://pagescms.org/docs/configuration/media/) · [保留已有字段](https://pagescms.org/docs/configuration/settings/) · [富文本](https://pagescms.org/docs/configuration/fields/rich-text/) · [MDX 代码字段](https://pagescms.org/docs/configuration/fields/code/)

## 常用维护位置

| 文件或目录                                    | 用途                                                   |
| --------------------------------------------- | ------------------------------------------------------ |
| `astro-paper.config.ts`                       | 站名、描述、作者、正式网址、语言、时区、功能与社交链接 |
| `src/content/posts/`                          | 文章，目前仅保留目录占位文件 `.gitkeep`                |
| `src/content/pages/about.md`                  | 关于页正文                                             |
| `src/pages/index.astro`                       | 首页内容与文章入口                                     |
| `src/pages/projects.astro`                    | 项目页正文                                             |
| `src/components/Header.astro`、`Footer.astro` | 导航和页脚                                             |
| `src/i18n/lang/zh-CN.ts`                      | 中文界面文案                                           |
| `public/`                                     | 图片、图标等静态文件                                   |
| `build-pagefind.mjs`                          | 搜索索引生成与空文章处理                               |

页面继续使用官方默认配色、Google Sans Code 字体和布局组件。字体由 Astro 在构建时获取，构建环境需能访问字体资源。默认分享图片为 `public/default-og.jpg`。

## 部署与更新

[部署工作流](./.github/workflows/deploy.yml) 在推送到 `main` 时运行，也可在 [GitHub Actions](https://github.com/SZnine/SZnine.github.io/actions) 手动触发。工作流使用 `withastro/action@v6` 执行完整 `pnpm build` 并部署 `dist/`。仓库 **Settings → Pages → Source** 使用 **GitHub Actions**。

本站地址为 <https://sznine.github.io/>，属于用户根站点，Astro 不设置仓库子路径 `base`。

使用自定义域名时，在 GitHub Pages 配置域名与 DNS，再更新 `astro-paper.config.ts` 的 `site.url` 并重新部署。迁移到项目子路径时，同时检查 `base`、图片和站内链接。

升级依赖或合并上游前，先提交当前修改；完成后运行 `pnpm build`，检查文章、搜索、明暗主题、移动端布局、RSS 和站点地图。上游版本和需留意的定制见 [UPSTREAM.md](./UPSTREAM.md)。
