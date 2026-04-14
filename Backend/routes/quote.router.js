const express = require("express");
const router = express.Router();

const {
  submitQuote,
  getAllQuotes,
  getQuoteById,
  updateOwnQuote,
  deleteQuote,
} = require("../controllers/quote.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");

// User create + update own
router.post("/", protect, authorizeRoles("user"), submitQuote);
router.put("/:id", protect, authorizeRoles("user"), updateOwnQuote);

// Admin read + delete
router.get("/", protect, authorizeRoles("admin"), getAllQuotes);
router.get("/:id", protect, authorizeRoles("admin"), getQuoteById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteQuote);

module.exports = router;