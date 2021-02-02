
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
    let onRejected = typeof inr === 'function' ? onr: error=>{throw error} 
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

//4、Promise.all的结果是在处理完整体内容之后才返回，并不是返回的结果是不按顺序的，返回结果都是按顺序的返回，面试官只是需要你实现按顺序输出的方法
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
                  while(times){
                    times--;
                    error = e
                    setTimeout(function(){attempt()},delay)
                  }
                })
            }
        }
        attempt();
    })
}

//12 保证顺序
myPromise.prototype.myAny = function(iterable){
    return new Promise((resolve,reject)=>{
        let len = iterable.length;
        let result = []
        if(len ===0){
            resolve([])
            return
        }
        function handleData(index,data){
            let temp = {}
            temp["i"] = index
            temp["data"] = data
            result.push(temp)
            if(len === result.length) return resolve(result.sort((a,b)=>a.i-b.i).map(item=>item.data))
        }
        for(let [index,item] of iterable.entries()){
            Promise.resolve(item).then((data)=>{
                return resolve(data)
            }).catch((error)=>{
                handleData(index,error)
            })        
        }
    })
}

//13 promisify

function Promisify(fn,context){
    return (...args)=>{
        return new Promise((resolve,reject)=>{
            fn.apply(context,[...args,(err,res)=>{
                return err? reject(err):resolve(res)
            }])
        })
    }
}

//14 allSettled 完整版
Promise.allSettled = function(promises) {
    // 也可以使用扩展运算符将 Iterator 转换成数组
    // const promiseArr = [...promises]
    const promiseArr = Array.from(promises)
    return new Promise(resolve => {
        const result = []
        const len = promiseArr.length;
        let count = len;
        if (len === 0) {
          return resolve(result);
        }
        for (let i = 0; i < len; i++) {
            promiseArr[i].then((value) => {
                result[i] = { status: 'fulfilled', value: value };
            }, (reason) => {
                result[i] = { status: 'rejected', reason: reason };
            }).finally(() => { 
                if (!--count) {
                    resolve(result);
                }
            });
        }
    });
}