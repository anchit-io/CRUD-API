const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
