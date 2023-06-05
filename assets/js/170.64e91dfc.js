(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{487:function(s,t,n){"use strict";n.r(t);var e=n(1),a=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("blockquote",[t("p",[s._v("本指南的继承自"),t("a",{attrs:{href:"https://www.webpackjs.com/guides/code-splitting",target:"_blank",rel:"noopener noreferrer"}},[s._v("代码分离"),t("OutboundLink")],1),s._v("。如果你尚未阅读该指南，请先行阅读。")])]),s._v(" "),t("p",[s._v("懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。")]),s._v(" "),t("h2",{attrs:{id:"示例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[s._v("#")]),s._v(" 示例")]),s._v(" "),t("p",[s._v("我们在"),t("a",{attrs:{href:"https://www.webpackjs.com/guides/code-splitting#dynamic-imports",target:"_blank",rel:"noopener noreferrer"}},[s._v("代码分离"),t("OutboundLink")],1),s._v("中的例子基础上，进一步做些调整来说明这个概念。那里的代码确实会在脚本运行的时候产生一个分离的代码块 "),t("code",[s._v("lodash.bundle.js")]),s._v(" ，在技术概念上“懒加载”它。问题是加载这个包并不需要用户的交互 -- 意思是每次加载页面的时候都会请求它。这样做并没有对我们有很多帮助，还会对性能产生负面影响。")]),s._v(" "),t("p",[s._v("我们试试不同的做法。我们增加一个交互，当用户点击按钮的时候用 console 打印一些文字。但是会等到第一次交互的时候再加载那个代码块（"),t("code",[s._v("print.js")]),s._v("）。为此，我们返回到代码分离的例子中，把 "),t("code",[s._v("lodash")]),s._v(" 放到主代码块中，重新运行"),t("em",[s._v("代码分离")]),s._v("中的代码 "),t("a",{attrs:{href:"https://www.webpackjs.com/guides/code-splitting#dynamic-imports",target:"_blank",rel:"noopener noreferrer"}},[s._v("final "),t("em",[s._v("Dynamic Imports")]),s._v(" example"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("p",[t("strong",[s._v("project")])]),s._v(" "),t("div",{staticClass:"language-diff line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-diff"}},[t("code",[s._v("webpack-demo\n|- package.json\n|- webpack.config.js\n|- /dist\n|- /src\n"),t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- index.js\n")])]),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- print.js\n")])]),s._v("|- /node_modules\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("p",[t("strong",[t("code",[s._v("src/print.js")])])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'The print.js module has loaded! See the network tab in dev tools...'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Button Clicked: Here\\'s \"some text\"!'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[t("strong",[t("code",[s._v("src/index.js")])])]),s._v(" "),t("div",{staticClass:"language-diff line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-diff"}},[t("code",[t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" import _ from 'lodash';\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("\n")])]),t("span",{pre:!0,attrs:{class:"token deleted-sign deleted"}},[t("span",{pre:!0,attrs:{class:"token prefix deleted"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" async function getComponent() {\n")])]),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" function component() {\n")])]),t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   var element = document.createElement('div');\n")])]),t("span",{pre:!0,attrs:{class:"token deleted-sign deleted"}},[t("span",{pre:!0,attrs:{class:"token prefix deleted"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   const _ = await import(/* webpackChunkName: \"lodash\" */ 'lodash');\n")])]),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   var button = document.createElement('button');\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   var br = document.createElement('br');\n")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   button.innerHTML = 'Click me and look at the console!';\n")])]),t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   element.innerHTML = _.join(['Hello', 'webpack'], ' ');\n")])]),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   element.appendChild(br);\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   element.appendChild(button);\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   // Note that because a network request is involved, some indication\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   // of loading would need to be shown in a production-level site/app.\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   button.onclick = e => import(/* webpackChunkName: \"print\" */ './print').then(module => {\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("     var print = module.default;\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("     print();\n")]),t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   });\n")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   return element;\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" }\n")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token deleted-sign deleted"}},[t("span",{pre:!0,attrs:{class:"token prefix deleted"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" getComponent().then(component => {\n")]),t("span",{pre:!0,attrs:{class:"token prefix deleted"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   document.body.appendChild(component);\n")]),t("span",{pre:!0,attrs:{class:"token prefix deleted"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" });\n")])]),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" document.body.appendChild(component());\n")])])])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br")])]),t("blockquote",[t("p",[s._v("注意当调用 "),t("code",[s._v("ES6")]),s._v(" 模块的 "),t("code",[s._v("import()")]),s._v(" 方法（引入模块）时，必须指向模块的 "),t("code",[s._v(".default")]),s._v(" 值，因为它才是 promise 被处理后返回的实际的 "),t("code",[s._v("module")]),s._v(" 对象。")])]),s._v(" "),t("p",[s._v("现在运行 "),t("code",[s._v("webpack")]),s._v(" 来验证一下我们的懒加载功能：")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("Hash: e0f95cc0bda81c2a1340\nVersion: webpack "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.0")]),s._v(".0\nTime: 1378ms\n          Asset       Size  Chunks                    Chunk Names\nprint.bundle.js  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("417")]),s._v(" bytes       "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("emitted"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("         print\nindex.bundle.js     "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("548")]),s._v(" kB       "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("emitted"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("big"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("  index\n     index.html  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("189")]),s._v(" bytes          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("emitted"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" ./src/index.js "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("742")]),s._v(" bytes "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("built"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("webpack"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/buildin/global.js "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("509")]),s._v(" bytes "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("built"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("webpack"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/buildin/module.js "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("517")]),s._v(" bytes "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("built"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" ./src/print.js "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("165")]),s._v(" bytes "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("built"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n    + "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" hidden module\nChild html-webpack-plugin "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"index.html"')]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v("\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("webpack"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/buildin/global.js "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("509")]),s._v(" bytes "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("built"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("webpack"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/buildin/module.js "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("517")]),s._v(" bytes "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("built"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n        + "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" hidden modules\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br")])]),t("h2",{attrs:{id:"框架"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#框架"}},[s._v("#")]),s._v(" 框架")]),s._v(" "),t("p",[s._v("许多框架和类库对于如何用它们自己的方式来实现（懒加载）都有自己的建议。这里有一些例子：")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("React")]),s._v(": "),t("a",{attrs:{href:"https://reacttraining.com/react-router/web/guides/code-splitting",target:"_blank",rel:"noopener noreferrer"}},[s._v("Code Splitting and Lazy Loading"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("code",[s._v("Vue")]),s._v(": "),t("a",{attrs:{href:"https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Lazy Load in Vue using Webpack's code splitting"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("code",[s._v("AngularJS")]),s._v(": "),t("a",{attrs:{href:"https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd",target:"_blank",rel:"noopener noreferrer"}},[s._v("AngularJS + Webpack = lazyLoad"),t("OutboundLink")],1),s._v(" by "),t("a",{attrs:{href:"https://twitter.com/var_bincom",target:"_blank",rel:"noopener noreferrer"}},[s._v("@var_bincom"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=a.exports}}]);