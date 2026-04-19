const express = require("express");
const router = express.Router();

const {
  subscribeNewsletter,
  getAllSubscribers,
} = require("../controllers/subscriber.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const verifyRecaptcha = require("../middleware/recaptcha.middleware");

// Public subscribe
router.post("/", subscribeNewsletter);

// Admin read
router.get("/", protect, authorizeRoles("admin"), getAllSubscribers);

module.exports = router;