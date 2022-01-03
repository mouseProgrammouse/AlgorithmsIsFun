/**
 * For Heap impl we're going to use an array.
 * Heaps can be visualize as tree, but implement as array.
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    heapify(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.insert(arr[i]);
        }
    }

    // log(n)
    // insert depends on the height of the "tree" => log(n)
    insert(value) {
        this.heap.push(value);
        if (this.heap.length > 1) {
            this._rebalanceAfterInsert()
        }
    }

    _getLeftChildren(parentIndex) {
        if (parentIndex == 0) {
            return 1;
        }
        return 2 * parentIndex;
    }

    _getRightChildren(parentIndex) {
        if (parentIndex == 0) {
            return 2;
        }
        return 2 * parentIndex + 1;
    }

    extractMin() {
        const result = this.heap[0]; // first is always min
        // move last to the first place;
        this.heap[0] = this.heap.pop();
        this._rebalanceAfterMinExtraction(); //
        return result;
    }

    /**
     * repetedly swaps obj with smaller child.
     * log(n)
     */
    _rebalanceAfterMinExtraction() {
        let minElemIndex = 0,
            smallerChildIndex = this.heap[this._getLeftChildren(0)] > this.heap[this._getRightChildren(0)] ?
            this._getRightChildren(0) : this._getLeftChildren(0);
        while (this.heap[minElemIndex] > this.heap[smallerChildIndex]) {
            // do swap
            const temp = this.heap[minElemIndex];
            this.heap[minElemIndex] = this.heap[smallerChildIndex];
            this.heap[smallerChildIndex] = temp;
            // calculate smaller again
            minElemIndex = smallerChildIndex;
            smallerChildIndex = this.heap[this._getLeftChildren(minElemIndex)] > this.heap[this._getRightChildren(minElemIndex)] ?
                this._getLeftChildren(minElemIndex) : this._getRightChildren(minElemIndex);
        }
    }

    /** 
     * Rebalance the heap after insert.
     * this helper is used to rebalance
     * the heap after insertion.
     * 
     * */
    _rebalanceAfterInsert() {
        let elemIndex = this.heap.length - 1,
            parentIndex = Math.floor(elemIndex / 2);
        while (this.heap[parentIndex] > this.heap[elemIndex]) {
            // Do swap
            const temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[elemIndex];
            this.heap[elemIndex] = temp;
            // update the index
            elemIndex = parentIndex;
            parentIndex = Math.floor(elemIndex / 2);
        }
    }

}

console.log('Heap');
let myHeap = new MinHeap();
myHeap.heapify([2, 4, 4, 11, 13, 9, 3, 12, 9, 8]);
console.log(myHeap.extractMin());
console.log(myHeap);


function findFood(grid) {
    const ME = '*',
        OBSTICLE = "X",
        FOOD = "#";

    const bfs = (grid, i, j) => {
        let N = grid.length,
            M = grid[0].length,
            visitedMatrix = Array(N).fill(false).map(() => Array(M)),
            queue = [],
            pathMatrix = Array(N).fill(Infinity).map(() => Array(M));
        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0]
        ];
        queue.push([i, j]);
        pathMatrix[i][j] = 0;
        while (queue.length > 0) {
            const currPosition = queue.shift(),
                currLen = pathMatrix[currPosition[0]][currPosition[1]];
            visitedMatrix[currPosition[0]][currPosition[1]] = true;
            for (let i = 0; i < directions.length; i++) {
                const nextI = currPosition[0] + directions[i][0],
                    nextJ = currPosition[1] + directions[i][1];
                // boundries
                if (nextI < 0 || nextI >= N || nextJ < 0 || nextJ >= M) {
                    continue;
                }
                // find food return len
                if (grid[nextI][nextJ] === FOOD) {
                    return currLen + 1;
                }
                // visited and not obsticle add to queue
                if (!visitedMatrix[nextI][nextJ] && grid[nextI][nextJ] !== OBSTICLE) {
                    queue.push([nextI, nextJ]);
                    pathMatrix[nextI][nextJ] = currLen + 1;
                }
            }
        }
        return -1;
    };

    for (let i = 0; i < grid.length; i++) {
        const j = grid[i].indexOf(ME);
        if (j != -1) {
            // run bfs
            return bfs(grid, i, j);
        }
    }
}

console.log(findFood(
    [
        ["X", "X", "X", "X", "X", "X"],
        ["X", "*", "O", "O", "O", "X"],
        ["X", "O", "O", "#", "O", "X"],
        ["X", "X", "X", "X", "X", "X"]
    ]));