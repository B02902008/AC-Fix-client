# AC-Fix Client

###### Author: Chen, Hong-Wun
###### Organization: SELab in Department of CSIE, NTU

---

This project is a submodule of AC-Fix.

This project set up a Angular client for AC-Fix.

## System Requirement

- NodeJs 13.0.0
- NPM 6.12.0
- Angular 9.1.8
- Docker

## Run client

Install dependency: ```npm install```

Build command: ```ng serve```

The client will serve on default port 4200, and will require localhost AC-Fix server (port: 5566) and SonarQube (port: 9000).

## Build Docker Image

Build command ```./gradlew buildDockerImage```

This will build a Docker image with tag ```ac-fix/ac-fix-client:1.0```

The built Docker image is meant for Docker Compose, and possibly will not work.
