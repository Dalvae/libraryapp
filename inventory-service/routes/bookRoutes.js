const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const {
  authenticateUser,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateUser, getAllBooks);
router.get("/:id", authenticateUser, getBookById);
router.post("/", authenticateUser, createBook);
router.patch("/:id", authenticateUser, updateBook);
router.delete("/:id", authenticateUser, authorizeAdmin, deleteBook);

module.exports = router;
