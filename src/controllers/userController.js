const prisma = require("../prisma/prismaClient");

// Create User
exports.createUser = async (req, res) => {

    try {

        const { name, email } = req.body;

        if (!name || !email) {

            return res.status(400).json({
                message: "Name and Email are required"
            });

        }

        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        });

        res.status(201).json(user);

    } catch (error) {

        if (error.code === "P2002") {

            return res.status(409).json({
                message: "Email already exists"
            });

        }

        res.status(500).json({
            message: "Unable to create user"
        });

    }

};

// Get All Users
exports.getUsers = async (req, res) => {

    try {

        const users = await prisma.user.findMany({
            orderBy: {
                id: "asc"
            }
        });

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: "Unable to fetch users"
        });

    }

};

// Get User By ID
exports.getUserById = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: "Unable to fetch user"
        });

    }

};

// Update User
exports.updateUser = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const { name, email } = req.body;

        const exists = await prisma.user.findUnique({
            where: { id }
        });

        if (!exists) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const updatedUser = await prisma.user.update({

            where: { id },

            data: {
                name,
                email
            }

        });

        res.json(updatedUser);

    } catch (error) {

        res.status(500).json({
            message: "Unable to update user"
        });

    }

};

// Delete User
exports.deleteUser = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const exists = await prisma.user.findUnique({
            where: { id }
        });

        if (!exists) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        await prisma.user.delete({
            where: { id }
        });

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Unable to delete user"
        });

    }

};

