# Your First Golang library

Let's create a library of string utilities. Create the directory: `go/src/github.com/<user>/stringutil`.

Now let's create a `reverse.go` file.

```go
package stringutil

// Reverse returns its argument string reversed rune-wise left to right.
func Reverse(s string) string {
	r := []rune(s) // splits the string s into a list of characters (runes)
	for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
```

We can build this program with the `go build` command to check if it compiles (it doesn't create the binary file).

Now we can import our `Reverse` function into our `hello` program:

```go
package main

import (
	"fmt"

	"github.com/maurogestoso/stringutil"
)

func main() {
	fmt.Println(stringutil.Reverse("Hello Go!"))
}
```

```sh
$ go run hello/hello.go
!oG olleH
```

## Testing our library

Go has a lightweight testing framework composed of the `go test` command and the `testing` library.

Test files have the name of the file you want to test suffixed with `_test.go` and have functions named `TestXXX` with signature `func (t *testing.T)`. The testing framework runs each such function and tests fail when the `t.Error` or `t.Fail` are called.

Let's test our reverse function:

```go
package stringutil

import "testing"

func TestReverse(t *testing.T) {
	cases := []struct {
		input, expected string
	}{
		{"Hello, world", "dlrow ,olleH"},
		{"Hello, 世界", "界世 ,olleH"},
		{"", ""},
	}
	for _, c := range cases {
		result := Reverse(c.input)
		if result != c.expected {
			t.Errorf("Reverse(%q) == %q, expected %q", c.input, result, c.expected)
		}
	}
}
```

`cases` is a list of structs (~JS objects). Each struct is a collection of key-value pairs, in this case `input` and `expected` with string values. We use `cases` to define the input and the expected output of many test cases.

Later we loop over `range cases` and grab each case `c`. We calculate the result with `c.input` and compare it to `c.expected`. If they are not equal, we make the test fail.
