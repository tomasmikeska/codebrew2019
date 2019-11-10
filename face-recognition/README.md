# Face detection and identification service

#### Installation

Install using pipenv

```
$ pipenv install
```

Run server

```
$ make run-server
```

#### Docker

Build image

```
$ docker build . -t "codebrew-face-recognition"
```

Connect to docker image

```
$ docker run -it -p 5000:5000 codebrew-face-recognition /bin/bash
```
