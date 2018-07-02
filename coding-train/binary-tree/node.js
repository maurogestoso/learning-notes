class Node {
  constructor (val, x, y) {
      this.value = val;
      this.left = null;
      this.right = null;
      this.x = x;
      this.y = y;
      this.r = 8;
  }

  draw () {
      ellipse(this.x, this.y, this.r, this.r);
  }

  addNode (n) {
      if (n.value < this.value) {
          if (this.left === null) {
              this.left = n;
          } else {
              this.left.addNode(n);
          }
      } else if (n.value > this.value) {
          if (this.right === null) {
              this.right = n;
          } else {
              this.right.addNode(n);
          }
      }
  }

  visit () {
      if (this.left !== null) {
          this.left.visit();
      }

      console.log(this.value);
      
      if (this.right !== null) {
          this.right.visit();
      }
  }

  search (val) {
      if (val === this.value) {
        return this;
      } else if (val < this.value && this.left !== null) {
        return this.left.search(val);
      } else if (val > this.value && this.right !== null) {
        return this.right.search(val);
      }
      return null;
  }
}

