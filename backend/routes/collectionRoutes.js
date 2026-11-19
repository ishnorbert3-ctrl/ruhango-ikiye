
const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// CREATE COLLECTION REQUEST
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            waste_type,
            quantity,
            pickup_location,
            preferred_date,
            description
        } = req.body;

        if (!waste_type || !pickup_location) {
            return res.status(400).json({
                message: "Waste type and pickup location are required!"
            });
        }

        const [result] = await db.execute(
            `INSERT INTO collection_requests
            (user_id, waste_type, quantity, pickup_location,
             preferred_date, description)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                req.user.id,
                waste_type,
                quantity || null,
                pickup_location,
                preferred_date || null,
                description || null
            ]
        );

        res.status(201).json({
            message: "Collection request submitted successfully!",
            request_id: result.insertId
        });

    } catch (error) {
        console.error("Collection request error:", error.message);

        res.status(500).json({
            message: "Failed to submit collection request!"
        });
    }
});


// GET MY COLLECTION REQUESTS (RESIDENT)
router.get(
    "/my-requests",
    authMiddleware,
    async (req, res) => {
        try {
            const [requests] = await db.execute(
                `SELECT *
                 FROM collection_requests
                 WHERE user_id = ?
                 ORDER BY created_at DESC`,
                [req.user.id]
            );

            res.status(200).json({
                message: "Your collection requests retrieved successfully!",
                requests
            });

        } catch (error) {
            console.error("My collection requests error:", error.message);

            res.status(500).json({
                message: "Failed to retrieve your collection requests!"
            });
        }
    }
);


// GET ALL REQUESTS (ADMIN AND COLLECTOR)
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin", "collector"),
    async (req, res) => {
        try {
            const [requests] = await db.execute(
                `SELECT collection_requests.*, users.full_name
                 FROM collection_requests
                 LEFT JOIN users
                 ON collection_requests.user_id = users.id
                 ORDER BY collection_requests.created_at DESC`
            );

            res.json({
                message: "Collection requests retrieved successfully!",
                requests
            });

        } catch (error) {
            console.error(error.message);

            res.status(500).json({
                message: "Failed to retrieve collection requests!"
            });
        }
    }
);


// UPDATE REQUEST STATUS (ADMIN AND COLLECTOR)
router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("admin", "collector"),
    async (req, res) => {
        try {
            const { status } = req.body;
            const { id } = req.params;

            const allowedStatuses = [
                "pending",
                "approved",
                "collected",
                "cancelled"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid request status!"
                });
            }

            const [result] = await db.execute(
                "UPDATE collection_requests SET status = ? WHERE id = ?",
                [status, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Collection request not found!"
                });
            }

            res.json({
                message: "Collection request status updated successfully!"
            });

        } catch (error) {
            console.error(error.message);

            res.status(500).json({
                message: "Failed to update collection request!"
            });
        }
    }
);

module.exports = router;
