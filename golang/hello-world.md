# Golang Hello World

Make a directory for your package:

```sh
$ mkdir $GOPATH/src/github.com/user/hello
```

Create a `hello.go` file.

```go
package main

import "fmt"

func main() {
	fmt.Printf("Hello, world.\n")
}
```

You can run this program:

```sh
go run <path_to_file>
```

You can also install the program, i.e., create a binary file in `go/bin`:

```sh
go install <path_to_package>
```

Now you can run it as a binary executable from the shell:

```
$ $GOPATH/bin/hello
Hello, world.
```
