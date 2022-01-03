class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    _getData() {
        return this.data;
    }

    _getRightChildren() {
        return this.right;
    }

    _setRightChildren(newNode) {
        this.right = newNode;
    }

    _getLeftChildren() {
        return this.left;
    }

    _setLeftChildren(newNode) {
        this.left = newNode;
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

    _insertNode(currNode, newNode) {
        if (currNode._getData() > newNode._getData()) {
            const leftChild = currNode._getLeftChildren();
            if (leftChild === null) {
                currNode._setLeftChildren(newNode);
                return;
            }
            // left child
            this._insertNode(leftChild, newNode);
        } else {
            const rightChild = currNode._getRightChildren();
            if (rightChild === null) {
                currNode._setRightChildren(newNode);
                return;
            }
            // right child
            this._insertNode(rightChild, newNode);
        }
    }
}


let myTree = new BinarySearchTree();
myTree.insert(10);
myTree.insert(12);
myTree.insert(88);
myTree.insert(2);
console.log(myTree);