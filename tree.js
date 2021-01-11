// 1. 单链表反转
// 链表：1->2->3->4
// 反转之后：4->3->2->1

function reserveList(head){
	  let prev = null
    let current = head
    let temp
    while(current){
    	temp = current.next
        current.next = prev
        prev = current
        current = temp
    }
  return prev
}


console.log(reserveList())


//2 数组结构转换为树
// 列表转树形结构
let list = [
    {id: 1, parentId: 0, name: '菜单一'},
    {id: 2, parentId: 0, name: '菜单二'},
    {id: 3, parentId: 0, name: '菜单三'},
    {id: 11, parentId: 1, name: '菜单一一'},
    {id: 13, parentId: 1, name: '菜单一二'},
    {id: 14, parentId: 11, name: '菜单一一一'},
    {id: 22, parentId: 2, name: '菜单二二'}
]
// children代表子集

function listToTree(list) {
    let map = {};
    list.forEach(item => {
        if (! map[item.id]) {
            map[item.id] = item;
        }
    });

    list.forEach(item => {
        if (item.parentId !== 0) {
            map[item.parentId].children ? map[item.parentId].children.push(item) : map[item.parentId].children = [item];
        }
    });
    
    return list.filter(item => {
        if (item.parentId === 0 ) {
            return item;
        }
    })
}
console.log(listToTree(list));


//3、判断是否是平衡二叉树

const isBalanced = (root) => {
  // 1. 设置结果集
  let result = true;
  // 3. 递归
  const recursion = (root) => {
    // 3.1 如果没有下一个节点了，返回 0
    if (!root) {
      return 0;
    }
    // 3.2 当前层 + 1
    const left = recursion(root.left) + 1;
    const right = recursion(root.right) + 1;
    // 3.3 比较两棵树的深度
    if (Math.abs(left - right) > 1) {
      result = false;
    }
    // 3.4 返回这棵树最深的深度
    return Math.max(left, right);
  };
  recursion(root);
  return result;
};