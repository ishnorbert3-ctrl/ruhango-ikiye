
const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// CREATE WASTE REPORT
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { waste_type, description, location, image } = req.body;

        if (!waste_type || !location) {
            return res.status(400).json({
                message: "Waste type and location are required!"
            });
        }

        const [result] = await db.execute(
            `INSERT INTO waste_reports
            (user_id, waste_type, description, location, image)
            VALUES (?, ?, ?, ?, ?)`,
            [
                req.user.id,
                waste_type,
                description || null,
                location,
                image || null
            ]
        );

        res.status(201).json({
            message: "Waste report submitted successfully!",
            report_id: result.insertId
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to submit waste report!"
        });
    }
});


// GET MY REPORTS (RESIDENT)
router.get(
    "/my-reports",
    authMiddleware,
    async (req, res) => {
        try {
            const [reports] = await db.execute(
                `SELECT *
                 FROM waste_reports
                 WHERE user_id = ?
                 ORDER BY created_at DESC`,
                [req.user.id]
            );

            res.status(200).json({
                message: "Your waste reports retrieved successfully!",
                reports
            });

        } catch (error) {
            console.error("My reports error:", error.message);

            res.status(500).json({
                message: "Failed to retrieve your reports!"
            });
        }
    }
);


// GET ALL WASTE REPORTS (ADMIN AND COLLECTOR)
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin", "collector"),
    async (req, res) => {
        try {
            const [reports] = await db.execute(
                `SELECT waste_reports.*, users.full_name
                 FROM waste_reports
                 LEFT JOIN users ON waste_reports.user_id = users.id
                 ORDER BY waste_reports.created_at DESC`
            );

            res.json({
                message: "Waste reports retrieved successfully!",
                reports
            });

        } catch (error) {
            console.error(error.message);

            res.status(500).json({
                message: "Failed to retrieve reports!"
            });
        }
    }
);


// UPDATE REPORT STATUS (ADMIN AND COLLECTOR)
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
                "in_progress",
                "resolved"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid report status!"
                });
            }

            const [result] = await db.execute(
                "UPDATE waste_reports SET status = ? WHERE id = ?",
                [status, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Report not found!"
                });
            }

            res.json({
                message: "Report status updated successfully!"
            });

        } catch (error) {
            console.error(error.message);

            res.status(500).json({
                message: "Failed to update report status!"
            });
        }
    }
);

module.exports = router;
