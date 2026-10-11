const express = require("express");
const Device = require("../models/Device");
const authorizeRole = require("../middleware/authorizeRole");

const router = express.Router();

// View all devices — admin and regular users
router.get("/", async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// View maintenance devices — admin and regular users
router.get("/maintenance", async (req, res) => {
    try {
        const devices = await Device.find();

        const maintenanceDevices = devices.map((device) => {
            const lastMaintenance = new Date(device.lastMaintenance);
            const currentDate = new Date();

            const differenceInTime = currentDate - lastMaintenance;
            const differenceInDays =
                differenceInTime / (1000 * 60 * 60 * 24);

            let maintenanceStatus;

            if (differenceInDays < 180) {
                maintenanceStatus = "Up to Date";
            } else if (differenceInDays < 365) {
                maintenanceStatus = "Due Soon";
            } else {
                maintenanceStatus = "Overdue";
            }

            return {
                ...device.toObject(),
                maintenanceStatus
            };
        });

        res.json(maintenanceDevices);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// View one device — admin and regular users
router.get("/:id", async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);

        if (!device) {
            return res.status(404).json({
                message: "Device not found"
            });
        }

        res.json(device);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update a device — admin only
router.put("/:id", authorizeRole("admin"), async (req, res) => {
    try {
        const updatedDevice = await Device.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedDevice) {
            return res.status(404).json({
                message: "Device not found"
            });
        }

        res.json(updatedDevice);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Create a device — admin only
router.post("/", authorizeRole("admin"), async (req, res) => {
    try {
        const device = new Device(req.body);
        const savedDevice = await device.save();

        res.status(201).json(savedDevice);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Delete a device — admin only
router.delete("/:id", authorizeRole("admin"), async (req, res) => {
    try {
        const deletedDevice = await Device.findByIdAndDelete(req.params.id);

        if (!deletedDevice) {
            return res.status(404).json({
                message: "Device not found"
            });
        }

        res.json({
            message: "Device deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;