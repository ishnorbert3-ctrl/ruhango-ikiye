
const express = require("express");
const router = express.Router();

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// GET ALL USERS - ADMIN ONLY
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const [users] = await db.execute(
                `SELECT id, full_name, email, phone, role, created_at
                 FROM users
                 ORDER BY id DESC`
            );

            res.status(200).json({
                message: "Users retrieved successfully!",
                users
            });

        } catch (error) {
            console.error("Get users error:", error.message);

            res.status(500).json({
                message: "Failed to retrieve users."
            });
        }
    }
);

// UPDATE USER ROLE - ADMIN ONLY
router.put(
    "/:id/role",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const { role } = req.body;
            const userId = req.params.id;

            if (!["resident", "collector", "admin"].includes(role)) {
                return res.status(400).json({
                    message: "Invalid user role!"
                });
            }

            if (Number(userId) === Number(req.user.id)) {
                return res.status(400).json({
                    message: "You cannot change your own role!"
                });
            }

            const [result] = await db.execute(
                "UPDATE users SET role = ? WHERE id = ?",
                [role, userId]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "User not found!"
                });
            }

            res.status(200).json({
                message: "User role updated successfully!"
            });

        } catch (error) {
            console.error("Update role error:", error.message);

            res.status(500).json({
                message: "Failed to update user role."
            });
        }
    }
);

// DELETE USER - ADMIN ONLY
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {
            const userId = Number(req.params.id);

            if (!Number.isInteger(userId) || userId <= 0) {
                return res.status(400).json({
                    message: "Invalid user ID!"
                });
            }

            if (userId === Number(req.user.id)) {
                return res.status(400).json({
                    message: "You cannot delete your own account!"
                });
            }

            const [result] = await db.execute(
                "DELETE FROM users WHERE id = ?",
                [userId]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "User not found!"
                });
            }

            res.status(200).json({
                message: "User deleted successfully!"
            });

        } catch (error) {
            console.error("Delete user error:", error.message);

            res.status(500).json({
                message: "Failed to delete user. This user may have related records."
            });
        }
    }
);

// REGISTER USER
router.post("/register", async (req, res) => {
    try {
        const { full_name, email, phone, password, role } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({
                message: "Full name, email and password are required!"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must contain at least 6 characters!"
            });
        }

        const userRole = role || "resident";

        if (!["resident", "collector"].includes(userRole)) {
            return res.status(400).json({
                message: "Invalid user role!"
            });
        }

        const [existingUser] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [email.trim().toLowerCase()]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "This email is already registered!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            `INSERT INTO users
            (full_name, email, phone, password, role)
            VALUES (?, ?, ?, ?, ?)`,
            [
                full_name.trim(),
                email.trim().toLowerCase(),
                phone || null,
                hashedPassword,
                userRole
            ]
        );

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: result.insertId,
                full_name,
                email: email.trim().toLowerCase(),
                role: userRole
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            message: "Something went wrong during registration!"
        });
    }
});

// LOGIN USER
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!"
            });
        }

        const [users] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email.trim().toLowerCase()]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password!"
            });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password!"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d"
            }
        );

        res.status(200).json({
            message: "Login successful!",
            token: token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error details:", error);

        res.status(500).json({
            message: "Something went wrong during login!"
        });
    }
});

module.exports = router;
