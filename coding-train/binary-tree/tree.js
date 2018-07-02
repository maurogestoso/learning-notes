class Tree {
  constructor () {
      this.root = null;
  }
  addValue (val) {
      const n = new Node(val);
      if (!this.root) {
          this.root = n;
      } else {
          this.root.addNode(n);
      }
  }

  traverse () {
      this.root.visit();
  }

  search (val) {
      return this.root.search(val);
  }

  draw () {
      
  }
}
