import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://sznine.github.io/",
    title: "Koi · 技术手记",
    description: "",
    author: "Koi",
    ogImage: "default-og.jpg",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: { perPage: 4, perIndex: 4 },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
    toc: true,
  },
  // 在这里添加自己的社交链接，如 { name: "github", url: "https://github.com/你的用户名" }。
  socials: [],
  shareLinks: [],
});
