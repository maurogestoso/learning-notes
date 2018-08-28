# The global object

When you define a variable in a module, that variable is local to the module and there's no way to access it from another module if it's not exported.

Howerver, if you define the variable as a property of the `global` object, it will be accessible to other modules because they all share the same `global` object.

## The process object

Provides a bridge between a Node app and it's running environment.

- `process.versions` to check the versions of Node and its dependencies
- `process.env` exposes a copy of the user's environment (you can't modify the user's environment)
- `process.release.lts` shows the release name or undefined if it's not an lts release (you can use it to show a message if an app is not run on an LTS version of Node)

## Process streams

We use `process.stdin/stdout/stderr` to communicate with the outside world

`process` is an instance of `EventEmitter`. Common events:

```js
process.on("exit", code => {
  // You can't stop Node from exiting but you can:
  // do one final sync operation
  // before the node process terminates
  console.log(`About to exit with code ${code}`);
});

process.on("uncaughtException", err => {
  // something went unhandled.
  // Do any cleanup and exit anyways!
  console.log(err);
  // don't just do ^this^, you'll stop Node from exiting
  // and leave it in an unpredictable state
  // force exit:
  process.exit(1);
});

// keep the event loop busy
process.stdin.resume();

// trigger a TypeError exception
console.dog("Woof!");
```
