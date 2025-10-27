const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addUserAPI,
  listAllUsersAPI,
  getUserByIdAPI,
  updateUserAPI,
  deleteUserAPI,
} = require("../controllers/userController");

router.post("/createUserAPI", authMiddleware, addUserAPI);
router.get("/listUsersAPI", authMiddleware, listAllUsersAPI);

router.get("/getUserByIdAPI/:id", authMiddleware, getUserByIdAPI);
router.put("/updateUserAPI/:id", authMiddleware, updateUserAPI);
router.delete("/deleteUserAPI/:id", authMiddleware, deleteUserAPI);

module.exports = router;
