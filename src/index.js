import express from "express";
import { logger } from "./middleware/logger.js";
import resourcesRouter from "./routes/resources.js";

// Initialize the Express application.
const app = express();

// Parse incoming JSON request bodies for use in route handlers.
app.use(express.json());

// Log incoming requests before processing API routes.
app.use(logger);

// Mount the resource endpoints under a shared API path.
app.use("/api/resources", resourcesRouter);

// Provide a simple endpoint for checking server availability.
app.get("/api/status", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString()
    });
});

// Start the server using the configured port or default to 3000.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});