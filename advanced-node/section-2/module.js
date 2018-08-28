// console.log(module);

/* 
Module {
  id: '.',
  exports: {},
  parent: null,
  filename:
   '/Users/mauro/code/learning-notes/advanced-node/2-node!==js/module.js',
  loaded: false,
  children: [],
  paths:
   [ '/Users/mauro/code/learning-notes/advanced-node/2-node!==js/node_modules',
     '/Users/mauro/code/learning-notes/advanced-node/node_modules',
     '/Users/mauro/code/learning-notes/node_modules',
     '/Users/mauro/code/node_modules',
     '/Users/mauro/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
*/

console.log("In ./index.js");
// require("find-me");

require.resolve("find-me");
