
// 出入栈-栈的压入弹出
// 二分查找数组
// dp(i)
// 最长上升子序列
// 数组转置
// 数组去重然后转字符串，最后去分隔符
// 归并排序
// 二路归并
// 上台阶问题
// 字符串加入分隔符，数组元素拼成一个元素
// 最短子数组和
// 最长公共子序列


// 1.栈的压入和弹出 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列5,4,3,2,1或3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。

function isPopedArray(arr1,arr2){
  let len = arr1.length;
  let temp = []//模拟一个栈
  for(let i = 0,j=0;i<len;){
    temp.push(arr1[i])
    i++
    while(j<arr2.length&& arr1[temp.length-1] === arr2[j]){
      temp.pop()
      j++
      if(temp.length===0) break 
    }
  }
  return temp.length ===0
}

//2 二分查找
// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。


// 示例 1:

// 输入: nums = [-1,0,3,5,9,12], target = 9
// 输出: 4
// 解释: 9 出现在 nums 中并且下标为 4
// 示例 2:

// 输入: nums = [-1,0,3,5,9,12], target = 2
// 输出: -1
// 解释: 2 不存在 nums 中因此返回 -1

var search = function(nums, target) {
  let left =0;
    let right =nums.length-1;
    let mid,ele
    while(left<=right){
        mid = Math.floor((left+right)/2)
        ele = nums[mid]
        if(target<ele){
            right = mid-1
        }else if(target>ele){
            left = mid+1
            
        }else{
            return mid
        }
    }
    return -1
};

//3、数组api操作
var list = [
    {
        id: 'T1',
        exist: true,
    },
    {
        id: 'T2',
        exist: true,
    },
    {
        id: 'T3',
        exist: false,
    },
];
// 把所有exist为true的id输出，并用逗号分隔
var s_list = [
    {
        id: 'T4',
        exist: false,
    },
    {
        id: 'T2',
        exist: true,
    },
    {
        id: 'T5',
        exist: true,
    },
];

// Q：把s_list中exist为true的id追加到上面的结果中，并去重
console.log([...new Set(list.concat(s_list).map((i)=>{if(i.exist){return i.id}}).filter(i=>{if(i!==null){return i}}))].join(','))



// 4、归并排序

// let arr1 = [1,3,4,6];
// let arr2 = [2,5,7,8];
// 需要得到 [1,2,3,4,5,6,7,8]

function combine(arr1, arr2){
    let result = []
    let i =0;
    let k =0
    while(i<arr1.length||k<arr2.length){
        if(i>=arr1.length){
            result.push(arr2[k])
            k+=1
        }else if(k>=arr2.length){
            result.push(arr1[i])
            i+=1
        }else{
            if(arr1[i]<arr2[k]){
                result.push(arr1[i]);
                i+=1;
            }else{
                result.push(arr2[k]);
                k+=1
            }
        }
    }

    return result
}

// 5、上台阶问题


// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

// 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

// 示例 1：

// 输入：n = 2
// 输出：2
// 示例 2：

// 输入：n = 7
// 输出：21
// 示例 3：

// 输入：n = 0
// 输出：1
// 提示：

0 <= n <= 100


var numWays = function (n) {
  if (n <= 1) return 1;
  if (n === 2) return 2;
  return (numWays(n - 1) + numWays(n - 2)) % 1000000007;
};
//不使用递归直接只是用循环来解决问题
var numWays = function (n) {
  if (!n || n === 1) return 1;
  let a = 1; //临时保存n-2的值
  let b = 2; //临时保存n-1的值
  let result = n === 2 ? 2 : 0;
  for (let i = 3; i <= n; i++) {
    result = (a + b) % 1000000007;
    a = b;
    b = result;
  }
  return result;
};



// 6、获取数组的连续最大值和为多少
/**
 * getGreatestSumOfSubArray()
 * @description 获取连续子数组中最大和
 * @param Array arr 指定的数组
 * @returns Number sum 最大和
*/
function getGreatestSumOfSubArray (arr) {
  // 容错边界处理
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0
  }
  let result = []
  // 解构，初始获取数组的第一个元素值
  // 注意：一定不能把sum和max设置初始化为0，必须要考虑数组元素中全部为负数的情况
  let [ sum ] = arr
  let [ max ] = arr

  let len = arr.length
  for (let i = 1; i < len; i++) {
    // 如果当前sum累加 < 0，重新初始化当前元素值；否则执行累加
    if (sum < 0) {
      result = []
      sum = arr[i]
    } else {
      result.push(arr[i])
      sum += arr[i]
    }

    // 比较累加和与最大值
    if (sum > max) {
      max = sum
    }
  }

  return result
}


//7 实现在字符串中找出连续最长不重复子串
function debounceArray(arr){
  let res = []
  let temp = ''
  let len = arr.length
  for(let i = 0;i<len;i++){
    if(!res.includes[i]){
      res.push(arr[i])
    }else{
      res = []
      res.push(arr[i])
    }
  }
  if(temp.length<res.length){
    temp = res.join('')
  }
  return temp
}

