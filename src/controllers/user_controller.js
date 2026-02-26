/*

    - CREATE
    - READ
    - UPDATE
    - DELETE

*/

const { json } = require("json");
const Users = require("../models/Users");


async function create_user(req, res) {
    try {
        const { name, date_of_birth, email } = req.body;

        if (!name || !date_of_birth || !email) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const userExists = await Users.findOne({ where: { email } });

        if (userExists) {
            return res.status(409).json({
                message: "Email already registered."
            });
        }

        const new_user = await Users.create({
            name,
            date_of_birth,
            email
        });

        return res.status(201).json({
            message: "New user created successfully!",
            new_user
        });

    } catch (error) {
        console.error("Error creating user!", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function get_user(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "User ID is required."
            });
        }

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error("Error fetching user!", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function get_all_users(req, res) {
    try {
        const users = await Users.findAll();

        if (!users) {
            return res.status(404).json({
                message: "Users not found."
            });
        }

        return res.status(200).json(users);

    } catch (error) {
        console.error("Error fetching users!", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function update_user(req, res) {
    try {
        const { id } = req.params;
        const { name, date_of_birth, email } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "User ID is required."
            });
        }

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Verifica se o email já existe (caso esteja sendo alterado)
        if (email && email !== user.email) {
            const emailExists = await Users.findOne({ where: { email } });

            if (emailExists) {
                return res.status(409).json({
                    message: "Email already registered."
                });
            }
        }

        await user.update({
            name: name ?? user.name,
            date_of_birth: date_of_birth ?? user.date_of_birth,
            email: email ?? user.email
        });

        return res.status(200).json({
            message: "User updated successfully.",
            user
        });

    } catch (error) {
        console.error("Error updating user!", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function delete_user(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "User ID is required."
            });
        }

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        await user.destroy();

        return res.status(200).json({
            message: "User deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting user!", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

module.exports = {
    create_user,
    get_user,
    get_all_users,
    update_user,
    delete_user
};