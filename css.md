- 1
  W3C 的标准盒模型
  width = content，不包含 border + padding
  IE 盒模型
  width = border + padding + content
  相互转换
  二者之间可以通过 CSS3 的 box-sizing 属性来转换。
  box-sizing: content-box 是 W3C 盒模型
  box-sizing: border-box 是 IE 盒模型

- 2
  css 的文档流

假如说设置了
float
position:absolue/fixed
便脱离了文档流，失去了文档流的特点：自动分配空间的流动性。

在文档流中
代表文档流的元素默认宽度不是 100%，而是 width：auto，它们的 margin、border、padding 可以自动分配空间

/_ 1、垂直居中的四种方法 _/

 <div class="outer">
    <div class="inner"></div>
</div>

.out {

<!-- /_ 宽高已知 _/ -->

display: flex;
justify-content: center;
align-items: center;
}

<!-- 宽高已知，使用绝对定位 -->

.out{
position:relative
}
.inner{
position:absolute
left:50%
top:50%
height:100px;
width:100px;
margin-left:-50px;
margin-top:-50px;
}

<!-- 宽高已知，使用margin auto -->

.out{
position: relative;
}

.inner{
position:absolute;
left:0px;
right:0px;
top:0px;
bottom:0px;
margin:auto;
width:100px;
height:100px;
}

<!-- /_ 2,宽高未知 _/ -->

.outer{
position:relative
}
.inner{
position:absolute
left:50%;
top:50%
transform:translate(-50%,-50%)
}

<!-- 三栏布局 -->

<div class="container">
    <div class="left">left</div>
    <div class="main">main</div>
    <div class="right">right</div>
</div>

<!-- 三栏flex布局 -->

.container{
display: flex;
}
.left{
flex-basis:200px;
background: green;
}
.main{
flex: 1;
background: red;
}
.right{
flex-basis:200px;
background: green;
}

<!-- 三栏margin布局 -->

.left,.right{
position: absolute;
top: 0;
background: red;
}
.left{
left: 0;
width: 200px;
}
.right{
right: 0;
width: 200px;
}
.main{
margin: 0 200px ;
background: green;
}

<!-- 三栏float布局 -->

.left{
float:left;
width:200px;
background:red;
}
.main{
margin:0 200px;
background: green;
}
.right{
float:right;
width:200px;
background:red;
}

<!-- 4 两条外边框border的实现 -->
<!-- 方法一 boxshadow的方法 -->

background: yellowgreen;
box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink;

<!-- 方法二 outline和border结合 -->

background: yellowgreen;
border: 10px solid #655;
outline: 15px solid deeppink;

<!--5 flex在RN与web中的区别 -->

direction
(1) Web 端
需要设置 display: flex
主轴方向默认水平向右。
RN 端默认值为 row。
(2) RN 端
元素的 display 属性取值为 flex 和 none，默认为 flex。
主轴方向默认竖直向下。
RN 端默认值为 column。

flex-wrap
RN 端属性取值没有 wrap-reverse。

align-item
(1) Web 端
baseline 项目的第一行文字的基线对齐
(2) RN 端
RN 端 baseline 属性值的表现为项目底边对齐。

align-content
(1) Web 端
stretch（默认值）轴线占满整个交叉轴。
(2) RN 端
RN 端默认属性值为 flex-start。

flex
RN 端与 Web 端差异
(1) flex 属性的表现与 Web 端不同，取值只能为数字。
(2) flex 属性并不简单是 flex-grow/shrink/basis 的简化
(3) flex 默认值为 0，表示项目保持原始尺寸，且总是不可伸缩。
(4) 若 flex 取值为-1，则表示项目保持原始尺寸，但当容器尺寸不够时，缩小到 minWidth 或 minHeight。
(5) 若 flex 取值为 n(n>=1)，则按照 flex 值的比例分配剩余空间，剩余空间指的是容器尺寸减去 flex 值为 0 或-1 项目的尺寸。
