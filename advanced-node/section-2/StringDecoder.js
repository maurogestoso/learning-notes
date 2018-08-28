const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder("utf8");

process.stdin.on("readable", () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    const buffer = Buffer.from([chunk]);
    console.log("with .toString():", buffer.toString());
    console.log("with StringDecoder:", decoder.write(buffer));
  }
});

/* 
$ node StringDecoder.js
0xE2
with .toString(): �
with StringDecoder:
0x82
with .toString(): �
with StringDecoder:
0xAC
with .toString(): �
with StringDecoder: €
*/
