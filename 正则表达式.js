//1 实现数组平坦化

let ary = [1, [2, [3, [4, 5]]], 6];// -> [1, 2, 3, 4, 5, 6]
let str = JSON.stringify(ary);
str.replace(/(\[|\])/g,'').split(',')


//2 实现s1 = "get-element-by-id"; 
// 给定这样一个连字符串，写一个function转换为驼峰命名法形式的字符串 
// getElementById
let s1 = "get-element-by-id"
function toUpperCase(arr){
 return arr.replace(/-\w/g, function(item){
  //  console.log(item)
   return item.slice(1).toUpperCase()
  })
}
console.log(toUpperCase(s1))



//3 实现var s = 'name=yi&age=41&sex=man'
let  s2 = 'name=yi&age=41&sex=man'
let a = s2.split(/[=&]/g)
let temp = {}

while(a.length){
  temp[a.shift()] = a.shift()
}

//4 表示千分位的字符串
function format(number){
  let regex = /\d{1,3}(?=(\d{3})+$)/g
  return (number+'').replace(regex,'$&,')
}

// console.log(format(12323232323232))