// api/index.js
const serverless = require("serverless-http");
const express = require("express");
const app = express();

// Sample route to test
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// More routes can be added here
// Example: app.get("/users", (req, res) => { ... });

module.exports.handler = serverless(app);
