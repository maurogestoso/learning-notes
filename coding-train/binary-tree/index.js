let tree;

function setup () {
    noCanvas();
    tree = new Tree();

    tree.addNode(5);
    console.log(tree);
}

class Node {
    constructor (val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor () {
        this.root = null;
    }
    addNode (val) {
        const n = new Node(val);
        if (!this.root) {
            this.root = n;
        }
    }
}
