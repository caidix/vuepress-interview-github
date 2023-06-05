(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{474:function(v,e,_){"use strict";_.r(e);var o=_(1),t=Object(o.a)({},(function(){var v=this,e=v._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("p",[v._v("此选项控制是否生成，以及如何生成 source map。")]),v._v(" "),e("p",[v._v("使用 "),e("a",{attrs:{href:"https://www.webpackjs.com/plugins/source-map-dev-tool-plugin",target:"_blank",rel:"noopener noreferrer"}},[e("code",[v._v("SourceMapDevToolPlugin")]),e("OutboundLink")],1),v._v(" 进行更细粒度的配置。查看 "),e("a",{attrs:{href:"https://www.webpackjs.com/loaders/source-map-loader",target:"_blank",rel:"noopener noreferrer"}},[e("code",[v._v("source-map-loader")]),e("OutboundLink")],1),v._v(" 来处理已有的 source map。")]),v._v(" "),e("h2",{attrs:{id:"devtool"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#devtool"}},[v._v("#")]),v._v(" "),e("code",[v._v("devtool")])]),v._v(" "),e("blockquote",[e("p",[e("code",[v._v("type")]),v._v(": "),e("code",[v._v("string")]),v._v(" "),e("code",[v._v("false")])])]),v._v(" "),e("p",[v._v("选择一种 "),e("a",{attrs:{href:"http://blog.teamtreehouse.com/introduction-source-maps",target:"_blank",rel:"noopener noreferrer"}},[v._v("source map"),e("OutboundLink")],1),v._v(" 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。")]),v._v(" "),e("blockquote",[e("p",[e("em",[v._v("webpack 仓库中包含一个")]),v._v(" "),e("a",{attrs:{href:"https://github.com/webpack/webpack/tree/master/examples/source-map",target:"_blank",rel:"noopener noreferrer"}},[v._v("显示所有 "),e("code",[v._v("devtool")]),v._v(" 变体效果的示例"),e("OutboundLink")],1),e("em",[v._v("。这些例子或许会有助于你理解这些差异之处。")])])]),v._v(" "),e("blockquote",[e("p",[e("em",[v._v("你可以直接使用")]),v._v(" "),e("code",[v._v("SourceMapDevToolPlugin")]),e("em",[v._v("/")]),e("code",[v._v("EvalSourceMapDevToolPlugin")]),v._v(" "),e("em",[v._v("来替代使用")]),v._v(" "),e("code",[v._v("devtool")]),v._v(" "),e("em",[v._v("选项，因为它有更多的选项。切勿同时使用")]),v._v(" "),e("code",[v._v("devtool")]),v._v(" "),e("em",[v._v("选项和")]),v._v(" "),e("code",[v._v("SourceMapDevToolPlugin")]),e("em",[v._v("/")]),e("code",[v._v("EvalSourceMapDevToolPlugin")]),v._v(" "),e("em",[v._v("插件。")]),e("code",[v._v("devtool")]),v._v(" "),e("em",[v._v("选项在内部添加过这些插件，所以你最终将应用两次插件。")])])]),v._v(" "),e("table",[e("thead",[e("tr",[e("th",[v._v("devtool")]),v._v(" "),e("th",[v._v("构建速度")]),v._v(" "),e("th",[v._v("重新构建速度")]),v._v(" "),e("th",[v._v("生产环境")]),v._v(" "),e("th",[v._v("品质(quality)")])])]),v._v(" "),e("tbody",[e("tr",[e("td",[v._v("(none)")]),v._v(" "),e("td",[v._v("+++")]),v._v(" "),e("td",[v._v("+++")]),v._v(" "),e("td",[v._v("yes")]),v._v(" "),e("td",[v._v("打包后的代码")])]),v._v(" "),e("tr",[e("td",[v._v("eval")]),v._v(" "),e("td",[v._v("+++")]),v._v(" "),e("td",[v._v("+++")]),v._v(" "),e("td",[v._v("no")]),v._v(" "),e("td",[v._v("生成后的代码")])]),v._v(" "),e("tr",[e("td",[v._v("cheap-eval-source-map")]),v._v(" "),e("td",[v._v("+")]),v._v(" "),e("td",[v._v("++")]),v._v(" "),e("td",[v._v("no")]),v._v(" "),e("td",[v._v("转换过的代码（仅限行）")])]),v._v(" "),e("tr",[e("td",[v._v("cheap-module-eval-source-map")]),v._v(" "),e("td",[v._v("o")]),v._v(" "),e("td",[v._v("++")]),v._v(" "),e("td",[v._v("no")]),v._v(" "),e("td",[v._v("原始源代码（仅限行）")])]),v._v(" "),e("tr",[e("td",[v._v("eval-source-map")]),v._v(" "),e("td",[v._v("--")]),v._v(" "),e("td",[v._v("+")]),v._v(" "),e("td",[v._v("no")]),v._v(" "),e("td",[v._v("原始源代码")])]),v._v(" "),e("tr",[e("td",[v._v("cheap-source-map")]),v._v(" "),e("td",[v._v("+")]),v._v(" "),e("td",[v._v("o")]),v._v(" "),e("td",[v._v("no")]),v._v(" "),e("td",[v._v("转换过的代码（仅限行）")])]),v._v(" "),e("tr",[e("td",[v._v("cheap-module-source-map")]),v._v(" "),e("td",[v._v("o")]),v._v(" "),e("td",[v._v("-")]),v._v(" "),e("td",[v._v("no")]),v._v(" "),e("td",[v._v("原始源代码（仅限行）")])]),v._v(" "),e("tr",[e("td",[v._v("inline-cheap-source-map")]),v._v(" "),e("td",[v._v("+")]),v._v(" "),e("td",[v._v("o")]),v._v(" "),e("td",[v._v("no")]),v._v(" "),e("td",[v._v("转换过的代码（仅限行）")])]),v._v(" "),e("tr",[e("td",[v._v("inline-cheap-module-source-map")]),v._v(" "),e("td",[v._v("o")]),v._v(" "),e("td",[v._v("-")]),v._v(" "),e("td",[v._v("no")]),v._v(" "),e("td",[v._v("原始源代码（仅限行）")])]),v._v(" "),e("tr",[e("td",[v._v("source-map")]),v._v(" "),e("td",[v._v("--")]),v._v(" "),e("td",[v._v("--")]),v._v(" "),e("td",[v._v("yes")]),v._v(" "),e("td",[v._v("原始源代码")])]),v._v(" "),e("tr",[e("td",[v._v("inline-source-map")]),v._v(" "),e("td",[v._v("--")]),v._v(" "),e("td",[v._v("--")]),v._v(" "),e("td",[v._v("no")]),v._v(" "),e("td",[v._v("原始源代码")])]),v._v(" "),e("tr",[e("td",[v._v("hidden-source-map")]),v._v(" "),e("td",[v._v("--")]),v._v(" "),e("td",[v._v("--")]),v._v(" "),e("td",[v._v("yes")]),v._v(" "),e("td",[v._v("原始源代码")])]),v._v(" "),e("tr",[e("td",[v._v("nosources-source-map")]),v._v(" "),e("td",[v._v("--")]),v._v(" "),e("td",[v._v("--")]),v._v(" "),e("td",[v._v("yes")]),v._v(" "),e("td",[v._v("无源代码内容")])])])]),v._v(" "),e("blockquote",[e("p",[e("code",[v._v("+++")]),v._v(" "),e("em",[v._v("非常快速,")]),v._v(" "),e("code",[v._v("++")]),v._v(" "),e("em",[v._v("快速,")]),v._v(" "),e("code",[v._v("+")]),v._v(" "),e("em",[v._v("比较快,")]),v._v(" "),e("code",[v._v("o")]),v._v(" "),e("em",[v._v("中等,")]),v._v(" "),e("code",[v._v("-")]),v._v(" "),e("em",[v._v("比较慢,")]),v._v(" "),e("code",[v._v("--")]),v._v(" "),e("em",[v._v("慢")])])]),v._v(" "),e("p",[v._v("其中一些值适用于开发环境，一些适用于生产环境。对于开发环境，通常希望更快速的 source map，需要添加到 bundle 中以增加体积为代价，但是对于生产环境，则希望更精准的 source map，需要从 bundle 中分离并独立存在。")]),v._v(" "),e("blockquote",[e("p",[e("em",[v._v("查看")]),v._v(" "),e("a",{attrs:{href:"https://www.webpackjs.com/configuration/output#output-sourcemapfilename",target:"_blank",rel:"noopener noreferrer"}},[e("code",[v._v("output.sourceMapFilename")]),e("OutboundLink")],1),v._v(" "),e("em",[v._v("自定义生成的 source map 的文件名。")])])]),v._v(" "),e("h2",{attrs:{id:"品质说明-quality"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#品质说明-quality"}},[v._v("#")]),v._v(" 品质说明("),e("code",[v._v("quality")]),v._v(")")]),v._v(" "),e("p",[v._v("打包后的代码 - 将所有生成的代码视为一大块代码。你看不到相互分离的模块。")]),v._v(" "),e("p",[v._v("生成后的代码 - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 生成的代码。示例：你会看到类似 "),e("code",[v._v("var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();")]),v._v("，而不是 "),e("code",[v._v('import {test} from "module"; test();')]),v._v("。")]),v._v(" "),e("p",[v._v("转换过的代码 - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 转换前、loader 转译后的代码。示例：你会看到类似 "),e("code",[v._v('import {test} from "module"; var A = function(_test) { ... }(test);')]),v._v("，而不是 "),e("code",[v._v('import {test} from "module"; class A extends test {}')]),v._v("。")]),v._v(" "),e("p",[v._v("原始源代码 - 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。")]),v._v(" "),e("p",[v._v("无源代码内容 - source map 中不包含源代码内容。浏览器通常会尝试从 web 服务器或文件系统加载源代码。你必须确保正确设置 "),e("a",{attrs:{href:"https://www.webpackjs.com/configuration/output/#output-devtoolmodulefilenametemplate",target:"_blank",rel:"noopener noreferrer"}},[e("code",[v._v("output.devtoolModuleFilenameTemplate")]),e("OutboundLink")],1),v._v("，以匹配源代码的 url。")]),v._v(" "),e("p",[v._v("（仅限行） - source map 被简化为每行一个映射。这通常意味着每个语句只有一个映射（假设你使用这种方式）。这会妨碍你在语句级别上调试执行，也会妨碍你在每行的一些列上设置断点。与压缩后的代码组合后，映射关系是不可能实现的，因为压缩工具通常只会输出一行。")]),v._v(" "),e("h2",{attrs:{id:"对于开发环境"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#对于开发环境"}},[v._v("#")]),v._v(" 对于开发环境")]),v._v(" "),e("p",[v._v("以下选项非常适合开发环境：")]),v._v(" "),e("p",[e("code",[v._v("eval")]),v._v(" - 每个模块都使用 "),e("code",[v._v("eval()")]),v._v(" 执行，并且都有 "),e("code",[v._v("//@ sourceURL")]),v._v("。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数。")]),v._v(" "),e("p",[e("code",[v._v("eval-source-map")]),v._v(" - 每个模块使用 "),e("code",[v._v("eval()")]),v._v(" 执行，并且 source map 转换为 DataUrl 后添加到 "),e("code",[v._v("eval()")]),v._v(" 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。")]),v._v(" "),e("p",[e("code",[v._v("cheap-eval-source-map")]),v._v(" - 类似 "),e("code",[v._v("eval-source-map")]),v._v("，每个模块使用 "),e("code",[v._v("eval()")]),v._v(' 执行。这是 "cheap(低开销)" 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。它会忽略源自 loader 的 source map，并且仅显示转译后的代码，就像 '),e("code",[v._v("eval")]),v._v(" devtool。")]),v._v(" "),e("p",[e("code",[v._v("cheap-module-eval-source-map")]),v._v(" - 类似 "),e("code",[v._v("cheap-eval-source-map")]),v._v("，并且，在这种情况下，源自 loader 的 source map 会得到更好的处理结果。然而，loader source map 会被简化为每行一个映射(mapping)。")]),v._v(" "),e("h2",{attrs:{id:"特定场景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#特定场景"}},[v._v("#")]),v._v(" 特定场景")]),v._v(" "),e("p",[v._v("以下选项对于开发环境和生产环境并不理想。他们是一些特定场景下需要的，例如，针对一些第三方工具。")]),v._v(" "),e("p",[e("code",[v._v("inline-source-map")]),v._v(" - source map 转换为 DataUrl 后添加到 bundle 中。")]),v._v(" "),e("p",[e("code",[v._v("cheap-source-map")]),v._v(" - 没有列映射(column mapping)的 source map，忽略 loader source map。")]),v._v(" "),e("p",[e("code",[v._v("inline-cheap-source-map")]),v._v(" - 类似 "),e("code",[v._v("cheap-source-map")]),v._v("，但是 source map 转换为 DataUrl 后添加到 bundle 中。")]),v._v(" "),e("p",[e("code",[v._v("cheap-module-source-map")]),v._v(" - 没有列映射(column mapping)的 source map，将 loader source map 简化为每行一个映射(mapping)。")]),v._v(" "),e("p",[e("code",[v._v("inline-cheap-module-source-map")]),v._v(" - 类似 "),e("code",[v._v("cheap-module-source-map")]),v._v("，但是 source mapp 转换为 DataUrl 添加到 bundle 中。")]),v._v(" "),e("h2",{attrs:{id:"对于生成环境"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#对于生成环境"}},[v._v("#")]),v._v(" 对于生成环境")]),v._v(" "),e("p",[v._v("这些选项通常用于生产环境中：")]),v._v(" "),e("p",[e("code",[v._v("(none)")]),v._v("（省略 "),e("code",[v._v("devtool")]),v._v(" 选项） - 不生成 source map。这是一个不错的选择。")]),v._v(" "),e("p",[e("code",[v._v("source-map")]),v._v(" - 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。")]),v._v(" "),e("blockquote",[e("p",[e("em",[v._v("你应该将你的服务器配置为，不允许普通用户访问 source map 文件！")])])]),v._v(" "),e("p",[e("code",[v._v("hidden-source-map")]),v._v(" - 与 "),e("code",[v._v("source-map")]),v._v(" 相同，但不会为 bundle 添加引用注释。如果你只想 source map 映射那些源自错误报告的错误堆栈跟踪信息，但不想为浏览器开发工具暴露你的 source map，这个选项会很有用。")]),v._v(" "),e("blockquote",[e("p",[v._v("你不应将 source map 文件部署到 web 服务器。而是只将其用于错误报告工具。")])]),v._v(" "),e("p",[e("code",[v._v("nosources-source-map")]),v._v(" - 创建的 source map 不包含 "),e("code",[v._v("sourcesContent(源代码内容)")]),v._v("。它可以用来映射客户端上的堆栈跟踪，而无须暴露所有的源代码。你可以将 source map 文件部署到 web 服务器。")]),v._v(" "),e("blockquote",[e("p",[v._v("这仍然会暴露反编译后的文件名和结构，但它不会暴露原始代码。")])]),v._v(" "),e("blockquote",[e("p",[e("em",[v._v("在使用")]),v._v(" "),e("code",[v._v("uglifyjs-webpack-plugin")]),v._v(" "),e("em",[v._v("时，你必须提供")]),v._v(" "),e("code",[v._v("sourceMap：true")]),v._v(" "),e("em",[v._v("选项来启用 source map 支持。")])])])])}),[],!1,null,null,null);e.default=t.exports}}]);