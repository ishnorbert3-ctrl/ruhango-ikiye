
const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// GET ALL LOCATIONS - PUBLIC
router.get("/", async (req, res) => {
    try {
        const [locations] = await db.execute(
            "SELECT * FROM locations ORDER BY created_at DESC"
        );

        res.status(200).json({
            message: "Locations retrieved successfully!",
            locations
        });

    } catch (error) {
        console.error("Locations error:", error.message);

        res.status(500).json({
            message: "Failed to retrieve locations!"
        });
    }
});

// ADD LOCATION - ADMIN ONLY
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const {
                name,
                sector,
                cell,
                village,
                address,
                latitude,
                longitude,
                location_type,
                description
            } = req.body;

            if (!name) {
                return res.status(400).json({
                    message: "Location name is required!"
                });
            }

            const [result] = await db.execute(
                `INSERT INTO locations
                (name, sector, cell, village, address,
                 latitude, longitude, location_type, description)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    name,
                    sector || null,
                    cell || null,
                    village || null,
                    address || null,
                    latitude ?? null,
                    longitude ?? null,
                    location_type || "collection_point",
                    description || null
                ]
            );

            res.status(201).json({
                message: "Location added successfully!",
                location_id: result.insertId
            });

        } catch (error) {
            console.error("Add location error:", error.message);

            res.status(500).json({
                message: "Failed to add location!"
            });
        }
    }
);

// DELETE LOCATION - ADMIN ONLY
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const [result] = await db.execute(
                "DELETE FROM locations WHERE id = ?",
                [req.params.id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Location not found!"
                });
            }

            res.json({
                message: "Location deleted successfully!"
            });

        } catch (error) {
            console.error(error.message);

            res.status(500).json({
                message: "Failed to delete location!"
            });
        }
    }
);

module.exports = router;
