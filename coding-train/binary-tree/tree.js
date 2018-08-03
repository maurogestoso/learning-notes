class Tree {
  constructor() {
    this.root = null;
  }
  addValue(val) {
    const n = new Node(val);
    if (!this.root) {
      this.root = n;
      this.root.x = width / 2;
      this.root.y = height / 3;
    } else {
      this.root.addNode(n);
    }
  }

  traverse() {
    this.root.visit(this.root);
  }

  search(val) {
    return this.root.search(val);
  }
}
