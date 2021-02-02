

//1 实现instanceof

function myInstanceof(left,right){
    var proto = left.__proto__;
    var protoType = right.prototype;
    while(true){
        if(proto === null){
            return false
        }
        if(proto == protoType){
            return true
        }
        proto = proto.__proto__
    }
}

//2 Array.filter 
function filter(fn,context){
  let result = []
  let arr = this
  for(let i=0;i<len;i++){
    let item = fn.apply(context,arr[i],arr,i)
    if(item){
      result.push(arr[i])
    }
  }
  return result
}

//3 new 
Function.prototype.new = function(fn,...args){
    if(typeof fn !== 'function'){
        throw new Error('first param must be a function')
    }
    let object = {}
    object.__proto__ = Object.create(fn.prototype)
    let res = fn.apply(obj,args)

    let isObject = typeof res === 'object' && res !==null
    let isFunction = typeof res === 'function'
    return isObject||isFunction?res:object
}

//4 Function.bind
Function.prototype.bind = function(context,...args){
 if(typeof this !=='function'){
   throw new Error('sth trying to bound is not callable')
 }
  let self = this
  let fOne = function(){}
  let fTwo =function(){
    return  self.apply(this instanceof fOne?this:context,args.concat(Array.prototype.slice.apply(context,arguments)) )
  }

  fOne.prototype = self.prototype
  fTwo.prototype = new fOne()

  return fTwo 
} 
//5 Function.call
Function.prototype.call=function(context,...args){
  let context = context || window
  context.fn = this
  let result = eval(`context.fn(${args})`)  
  delete context.fn
  return result 
}

//6 Function.apply
Function.prototype.apply =function(context,args){
  let context = context ||window
  context.fn = this
  let result = eval(`context.fn(${args})`)
  delete context.fn
  return result
}


function EventEmitter(){
  this.events = new Map()
}

//7 emitter.addeventlistener 没有once的情况可以不用封装一个
function wrapCallback(fn,once){return {callback:fn,once}}
EventEmitter.prototype.addEventListener = function(type,fn,once =false){
  let handler = this.events.get(type);
  if(!handler) {
    this.events.set(type,wrapCallback(fn,once))
  }else if(handler && typeof handler.callback === 'function'){
    this.events.set(type,[handler,wrapCallback(fn,once)])
  }else{
    handler.push(wrapCallback(fn,once))
  }
}

// 8 removeListener
EventEmitter.prototype.removeListener = function(type,listener){
  let handler = this.events.get(type)
  if(!handler) return
  if(!Array.isArray(handler)){
    if(handler.callback === listener.callback) this.events.delete(type)
  }
  for(let i =0;i<handler.length;i++){
     let item = handler[i]
       if(item.callback === listener.callback){
          handler.splice(i,1)
          i--
          if(handler.length === 1){
            this.events.delete(handler[0])
          }
       }
  }    
}

//9 emitter.removeAll
EventEmitter.prototype.myRemoveAll=function(type){
  let handler= this.events.get(type);
  if(!handler) return 
  else this.events.delete(type)
}

//10 emitter.emit
EventEmitter.prototype.emit =function(type,...args){
  let handler = this.events.get(type)
  if(Array.isArray(handler)){
    handler.forEach((item)=>{
      item.callback.apply(this,args)
      if(item.once) this.removeEventListener(type,item)

    })
  }else{
    handler.callback.apply(this.args)
  }
  return true
}

//11 emitter.once
EventEmitter.prototype.once = function(type,fn){
  this.addEventListener(type,fn,true)
}

//12 vDom
function vDom(tagName,props,children){
  this.tagName = tagName;
  this.props = props;
  this,children = children;
  if(props.key){
    this.key = props.key
  }
  let count = 0
  children.map((index,child)=>{
    if(child instanceof Element){
        count += child.length
    }else{
        children[index]= ''+count
    }
  })
  this.count = count
}

function createElement(tagName, props, children){
 return new VDom(tagName, props, children);
}
module.exports = createElement;


//13 render
function render(){
  let ele = document.createElement(this.tagName);
  let props = this.props
  if(props){
    for(let i in props)
    ele.setAttribute(i,props[i])
  }

  let children = this.children||[]
  children.forEach((index,child)=>{
    let childEle = (child instanceof Element)?child.render():document.createTextNode(child)
    ele.appendChild(childEle) 
  })
  return ele
}

let ulRoot = ul.render()
document.body.appendChild(ulRoot)



