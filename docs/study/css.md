---
title: CSS相关知识
date: 2020-07-18
sidebar: auto
tags:
 - CSS
categories:
 - HTML/CSS
 - 面试
---

## css 特性中的 transform:translateZ(0) 有什么作用

GPU 加速， 优化前端性能

## CSS 盒模型。与低版本的 IE 盒模型有什么不同

标准的盒模型：宽度 = 内容的宽度（content）+ padding + border + margin 即 box-sizing: content-box
IE 盒模型: 宽度 = 内容宽度（content + padding + border) + marigin 即 box-sizing: border-box

## css 选择器有哪些 哪些可以被继承

css 选择器： id 选择器#，类选择器. , 标签选择器（div，h，p）, 相邻选择器（div + p), 子选择器（div>P), 后代选择器（h1 span), 通配符选择器\*，属性选择器（a[rel='external']),伪类选择器。
可继承的属性：font-size, font-family, color

不可继承的样式：border, padding, margin, width, height

优先级（就近原则）：!important > [ id > class > tag ]
元素选择符： 1
class 选择符： 10
id 选择符：100
元素标签：1000

!important 声明的样式优先级最高，如果冲突再进行计算。

如果优先级相同，则选择最后出现的样式。

继承得到的样式的优先级最低。

## css 创建一个三角形

```css
width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;
```

## 常见的兼容性问题

- 不同浏览器的标签默认的 margin 和 padding 不一样。\*{margin:0;padding:0;}

- IE6 双边距 bug：块属性标签 float 后，又有横行的 margin 情况下，在 IE6 显示 margin 比设置的大。hack：display:inline;将其转化为行内属性。

- 渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将 IE 浏览器从所有情况中分离出来。接着，再次使用“+”将 IE8 和 IE7、IE6 分离开来，这样 IE8 已经独立识别。

```
{
  background-color:#f1ee18;/*所有识别*/
  .background-color:#00deff\9; /*IE6、7、8识别*/
  +background-color:#a200ff;/*IE6、7识别*/
  _background-color:#1e0bd1;/*IE6识别*/
}
```

- 设置较小高度标签（一般小于 10px），在 IE6，IE7 中高度超出自己设置高度。hack：给超出高度的标签设置 overflow:hidden;或者设置行高 line-height 小于你设置的高度。

- IE 下，可以使用获取常规属性的方法来获取自定义属性,也可以使用 getAttribute()获取自定义属性；Firefox 下，只能使用 getAttribute()获取自定义属性。解决方法:统一通过 getAttribute()获取自定义属性。

- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

- 超链接访问过后 hover 样式就不出现了，被点击访问过的超链接样式不再具有 hover 和 active 了。解决方法是改变 CSS 属性的排列顺序:L-V-H-A ( love hate ): a:link {} a:visited {} a:hover {} a:active {}

## display:none 和 visibility:hidden 有什么区别

display:none 不显示元素，在文档布局中不再分配空间（回流+重绘）
visibility： hidden 隐藏元素 文档布局中分配空间 重绘

## position 跟 display、overflow、float 这些特性相互叠加后会怎么样？

display 属性规定元素应该生成的框的类型；position 属性规定元素的定位类型；float 属性是一种布局方式，定义元素在哪个方向浮动。
类似于优先级机制：position：absolute/fixed 优先级最高，有他们在时，float 不起作用，display 值需要调整。float 或者 absolute 定位的元素，只能是块元素或表格。

## 为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？

浮动元素脱离文档流（其 display 会自动变为 block），会导致

1. 父元素无法被撑开，影响与父元素同级关系的元素。
2. 浮动元素同级的非浮动元素（内联元素）会跟随其后
3. 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

清除浮动的方式：

1. 父级 div 定义 height
2. 最后一个浮动元素后加空 div 标签 并添加样式 clear:both。
3. 包含浮动元素的父标签添加样式 overflow 为 hidden 或 auto。
4. 父级 div 定义 zoom

## margin 和 padding 分别适合什么场景使用？

何时使用 margin：

- 需要在 border 外侧添加空白

- 空白处不需要背景色

- 上下相连的两个盒子之间的空白，需要相互抵消时。

何时使用 padding：

- 需要在 border 内侧添加空白

- 空白处需要背景颜色

- 上下相连的两个盒子的空白，希望为两者之和。

## 元素竖向的百分比设定是相对于容器的高度吗？

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。

## 怎么让 Chrome 支持小于 12px 的文字？

p{font-size:10px;-webkit-transform:scale(0.8);}

## position:fixed;在 android 下无效怎么处理？

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>

## 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 1/60＊1000ms ＝ 16.7ms。

## flex: 0 1 auto 是什么意思

flex:0 1 auto 代表弹性盒子的默认值，表示以下三者的简写

- flex-grow:放大比例。默认为 0，即如果存在剩余空间，也不放大。
- flex-shrink:缩小比例，默认为 1，即如果空间不足，该项目将缩小。
- flex-basis:分配多余空间之前占据的主轴空间，用来设置元素的宽度。如果设置了 width 和 flex-basis，那么 flex-basis 会覆盖 width 值。

## 三栏布局问题（左右固定宽度 中间自适应）

1. float + margin 浮动

```
<div class="container">
  <div class="left">Left</div>
  <!-- 右栏部分要写在中间内容之前 -->
  <div class="right">Right</div>
  <div class="main">Main</div>
</div>


.container{
  overflow: hidden;
  height: 100%;
  padding:0;
  margin: 0;
}
.left{
  float: left;
  width:100px;
}
.right {
  float: right;
  width:50px;
}
.container{
  margin-left: 100px;
  margin-right: 50px;
}
```

2. position 绝对布局

```
<div class="container">
  <div class="left">Left</div>
  <div class="main">Main</div>
  <div class="right">Right</div>
</div>


.container{
  overflow: hidden;
  height: 100%;
  padding:0;
  margin: 0;
}
.left, .right{
  position: absolute;
  top: 0;
}
.left{
  width: 100px;
}
.right {
    width:50px;
}
中间也可进行浮动定位
.container{
  margin-left: 100px;
  margin-right: 50px;
}
```

3. flex

```
<div class="container">
  <div class="left">Left</div>
  <div class="main">Main</div>
  <div class="right">Right</div>
</div>

.container{
  display: flex;
}
.left{
  width: 100px;
}
.right{
  width: 50px;
}
.main{
  flex: 1;
}
```

4. table(表格布局)

```

<div class="container">
    <div class="left">Left</div>
    <div class="main">Main</div>
    <div class="right">Right</div>
</div>


 body,html{
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
}
.container{
    display: table;
    width:100%;
}
.container>div{
    display: table-cell;
}
.left{
    width: 200px;
    background: red;
}
.main{
    background: blue;
}
.right{
    width: 200px;
    background: red;
}
```

## BFC

bfc 块级格式化上下文，是 web 页面中盒模型布局的 css 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。
BFC 形成条件：

1．　浮动元素，float 除 none 以外的值；

2．　定位元素，position（absolute，fixed）；

3．　 display 为以下其中之一的值 inline-block，table-cell，table-caption；

4．　 overflow 除了 visible 以外的值（hidden，auto，scroll）；

BFC 特性：

1.　内部的 Box 会在垂直方向上一个接一个的放置；

2.　垂直方向上的距离由 margin 决定；（解决外边距重叠问题）

3.　 bfc 的区域不会与 float 的元素区域重叠；（防止浮动文字环绕）

4.　计算 bfc 的高度时，浮动元素也参与计算；（清除浮动）

5.　 bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素；
