const User = require("../models/User");
const Expense = require("../models/Expense");

// ✅ Get all users (Only for admin)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await User.find({}, "name email phone"); // return only needed fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ✅ Get all expenses of a specific user (Only for admin)
exports.getUserExpenses = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { userId } = req.params;
    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user expenses" });
  }
};
