require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

const createUser = async () => {
    await connectDB();

    try {
        const existingUser = await User.findOne({ username: "admin" });

        if (existingUser) {
            console.log("Admin user already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const user = new User({
            username: "admin",
            password: hashedPassword,
        });

        await user.save();

        console.log("Admin user created successfully");
        console.log("Username: admin");
        console.log("Password: admin123");

        process.exit(0);
    } catch (error) {
        console.error("Error creating user:", error.message);
        process.exit(1);
    }
};

createUser();