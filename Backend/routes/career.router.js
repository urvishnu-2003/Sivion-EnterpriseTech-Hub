const express = require("express");
const router = express.Router();

const {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateOwnApplication,
  deleteApplication,
} = require("../controllers/career.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const verifyRecaptcha = require("../middleware/recaptcha.middleware");

// User create + update own + reCAPTCHA
router.post("/apply", protect, authorizeRoles("user"), verifyRecaptcha, submitApplication);
router.put("/:id", protect, authorizeRoles("user"), verifyRecaptcha, updateOwnApplication);

// Admin read + delete
router.get("/", protect, authorizeRoles("admin"), getAllApplications);
router.get("/:id", protect, authorizeRoles("admin"), getApplicationById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteApplication);

module.exports = router;