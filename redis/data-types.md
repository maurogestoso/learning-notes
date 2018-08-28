<!-- TOC -->

- [Redis Data Types](#redis-data-types)
    - [Lists](#lists)
        - [RPUSH](#rpush)
        - [LRANGE](#lrange)

<!-- /TOC -->

# Redis Data Types


- Binary-safe Strings: the most basic kind of Redis value. Being "binary-safe" means that the string can contain any type of data represented as a string: PNG images or serialized objects, for example.
- Lists: linked lists, collections of string elements that are sorted based on the order that they were inserted.
- Sets: they represent collections of unique and unsorted string elements.
- Sorted Sets: like Sets, they represent a collection of unique string elements; however, each string element is linked to a floating number value, referred to as the element score. When querying the Sorted Set, the elements are always taken sorted by their score, which enables us to consistently present a range of data from the Set.
- Hashes: these are maps made up of string fields linked to string values.
- Bit arrays: also known as bitmaps. They let us handle string values as if they were an array of bits.
- HyperLogLogs: a probabilistic data structure used to estimate the cardinality of a set, which is a measure of the "number of elements of the set."

## Lists

A sequence of ordered elements, e.g. `1 2 4 5 7 83 9 3`. It's important to note that in Redis, lists are implemented as linked lists. THat means that it's very fast to add and remove items from the head or tail, but it's hard to perform operations in items in the middle because we don't have indeces for them.

### RPUSH

We can add an item at the end of a list with the `RPUSH` command. If the list doesn't exist it will be created. It returns the new length of the list.

```
RPUSH key value [value...]
```

```
> RPUSH fruits apple
(integer) 1
> RPUSH fruits banana
(integer) 2
> RPUSH fruits coconut
(integer) 3
```

### LRANGE

`LRANGE` returns a subset of a list determined by a start and stop position. It's essentially `slice`

```
LRANGE key start stop
```

```
> LRANGE fruits 0 -1
1) "apple"
2) "banana"
3) "coconut"
```
