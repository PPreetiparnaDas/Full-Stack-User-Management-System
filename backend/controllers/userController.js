const userModel = require("../models/userModel");

// Add user
exports.addUserAPI = (req, res) => {
  userModel.createUser(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "User added", id: result.insertId });
  });
};

// Get all users
exports.listAllUsersAPI = (req, res) => {
  userModel.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(results);
  });
};

// Get user by ID
exports.getUserByIdAPI = (req, res) => {
  const { id } = req.params;
  userModel.getUserById(id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!results || results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(results[0]);
  });
};

// Update user
exports.updateUserAPI = (req, res) => {
  const { id } = req.params;
  userModel.updateUser(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "✅ User updated successfully" });
  });
};

// Delete user
exports.deleteUserAPI = (req, res) => {
  const { id } = req.params;
  userModel.deleteUser(id, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  });
};
