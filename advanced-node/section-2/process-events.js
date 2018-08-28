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
