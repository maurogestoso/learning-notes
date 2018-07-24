# Golang Basics

<!-- TOC -->

- [Golang Basics](#golang-basics)
  - [Packages](#packages)
  - [Values](#values)
  - [Variables and Constants](#variables-and-constants)
  - [For loops](#for-loops)
  - [Conditionals](#conditionals)
  - [Switch](#switch)
  - [Functions](#functions)
  - [Arrays](#arrays)
  - [Slices](#slices)

<!-- /TOC -->

## Packages

Every Go program is made up of packages. Programs start running in package `main`.

```go
package main
import (
  "fmt"
  "math/rnd"
)

func main() {
  fmt.Println("Hello world!", rnd.Intn(10))
}
```

By convention, the package name is the same as the last element of the import path.

In Go names are exported from a package if they start with a capital letter.

## Values

- Strings
- Integers
- Floats
- Booleans

## Variables and Constants

- The `var` keyword declares 1 or more variables. 
- You can specify the type after the variable name or you can let Go infer the type.
- Variables declared but not initialised are zero valued.
- The `:=` syntax is shorthand for declaration and initialisation

```go
var a = "initial"       // go infers it's a string
var b, c int = 1, 2     // defining 2 integers at once
var d = true            // go infers it's a boolea
var e int               // go assings e to 0
f := "short hand"       
// equivalent to:
var f string = "short hand"
```

You can define constants with the `const` keyword:

```go
const n = 500000000
fmt.Println(3e20 / n)     // 6e+11
fmt.Println(int64(n))     // 600000000000
fmt.Println(math.Sin(n))  // -0.28470407323754404
```

The type and precision of the `n` constant changes depending on the context

## For loops

The `for` loop is Go's only looping construct.

Most basic for loop, like a while loop:

```go
i := 1
for i <= 3 {
  fmt.Println(i)      // 1, 2, 3
  i = i + 1
}
```

Classic initial/condition/after loop:

```go
for j := 7; j <= 9; j++ {
  fmt.Println(j)
}
```

A for loop without a condition will run until you `return` out of the enclosing function or `break` out of it.

You can also `continue` to the next iteration of the loop.

## Conditionals

Basic example of if/else branching:

```go
if 7%2 == 0 {
  fmt.Println("Is even")
} else {
  fmt.Println("Is odd")
}
```

You can declare variables before an `if` condition. The variables will be available to all branches:

```go
if num := 9; num < 0 {
  fmt.Println(num, "is negativ")
} else if num < 10 {
  fmt.Println(num, "has a single digit")
} else {
  fmt.Println(num, "has multiple digits")
}

fmt.Println(num)      // num is undefined outsided the if/else blocks
```

## Switch

`switch` statements express conditionals across many branches:

```go
switch time.Now().Weekday() {
case time.Saturday, time.Sunday:
  fmt.Println("It is the weekend, my dudes!")
default:
  fmt.Println("It is a weekday")
}
```

You can comma-separate multiple expressions on a single `case`.

A `switch` without an expression is equivalent to an if/else:

```go
t := time.Now()
switch {
case t.Hour() < 12:
  fmt.Println("It's before noon")
default:
  fmt.Println("It's after noon")
}
```

A type `switch` compares types instead of values. You can use this to discover the type of an interface value.

```go
whatAmI := func(i interface{}) {
  switch t := i.(type) {
  case bool:
    fmt.Println("I am a bool")
  case int:
    fmt.Println("I am an int")
  default:
    fmt.Println("Unknown type ", t)
  }
}
whatAmI(true)
whatAmI(21)
whatAmI("hello")
```

## Functions

```go
package main

import "fmt"

func add(x int, y int) int {
  return x + y
}

func main() {
  fmt.Println(add(42, 13))
}
```

Functions can take 0 or more arguments. The type of the argument goes after the name.

After the argument definitions goes the type of the returned value.

You can also omit the type of arguments if they are the same type as the following one.

```go
func add(x, y int) int {
  return x + y
}
```

A function can return many values:

## Arrays

An array is an indexed sequence of elements of a specific length.

You create an array by specifying the length and the type of values it contains. Arrays are 0 valued:

```go
var a [5]int
a[4] = 100
fmt.Println(a, a[4])              // [0 0 0 0 100] 100
fmt.Println("length:", len(a))    // 5
```

You can declare an initialise an array:

```go
b := [5]int{1, 2, 3, 4, 5}
fmt.Println(b)                  // [1 2 3 4 5]
```

You can declare multidimensional arrays:


```go
var twoD [2][3]int
for i := 0; i < 2; i++ {
  for j := 0; j < 3; j++ {
    twoD[i][j] = i + j
  }
}
fmt.Println(twoD)           // [[0 1 2] [1 2 3]]
```

## Slices

Slices have a more powerful interface than arrays. THey are only typed by the values they contain, not their length.

You can create an empty, zero valued slice with the `make` built-in:

```go
s := make([]string, 3)
s[0] = "apple"
s[1] = "banana"
s[2] = "coconut"
fmt.Println(s, "length:", len(s))
```

You can also declare and initialise a slice in the same line:

```go
t := []string{"g", "h", "i"}
fmt.Println("dcl:", t)
```

The builtin `append` returns a new slice made of the passed slice and the passed values:

```go
s = append(s, "orange")
fmt.Println("length:", len(s))                // 4

s = append(s, "grapefruit", "pineapple")
fmt.Println("length:", len(s))                // 6
```

You can also copy a slice with the `copy` builtin:

```go
c := make([]string, len(s))
copy(c, s)
```

Slices support the slice operator `:`:

```go
// c = [a b c d e f]
l := c[2:5]
fmt.Println(l)    // c d e

l = c[2:]       
fmt.Println(l)    // [c d e f]

l = c[:5]
fmt.Println(l)    // [a b c d e]
```

You can also create multidimensional slices:

```go
twoD := make([][]int, 3)
for i := 0; i < 3; i++ {
  innerLen := i + 1
  twoD[i] = make([]int, innerLen)
  for j := 0; j < innerLen; j++ {
    twoD[i][j] = i + j
  }
}

fmt.Println(twoD) [[0] [1 2] [2 3 4]]
```

