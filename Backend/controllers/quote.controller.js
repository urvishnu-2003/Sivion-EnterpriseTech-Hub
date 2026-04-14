const Quote = require("../models/quote.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");

exports.submitQuote = asyncHandler(async (req, res) => {
  const { fullName, email, service, projectDetails, phone, company, budget, timeline } = req.body;

  if (!fullName || !email || !service || !projectDetails) {
    return errorResponse(res, 400, "Full name, email, service, and project details are required");
  }

  const quote = await Quote.create({
    submittedBy: req.user._id,
    fullName,
    email,
    service,
    projectDetails,
    phone,
    company,
    budget,
    timeline,
  });

  return successResponse(res, 201, "Quote request submitted successfully", quote);
});

exports.getAllQuotes = asyncHandler(async (req, res) => {
  const quotes = await Quote.find()
    .populate("submittedBy", "fullName email role")
    .sort({ createdAt: -1 });

  return successResponse(res, 200, "Quote requests fetched successfully", quotes);
});

exports.getQuoteById = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id).populate(
    "submittedBy",
    "fullName email role"
  );

  if (!quote) {
    return errorResponse(res, 404, "Quote request not found");
  }

  return successResponse(res, 200, "Quote request fetched successfully", quote);
});

exports.updateOwnQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    return errorResponse(res, 404, "Quote request not found");
  }

  if (quote.submittedBy.toString() !== req.user._id.toString()) {
    return errorResponse(
      res,
      403,
      "Forbidden: You can update only your own quote request"
    );
  }

  const allowedFields = [
    "fullName",
    "email",
    "phone",
    "company",
    "service",
    "budget",
    "timeline",
    "projectDetails",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      quote[field] = req.body[field];
    }
  });

  const updatedQuote = await quote.save();

  return successResponse(res, 200, "Quote request updated successfully", updatedQuote);
});

exports.deleteQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    return errorResponse(res, 404, "Quote request not found");
  }

  await quote.deleteOne();

  return successResponse(res, 200, "Quote request deleted successfully");
});