import express from "express";

const router = express.Router();

// Store resources in memory until the server restarts.
const resources = [
    {
        id: "1",
        title: "Task Number One",
        description: "This is the first task in the list.",
        completed: false
    },
    {
        id: "2",
        title: "Task Number Two",
        description: "This is the second task in the list.",
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

    if (!resource) {
        return res.status(404).json({
            error: `Resource with ID ${req.params.id} not found.`
        })
    }

    res.status(200).json({ data: resource });
});

// Define a POST endpoint to create a new resource from incoming JSON data.
router.post("/", (req, res) => {
    const { title, description, completed } = req.body ?? {};

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required and must be a non-empty string."
        });
    }

    const id = Date.now().toString();

    const newResource = {
        id,
        title: title.trim(),
        description: description ?? "",
        completed: completed ?? false
    };

    resources.push(newResource);

    res.status(201).json({ data: newResource });
});

// Define a PUT endpoint to update an existing resource by its ID.
router.put("/:id", (req, res) => {
    const resource = resources.find((item) => item.id === req.params.id);

    if (!resource) {
        return res.status(404).json({
            error: `Resource with ID ${req.params.id} not found.`
        });
    }

    const { title, description, completed } = req.body ?? {};

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required and must be a non-empty string."
        });
    }

    // Replace editable fields while preserving the resource's ID.
    resource.title = title.trim();
    resource.description = description ?? "";
    resource.completed = completed ?? false;

    res.status(200).json({ data: resource });
});

// Define a DELETE endpoint to remove a resource by its ID.
router.delete("/:id", (req, res) => {
    const index = resources.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            error: `Resource with ID ${req.params.id} not found.`
        });
    }

    const [deletedResource] = resources.splice(index, 1);

    res.status(200).json({ data: deletedResource });
});

export default router;