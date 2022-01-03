class UndirectedGraphNew {
    constructor() {
        this.adjList = new Map();
    }

    addNode(node) {
        if (!this.adjList.has(node)) {
            this.adjList.set(node, []);
        }
    }

    addEdge(node, connectedNode) {
        this.addNode(node);
        this.addNode(connectedNode);
        this.adjList.get(node).push(connectedNode);
        this.adjList.get(connectedNode).push(node);
    }

    bfs(start) {
        let queue = [start],
            visited = new Set(),
            result = `${start} `;
        visited.add(start);
        while (queue.length > 0) {
            const currNode = queue.shift();
            for (const node of this.adjList.get(currNode)) {
                if (!visited.has(node)) {
                    result = `${result} ${node} `;
                    visited.add(node);
                    queue.push(node);
                }
            }
        }
        return result;
    }

    shortestPath(start, end) {
        let queue = [start],
            visited = new Set(),
            pathMap = new Map([...this.adjList.keys()].map(key => key === start ? [key, 0] : [key, Infinity]));

        visited.add(start);
        while (queue.length > 0) {
            const currNode = queue.shift(),
                currPath = pathMap.get(currNode);
            for (const node of this.adjList.get(currNode)) {
                if (!visited.has(node)) {
                    visited.add(node);
                    pathMap.set(node, currPath + 1);
                    if (node == end) {
                        return pathMap.get(node);
                    }
                    queue.push(node);
                }
            }
        }
        return Infinity;
    }

    dfs(currNode, visited) {
        visited.add(currNode);
        console.log(currNode);
        for (const node of this.adjList.get(currNode)) {
            if (!visited.has(node)) {
                this.dfs(node, visited);
            }
        }
    }
}

class DirectedGraph {
    constructor() {
        this.adjList = new Map();
    }

    addNode(node) {
        if (!this.adjList.has(node)) {
            this.adjList.set(node, []);
        }
    }

    addEdge(node, connectionNode) {
        this.addNode(node);
        this.addNode(connectionNode);
        this.adjList.get(node).push(connectionNode);
    }

    /**
     * Topological Ordering existst only in DAG.
     * Every DAG has a source.
     * 
     */
    topoSort() {
        let stack = [],
            visited = new Set();
        for (const node of this.adjList.keys()) {
            if (!visited.has(node)) {
                this._dfsUtil(node, stack, visited);
            }
        }
        return this._reverseResult(stack);
    }

    _dfsUtil(currNode, stack, visited) {
        visited.add(currNode);
        for (const node of this.adjList.get(currNode)) {
            if (!visited.has(node)) {
                this._dfsUtil(node, stack, visited);
            }
        }
        stack.push(currNode);
    }

    _reverseResult(stack) {
        let result = `${stack.pop()}`;
        while (stack.length > 0) {
            result = `${result} -> ${stack.pop()}`;
        }
        return result;
    }
}


class DirectedGraphWithWeight {
    constructor() {
        this.adjList = new Map();
    }

    addNode(node) {
        if (!this.adjList.has(node)) {
            this.adjList.set(node, new Map());
        }
    }

    addEdge(node, connectedNode, weight) {
        this.addNode(node);
        this.addNode(connectedNode);
        //("node": {"connectedNode": weight})
        this.adjList.get(node).set(connectedNode, weight);
    }

    implDijkstraShortestPath(start) {
        let visited = new Set(),
            queue = [start],
            pathMap = this._fillPaths();

        pathMap.get(start).len = 0;
        console.log(pathMap);
        while (queue.length > 0) {
            const currNode = queue.shift();
            visited.add(currNode);
            for (const node of this.adjList.get(currNode).keys()) {
                if (!visited.has(node)) {
                    console.log(node);
                    const nodeData = this.adjList.get(currNode);
                    const newLen = pathMap.get(currNode).len + nodeData.get(node);
                    if (pathMap.get(node).len > newLen) {
                        pathMap.get(node).len = newLen;
                        pathMap.get(node).prevNode = currNode;
                    }
                    queue.push(node);
                }
            }
        }
        console.log(pathMap);
    }

    _fillPaths() {
        let pathMap = new Map();
        for (const node of this.adjList.keys()) {
            pathMap.set(node, { "len": Infinity, prevNode: "" });
        }
        return pathMap;
    }
}


const graph = new UndirectedGraphNew();
graph.addEdge('S', 'A');
graph.addEdge('S', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'E');
graph.addEdge('E', 'D');
console.log(graph);
console.log(graph.bfs('S'));
console.log(graph.shortestPath('S', 'E'));
console.log(graph.shortestPath('S', 'C'));
console.log(graph.shortestPath('S', 'B'));
console.log(graph.shortestPath('S', 'O'));
graph.dfs('S', new Set());


const directedGraph = new DirectedGraph();
directedGraph.addEdge('S', 'A');
directedGraph.addEdge('S', 'B');
directedGraph.addEdge('A', 'C');
directedGraph.addEdge('B', 'C');
directedGraph.addEdge('C', 'E');
directedGraph.addEdge('C', 'D');
console.log(directedGraph);
console.log(directedGraph.topoSort());

const dirGraphWeight = new DirectedGraphWithWeight();
console.log(dirGraphWeight);
dirGraphWeight.addEdge('S', 'V', 1);
dirGraphWeight.addEdge('S', 'W', 4);
dirGraphWeight.addEdge('V', 'W', 2);
dirGraphWeight.addEdge('V', 'T', 6);
dirGraphWeight.addEdge('W', 'T', 3);
console.log(dirGraphWeight);
dirGraphWeight.implDijkstraShortestPath('S');