# How require() actually works

Modularity is a first class concept in Node. There are 2 core modules involved:

- The `require` function is available in each module, but each module gets its own function
- The `module` module, used to manage all the module we require with the `require` function

## What happens when you `require("something")`

1. **Resolving** to find the absolute path of a module
2. **Loading** is determined by the content of the file at the resolved path
3. **Wrapping** is what gives every module its private scope and what makes require local to every module
4. **Evaluating** is what the VM eventually does with the code
5. **Caching** so that when we require this module again, we don't do the same steps again

```js
console.log(module);
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
```

When you require a module like: `require('find-me')`, Node will look at the paths under `module.paths` property (in that order).

Use `require.resolve()` to resolve a file but not execute it.

Modules don't have to be files. We can create a `find-me` directory with an `index.js` in it and `require('find-me')` because `index` is the default name for the main file of a module. We can change this behaviour by changing the `main` property in `package.json`:

Let's say we want `start.js` to be the main file of our `find-me` module. We add a `package.json` file like:

```json
{
  "name": "find-me",
  "main": "start.js"
}
```

And now we can require `start.js` like `require('find-me')`.

We can also place modules wherever we want in our filesystem and require them with relative or absolute paths.

If we require a module from another module and log out on both of them the `module` object, we will see that each object will have a reference to each other under the `parent` and `children` properties. We will see that on the `children` property Node prints out `[Circular]` to avoid an infinite loop of printing parents and children recursively.
