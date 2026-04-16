const Quote = require("../models/quote.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");
const sendEmail = require("../utils/sendEmail");

const getAdminEmail = () =>
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  process.env.DEFAULT_ADMIN_EMAIL ||
  process.env.EMAIL_FROM;

exports.createQuoteRequest = asyncHandler(async (req, res) => {
  const {
    requestType,
    fullName,
    email,
    phone,
    company,
    serviceType,
    budget,
    projectDetails,
    preferredDate,
    preferredTime,
  } = req.body;

  if (!fullName || !email || !serviceType || !projectDetails) {
    return errorResponse(
      res,
      400,
      "Full name, email, service type, and project details are required"
    );
  }

  const quote = await Quote.create({
    submittedBy: req.user ? req.user._id : undefined,
    requestType,
    fullName,
    email,
    phone,
    company,
    serviceType,
    budget,
    projectDetails,
    preferredDate,
    preferredTime,
  });

  const requestLabel =
    requestType === "consultation" ? "Consultation" : "Quote";

  const adminEmail = getAdminEmail();

  const results = await Promise.allSettled([
    sendEmail({
      to: email,
      subject: `${requestLabel} Request Received - Sivion EnterpriseTech Hub`,
      text: `Hello ${fullName}, your ${requestLabel.toLowerCase()} request for ${serviceType} has been received successfully. Our team will contact you soon.`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
            <h2 style="margin: 0 0 12px; color: #0f172a;">${requestLabel} Request Received</h2>
            <p style="color: #334155; font-size: 15px;">Hello <strong>${fullName}</strong>,</p>
            <p style="color: #334155; font-size: 15px;">
              We have received your ${requestLabel.toLowerCase()} request for <strong>${serviceType}</strong>.
            </p>
            <p style="color: #334155; font-size: 15px;">
              Our team will review your requirements and get back to you soon.
            </p>
            <p style="color: #334155; font-size: 15px; margin-top: 24px;">
              Regards,<br />
              Sivion EnterpriseTech Hub
            </p>
          </div>
        </div>
      `,
    }),
    sendEmail({
      to: adminEmail,
      subject: `New ${requestLabel} Request - ${serviceType}`,
      text: `A new ${requestLabel.toLowerCase()} request was submitted.\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || "-"}\nCompany: ${company || "-"}\nService Type: ${serviceType}\nBudget: ${budget || "-"}\nPreferred Date: ${preferredDate || "-"}\nPreferred Time: ${preferredTime || "-"}\nProject Details: ${projectDetails}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
            <h2 style="margin: 0 0 12px; color: #0f172a;">New ${requestLabel} Request</h2>
            <p style="color: #334155; font-size: 15px;"><strong>Name:</strong> ${fullName}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Email:</strong> ${email}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Phone:</strong> ${phone || "-"}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Company:</strong> ${company || "-"}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Service Type:</strong> ${serviceType}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Budget:</strong> ${budget || "-"}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Preferred Date:</strong> ${preferredDate || "-"}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Preferred Time:</strong> ${preferredTime || "-"}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Project Details:</strong><br />${projectDetails}</p>
          </div>
        </div>
      `,
    }),
  ]);

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Quote email error:", result.reason?.message || result.reason);
    }
  });

  return successResponse(
    res,
    201,
    `${requestLabel} request submitted successfully`,
    quote
  );
});

exports.getAllQuoteRequests = asyncHandler(async (req, res) => {
  const quotes = await Quote.find()
    .populate("submittedBy", "fullName email role")
    .sort({ createdAt: -1 });

  return successResponse(res, 200, "Requests fetched successfully", quotes);
});

exports.getQuoteRequestById = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id).populate(
    "submittedBy",
    "fullName email role"
  );

  if (!quote) {
    return errorResponse(res, 404, "Request not found");
  }

  return successResponse(res, 200, "Request fetched successfully", quote);
});

exports.updateOwnQuoteRequest = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    return errorResponse(res, 404, "Request not found");
  }

  if (
    !quote.submittedBy ||
    quote.submittedBy.toString() !== req.user._id.toString()
  ) {
    return errorResponse(
      res,
      403,
      "Forbidden: You can update only your own request"
    );
  }

  const allowedFields = [
    "requestType",
    "fullName",
    "email",
    "phone",
    "company",
    "serviceType",
    "budget",
    "projectDetails",
    "preferredDate",
    "preferredTime",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      quote[field] = req.body[field];
    }
  });

  const updatedQuote = await quote.save();

  return successResponse(
    res,
    200,
    "Request updated successfully",
    updatedQuote
  );
});

exports.deleteQuoteRequest = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    return errorResponse(res, 404, "Request not found");
  }

  await quote.deleteOne();

  return successResponse(res, 200, "Request deleted successfully");
});