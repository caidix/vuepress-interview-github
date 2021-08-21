// nav
module.exports = [
  { text: "首页", link: "/" },
  {
    text: "前端",
    link: "/web/", //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
    items: [
      {
        text: "学习笔记",
        items: [
          { text: "《Vue》笔记", link: "/note/vue/" },
          { text: "TypeScript笔记", link: "/pages/51afd6/" },
          {
            text: "《TypeScript 从零实现 axios》",
            link: "/note/typescript-axios/",
          },
          { text: "Webpack笔记", link: "/note/Webpack/" },
          { text: "小程序笔记", link: "/note/wx-miniprogram/" },
          { text: "Nest框架笔记", link: "/note/nest/" },
        ],
      },
      {
        text: "JS/TS教程",
        items: [
          { text: "《现代JavaScript》教程", link: "/note/break/" },
          { text: "《TypeScript》教程", link: "/note/typescript/" },
        ],
      },
    ],
  },
  {
    text: "前端知识点",
    link: "/interview/",
    items: [
      { text: "HTMLCSS", link: "/interview/html/" },
      { text: "JavaScript", link: "/interview/js/" },
      { text: "Vue", link: "/interview/vue/" },
      { text: "TypeScript", link: "/interview/ts/" },
      { text: "React", link: "/interview/react/" },
      { text: "Node", link: "/interview/node/" },
      { text: "Webpack", link: "/interview/webpack/" },
      { text: "浏览器网络", link: "/interview/browser/" },
    ],
  },
  {
    text: "工具方法",
    link: "/tools/",
    items: [
      { text: "技术文档", link: "/pages/9a7ee40fc232253e/" },
      { text: "GitHub技巧", link: "/pages/4c778760be26d8b3/" },
      { text: "常用方法", link: "/pages/6aa903/" },
    ],
  },
  {
    text: "收藏",
    link: "/pages/beb6c0bd8a66cea6/",
    items: [
      { text: "网站", link: "/pages/beb6c0bd8a66cea6/" },
      { text: "资源", link: "/pages/eee83a9211a70f9d/" },
      { text: "Vue资源", link: "/pages/12df8ace52d493f6/" },
    ],
  },
  {
    text: "索引",
    link: "/archives/",
    items: [
      { text: "分类", link: "/categories/" },
      { text: "标签", link: "/tags/" },
      { text: "归档", link: "/archives/" },
    ],
  },
];
