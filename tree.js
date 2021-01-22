// 1. 单链表反转
// 链表：1->2->3->4->null
// 反转之后：4->3->2->1->null

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
// children代表子集 重点在于map的引用复制

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

//4、判断树的最大深度
var maxDepth = function(root) {
    if(!root) return 0
    let left = maxDepth(root.left)
    let right = maxDepth(root.right)
    let depth = left>right?left:right
    return depth+1
};

//5、判断树是否是对称的树
var isSymmetric = function(root) {
    if(!root) return true
    let isSame = function(r1,r2){
        if(r1===null&&r2===null) return true
        if(r1===null||r2===null) return false

        return r1.val === r2.val && isSame(r1.left,r2.right) && isSame(r1.right,r2.left)
    }

   return isSame(root.left,root.right)
};

//6、给定特定的树，生成其对应的镜像
var mirrorTree = function(root) {
    //方法1
  	if(!root) return null
   
     let temp = root.left
     root.left = root.right
     root.right = temp
    
     mirrorTree(root.left)
     mirrorTree(root.right)
     return root

    // 方法2
    if(!root) return null;
    [root.left,root.right] = [mirrorTree(root.right),mirrorTree(root.left)]
    return root
};

//7、给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
//例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4] p=5,q=7 祖先是3

var lowestCommonAncestor = function(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (!left) return right; // 左子树找不到，返回右子树
  if (!right) return left; // 右子树找不到，返回左子树
  return root;
};