import express from "express";
import pool from "../db.js";  // Import the database connection pool.

const router = express.Router();

// Retrieve all items directly from PostgreSQL database using a GET endpoint.
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM items ORDER BY id");

        res.status(200).json({ data: result.rows });
    } catch (error) {
        console.error("Failed to retrieve items:", error.message);
        res.status(500).json({ error: "Failed to retrieve items." });
    }
});

// Retrieve an item from PostgreSQL using its unique ID with a GET endpoint.
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    // Validate that the ID is a positive integer before querying the database.
    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ error: "Invalid item ID." });
    }
    // Query the database for the item with the specified ID.
    try {
        const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Item with ID ${id} not found.` });
        }

        res.status(200).json({ data: result.rows[0] });
    } catch (error) {
        console.error("Failed to retrieve item:", error.message);
        res.status(500).json({ error: "Failed to retrieve item." });
    }
});

// Create a new item and save it directly to the PostgreSQL database using a POST endpoint.
router.post("/", async (req, res) => {
    const { title, description, completed } = req.body ?? {};

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "A non-empty title is required." });
    }

    if (description != null && typeof description !== "string") {
        return res.status(400).json({ error: "Description must be a string." });
    }

    if (completed != null && typeof completed !== "boolean") {
        return res.status(400).json({ error: "Completed must be a boolean." });
    }

    try {
        const result = await pool.query(
            "INSERT INTO items (title, description, completed) VALUES ($1, $2, $3) RETURNING *",
            [title.trim(), description ?? "", completed ?? false]
        );

        res.status(201).json({ data: result.rows[0] });
    } catch (error) {
        console.error("Failed to create item:", error.message);
        res.status(500).json({ error: "Failed to create item." });
    }
});

// Update an existing item directly in PostgreSQL using a PUT endpoint.
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ error: "Invalid item ID." });
    }

    const { title, description, completed } = req.body ?? {};

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            error: "A non-empty title is required."
        });
    }

    if (description != null && typeof description !== "string") {
        return res.status(400).json({
            error: "Description must be a string."
        });
    }

    if (completed != null && typeof completed !== "boolean") {
        return res.status(400).json({
            error: "Completed must be a boolean."
        });
    }

    try {
        const result = await pool.query(
            `UPDATE items
       SET title = $1, description = $2, completed = $3
       WHERE id = $4
       RETURNING *`,
            [title.trim(), description ?? "", completed ?? false, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Item with ID ${id} not found.`
            });
        }

        res.status(200).json({ data: result.rows[0] });
    } catch (error) {
        console.error("Failed to update item:", error.message);
        res.status(500).json({ error: "Failed to update item." });
    }
});

// Delete an item permanently from PostgreSQL using a DELETE endpoint.
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ error: "Invalid item ID." });
    }

    try {
        const result = await pool.query(
            "DELETE FROM items WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Item with ID ${id} not found.`
            });
        }

        res.status(200).json({ data: result.rows[0] });
    } catch (error) {
        console.error("Failed to delete item:", error.message);
        res.status(500).json({ error: "Failed to delete item." });
    }
});

export default router;