const nav = require("./configs/nav");
const blogConfig = require("./configs/blog-config");
const audios = require("./configs/music");
module.exports = {
  dest: "blog",
  theme: "reco",
  base: "/vuepress-interview-github/",
  title: "CD-KNOWLEDGE-HOME",
  description: "三天摸鱼两天晒网，还有两天可以用来睡觉！",
  head: [
    ["link", { rel: "icon", href: "/assets/vue-logo.png" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#c93756" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["link", { rel: "apple-touch-icon", href: "/assets/vue-logo.png" }],
    [
      "link",
      { rel: "mask-icon", href: "/assets/vue-logo.png", color: "#c93756" },
    ],
    [
      "meta",
      { name: "msapplication-TileImage", content: "/assets/vue-logo.png" },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
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
    author: "CD",
    authorAvatar: "/assets/icon.jpg",
    type: "blog",
    navbar: true,
    sidebar: "auto",
    subSidebar: "auto",
    search: true,
    searchMaxSuggestions: 10,
    displayAllHeaders: true,
    // 你的GitHub仓库
    repo: "https://github.com/caidix",
    // 自定义仓库链接文字。
    repoLabel: "GitHub",
    nav,
    blogConfig,
    sidebarDepth: 1,
    lastUpdated: "最后更新时间",
    sidebar: {
      "/study/": [
        {
          title: "网络",
          children: ["/study/network/network.md", "/study/network/safe.md"],
        },
        {
          title: "HTML相关",
          children: ["/study/html.md"],
        },
        {
          title: "css相关",
          children: ["/study/css.md"],
        },
        {
          title: "Javascript/Typescript",
          children: [
            "/study/javascript/javascript.md",
            "/study/javascript/promise.md",
            "/study/javascript/module.md",
            "/study/javascript/event-dom.md",
            "/study/javascript/design-pattern.md",
            "/study/javascript/methods.md",
            "/study/javascript/extends.md",
            "/study/javascript/optimization.md",
            // "/study/javascript/typescript.md",
          ],
        },
        {
          title: "Vue",
          children: [
            "/study/vue/vue.md",
            "/study/vue/vue3.0.md",
            "/study/vue/vue-question.md",
            "/study/vue/vue-mounted.md",
            "/study/vue/mini-vue.md",
          ],
        },
        {
          title: "React",
          children: [
            "/study/react/react-router.md",
            "/study/react/redux.md",
          ],
        },
        {
          title: "Nodejs",
          children: ["/study/node/node.md"],
        },
        {
          title: "webpack",
          children: ["/study/webpack.md"],
        },
        {
          title: "Git",
          children: ["/study/git/git.md"],
        },
        {
          title: "算法",
          children: [
            "/study/algorithm/algorithm.md",
            "/study/algorithm/leetcode.md",
            "/study/algorithm/func.md",
          ],
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
        },
      ],
      "/views/": [""],
    },
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      require("./plugins/BgMusic"),
      {
        audios,
      },
    ],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新",
        },
      },
    ],
  ],
};
