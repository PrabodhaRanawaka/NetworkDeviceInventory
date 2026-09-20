const express = require("express");
const Device = require("../models/Device");

const router = express.Router();

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

router.put("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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