//8 实现一个方法，限定元素出现的次数，第一个为数组，第二个为出现的最多次数，要求不改变原数组的顺序,返回固定次数的数组
 function  findSameNumber(arr,n){
  let res = {}
  let temp = []
   arr.filter(function(item){
    res[item] = (res[item]|| 0)+1
    return res[item]<=n
  })
 
  return temp
}


console.log(findSameNumber([4, 4, 4, 4, 3, 3, 3, 3, 1, 2, 4, 3, 90], 1))

//9 给定一个矩阵 A， 返回 A 的转置矩阵。

// 矩阵的转置是指将矩阵的主对角线翻转，交换矩阵的行索引与列索引。

// 输入：[[1,2,3],[4,5,6],[7,8,9]]
// 输出：[[1,4,7],[2,5,8],[3,6,9]]

// 输入：[[1,2,3],[4,5,6]]
// 输出：[[1,4],[2,5],[3,6]]
function transforIndex(arr){
  let result = []
  for(let i =0;i<arr.length;i++){
    for(let j = 0;j<arr[i].length;j++){
      if(!result[j]) result.push([])
      result[j][i] = arr[i][j]
    }
  }

  return result
}

 
//10 快速排序
function newSort(arr){
  if(arr.length<2) return arr
  let arr1 = []
  let arr2 = []
  let arr3 = []
  let temp = arr[0]
  for(let i =0;i<arr.length;i++){
    if(arr[i]<temp){
      arr1.push(arr[i])
    }else if(arr[i]===temp){
      arr2.push(arr[i])
    }else{
      arr3.push(arr[i])
    }
  }
  return newSort(arr1).concat(arr2).concat(newSort(arr3))
}


//11 选择排序
function choosenSort(data){
  let newArray = []
  let tempArray =  Array.from(data)
  while(tempArray.length){
    let min = tempArray[0]
    let tempIndex
    arr.forEach((el,index)=>{
      if(el<min){
        min=el
        tempIndex = index
      }
    })
    newArray.push(tempArray[tempIndex])
    tempArray.splice(tempIndex,1)
    
  }
  return newArray
}


//12 冒泡排序

function sort(list){
  let temp = [...list]
  let len = temp.length
  while(len--){
    for(let i =0;i<len;i--){
      let current = temp[i]
      let next = temp[i+1]
      if(current >next){
        [temp[i],temp[i+1]] = [next,current] 
      }
    }
  }
  return temp
}

//13 桶排序

const list = [8, 3, 5, 9, 2, 3, 0, 8]; // 待排序数组

/**
 * params {number[]} list
 * return {number[]}
 */
function sort(list) {
  const newList = Array.from({length: 10}).fill(0); // 创建 [0, 0, ..., 0] 的数组，长度为10
  list.forEach(el => newList[el] += 1); // 把数组元素记录在 newList 上
  return newList.reduce((pre, el, index) => { // 展开数组
    for(let i = el; i; i--) {
      pre.push(index)
    }
    return pre;
  }, [])
}

//14 数组乱序

function sortInMess(arr){
  return arr.sort(()=>Math.random()-0.5)
}

//15 数组去重

function arrayRelease(arr){
    let map = {}
    let temp = []
    for(let i in arr){
      if(!map[arr[i]]){
        map[arr[i]] = true
        temp.push(arr[i])
      }
    }
    return temp
}

Array.from(new Set(arr))

let arr =[...new Set(Array)]



//16 展平多层数据flat

function flat(arr,deep){
  let result = []
  for(let i =0;i<arr.length;i++){
    if(typeof arr[i]==='object'&& arr[i]!=null&&deep>0){
      result = result.concat(flat(arr[i],deep--))
    }else{
      result.push(arr[i])
    }
  }
  return result
}

//17 filter 
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



//19 先乱序，后排序找到缺失的那条数据

// 输出：[2,3,4,5,6,7]
// 输入：[2,5,3,7,6]
function find(arr){
    let arrTemp = arr.sort((a,b)=>a-b)
    // let count = 0
    for(let i = 0;i<arrTemp.length;i++){
        if(arrTemp[i]+1 != arrTemp[i+1]){
            // console.log(arrTemp[i]+1)
            return arrTemp[i]+1
        }
    }
}

console.log(find([2,4,3,7,6]))

//20、 链表的遍历

const c = { value: 4, left: null, right: null }
const d = { value: 5, left: null, right: null }
const e = { value: 6, left: null, right: null }
const f = { value: 7, left: null, right: null }
const a = { value: 2, left: c, right: d }
const b = { value: 3, left: e, right: f}
const root = { value: 1, left: a, right: b }