//14 useState的原理
let currentArray = []
let index = 0
function useState(initial){
    let currentIndex = index
    currentArray[index]=currentArray[index]||initial
    function setState(state){
        currentArray[currentIndex] = state
        render()
    }
    return [currentIndex[index++],setState]
}

function render(){
    index =0
    ReactDOM.render(<counter/>,document.getElementById('root'))
}



//15 控制promise的最大并发数
/**
 * 关键点
 * 1. new promise 一经创建，立即执行
 * 2. 使用 Promise.resolve().then 可以把任务加到微任务队列，防止立即执行迭代方法
 * 3. 微任务处理过程中，产生的新的微任务，会在同一事件循环内，追加到微任务队列里
 * 4. 使用 race 在某个任务完成时，继续添加任务，保持任务按照最大并发数进行执行
 * 5. 任务完成后，需要从 doingTasks 中移出
 */
function limit(count, array, iterateFunc) {
  const tasks = []
  const doingTasks = []
  let i = 0
  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve()
    }
    const task = Promise.resolve().then(() => iterateFunc(array[i++]))
    tasks.push(task)
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))
    doingTasks.push(doing)
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()
    return res.then(enqueue)
  };
  return enqueue().then(() => Promise.all(tasks))
}



//16 图片懒加载IntersectionObserver---也可用作其他资源的预加载
let img = document.getElementsByTagName("img");
const observer = new IntersectionObserver(changes => {
  //changes 是被观察的元素集合
  for(let i = 0, len = changes.length; i < len; i++) {
    let change = changes[i];
    // 通过这个属性判断是否在视口中
    if(change.isIntersecting) {
      const imgElement = change.target;
      imgElement.src = imgElement.getAttribute("data-src");
      observer.unobserve(imgElement);
    }
  }
})
observer.observe(img);


//17 reduce原理实现
function myReduce(fn,initialValue){
  if(typeof fn !== 'function'){
    throw new Error('the first params must be function')
  }
  let arr = this
  let result = initialValue|| arr[0]
  let startIndex = initialValue?0:1
  for(let i = startIndex;i<arr.length;i++){
    result = fn.call(result,arr[i],i,arr)
  }
  return result 
}

//18 mixin 原理
function mixin(target, props){
    let result = target
    result.prototype = Object.create(target.prototype)  
    for(let index in props){
        if(props.hasOwnProperty(index)){
            result.prototype[index] = props[index]
        }
    }
    return result
}

//19、xhr模拟实现get，post方法
function handleParams(data){
  let arr = []
  for(let i in arr){
    //转义为二进制码的内容
    arr.push(encodeURIComponent(i)+'='+encodeURIComponent(arr[i]))
  }
  return arr.join('&')
}

function callback(opt,obj){
  let status = obj.status
  if(status>=200&&status<=300){
    opt.success&&opt.success(obj.responseText,obj.responseXML)
  }else{
    opt.fail && opt.fail(status)
  }
}


function myAjax(url,option){
  let option = option||{}
  let method = (option.method || 'GET').toUpperCase(),
      async = option.async?option.async:true,
      params = handleParams(option.data)
  let xhr = new XMLHttpRequest()
  if(async){
    xhr.onreadystatechange = function(){
      if(this.readyState===4){
        callback(option,xhr)
      }
    }
  }
  if(method==='GET'){
    xhr.open('GET',url+'?'+params,async)
    xhr.send(null)
  }if(method==='SEND'){
    xhr.open('SEND',url,async)
    xhr.setRequestHeader('content-type','multipart/form-data')
    xhr.send(params)
  }
  if(!async){
    callback(option,xhr)
  }
}


//20 实现generator方法
function myGenerator(list) {
    var index = 0;
    var len = list.length;
    return {
        // 定义 next 方法
        // 记录每次遍历位置，实现闭包，借助自由变量做迭代过程中的“游标”
        next: function() {
            var done = index >= len; // 如果索引还没有超出集合长度，done 为 false
            var value = !done ? list[index++] : undefined; // 如果 done 为 false，则可以继续取值
            // 返回遍历是否完毕的状态和当前值
            return {
                done: done,
                value: value
            }
        }
    }
}

//21 实现async await方法
function asyncToGenerator(generatorFunc) {
    return function() {
      const gen = generatorFunc.apply(this, arguments)
      return new Promise((resolve, reject) => {
        function step(key, arg) {
          let generatorResult
          try {
            generatorResult = gen[key](arg)
            value = generatorResult.value
          } catch (error) {
            return reject(error)
          }
          const { value, done } = generatorResult
          if (done) {
            return resolve(value)
          } else {
            return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
          }
        }
       return step("next")
      })
    }
}

