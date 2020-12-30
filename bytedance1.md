1. this指向题
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
  
  fn1()
  fn2()
  fn1()
  fn2()

   ```

3. 实现一个功能
   ```
  // 实现这样一个element方法
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
  通过调用render方法，将元素渲染到页面
  
  //  掘金上有该题目的分析
  //  作者：千叶风行
  //  链接：https://juejin.cn/post/6847902219061198861

   ```

4. 实现归并排序

5. react的虚拟DOM解决了什么问题？
   
6. react中渲染数组的时候添加的key属性，是用来做什么的
   
7. react16的fiber调度是解决了什么问题
   
8. 实现一个发布订阅

9. css相关：
   a. 不同css引入方式的权重是什么样的？
   b. 一个元素上如果有多个类名，与只有一个类名的情况相比，权重有什么变化
   c. 如果一个元素的类名足够多，那么它的权重能否超过ID选择器
   d. 伪类对css选择器权重的影响
   e. 不同引入方式，或者不同css文件通过外链方式引入，其中相同类名是谁覆盖谁。
   