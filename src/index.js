import express from "express";

// Initialize the Express application.
const app = express();

// Parse incoming JSON requests and make the data available in req.body.
app.use(express.json());

app.get("/api/status", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString()
    });
});

// Start the server using the configured port or default to 3000 if not specified.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});