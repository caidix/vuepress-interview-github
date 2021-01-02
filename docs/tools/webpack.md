# webpack
## webpack优化 -- [转载](https://juejin.im/post/5e6cfdc85188254913107c1f)

### 量化
有时，我们以为的优化是负优化，这时，如果有一个量化的指标可以看出前后对比，那将会是再好不过的一件事。
speed-measure-webpack-plugin 插件可以测量各个插件和loader所花费的时间，使用之后，构建时，会得到类似下面这样的信息：
<img alt="smp.jpeg" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2020/3/14/170d9bf274c164c1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="341" data-height="390" src="https://user-gold-cdn.xitu.io/2020/3/14/170d9bf274c164c1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">
对比前后的信息，来确定优化的效果。
speed-measure-webpack-plugin 的使用很简单，可以直接用其来包裹 Webpack 的配置:

```javascript
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = {
    //...webpack配置
}

module.exports = smp.wrap(config);
```

### exclude/include
可以通过exclude/include配置来确保转译尽可能少的文件。excldue指定要排除的文件，include指定要包含的文件。
exclude 的优先级高于 include，在 include 和 exclude 中使用绝对路径数组，尽量避免 exclude，更倾向于使用 include。
建议给 loader 指定 include 或是 exclude，指定其中一个即可，因为 node_modules 目录通常不需要我们去编译，排除后，有效提升编译效率。

```javascript
const path = require('path')
module.exports = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
            presets: ["@babel/preset-env"]
        }
      },
      include: [path.resolve(__dirname, 'src')]
    }]
  }
}
```

### cache-loader
在一些性能开销较大的 loader 之前添加 cache-loader，将结果缓存中磁盘中。默认保存在 node_modueles/.cache/cache-loader 目录下。
- npm install cache-loader -D

```javascript
module.exports = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['cache-loader', 'babel-loader']
    }]
  }
}
```
如果你跟我一样，只打算给 babel-loader 配置 cache 的话，也可以不使用 cache-loader，给 babel-loader 增加选项 cacheDirectory。
cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 Webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程。设置空值或者 true 的话，使用默认缓存目录：node_modules/.cache/babel-loader。开启 babel-loader的缓存和配置 cache-loader，我比对了下，构建时间很接近。

### happypack
当有大量的文件需要解析和处理的时候，wbepack的构建会变得很慢。HappyPack可以把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。让webpack在同一时刻处理多个任务，从而提升构建速度。
```javascript
const Happypack = require('happypack');
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'Happypack/loader?id=js',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                use: 'Happypack/loader?id=css',
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                ]
            }
        ]
    },
    plugins: [
        new Happypack({
            id: 'js', //和rule中的id=js对应
            //将之前 rule 中的 loader 在此配置
            use: ['babel-loader'] //必须是数组
        }),
        new Happypack({
            id: 'css',//和rule中的id=css对应
            use: ['style-loader', 'css-loader','postcss-loader'],
        })
    ]
}

```