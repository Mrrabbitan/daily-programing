
const p = 'pending'
const f = 'fulfilled';
const r = 'rejected'
//1 promise
function myPromise(executor){
    let self = this
    self.value = null
    self.error = null
    self.status = p
    self.onFulfilledCallback = []
    self.onRejectedCallback = []

    const Resolve = (value)=>{
        if(self.status !== p) return
        setTimeout(()=>{
            self.status = f
            self.value = value
            // self.onFulfilled(self.value)
            self.onFulfilledCallback.forEach((item)=>item(self.value))
        })
    }

    const Reject = (error)=>{
        if(self.status !== p) return
        setTimeout(()=>{
            self.status = r
            self.error = error
            // self.onRejected(self.error)
            self.onRejectedCallback.forEach(item=>item(self.error))
        })
    }
    executor(Resolve,Reject)
}


//2 then
//目的是转换promise直到不是promise为止
function resolvePromise(promise,x,resolve,reject){
    if(x instanceof Promise){
        if(x.status===p){
            x.then(y=>{
                resolvePromise(promise,x,resolve,reject)
            },error=>{
                reject(error)
            })
        }else{
            x.then(resolve,reject)
        }
    }else{
        resolve(x)
    }
}
myPromise.prototype.then=function(onf,onr){
    let bridge 
    let onFulfilled =typeof onf === 'function' ? onf:value =>value
    let onRejected = typeof inr === 'function' ? onr: error=>{throw new Error} 
    if(this.status === p){
        return bridge = new Promise((resolve,reject)=>{
            this.onFulfilledCallback.push((value)=>{
                try{
                    // resolve(onFulfilled(this.value))
                    resolvePromise(bridge,onFulfilled(this.value),resolve,reject)
                }catch(e){
                    reject(e)
                }
            });
            this.onRejectedCallback.push((error)=>{
                try{
                    resolve(onRejected (this.error))
                }catch(e){
                    reject(e)
                }
            })
        })
        // 绑定了三个回调，想要在 resolve() 之后一起执行，那怎么办呢？需要将 onFulfilled 和 onRejected 改为数组，调用 resolve 时将其中的方法拿出来一一执行即可
    }else if(this.status === f){
        return bridge= new Promise((resolve,reject)=>{
            try{
                resolvePromise(bridge,onFulfilled(this.value),resolve,reject)
            }catch(e){
                reject(e)
            }
        })
    }else{
        return bridge = new Promise((resolve,reject)=>{
            try{resolvePromise(bridge,onRejected(this.error),resolve,reject)
            }catch(e){
                reject(e)
            }
        })
    }
}

//3 catch
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

//4、Promise.all
Promise.prototype.myAll=function(iterable){
  return new Promise((resolve,reject)=>{
    let len = iterable.length;
    let result = []
    if(len === 0 ){
      resolve(result)
      return
    }

    for(let i= 0;i<len;i++){
      Promise.resolve(iterable[i]).then(data=>{
        result.push(data)
        if( i ===len -1) resolve(result)
      }).catch(error=>{
       return reject(error)
      })
    }
  })
}

//5 any
Promise.prototype.myAny = function(iterable){
    return new Promise((resolve,reject)=>{
        let len = iterable.length
        let result = []
        if(!len){
            resolve(result)
            return
        }

        function handleData(index,error){
            result[index] = error
            if(len-1 == index) reject(result)
        }

        for(let i = 0;i<len;i++){
            Promise.resolve(iterable[i]).then(data=>{
               return resolve(data)
            }).catch(error=>{
                handleData(i,error)
            })
        }
    })
}

//6、promise.race
Promise.prototype.MyRace=function(iterable){
  return new Promise((resolve,reject)=>{
    let len= iterable.len;
    if(len === 0)return
    for(let i = 0;i<len;i++){
      Promise.resolve(iterable[i]).then(data=>{
        
        resolve(data) 
        return ;}
      ).catch(error=>{
        reject(error)
        return
      })
    }
  })
}

// 7 promise.allSettled
Promise.prototype.MyAllSettled = function(iterable){
  return new Promise((resolve,reject)=>{
    let len = iterable.length;
    let result = []
    if(len ===0){
      resolve(result)
      return
    }
    let count = 0
    let tempIndex = 0
    function handlerData(index,data){
      result[index]=data
      count++
      if(count === len-1) resolve(result)
    }
    for(let i = 0;i<len;i++){
      Promise.resolve(iterable[i]).then(data=>{
        handlerData(tempIndex,data)
      }).catch(err=>{
        handlerData(tempIndex,err)
      })
      tempIndex++
    }
        
  })
}

