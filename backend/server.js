
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const locationRoutes = require("./routes/locationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to RUHANGO IKEYE Backend",
        status: "Server is running"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        const connection = await db.getConnection();

        connection.release();

        res.json({
            message: "MySQL Database connected successfully!",
            database: "ruhango_ikiye"
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`RUHANGO IKEYE server running on port ${PORT}`);
});
