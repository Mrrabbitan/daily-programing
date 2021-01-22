//1、
 function a() { setTimeout(a) }

//递归调用a会不会阻塞
//使用setTimeout不会阻塞进程，只会宏任务不停的进入队列，出队列，队列在不停的增减

function b() { Promise.resolve.then(b) }

//递归调用b会不会阻塞
//递归调用b的如果是个微任务，那么在当前宏任务执行完毕之后进入执行微任务的队列，微任务递归调用后，主线程阻塞，会导致浏览器卡死


//2、
//eventloop中构造函数的先机
setTimeout(function(){
    console.log('2')
},0)
new Promise(function(resolve){
    //promise构造函数里面是同步的
    console.log('3')
    resolve()
    console.log('4')
}).then(function(){
    console.log(5)
})
console.log(6);
console.log(8);
//3-4-6-8-5-2



//3、计算数值的内容
function Counter() {
  const [count, setCount] = useState(0) 
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count)
    }, 3000)
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}> Show alert </button>
    </div>
  )
}
	// 点击第一个按钮 2 次，再点击第二个按钮，再点击第一个按钮 3 次，alter 弹出什么？
//使用函数式组件会弹出2，使用类组件会弹出5



//4、async与await的内容
 async function async1(){
        console.log( 'async1 start' )
        await async2()
        console.log( 'async1 end' )
    }

    async function async2(){
        console.log( 'async2' )
    }

    setTimeout(()=>{
        console.log( 'setTimeout' )
    }, 0)

    async1()
        
    new Promise(( resolve )=>{
        console.log( 'promise1' )
        resolve()
    }).then(()=>{
        console.log( 'promise2' )
    }).then(()=>{
        console.log( 'promise3' )
    }).then(()=>{
        console.log( 'promise4' )
    })


// 浏览器与node环境中运行顺序均为如下
// async1 start
// async2
// promise1
// async1 end
// promise2
// promise3
// promise4
// setTimeout


// 5、加深理解  http://47.98.159.95/my_blog/blogs/javascript/js-async/011.html#await
async function test() {
  console.log(100)
  let x = await 200
  console.log(x)
  console.log(200)
}
console.log(0)
test()
console.log(300)

// 0
// 100
// 300
// 200
// 200
