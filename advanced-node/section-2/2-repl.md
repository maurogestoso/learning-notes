# The Node REPL

## Autocomplete

Hitting `tab` after something like `[1, 2, 3].` will print all available properties and methods to that particular value.

The `_` character points to the last output value

`.help` for dot-commands

- `.load` to load a file
- `.save` to save the session history into a file
- `.editor` gives you a multi-line editor

You can use the `repl` core module to start your own repl sessions as part of your programs. Example:

````js
const repl = require("repl");
let r = repl.start({
  ignoreUndefined: true,
  replMode: repl.REPL_MODE_STRICT
});
r.context.lodash = require("lodash");
```

Other helpful options:
- `-c` checks for syntax errors
- `-p` evaluates a string and prints the result
- `-r` to preload modules
````
