require("dotenv").config();

const express = require("express");
const cors = require("cors");
const deviceRoutes = require("./routes/deviceRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/devices", deviceRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Network Device Inventory API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});