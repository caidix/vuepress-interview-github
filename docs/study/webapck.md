以 vue-loader 为例，当 loader 接受到文件时，通过字符串匹配将其分为 3 份，模版字符串会将 
vue-loader 编译为 render 函数，script 部分会交给 babel-loader，style 部分会交给 css-loader，同时 loader 遵守单一原则，即一个 loader 只做一件事，这样可以灵活组合多个 loader，互不干扰
