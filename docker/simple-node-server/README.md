# Simple Node Server with Docker

**Source:** [Egghead.io - Build a Simple Node.js Web Server with Docker](https://egghead.io/lessons/node-js-build-a-simple-node-js-web-server-with-docker)

Let's first create a simple Node server that listens on port 8000 and responds with a text message on any path.

```js
// index.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from the server!");
});

server.listen(8000);

console.log("Server listening on port 8000");
```

We can run this locally by running `node index.js` and check that it works by visiting `localhost:8000` on a browser or running `curl localhost:8000` on a terminal.

## Creating a Docker image

A `Dockerfile` is a recipe for a Docker image, it contains a series of command that describe the steps to be performed to create the image.

The first line of a `Dockerfile` should always be what image we are starting *from*. In this case we'll use the official `node` image.

```dockerfile
FROM node
```

The next step is to copy our source code files to the image. The `COPY` commands accepts 2 arguments: the source and the destination.

```dockerfile
COPY index.js .
# here '.' is the root directory of the Docker image
```

> You can think of a Docker image as a closed-off firewall

Following the firewall analogy, our image is currently closed to the world, but our server wants to communicate over port 8000. To solve this, we *expose* the port our containerised application uses to a port in our own machine.

```dockerfile
EXPOSE 8000
```

Exposing port 8000 means that port 8000 of our local machine is forwarded to the virtual port 8000 of the containerised application.

The last command in a Dockerfile is generally the *command* that runs the application.

```dockerfile
RUN node index.js
```

Our final `Dockerfile` looks like:

```dockerfile
FROM node
COPY index.js .
EXPOSE 8000
CMD node index.js
```

## Creating the Docker image

To *build* the Docker image locally we run the following command:

```sh
docker build -t myserver .
```

You can now see your image by running:

```sh
docker images
```

## Running the Docker image

To *run* the Docker image, i.e. create a container or an instance of it, we run the following command:

```sh
docker run -p 8000:8000 -d myserver
```

The `-p` flag maps the port on your machine (left of the ":") to the port on the container (right of the ":").

The `-d` flag runs the container on detached mode, i.e. as a process in the background.

You can check your running containers by running:

```sh
docker ps
```