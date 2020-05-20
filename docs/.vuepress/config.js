const nav = require("./nav");
module.exports = {
  base: "/vuepress-interview-github/",
  title: "cd-train-home",
  description: "Vuepress blog demo",
  head: [["link", { rel: "icon", href: "/assets/vue-logo.png" }]],

  configureWebpack: {
    resolve: {
      alias: {
        "@": "../.vuepress",
        "@assets": "./public/assets",
        "@public": "./public",
      },
    },
  },
  themeConfig: {
    logo: "/assets/icon.jpg",
    navbar: true,
    sidebar: "auto",
    search: true,
    searchMaxSuggestions: 10,
    sidebarDepth: 2,
    displayAllHeaders: true,
    // 你的GitHub仓库
    repo: "https://github.com/caidix",
    // 自定义仓库链接文字。
    repoLabel: "My GitHub",
    nav,

    sidebar: {
      "/guide/": ["" /* /guide/ */],
      "/study/": [
        "",
        {
          title: "网络",
          children: ["/study/network.md"],
        },
        {
          title: "HTML相关",
          children: ["/study/html.md"],
        },
        {
          title: "css相关",
          children: ["/study/css.md"],
        },
      ],
      "/tools/": [
        {
          title: "通用工具",
          children: ["/tools/tool.md"],
        },
        {
          title: "vue工具",
          children: ["/tools/vue-tool.md"],
        },
        {
          title: "react工具",
          children: ["/tools/react-tool.md"],
        }
      ],
    },
    plugins: ["@vuepress/back-to-top", "@vuepress/active-header-links"],
  },
};
