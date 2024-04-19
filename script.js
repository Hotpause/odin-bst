// thisisatesttoseemywillpower
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
  buildTree(array) {
    const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);

    const innerbuild = (arr) => {
      if (arr.length === 0) {
        return null;
      }
      const mid = Math.floor(arr.length / 2);
      const node = new Node(arr[mid]);

      node.left = innerbuild(arr.slice(0, mid));
      node.right = innerbuild(arr.slice(mid + 1));
      return node;
    };
    return innerbuild(uniqueSortedArray);
  }
  insert(value) {
    const newnode = new node(value);
    if (!this.root) {
      this.root = newnode;
      return;
    }

    current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newnode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newnode;
          return;
        }
        current = current.right;
      }
    }
  }
  deleteItem(value) {
    const deletenode = (node, value) => {
      if (!node) {
        return null;
      }
      if (node.data === value) {
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        if (!node.right && !node.right) {
          return null;
        }
        let tempnode = node.right;
        while (tempnode.left) {
          tempnode = tempnode.left;
        }
        node.data = tempnode.data;
        node.right = deletenode(node.right, tempnode.data);
        return node;
      } else if (value < node.data) {
        node.left = deletenode(node.left, value);
        return node;
      } else {
        node.right = deletenode(node.right, value);
        return node;
      }
    };
    this.root = deletenode(this.root, value);
  }
  find(value) {
    let current = this.root;
    while (current) {
      if (current.data === value) {
        return current;
      } else if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }
  levelOrder(callback) {
    const queue = [];
    const result = [];
    if (!this.root) {
      return result;
    }
    queue.push(this.root);
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      if (callback) {
        callback(node);
      }
    }
    return result;
  }
  inOrder(callback) {
    const traverse = (node) => {
      if (node) {
        traverse(node.left);
        callback(node);
        traverse(node.right);
      }
    };
    traverse(this.root);
  }
  preOrder(callback) {
    const traverse = (node) => {
      if (node) {
        callback(node);
        traverse(node.left);
        traverse(node.right);
      }
    };
    traverse(this.root);
  }
  postOrder(callback) {
    const traverse = (node) => {
      if (node) {
        traverse(node.left);
        traverse(node.right);
        callback(node);
      }
    };
    traverse(this.root);
  }
  height(node) {
    if (!node) {
      return -1;
    }
    const leftheight = height(node.left);
    const rightheight = height(node.right);

    return Math.max(leftheight, rightheight) + 1;
  }

  depth(node) {
    let depth = 0;
    current = this.root;
    while (current !== node) {
      depth++;
      if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return depth;
  }

  isBalanced(node = this.root) {
    if (!node) {
      return true;
    }
    const leftheight = height(node.left);
    const rightheight = height(node.right);
    if (Math.abs(leftheight - rightheight) > 1) {
      return false;
    }
    if (!this.isBalanced(node.left)) {
      return false;
    }
    if (!this.isBalanced(node.right)) {
      return false;
    }
    return true;
  }

  rebalance() {}
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