/**
 * 21. 实现一个方法，可将多个函数方法按从左到右的方式组合运行。 
 * 如 composeFunctions(fn1,fn2,fn3,fn4) 等价于 fn4(fn3(fn2(fn1)) 
 * 示例： 
 * const add = x => x + 1;
 * const multiply = (x, y) => x * y; 
 * const multiplyAdd = composeFunctions(multiply, add);
 * multiplyAdd(3, 4) // 返回 13
 */

function composeFunctions(){
 let args = Array.prototype.slice.apply(arguments)
  return function(){
  		if(args.length===1){
    		return args[0].apply(this,Array.prototype.slice.apply(arguments))  
    	}
  		return composeFunctions(...args.slice(1))(args[0].apply(this,Array.prototype.slice.apply(arguments)))
  }
  
}

//22 实现instanceof

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

//23 curry
function curry(func) {
  return function curried(...args) {
    // 关键知识点：function.length 用来获取函数的形参个数
    // 补充：arguments.length 获取的是实参个数
    if (args.length >= func.length) {
      return func.apply(this, args)
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2))
    }
  }
}

// 测试
function sum (a, b, c) {
  return a + b + c
}
const curriedSum = curry(sum)
console.log(curriedSum(1, 2, 3))
console.log(curriedSum(1)(2,3))
console.log(curriedSum(1)(2)(3))



//24 记忆函数
const memorize = function(fn) {   
   const cache = {}       
  // 存储缓存数据的对象    
  return function(...args) {        
    // 这里用到数组的扩展运算符      
    const _args = JSON.stringify(args)    
    // 将参数作为cache的key      
    return cache[_args] || (cache[_args] = fn.apply(fn, args))  
     // 如果已经缓存过，直接取值。否则重新计算并且缓存    
    } 
}

//25 sleep函数
const sleep = function(min){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(true)
    },min*1000)
  })
}


//26 promisify

function Promisify(fn,context){
    return (...args)=>{
        return new Promise((resolve,reject)=>{
            fn.apply(context,[...args,(err,res)=>{
                return err? reject(err):resolve(res)
            }])
        })
    }
}


//27 deepclone


function deepCopy(obj, cache = new WeakMap()) {
  if (!obj instanceof Object) return obj
  // 防止循环引用
  if (cache.get(obj)) return cache.get(obj)
  // 支持函数
  if (obj instanceof Function) {
    return function () {
      obj.apply(this, arguments)
    }
  }
  // 支持日期
  if (obj instanceof Date) return new Date(obj)
  // 支持正则对象
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
  // 还可以增加其他对象，比如：Map, Set等，根据情况判断增加即可，面试点到为止就可以了

  // 数组是 key 为数字素银的特殊对象
  const res = Array.isArray(obj) ? [] : {}
  // 缓存 copy 的对象，用于处理循环引用的情况
  cache.set(obj, res)

  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Object) {
      res[key] = deepCopy(obj[key], cache)
    } else {
      res[key] = obj[key]
    }
  });
  return res
}

// 测试
const source = {
  name: 'Jack',
  meta: {
    age: 12,
    birth: new Date('1997-10-10'),
    ary: [1, 2, { a: 1 }],
    say() {
      console.log('Hello');
    }
  }
}
source.source = source
const newObj = deepCopy(source)
console.log(newObj.meta.ary[2] === source.meta.ary[2]);

//28+ 深拷贝成环的问题（解决循环引用）
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const deepClone = (target, map = new Map()) => { 
  if(map.get(target))  
    return target; 
 
 
  if (isObject(target)) { 
    map.set(target, true); 
    const cloneTarget = Array.isArray(target) ? []: {}; 
    for (let prop in target) { 
      if (target.hasOwnProperty(prop)) { 
          cloneTarget[prop] = deepClone(target[prop],map); 
      } 
    } 
    return cloneTarget; 
  } else { 
    return target; 
  } 
}

//29 JSONP
Function.prototype.myJSONP = function(params,url,callback){
  function getParams(){
    let dataStr = ''
    for(let index in params){
      dataStr+=`${index}=${params[index]}&`
    }
    dataStr += `callback=${callback}`
    return `${url}?${params}`
  }
  return new Promise((resolve,reject)=>{
    let ele = document.createElement('script')
    ele.src = getParams()
    document.body.appendChild(ele)
    window[callback??[]]=(data)=>{
      resolve(data)
      document.body.removeChild(ele)
    }
  })
}

//30 实现n的链式调用
 let n = func.add(2).add(3).reduce(1); 

console.log(n); // 4 

function func(num){
    this.value= num || 0
}

func.prototype.add=function(num){
    this.value += num
    return this
}

func.prototype.reduce = function(num){
    this.value -=num
    return this.value
    }

func.prototype.valueOf = function(){
    return this.value
}

func.prototype.toString = function(){
    return this.value+''
}
let bb = new func(2)
console.log(bb.add(2).add(3).reduce(1))



