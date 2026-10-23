import pool from "../config/db.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

export const getAllUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
            },
            orderBy: { id: "desc" },
        });
        // const [rows] = await pool.query("SELECT id, name, email, is_active FROM users");
        return res.status(200).json({
            status: true,
            message: "Fetch user success",
            total: users.length,
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Fail fetch user",
            error: error.message,
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const user = await prisma.user.findUnique({
            where: { id: id },
        })
        // const [user] = await pool.query("SELECT id, name, email, is_active FROM users WHERE id = ?", [id]); 

        res.status(200).json({
            status: true,
            message: "User found",
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Fail fetch user",
            error: error.message,
        });
    }
}

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        // const [user] = await pool.query ("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, password])

        return res.status(201).json({
            status: true,
            message: "Create user success",
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Create user failed",
            error: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, email, password, is_active } = req.body;
        let update = "";

        const dataUpdate = {}
        if (email) dataUpdate.email = email;
        if (name) dataUpdate.name = name;
        if (password) {
            dataUpdate.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update ({
            where: {id: id},
            data: dataUpdate,
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
            },
        });

        return res.status(200).json({
            status: true,
            message: "Update user success",
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Update user failed",
            error: error.message
        });
    }
}

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.user.delete({
            where: { id: id },
        });
        // await pool.query("DELETE FROM users WHERE id = ?", [id]);

        return res.status(200).json({
            status: true,
            message: "Delete user success",
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Update user failed",
            error: error.message,
        });
    }
}