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

// User create + update own
router.post("/apply", protect, authorizeRoles("user"), submitApplication);
router.put("/:id", protect, authorizeRoles("user"), updateOwnApplication);

// Admin read + delete
router.get("/", protect, authorizeRoles("admin"), getAllApplications);
router.get("/:id", protect, authorizeRoles("admin"), getApplicationById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteApplication);

module.exports = router;