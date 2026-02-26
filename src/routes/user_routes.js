const express = require("express");
const router = express.Router();

const {
    create_user,
    get_user,
    get_all_users,
    update_user,
    delete_user
} = require("../controllers/user_controller");

/**
 * @route   POST /users
 * @desc    Create new user
 */
router.post("/users", create_user);

/**
 * @route   GET /users/:id
 * @desc    Get user by ID
 */
router.get("/users/:id", get_user);

/**
 * @route   GET /users
 * @desc    Get All users
 */
router.get("/users", get_all_users);

/**
 * @route   PUT /users/:id
 * @desc    Update user
 */
router.put("/users/:id", update_user);

/**
 * @route   DELETE /users/:id
 * @desc    Delete user
 */
router.delete("/users/:id", delete_user);

module.exports = router;