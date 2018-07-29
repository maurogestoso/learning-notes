<!-- TOC -->

- [Automate Daily Development Tasks with Bash](#automate-daily-development-tasks-with-bash)
  - [1. Navigate the Filesystem](#1-navigate-the-filesystem)
  - [2. View Files and Folders](#2-view-files-and-folders)
  - [3. Create and Delete Files and Folders](#3-create-and-delete-files-and-folders)
  - [4. Move and Copy Files and Folders](#4-move-and-copy-files-and-folders)
  - [5. Find Files and Folders](#5-find-files-and-folders)
  - [6. Search for text with grep](#6-search-for-text-with-grep)
  - [7. Make HTTP requests](#7-make-http-requests)
  - [Functions](#functions)
  - [Exit Status](#exit-status)
  - [Conditionals](#conditionals)
    - [Comparison Primaries](#comparison-primaries)
    - [Ternary statement](#ternary-statement)
    - [Example](#example)
  - [Pipe and Redirect Output](#pipe-and-redirect-output)
    - [Example](#example-1)
    - [Redirecting Output](#redirecting-output)

<!-- /TOC -->

# Automate Daily Development Tasks with Bash

## 1. Navigate the Filesystem

pwd, ~, tab autocompletion, cd, ls -la

## 2. View Files and Folders

cat
-n to see line numbers

less
G / Shift+G to go to beginning / end of file
/string to search for instances of "string"
q to exit

open
-a <application_name> to open with the specified application

## 3. Create and Delete Files and Folders

touch

echo "hello" > file.txt
echo "hello again" >> file.txt

mkdir
-p to recursively create all necessary directories

rm
-rf

rmdir

## 4. Move and Copy Files and Folders

mv

cp
-r to recursively copy files under a directory

## 5. Find Files and Folders

`find images/ -name "*.png"`
Lists all files in the specified directory that have a .png extension

`find images -iname "*.jpg"`
Matches .jpg and .JPG (case insensitive)

`find . -type d`
Find all directories

`find dist/ -name "*.built.js" -delete`
Deletes all matched files

`--exec` to run a specific script on each match of the find operation

## 6. Search for text with grep

`grep "npm.config.get" lib/**/*.js`
Lists all instances of the specified string in the specified file(s)

`--color` paints the matched text red
`-n` shows line numbers
`-C 1` shows the surrounding 1 lines for each matched line (context)
`-e` to specify a RegEx

## 7. Make HTTP requests

`curl <url>` makes a GET request to the specified URL
`-i` includes the headers of the response
`-L` to follow redirects
`-H "Authorization: Bearer 123"` to specify a header
`-X POST` to change the method
`-d '{ "message": "hello" }'` to pass the body
`--data-urlencode title="wahtever"` to pass a url encoded field (use it once per field)
`-o <file>` to output the response into a file

`\` allows us to type Enter and continue the command in a new line

`curl <url> | jsome` to pretty print a JSON response

## Functions

Define and call a function:

```sh
greet () {
  echo "hello world!"
}

greet
```

Pass arguments to a function:

```sh
greet () {
  echo "hello $1!"
}

greet "Mauro"
```

Note that you can't define named parameters, the parenthesis are just to indicate that `greet` is a function

Store the output of a function in a variable:

```sh
greet () {
  echo "Hello $1!"      # $1 refers to the 1st arg passed to the function
}

greeting=$(greet $1)    # $1 refers to the 1st arg passed to the script

echo "the greeting is $greeting"
```

Everything you `echo` inside a function will be captured as its output when you call it. Including separate `echo` calls.

Scope in Bash works similarly to JS. You can access global variables from inside functions. You can also define variables local to functions by using the `local` keyword:

```sh
global_var="I am global"

scope_test () {
  local local_var="I am local"
  echo "global_var=$global_var"
  echo "local_var=$local_var"
}

scope_test
echo "global_var=$global_var"
echo "local_var=$local_var"

# Output:
# global_var=I am global
# local_var=I am local
# global_var=I am global
# local_var=
```

## Exit Status

Every command you run in bash will return an exit status. You can check the exit status of the previous command by typing `$?`

```sh
ls              # hello.txt
echo $?         # 0

ls noexist      # ls: noexist: No such file or directory
echo $?         # 1
```

An exit status is an integer between 0 and 255. Each number signifies a specific error, it's up to each script to decide what's an error. The most common exit statuses are 0 (ok) and 1 (generic error).

```sh
sleep 10          # sits idle for 10s
^C                # sends an interrupt signal

echo $?           # 130
```

Exit status 130 means "Script terminated by Control+C"

Exit with a particular status with the `exit` keyword followed by the exit code.

## Conditionals

```sh
if [[ $USER = "mauro" ]]; then
  echo "true"
# elif [[ ]]; then
else
  echo "false"
fi
```

### Comparison Primaries

Numeric comparisons: `1 -eq 1`
Not equal: `2 -ne 1`
File exists: `-e functions.sh`
Check if variable is empty: `-z my_var`
Lower/greater than: `-lt`, `-gt`

### Ternary statement

```sh
[[ -z $USER ]] && echo 'yes' || echo 'no'
```

### Example

```sh
check_status () {
  local status=$(curl -ILs $1 | head -n 1 | cut -d ' ' -f 2)
      # curl flags: I for headers, L for follow redirect, s for silent
      # head -n 1 gets the first line
      # cut -d ' ' splits the line on ' ' and gets the 2nd element
  if [[ $status -lt 200 ]] || [[ $status -gt 299 ]]; then
    echo "$1 failed with status $status"
    return 1
  else
    echo "$1 succeeded with status $status"
  fi
}

check_status $1
```

## Pipe and Redirect Output

Pipes are used to direct the output of one command to the input of another.

`ps ax` lists all the running processes in our machine
`grep` allows to search text, normally you would run it on a file

We can pipe the output of `ps ax` into `grep`:

```sh
ps ax | grep Safari | less
```

This will only output the processes that contain the word "Safari". You can optionally pipe into less to view the results in a different way.

### Example

Uglify, compress and count the bytes of a file:

```sh
uglifyjs -c -m -- index.js | gzip -9 | wc -c
# 280 (bytes)
```

`wc` is word count and the `-c` flag tells it to count bytes
Note that this process didn't output an uglified, compressed file. It all happened in memory.

### Redirecting Output

By default, whenever you run a command in Bash, the output is printed to the Terminal. If you want to redirect the output (to a file for example) you can use the `>` operator:

```sh
ls > ls.txt
# no output on the terminal
cat ls.txt
# index.js
# ls.txt
```

Redirection will create files and overwrite their content. If you want to redirect and append you can use the `>>` operator:

```sh
echo "hello" >> ls.txt
cat ls.txt
# index.js
# ls.txt
# hello
```
