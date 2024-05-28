const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/userController");
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateUser, authorizeAdmin, getAllUsers);
router.delete("/:id", authenticateUser, deleteUser);

module.exports = router;
