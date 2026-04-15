const Career = require("../models/career.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");

exports.submitApplication = asyncHandler(async (req, res) => {
  const { fullName, email, phone, roleApplied, experience, skills, resumeUrl, coverLetter } = req.body;

  if (!fullName || !email || !phone || !roleApplied) {
    return errorResponse(res, 400, "Full name, email, phone, and role applied are required");
  }

  const application = await Career.create({
    submittedBy: req.user._id,
    fullName,
    email,
    phone,
    roleApplied,
    experience,
    skills: Array.isArray(skills) ? skills : [],
    resumeUrl,
    coverLetter,
  });

  return successResponse(res, 201, "Career application submitted successfully", application);
});

exports.getAllApplications = asyncHandler(async (req, res) => {
  const applications = await Career.find()
    .populate("submittedBy", "fullName email role")
    .sort({ createdAt: -1 });

  return successResponse(res, 200, "Career applications fetched successfully", applications);
});

exports.getApplicationById = asyncHandler(async (req, res) => {
  const application = await Career.findById(req.params.id).populate(
    "submittedBy",
    "fullName email role"
  );

  if (!application) {
    return errorResponse(res, 404, "Career application not found");
  }

  return successResponse(res, 200, "Career application fetched successfully", application);
});

exports.updateOwnApplication = asyncHandler(async (req, res) => {
  const application = await Career.findById(req.params.id);

  if (!application) {
    return errorResponse(res, 404, "Career application not found");
  }

  if (application.submittedBy.toString() !== req.user._id.toString()) {
    return errorResponse(
      res,
      403,
      "Forbidden: You can update only your own career application"
    );
  }

  const allowedFields = [
    "fullName",
    "email",
    "phone",
    "roleApplied",
    "experience",
    "skills",
    "resumeUrl",
    "coverLetter",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      application[field] = req.body[field];
    }
  });

  if (req.body.skills && !Array.isArray(req.body.skills)) {
    application.skills = [];
  }

  const updatedApplication = await application.save();

  return successResponse(
    res,
    200,
    "Career application updated successfully",
    updatedApplication
  );
});

exports.deleteApplication = asyncHandler(async (req, res) => {
  const application = await Career.findById(req.params.id);

  if (!application) {
    return errorResponse(res, 404, "Career application not found");
  }

  await application.deleteOne();

  return successResponse(res, 200, "Career application deleted successfully");
});