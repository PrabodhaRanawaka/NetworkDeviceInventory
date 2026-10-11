const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate required fields
        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const cleanUsername = username.trim();

        if (cleanUsername.length < 3 || cleanUsername.length > 30) {
            return res.status(400).json({
                message: "Username must be between 3 and 30 characters"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        // Check whether the username already exists
        const existingUser = await User.findOne({
            username: cleanUsername
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Public registration always creates a regular user
        const user = new User({
            username: cleanUsername,
            password: hashedPassword,
            role: "user"
        });

        await user.save();

        return res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        // Also handle duplicate usernames submitted simultaneously
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        console.error("Registration error:", error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
});

// Login an existing user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await User.findOne({
            username: username.trim()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;