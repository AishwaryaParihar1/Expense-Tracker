// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsers, getUserExpenses } = require("../controller/adminController");
const protect = require("../middleware/authMiddleware"); // token verify middleware

router.get("/users", protect, getAllUsers);
router.get("/user-expenses/:userId", protect, getUserExpenses);

module.exports = router;
