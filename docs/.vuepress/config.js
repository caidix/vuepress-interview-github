module.exports = {
  base: "/vuepress-interview-github/",
  title: "cd-train-home",
  description: "Vuepress blog demo",
  head: [["link", { rel: "icon", href: "/assets/vue-logo.png" }]],
  themeConfig: {
    logo: "/assets/icon.jpg",
    navbar: true,
    sidebar: "auto",
    search: true,
    searchMaxSuggestions: 10,
    // 你的GitHub仓库
    repo: "https://github.com/caidix",
    // 自定义仓库链接文字。
    repoLabel: "My GitHub",
    nav: [
      { text: "Home", link: "/" },
      { text: "前端知识", link: "/study/" },
    ],
    sidebar: {
      "/": [""],
      "/study/": [
        "",
        {
          title: "前端知识集合", // 必要的
          collapsable: false,
          children: ["/network/network.md"],
        },
      ],
    },
  },
};
