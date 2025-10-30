"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_validator_1 = require("../validators/auth_validator");
const auth_middleware_1 = require("../middleware/auth_middleware");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const signup = async (req, res) => {
    try {
        const validatedData = auth_validator_1.signupSchema.parse(req.body);
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(validatedData.password, 10);
        // Create user
        const user = await prisma.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                name: validatedData.name,
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });
        // Generate token
        const token = (0, auth_middleware_1.generateToken)(user.id);
        res.status(201).json({
            user,
            token,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Signup error:", error);
        res.status(500).json({ error: "Failed to create account" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const validatedData = auth_validator_1.loginSchema.parse(req.body);
        // Find user
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        // Verify password
        const isValidPassword = await bcrypt_1.default.compare(validatedData.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        // Generate token
        const token = (0, auth_middleware_1.generateToken)(user.id);
        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
            token,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Login error:", error);
        res.status(500).json({ error: "Failed to login" });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ error: "Failed to get user information" });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=auth_controller.js.map