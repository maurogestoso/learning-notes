<!-- TOC -->

- [Intro to Redis](#intro-to-redis)
    - [Executables](#executables)
    - [Running Redis](#running-redis)
    - [Basic operations](#basic-operations)
        - [Writing Data](#writing-data)
        - [Reading Data](#reading-data)
        - [Update Data](#update-data)
        - [Deleting Data](#deleting-data)
    - [Expiring Keys](#expiring-keys)

<!-- /TOC -->

# Intro to Redis

REmote DIctionary Server

Redis is an in-memory key-value store that can be used as a database, cache, and message broker.

- Sub-millisecond response times which is very well suited for real-time applications such as games, ad-brokers, financial dashboards, etc.
- Supports basic data structures such as strings, lists, sets, sorted sets with range queries, and hashes
- Advanced data structures like bitmaps, hyperloglogs, and geospatial indexes with radius queries are also supported

## Executables

`redis-server` runs the Redis server itself
`redis-cli` used to interact with Redis from the CLI
`redis-sentinel` monitoring and failover
`redis-benchmark` checks performance
`redis-check-aof` and `redis-check-dump` used when there are corrupted data files

## Running Redis

Start the server with `redis-server` which will output the version, port and PID.

Check that the server is running with `redis-cli ping` which should output `PONG`

## Basic operations

Start the redis REPL by running `redis-cli`

### Writing Data

```
SET key value
```

The `SET` command will also overwrite an existing key, effectively updating it.

To perform a non-destructive writing operation use the `SETNX` command:

```
> SET service "heroku"
OK
> SETNX service "aws"
(integer) 0
> GET service
"heroku"
```

### Reading Data

```
GET key
```

If you ask for a key that doesn't exist, Redis responds with `(nil)`

### Update Data

You can update data by overwriting it with the `SET` command.

```
> SET framework angular
OK
> GET framework
"angular"
> SET framework react
OK
> GET framework
"react"
```

### Deleting Data

```
DEL key
```

```
> DEL framework
(integer) 1
```

Responds with the number of keys that were deleted.

## Expiring Keys

We can tell Redis for how long it should keep a particular key in memory with the `EXPIRE key seconds` command


```
> SET notification "error!"
> EXPIRE notification 30
...30 seconds pass...
> GET notification
(nil)
```

You can check how long a key has to live with the `TTL key` command:

```
> SET notification "error!"
> EXPIRE notification 30
...15 seconds pass...
> TTL notification
(integer) 15
...15 seconds pass...
> GET notification
(nil)
> TTL notification
(integer) -2
```

The `TTL` command responds with either the number of seconds left, `(integer) -1` if an expiry time hasn't been set or `(integer) -2` if the key doesn't exist or the expiry time has passed.

Setting a key with a TTL that hasn't expired yet will remove the TTL