// 8 promise.resolve
Promise.prototype.resolve = function(param){
  if(param instanceof Promise) return param
  return new Promise((resolve,reject)=>{
    if(param&&param.then&&typeof param.then ==='function'){
      param.then(resolve,reject)
    }else{
      resolve(param)
    }
  })
}

//9 promise.reject
Promise.prototype.reject = function(reason){
  return new Promise((resolve,reject)=>{
    reject(reason)
  })
}


//10 promise.finally
Promise.prototype.finally =function(callback){
  this.then(value=>{
    return Promise.resolve(callback()).then(()=>{
      return value
    })
  },error=>{
    return Promise.reject(callback()).then(()=>{
      throw error;
    })
  })
} 

//11 promise.retry
Promise.prototype.retry = function(fn,times,delay){
    return new Promise((resolve,reject)=>{
        let error
        let attempt = function(){
            if(times===0){
                reject(error)
            }else{
                fn().then(resolve).catch(function(e){
                    times--;
                    error = e
                    setTimeout(function(){attempt()},delay)
                })
            }
        }
        attempt();
    })
}

//12 节流
Function.prototype.throttle=function(fn,time){
  let flag  = true
  return function(...args){
    let context = this
    if(!flag ) return 
    flag = false;
    setTimeout(()=>{
      fn.apply(context,args)
      flag =true
    },time)
  }
}

//13 防抖
Function.prototype.debounce = function(fn,delay){
  let timer = null;
  return function(...args){
    let context = this
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{
      fn.apply(context,args)
    },delay)
  }
}

//14 new 
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

//15 bind
Function.prototype.bind = function(context,...args){
 if(typeof this !=='function'){
   throw new Error('sth trying to bound is not callable')
 }
  let self = this
  let fOne = function(){}
  let fTwo =function(){
    self.apply(context instanceof this?context:this,args.concat(Array.prototype.slice.apply(context,arguments)) )
  }

  fOne.prototype = self.prototype
  fTwo.prototype = new fOne()

  return fTwo 
} 
//16 call
Function.prototype.call=function(context,...args){
  let context = context || window
  context.fn = this
  let result = eval(`context.fn(...args)`)  
  delete context.fn
  return result 
}

//17 apply
Function.prototype.apply =function(context,args){
  let context = context ||window
  context.fn = this
  let result = eval(`context.fn(...args)`)
  delete context.fn
  return result
}


function EventEmitter(){
  this.events = new Map()
}

//18 emitter.addeventlistener 没有once的情况可以不用封装一个
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

// 19 removeListener
EventEmitter.prototype.removeListener = function(type,listener){
  let handler = this.events.get(type)
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

//20 emitter.removeAll
EventEmitter.prototype.myRemoveAll=function(type){
  let handler= this.events.get(type);
  if(!handler) return 
  else this.events.delete(type)
}

//21 emitter.emit
EventEmitter.prototype.emit =function(type,...arg){
  let handler = this.events.get(handler)
  if(Array.isArray(handler)){
    handler.forEach((index,item)=>{
      item.callback.apply(this,args)
      if(item.once) this.removeEventListener(type,item)

    })
  }else{
    handler.callback.apply(this.args)
  }
  return true
}

//22 emitter.once
EventEmitter.prototype.once = function(type,fn){
  this.addEventListener(type,fn,true)
}

//23 vDom
function vDom(tagName,props,childern){
  this.tagName = tagName;
  this.props = props;
  this,childern = childern;
  if(props.key){
    this.key = props.key
  }
  let count = 0
  childern.map((index,child)=>{
    if(child instanceof Element){
        count += child.length
    }else{
        childern[i]= ''+count
    }
    count++
  })
  this.count = count
}

function createElement(tagName, props, children){
 return new Element(tagName, props, children);
}
module.exports = createElement;


//24 render
function render(){
  let ele = document.createElement(this.tagName);
  let props = this.props
  if(props){
    for(let i in props)
    ele.setAttribute(i,props[i])
  }

  let childern = this.childern||[]
  childern.map((index,child)=>{
    let childEle = (child instanceof Element)?child.render():document.createTextNode(child)
    ele.appendChild(childEle) 
  })
  return ele
}

let ulRoot = ul.render()
document.body.appendChild(ulRoot)


function createElement(tagName,props,childern){
  return new vDom(tagName,props,childern)
}

//25 useState源码
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



//26 控制promise的最大并发数
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



//27 图片懒加载IntersectionObserver---也可用作其他资源的预加载
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
