
const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Admin Dashboard Statistics
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const [residents] = await db.execute(
                "SELECT COUNT(*) AS total FROM users WHERE role = 'resident'"
            );

            const [collectors] = await db.execute(
                "SELECT COUNT(*) AS total FROM users WHERE role = 'collector'"
            );

            const [reports] = await db.execute(
                "SELECT COUNT(*) AS total FROM waste_reports"
            );

            const [requests] = await db.execute(
                "SELECT COUNT(*) AS total FROM collection_requests"
            );

            res.status(200).json({
                message: "Dashboard statistics retrieved successfully!",
                statistics: {
                    residents: residents[0].total,
                    collectors: collectors[0].total,
                    waste_reports: reports[0].total,
                    collection_requests: requests[0].total
                }
            });

        } catch (error) {
            console.error("Dashboard error:", error.message);

            res.status(500).json({
                message: "Failed to retrieve dashboard statistics!"
            });
        }
    }
);

module.exports = router;
