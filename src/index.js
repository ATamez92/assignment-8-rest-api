import express from "express";
import { logger } from "./middleware/logger.js";
import resourcesRouter from "./routes/resources.js";
import pool from "./db.js";  // Import the database connection pool.

// Initialize the Express application.
const app = express();

// Parse incoming JSON request bodies for use in route handlers.
app.use(express.json());

// Log incoming requests before processing API routes.
app.use(logger);

// Mount the resource endpoints under a shared API path.
app.use("/api/items", resourcesRouter);

// Provide a simple endpoint for checking server availability.
app.get("/api/status", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString()
    });
});

// Start the server API only after verifying the database connection.
const PORT = process.env.PORT || 3000;

try {
    await pool.query("SELECT 1");  // Test the database connection.


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log("Connected to PostgreSQL");
    });

} catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);  // Exit the process if the database connection fails.
}