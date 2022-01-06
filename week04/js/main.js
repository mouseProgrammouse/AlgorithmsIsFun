class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    /**
     * INSERT.
     * O(height) - height of the tree is defined as the lenght of
     * a longest path from ots root to a leaf.
     * perfectly balanced tree height is log(n).
     * worst case is (n-1).
     */
    insert(data) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    /***
     * SEARCH.
     * O(height). Perfectly balanced O(log(n)).
     */
    search(searchingValue) {
        if (this.root === null) {
            return "nope :(";
        }
        return this._searchNode(this.root, searchingValue);
    }

    /**
     * MIN.
     * O(height). Perfectly balanced O(log(n)).
     */
    min() {
        if (this.root === null) {
            return null;
        }
        return this._minNode(this.root);
    }

    /**
     * MAX.
     * O(height). Perfectly balanced O(log(n)).
     */
    max() {
        if (this.root === null) {
            return null;
        }
        return this._maxNode(this.root);
    }

    /**
     * SUCCESSOR.
     * O(height). Perfectly balanced O(log(n)).
     */
    successor(myNode) {
        if (myNode.right) {
            return this._minNode(node.right);
        }

        let prev = null,
            cur = this.root;

        while (cur !== myNode) {
            if (cur.data > myNode.data) {
                prev = cur;
                cur = cur.left;
            } else {
                cur = cur.right
            }
        }
        return prev;
    }

    /**
     * PREDECESSOR.
     * O(height). Perfectly balanced O(log(n)).
     */
    predecessor(myNode) {
        if (myNode.left) {
            return this._maxNode(myNode.left);
        }

        let prev = null,
            cur = this.root;

        while (cur !== myNode) {
            if (cur.data > myNode.data) {
                cur = cur.left;
            } else {
                prev = cur;
                cur = cur.right;
            }
        }

        return prev;
    }

    /**
     * Delete element.
     * O(height). Perfectly balanced O(log(n)).
     */
    delete(value) {
        this._deleteNode(this.root, value);
    }


    // - helper functions -

    _deleteNode(root, value) {
        if (root === null) {
            return null;
        }

        if (value < root.data) {
            root.left = this._deleteNode(root.left, value);
            return root;
        } else if (value > root.data) {
            root.right = this._deleteNode(root.right, value);
            return root;
        } else {
            if (!root.left) {
                return root.right;
            } else if (!root.right) {
                return root.left;
            } else {
                root.data = this._minNode(root.right).data;
                root.right = this._deleteNode(root.right, root.data);
                return root;
            }
        }
    }

    _minNode(currNode) {
        if (currNode.left === null) {
            return currNode;
        }

        return this._minNode(currNode.left);
    }

    _maxNode(currNode) {
        if (currNode.right === null) {
            return currNode;
        }

        return this._maxNode(currNode.right);
    }

    _searchNode(currNode, searchingValue) {
        if (currNode === null) {
            return "nope :(";
        }

        if (currNode.data < searchingValue) {
            // right
            return this._searchNode(currNode.right, searchingValue);
        }

        if (currNode.data > searchingValue) {
            // left
            return this._searchNode(currNode.left, searchingValue);
        }

        return currNode;
    }

    _insertNode(currNode, newNode) {
        if (currNode.data > newNode.data) {
            const leftChild = currNode.left;
            if (leftChild === null) {
                return currNode.left = newNode;
            }
            // left child
            return this._insertNode(leftChild, newNode);
        }
        // check right children
        const rightChild = currNode.right;
        if (rightChild === null) {
            return currNode.right = newNode;
        }
        return this._insertNode(rightChild, newNode);
    }
}


let myTree = new BinarySearchTree();
myTree.insert(50);
myTree.insert(16);
myTree.insert(14);
myTree.insert(10);
myTree.insert(15);
myTree.insert(40);
myTree.insert(45);
myTree.insert(35);
myTree.insert(36);
myTree.insert(32);
myTree.insert(37);
console.log(myTree);
myTree.delete(16);
console.log(myTree);


// console.log(myTree.search(2));
// console.log(myTree.search(7));
//console.log(myTree.min());
//console.log(myTree.predecessor(myTree.search(32)));