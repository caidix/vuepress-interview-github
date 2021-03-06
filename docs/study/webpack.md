---
title: Webpack构建知识点
date: 2020-07-18
sidebar: auto
tags:
  - Webpack
categories:
  - Webpack
  - 面试
---

## webpack 优化 -- [转载](https://juejin.im/post/5e6cfdc85188254913107c1f)

> 量化

有时，我们以为的优化是负优化，这时，如果有一个量化的指标可以看出前后对比，那将会是再好不过的一件事。
speed-measure-webpack-plugin 插件可以测量各个插件和 loader 所花费的时间，使用之后，构建时，会得到类似下面这样的信息：
<img alt="smp.jpeg" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2020/3/14/170d9bf274c164c1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="341" data-height="390" src="https://user-gold-cdn.xitu.io/2020/3/14/170d9bf274c164c1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">
对比前后的信息，来确定优化的效果。
speed-measure-webpack-plugin 的使用很简单，可以直接用其来包裹 Webpack 的配置:

```javascript
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = {
  //...webpack配置
};

module.exports = smp.wrap(config);
```

1. exclude/include

可以通过 exclude/include 配置来确保转译尽可能少的文件。excldue 指定要排除的文件，include 指定要包含的文件。
exclude 的优先级高于 include，在 include 和 exclude 中使用绝对路径数组，尽量避免 exclude，更倾向于使用 include。
建议给 loader 指定 include 或是 exclude，指定其中一个即可，因为 node_modules 目录通常不需要我们去编译，排除后，有效提升编译效率。

```javascript
const path = require("path");
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
};
```

2. cache-loader

在一些性能开销较大的 loader 之前添加 cache-loader，将结果缓存中磁盘中。默认保存在 node_modueles/.cache/cache-loader 目录下。

- npm install cache-loader -D

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["cache-loader", "babel-loader"],
      },
    ],
  },
};
```

如果你跟我一样，只打算给 babel-loader 配置 cache 的话，也可以不使用 cache-loader，给 babel-loader 增加选项 cacheDirectory。
cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 Webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程。设置空值或者 true 的话，使用默认缓存目录：node_modules/.cache/babel-loader。开启 babel-loader 的缓存和配置 cache-loader，我比对了下，构建时间很接近。

3. happypack

当有大量的文件需要解析和处理的时候，wbepack 的构建会变得很慢。HappyPack 可以把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。让 webpack 在同一时刻处理多个任务，从而提升构建速度。

```javascript
const Happypack = require("happypack");
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: "Happypack/loader?id=js",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.css$/,
        use: "Happypack/loader?id=css",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules", "bootstrap", "dist"),
        ],
      },
    ],
  },
  plugins: [
    new Happypack({
      id: "js", //和rule中的id=js对应
      //将之前 rule 中的 loader 在此配置
      use: ["babel-loader"], //必须是数组
    }),
    new Happypack({
      id: "css", //和rule中的id=css对应
      use: ["style-loader", "css-loader", "postcss-loader"],
    }),
  ],
};
```

4. terser-webpack-plugin 默认开启多进程压缩优化 缓存文件在 node-modules/.cache 里。
5. HardSourceWebpackPlugin 为模块提供中间缓存，缓存默认的存放路径是: node_modules/.cache/hard-source。
6. noParse
   如果一些第三方模块没有 AMD/CommonJS 规范版本，可以使用 noParse 来标识这个模块，
   这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能 ，例如：jquery 、lodash。用法：

```javascript
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/,
  },
};
```

8. IgnorePlugin 忽略第三方指定目录
   当引入一些第三方包的时候，有的包经常会带有没有压缩的文件、各国语言的文件，比如 Select2 就会带上一排国家语言包 OwO，这个时候我们就可以使用 IgnorePlugin 在打包时忽略
   本地化内容。
   例如

```javascript
module.exports = {
    //...
    plugins: [
        //忽略 moment 下的 ./locale 目录
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        new webpack.IgnorePlugin(/^\.\/dist/js/i18n$/, /select2$/)
    ]
}

在引入时：
import moment from 'moment';
import 'moment/locale/zh-cn';// 手动引入语言包

import select2 from 'select2';
import 'select2/dist/js/i18n/zh-cn';// 手动引入语言包
```

9. DLL
10. 抽离公共代码 -- 详看打包配置

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      //分割代码块
      cacheGroups: {
        vendor: {
          //第三方依赖
          priority: 1, //设置优先级，首先抽离第三方模块
          name: "vendor",
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 1, //最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: "initial",
          name: "common",
          minSize: 100, //大小超过100个字节
          minChunks: 3, //最少引入了3次
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
};
```

## [vue-webpack5.0搭建项目](https://yyge.top/blog/2020/12/24/%E4%BB%8E%E9%9B%B6%E6%90%AD%E5%BB%BA%E5%9F%BA%E4%BA%8Ewebpack5%E7%9A%84vue%E9%A1%B9%E7%9B%AE/#%E9%A1%B9%E7%9B%AE%E4%B8%BB%E4%BE%9D%E8%B5%96)
