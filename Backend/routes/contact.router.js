const express = require("express");
const router = express.Router();

const {
  submitContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/contact.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");

// User create only
router.post("/", protect, authorizeRoles("user"), submitContact);

// Admin read + delete
router.get("/", protect, authorizeRoles("admin"), getAllContacts);
router.delete("/:id", protect, authorizeRoles("admin"), deleteContact);

module.exports = router;