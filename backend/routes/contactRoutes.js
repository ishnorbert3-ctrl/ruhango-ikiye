
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// SEND CONTACT MESSAGE
router.post("/", async (req, res) => {
    try {
        const { full_name, email, subject, message } = req.body;

        if (!full_name || !email || !message) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        const sql = `
            INSERT INTO contact_messages
            (full_name, email, subject, message)
            VALUES (?, ?, ?, ?)
        `;

        await db.execute(sql, [
            full_name.trim(),
            email.trim(),
            subject || null,
            message.trim()
        ]);

        res.status(201).json({
            message: "Your message has been sent successfully!"
        });

    } catch (error) {
        console.error("Contact error:", error.message);

        res.status(500).json({
            message: "Failed to send your message."
        });
    }
});

// GET ALL CONTACT MESSAGES
router.get("/", async (req, res) => {
    try {
        const [messages] = await db.execute(
            "SELECT * FROM contact_messages ORDER BY created_at DESC"
        );

        res.status(200).json(messages);

    } catch (error) {
        console.error("Get contact messages error:", error.message);

        res.status(500).json({
            message: "Failed to retrieve messages."
        });
    }
});

module.exports = router;
