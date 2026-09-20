const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
    {
        deviceName: {
            type: String,
            required: true
        },

        deviceType: {
            type: String,
            required: true
        },

        ipAddress: {
            type: String,
            required: true
        },

        macAddress: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        status: {
            type: String,
            required: true,
            enum: ["Active", "Inactive", "Maintenance"]
        },

        lastMaintenance: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;