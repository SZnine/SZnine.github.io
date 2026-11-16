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
draft: false
tags: []
---
```

填写标题、摘要和正文，将 `pubDatetime` 改为实际发布日期，然后提交并推送。暂存文章时将 `draft` 设为 `true`，准备发布时再改回 `false`。

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

默认时区为 `Asia/Shanghai`。日期支持 YAML 日期值和带引号的 ISO 日期字符串；可选的 `modDatetime` 可以留空。未来日期的文章需要在日期到来后重新构建才会发布。文件名参与文章网址，文章发布后保持文件名稳定。

公开仓库中的草稿源文件仍然公开，`draft` 只控制网站展示。

### 图片

图片放入 `public/images/`，正文通过 `/images/文件名` 引用，并与文章一起提交：

```markdown
![图片说明](/images/diagram.png)
```

## 网页写作后台

已接入 [Pages CMS](https://app.pagescms.org/)，后台提供文章、关于和图片三个入口。

1. 登录后打开 `SZnine/SZnine.github.io`，选择 `main` 分支。
2. 在「文章」中新建或编辑文章，填写标题、摘要和正文。发布日期默认当前本地时间，更新日期按需填写，标签可自由添加多个。
3. 在正文编辑器或「图片」中上传图片，保存位置为 `public/images/`，正文引用路径为 `/images/…`。
4. 保存后，[GitHub Actions](https://github.com/SZnine/SZnine.github.io/actions) 自动构建并发布；部署成功后查看线上页面。

草稿默认关闭，保存文章即进入发布流程；需要暂存时打开「草稿」。新文章默认使用时间戳文件名，避免中文标题生成空文件名。首次创建时可改为英文短名称；之后编辑标题保持原文件名与网址不变。

正文使用 Markdown 富文本编辑器，可切换到源码模式。含组件的 `.mdx` 文件在本地编辑，不纳入当前后台文章列表。「关于」入口只编辑正文，保留已有页面元数据。

后台配置位于 [`.pages.yml`](./.pages.yml)，文章目录对应 `src/content/posts/`。`settings.content.merge: true` 保留未纳入表单的 frontmatter 字段，日期 schema 同时兼容 CMS 写入的字符串与本地 YAML 日期值。

配置参考：[内容字段](https://pagescms.org/docs/configuration/content/) · [文件名](https://pagescms.org/docs/configuration/content/filename/) · [日期](https://pagescms.org/docs/configuration/fields/date/) · [媒体路径](https://pagescms.org/docs/configuration/media/) · [保留已有字段](https://pagescms.org/docs/configuration/settings/)

## 常用维护位置

| 文件或目录                                    | 用途                                                   |
| --------------------------------------------- | ------------------------------------------------------ |
| `astro-paper.config.ts`                       | 站名、描述、作者、正式网址、语言、时区、功能与社交链接 |
| `src/content/posts/`                          | Markdown / MDX 文章                                    |
| `.pages.yml`                                  | Pages CMS 的文章、关于页和图片配置                     |
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
