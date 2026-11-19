
const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// GET ALL CAMPAIGNS - PUBLIC
router.get("/", async (req, res) => {
    try {
        const [campaigns] = await db.execute(
            "SELECT * FROM campaigns ORDER BY campaign_date DESC"
        );

        res.json({
            message: "Campaigns retrieved successfully!",
            campaigns
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Failed to retrieve campaigns!"
        });
    }
});

// CREATE CAMPAIGN - ADMIN ONLY
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const {
                title,
                description,
                location,
                campaign_date,
                image,
                status
            } = req.body;

            if (!title || !location) {
                return res.status(400).json({
                    message: "Title and location are required!"
                });
            }

            const [result] = await db.execute(
                `INSERT INTO campaigns
                (title, description, location, campaign_date, image, status)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    title,
                    description || null,
                    location,
                    campaign_date || null,
                    image || null,
                    status || "upcoming"
                ]
            );

            res.status(201).json({
                message: "Campaign created successfully!",
                campaign_id: result.insertId
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                message: "Failed to create campaign!"
            });
        }
    }
);

// UPDATE CAMPAIGN STATUS - ADMIN ONLY
router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const { status } = req.body;
            const { id } = req.params;

            const allowedStatuses = [
                "upcoming",
                "ongoing",
                "completed"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid campaign status!"
                });
            }

            const [result] = await db.execute(
                "UPDATE campaigns SET status = ? WHERE id = ?",
                [status, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Campaign not found!"
                });
            }

            res.json({
                message: "Campaign status updated successfully!"
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                message: "Failed to update campaign!"
            });
        }
    }
);

module.exports = router;
