const express = require("express");
const router = express.Router();

const {
  createQuoteRequest,
  getAllQuoteRequests,
  getQuoteRequestById,
  updateOwnQuoteRequest,
  deleteQuoteRequest,
} = require("../controllers/quote.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const verifyRecaptcha = require("../middleware/recaptcha.middleware");

// User routes
router.post("/", protect, authorizeRoles("user"), verifyRecaptcha, createQuoteRequest);
router.put("/:id", protect, authorizeRoles("user"), verifyRecaptcha, updateOwnQuoteRequest);

// Admin routes
router.get("/", protect, authorizeRoles("admin"), getAllQuoteRequests);
router.get("/:id", protect, authorizeRoles("admin"), getQuoteRequestById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteQuoteRequest);

module.exports = router;