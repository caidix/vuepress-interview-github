module.exports = [
  { text: "Home", link: "/", icon: "reco-home" },
  {
    text: "前端知识",
    link: "/study/network/network.md",
    icon: "reco-document",
  },
  {
    text: "小组件库",
    link: "/tools/tool.md",
    icon: "reco-menu",
  },
  { text: "时间轴", link: "/timeline/", icon: "reco-date" },
  {
    text: "工具箱",
    icon: "reco-other",
    items: [
      {
        text: "优秀外链博文空间",
        link: "/views/",
      },
      {
        text: "在线编辑",
        items: [{ text: "图片压缩", link: "https://tinypng.com/" }],
      },
      {
        text: "在线服务",
        items: [
          { text: "阿里云", link: "https://www.aliyun.com/" },
          { text: "腾讯云", link: "https://cloud.tencent.com/" },
        ],
      },
      {
        text: "博客指南",
        items: [
          { text: "掘金", link: "https://juejin.im/" },
          { text: "CSDN", link: "https://blog.csdn.net/" },
        ],
      },
    ],
  },
];
