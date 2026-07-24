require("dotenv").config();

const express = require("express");
const prisma = require("./prisma/prismaClient");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CRUD API is running",
  });
});

app.use("/users", userRoutes);

// Health Check
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "healthy",
      application: "up",
      database: "connected",
      timestamp: new Date().toISOString(),
    });

  } catch (error) {

    res.status(503).json({
      status: "unhealthy",
      application: "up",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    });

  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
  });

});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {

  await prisma.$disconnect();

  server.close(() => {
    process.exit(0);
  });

});

process.on("SIGTERM", async () => {

  await prisma.$disconnect();

  server.close(() => {
    process.exit(0);
  });

});

