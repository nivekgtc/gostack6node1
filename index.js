const http = require("http");
const express = require("express");
const app = express();

http
  .createServer((req, res) => {
    console.log(req);
    res.end("Hello World");
  })
  .listen(3000);
