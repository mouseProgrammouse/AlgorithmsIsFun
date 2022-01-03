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



    // - helper functions -

    _minNode(currNode) {
        if (currNode._getLeftChildren() === null) {
            return currNode;
        }

        return this._minNode(currNode._getLeftChildren());
    }

    _searchNode(currNode, searchingValue) {
        if (currNode === null) {
            return "nope :(";
        }

        if (currNode._getData() < searchingValue) {
            // right
            return this._searchNode(currNode._getRightChildren(), searchingValue);
        }

        if (currNode._getData() > searchingValue) {
            // left
            return this._searchNode(currNode._getLeftChildren(), searchingValue);
        }

        return currNode;
    }

    _insertNode(currNode, newNode) {
        if (currNode._getData() > newNode._getData()) {
            const leftChild = currNode._getLeftChildren();
            if (leftChild === null) {
                return currNode._setLeftChildren(newNode);
            }
            // left child
            this._insertNode(leftChild, newNode);
        }
        // check right children
        const rightChild = currNode._getRightChildren();
        if (rightChild === null) {
            return currNode._setRightChildren(newNode);
        }
        this._insertNode(rightChild, newNode);
    }
}


let myTree = new BinarySearchTree();
myTree.insert(10);
myTree.insert(12);
myTree.insert(88);
myTree.insert(2);
console.log(myTree);

// console.log(myTree.search(2));
// console.log(myTree.search(7));
console.log(myTree.min());