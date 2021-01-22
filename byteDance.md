1. this 指向题
2. 闭包题
   ```
   function setFn(){
     let x=0
     return function(){
       x+=1
        console.log(x)
     }
   }
   const fn1 = setFn()
   const fn2 = setFn()
   ```

fn1()
fn2()
fn1()
fn2()

```

3. 实现一个功能


// 实现这样一个 element 方法
var el = require("./element.js");

    var ul = el('div',{id:'virtual-dom'},[
      el('p',{},['Virtual DOM']),
      el('ul', { id: 'list' }, [
      el('li', { class: 'item' }, ['Item 1']),
      el('li', { class: 'item' }, ['Item 2']),
      el('li', { class: 'item' }, ['Item 3'])
      ]),
      el('div',{},['Hello World'])
    ])

document.body.appendChild(ul.render())
通过调用 render 方法，将元素渲染到页面

// 掘金上有该题目的分析

// 链接：https://juejin.cn/post/6847902219061198861

4. 实现归并排序

5. react 的虚拟 DOM 解决了什么问题？

6. react 中渲染数组的时候添加的 key 属性，是用来做什么的

7. react16 的 fiber 调度是解决了什么问题

8. 实现一个发布订阅

9. css 相关：
   a. 不同 css 引入方式的权重是什么样的？
   b. 一个元素上如果有多个类名，与只有一个类名的情况相比，权重有什么变化
   c. 如果一个元素的类名足够多，那么它的权重能否超过 ID 选择器
   d. 伪类对 css 选择器权重的影响
   e. 不同引入方式，或者不同 css 文件通过外链方式引入，其中相同类名是谁覆盖谁。

10. 数组去重
    ---通过 new set 比较 Map 和 Set 的数据结构

11. commonJS 和 ES6 的 export 的区别，（A 引用 B,B 引用 A。相互引用会造成什么影响）
```
