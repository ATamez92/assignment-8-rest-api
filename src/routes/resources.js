import express from "express";

const router = express.Router();

// Store resources in memory until the server restarts.
const resources = [
    {
        id: "1",
        title: "Task Number One",
        dscription: "This is the first task in the list.",
        completed: false
    },
    {
        id: "2",
        title: "Task Number Two",
        dscription: "This is the second task in the list.",
        completed: false
    }
];

// Define a GET endpoint to retrieve all resources in the collection.
router.get("/", (req, res) => {
    res.status(200).json({ data: resources });
});

// Define a GET endpoint to retrieve a specific resource by its ID.
router.get("/:id", (req, res) => {
    const resource = resources.find((item) => item.id === req.params.id);
});

export default router;