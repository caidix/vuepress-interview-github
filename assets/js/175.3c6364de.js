(window.webpackJsonp=window.webpackJsonp||[]).push([[175],{493:function(s,t,a){"use strict";a.r(t);var n=a(1),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[t("a",{attrs:{href:"https://www.typescriptlang.org/",target:"_blank",rel:"noopener noreferrer"}},[s._v("TypeScript"),t("OutboundLink")],1),s._v(" 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。这篇指南里我们将会学习 webpack 是如何跟 TypeScript 进行集成。")]),s._v(" "),t("h2",{attrs:{id:"基础安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基础安装"}},[s._v("#")]),s._v(" 基础安装")]),s._v(" "),t("p",[s._v("首先，执行以下命令，安装 TypeScript 编译器(compiler)和 loader：")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" --save-dev typescript ts-loader\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("现在，我们将修改目录结构和配置文件：")]),s._v(" "),t("p",[t("strong",[s._v("project")])]),s._v(" "),t("div",{staticClass:"language-diff line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-diff"}},[t("code",[t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" webpack-demo\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- package.json\n")])]),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- tsconfig.json\n")])]),t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- webpack.config.js\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- /dist\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   |- bundle.js\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   |- index.html\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- /src\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   |- index.js\n")])]),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   |- index.ts\n")])]),t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" |- /node_modules\n")])])])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("p",[t("strong",[s._v("tsconfig.json")])]),s._v(" "),t("p",[s._v("这里我们设置一个基本的配置，来支持 JSX，并将 TypeScript 编译到 ES5……")]),s._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"compilerOptions"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"outDir"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./dist/"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"noImplicitAny"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"module"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"es6"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"target"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"es5"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"jsx"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"react"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"allowJs"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("p",[s._v("查看 "),t("a",{attrs:{href:"https://www.typescriptlang.org/docs/handbook/tsconfig-json.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("TypeScript 官方文档"),t("OutboundLink")],1),s._v("了解更多关于 "),t("code",[s._v("tsconfig.json")]),s._v(" 的配置选项。")]),s._v(" "),t("p",[s._v("想要了解 webpack 配置的更多信息，请查看"),t("a",{attrs:{href:"https://www.webpackjs.com/concepts/configuration/",target:"_blank",rel:"noopener noreferrer"}},[s._v("配置相关概念"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("p",[s._v("现在让我们在 webpack 配置中处理 TypeScript：")]),s._v(" "),t("p",[t("strong",[s._v("webpack.config.js")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" path "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'path'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nmodule"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("entry")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./src/index.ts'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("module")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("rules")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("test")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("\\.tsx?$")]),t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("use")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'ts-loader'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("exclude")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("node_modules")]),t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("resolve")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("extensions")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'.tsx'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'.ts'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'.js'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("output")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("filename")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'bundle.js'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("path")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" path"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("resolve")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("__dirname"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'dist'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br")])]),t("p",[s._v("这会直接将 webpack 的入口起点指定为 "),t("code",[s._v("./index.ts")]),s._v("，然后通过 "),t("code",[s._v("ts-loader")]),s._v(" _加载"),t("em",[s._v("所有的 "),t("code",[s._v(".ts")]),s._v(" 和 "),t("code",[s._v(".tsx")]),s._v(" 文件，并且在当前目录")]),s._v("输出_一个 "),t("code",[s._v("bundle.js")]),s._v(" 文件。")]),s._v(" "),t("h2",{attrs:{id:"loader"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#loader"}},[s._v("#")]),s._v(" Loader")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/TypeStrong/ts-loader",target:"_blank",rel:"noopener noreferrer"}},[t("code",[s._v("ts-loader")]),t("OutboundLink")],1)]),s._v(" "),t("p",[s._v("在本指南中，我们使用 "),t("code",[s._v("ts-loader")]),s._v("，因为它能够很方便地启用额外的 webpack 功能，例如将其他 web 资源导入到项目中。")]),s._v(" "),t("h2",{attrs:{id:"source-map"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#source-map"}},[s._v("#")]),s._v(" source map")]),s._v(" "),t("p",[s._v("想要了解 source map 的更多信息，请查看"),t("a",{attrs:{href:"https://www.webpackjs.com/guides/development",target:"_blank",rel:"noopener noreferrer"}},[s._v("开发指南"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("p",[s._v("要启用 source map，我们必须配置 TypeScript，以将内联的 source map 输出到编译过的 JavaScript 文件。必须在 TypeScript 配置中添加下面这行：")]),s._v(" "),t("p",[t("strong",[s._v("tsconfig.json")])]),s._v(" "),t("div",{staticClass:"language-diff line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-diff"}},[t("code",[t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" {\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v('   "compilerOptions": {\n')]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v('     "outDir": "./dist/",\n')])]),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v('     "sourceMap": true,\n')])]),t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v('     "noImplicitAny": true,\n')]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v('     "module": "commonjs",\n')]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v('     "target": "es5",\n')]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v('     "jsx": "react",\n')]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v('     "allowJs": true\n')]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   }\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" }\n")])])])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("p",[s._v("现在，我们需要告诉 webpack 提取这些 source map，并内联到最终的 bundle 中。")]),s._v(" "),t("p",[t("strong",[s._v("webpack.config.js")])]),s._v(" "),t("div",{staticClass:"language-diff line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-diff"}},[t("code",[t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" const path = require('path');\n")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" module.exports = {\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   entry: './src/index.ts',\n")])]),t("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[t("span",{pre:!0,attrs:{class:"token prefix inserted"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   devtool: 'inline-source-map',\n")])]),t("span",{pre:!0,attrs:{class:"token unchanged"}},[t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   module: {\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("     rules: [\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("       {\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("         test: /\\.tsx?$/,\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("         use: 'ts-loader',\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("         exclude: /node_modules/\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("       }\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("     ]\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   },\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   resolve: {\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("     extensions: [ '.tsx', '.ts', '.js' ]\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   },\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   output: {\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("     filename: 'bundle.js',\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("     path: path.resolve(__dirname, 'dist')\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v("   }\n")]),t("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[s._v(" ")]),t("span",{pre:!0,attrs:{class:"token line"}},[s._v(" };\n")])])])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br")])]),t("p",[s._v("查看 "),t("a",{attrs:{href:"https://www.webpackjs.com/configuration/devtool/",target:"_blank",rel:"noopener noreferrer"}},[s._v("devtool 文档"),t("OutboundLink")],1),s._v("以了解更多信息。")]),s._v(" "),t("h2",{attrs:{id:"使用第三方库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用第三方库"}},[s._v("#")]),s._v(" 使用第三方库")]),s._v(" "),t("p",[s._v("当从 npm 安装第三方库时，一定要牢记同时安装这个库的类型声明文件。你可以从 "),t("a",{attrs:{href:"http://microsoft.github.io/TypeSearch/",target:"_blank",rel:"noopener noreferrer"}},[s._v("TypeSearch"),t("OutboundLink")],1),s._v(" 中找到并安装这些第三方库的类型声明文件。")]),s._v(" "),t("p",[s._v("举个例子，如果想安装 lodash 这个库的类型声明文件，我们可以运行下面的命令：")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" --save-dev @types/lodash\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("想了解更多，可以查看"),t("a",{attrs:{href:"https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/",target:"_blank",rel:"noopener noreferrer"}},[s._v("这篇文章"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("h2",{attrs:{id:"导入其他资源"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#导入其他资源"}},[s._v("#")]),s._v(" 导入其他资源")]),s._v(" "),t("p",[s._v("要在 TypeScript 里使用非代码资源，我们需要告诉 TypeScript 如何兼容这些导入类型。那么首先，我们需要在项目里创建 "),t("code",[s._v("custom.d.ts")]),s._v(" 文件，这个文件用来编写自定义的类型声明。让我们将 "),t("code",[s._v(".svg")]),s._v(" 文件进行声明设置：")]),s._v(" "),t("p",[t("strong",[s._v("custom.d.ts")])]),s._v(" "),t("div",{staticClass:"language-typescript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-typescript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("declare")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("module")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*.svg"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" content"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("any")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" content"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("这里，我们通过指定任何以 "),t("code",[s._v(".svg")]),s._v(" 结尾的导入，并将模块的 "),t("code",[s._v("content")]),s._v(" 定义为 "),t("code",[s._v("any")]),s._v("，将 SVG 声明一个新的模块。我们可以通过将类型定义为字符串，来更加显式地将它声明为一个 url。同样的理念适用于其他资源，包括 CSS, SCSS, JSON 等。")]),s._v(" "),t("h2",{attrs:{id:"构建性能"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#构建性能"}},[s._v("#")]),s._v(" 构建性能")]),s._v(" "),t("blockquote",[t("p",[s._v("这可能会降低构建性能。")])]),s._v(" "),t("p",[s._v("关于构建工具，请查看"),t("a",{attrs:{href:"https://www.webpackjs.com/guides/build-performance/",target:"_blank",rel:"noopener noreferrer"}},[s._v("构建性能"),t("OutboundLink")],1),s._v("指南。")])])}),[],!1,null,null,null);t.default=e.exports}}]);