# Table of content

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Compiling](#compiling)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project is a barebone but efficient template for an API in typescript made with the precious help of [Bylife](https://github.com/Bylife)
- It uses a custom routing system and is built to use it along MongoDB, MYSQL or any other type of SQL database.
- It comes by default with multiple types of requests: http and wss(websockets)

## Installation
Make sure you have installed **typescript** on your system and **npm**, then head over to the root of the project and type ```npm install```
<br>
You **need** to create a .env file and add the database tokens just like in the .env.example
<br><br>
If you have any problems with the installation, you can open an issue in this repository.

## Tests set up
you'll find a dedicated tests folder where you can write and execute your unit tests. This folder is designed to contain all your test scripts to ensure proper testing of your codebase
<br>
Install : ```npm install --save-dev jest @types/jest ts-jest```
<br>
Run : ```npx jest```

## Usage
Run ```nodemon index.ts``` to run the project !

## Compiling
Run ```tsc --outDir ./dist``` to compile the project, the compiled files will be in the dist folder.

## Contributing
If you want to contribute to this project you can fork this repository and make a pull request with your changes.
Anyone is welcome to contribute to this project.

## License
This project is under the MIT license.
