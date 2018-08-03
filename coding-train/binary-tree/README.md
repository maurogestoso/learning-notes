# Coding Challenge: Binary Tree

## Data Structures

Different ways of storing data informed by how the data needs to be accessed, stored or manipulated.

Examples:

```js
var x = 10;
var nums = [10, 20, 30];
var obj = {
  name: 'Mauro',
  age: 29
};
```

## Binary Tree

A graph in which each node can only be connected to to new nodes.

```
         root
         / \
       /    \
      o      o
     / \    / \
    o   o  o   o
```

In a binary tree, the stored data is sorted. Let's say we have a BT of numbers and the root node is the number 5. If we want to store the number 4, we would store it in the left child of 5. If we wanted to store the number 8, we would store it on the right node of 5.

If we now wanted to store the number 6, we would want to store it on the right node of 5, but it already has 8, so we go down to it. Now we would store 6 on the left node of 8. If we wanted to store the number 7 we would store it on the right node of 6.

### How is this data sorted?

The algorithm to retrieve all the data in order from a BT is recursive:

1. Start with root node
2. Visit the left until you find an empty node
3. Come up and print
4. Visit the right until you find an empty node
5. Come up and print

The advantage of having the date sorted in this way is that, if the tree is balanced (i.e. there's the same amount of nodes on each side), when I'm looking for something I can ask: "Is the number I'm looking for lower or greater than the root node?" and the answer will discard half the tree. If we continue doing that down the tree, we have a pretty efficient way of finding any element (O(log n) complexity)

