<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework Demo repository.

# NestJS Demo
This is a nestjs demo boilerplate with basic user authentication and uses AWS SES for sending emails. This boilerplate has following features:
- User signup
- User signin
- User profile
- Simple Blog CRUD demo
---

## Requirements

For development, you will only need Node.js and a node global package installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.6.0

    $ npm --version
    8.13.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Installation

```bash
npm i -g @nestjs/cli
```

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install

## Configure app

Create an environment file with extension ```.env```.

- Create a environment file with prefix your NODE_ENV  ```YOUR_ENV.env```
- Add a port with ```PORT={VALUE}``` to your env file
- Add a MongoDB username with ```DB_USERNAME={VALUE}``` to your env file
- Add a MongoDB password with ```DB_PASSWORD={VALUE}``` to your env file
- Add a MongoDB host with ```DB_HOST={VALUE}``` to your env file
- Add a MongoDB name with ```DB_NAME={VALUE}``` to your env file
- Add a JWT secret with ```JWT_SECRET={VALUE}``` to your env file
- Similarly add/change other fields as per your need.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Testing the app

```bash
$ npm run test:e2e
```

