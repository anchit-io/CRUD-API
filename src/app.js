const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to CRUD API");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "CRUD API is running successfully",
    timestamp: new Date(),
  });
});

module.exports = app;

