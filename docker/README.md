# Docker

<!-- TOC -->

- [Docker](#docker)
  - [Basics](#basics)
    - [Download and Remove a Docker Images](#download-and-remove-a-docker-images)
    - [Run a Docker Container](#run-a-docker-container)
    - [Stop a Docker Container](#stop-a-docker-container)
    - [Remove a Docker Container](#remove-a-docker-container)

<!-- /TOC -->

## Basics

### Download and Remove a Docker Images

Docker images are stored in the Docker Hub registry. To download an image run the `pull` command:

```sh
docker pull <image_name>
```

If no tag is provided, Docker will download the `latest` version. If you want to specifiy a version, add `:<version>` to the image name with a valid semver number.

Official Docker images have just one name. User created images are namespaced starting like `<user_name>/<image_name>`.

You can see which images you have currently cached in your machine with the `images` command:

```sh
docker images
```

You can remove a Docker image with the `rmi` command:

```sh
docker rmi <image_id>
```

### Run a Docker Container

To run a container, i.e. create a container from an image, run the `docker run` command:

```sh
docker run <image_name>
```

If you don't have the image, Docker will download it from DockerHub. Otherwise it will use the one you have cached locally.

The container will run in the background and the terminal will show the logs for it. Hit `Control+C` to stop the container.

The `-d` flag runs the container in `daemon` or detached mode, i.e. as a backround process. The string output by the Docker CLI is the hash of the container you just created.

### Stop a Docker Container

Usually you will have more than one container running and they will be in daemon mode. In order to see which containers are currently running, type:

```sh
docker ps
```

To stop a container copy the container id and run:

```sh
docker stop <container_id>
```

Stopping a container doesn't delete it. It will remain in a stopped state. To see all containers, regardless of their state, run:

```sh
docker ps -a
```

### Remove a Docker Container

To fully remove a container run the `rm` command. Note that a container must be stopped in order to be removed:

```sh
docker rm <container_id>
```

