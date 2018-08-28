## Buffer class

Low level data structure to represent a sequence of binary data.

Used to work with binary streams of data. A buffer is a chunk of memory allocated outside of the V8 heap. We can put data there and it can be interpreted in many ways. Where there is a buffer, there is character encoding, because data in a buffer is always binary.

Once a buffer is allocated it cannot be resized.

### Create a buffer

`Buffer.alloc(8)` creates a filled buffer of a certain size
`Buffer.allocUnsafe(8)` will not fill the created buffer (it can have old or sensitive data, fill it right away)
Filll a buffer with the `.fill()` method

```
const string = "touché";
const buffer = Buffer.from("touché");

console.log(string, string.length);
console.log(buffer, buffer.length);
```

Outputs:

```
touché 6
<Buffer 74 6f 75 63 68 c3 a9> 7
```

The string stores data as UTF-8 characters, while the buffer stores data as bytes (the é character requires 2 bytes)

Buffers are useful when we're reading things like an image or a compressed file.

Buffers have operations like `includes`, `indexOf` or `slice` but they behave slightly differently than their string or array counterparts. For example, a slice of a string will share the same allocated memory, so modifying one will modify the other.

When converting streams of binary data you should use the `string_decoder` module. This is especially relevant when receiving data in chunks (like from a stream). `string_decoder` will accumulate data until it can make sense of it, while `.toString()` will try to decode as soon as you call it, which might not be what you want.
