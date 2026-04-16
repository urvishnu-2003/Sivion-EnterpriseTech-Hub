const Inquiry = require("../models/inquiry.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");
const sendEmail = require("../utils/sendEmail");

const getAdminEmail = () =>
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  process.env.DEFAULT_ADMIN_EMAIL ||
  process.env.EMAIL_FROM;

exports.createInquiry = asyncHandler(async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return errorResponse(
      res,
      400,
      "Full name, email, subject, and message are required"
    );
  }

  const inquiry = await Inquiry.create({
    fullName,
    email,
    subject,
    message,
  });

  const adminEmail = getAdminEmail();

  const results = await Promise.allSettled([
    sendEmail({
      to: email,
      subject: "Inquiry Received - Sivion EnterpriseTech Hub",
      text: `Hello ${fullName}, your inquiry regarding "${subject}" has been received successfully. Our team will respond soon.`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
            <h2 style="margin: 0 0 12px; color: #0f172a;">Inquiry Received</h2>
            <p style="color: #334155; font-size: 15px;">Hello <strong>${fullName}</strong>,</p>
            <p style="color: #334155; font-size: 15px;">
              We have received your inquiry regarding <strong>${subject}</strong>.
            </p>
            <p style="color: #334155; font-size: 15px;">
              Our team will review it and get back to you soon.
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
      subject: `New Inquiry Submission - ${subject}`,
      text: `A new inquiry was submitted.\n\nName: ${fullName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
            <h2 style="margin: 0 0 12px; color: #0f172a;">New Inquiry Submission</h2>
            <p style="color: #334155; font-size: 15px;"><strong>Name:</strong> ${fullName}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Email:</strong> ${email}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Subject:</strong> ${subject}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Message:</strong><br />${message}</p>
          </div>
        </div>
      `,
    }),
  ]);

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Inquiry email error:", result.reason?.message || result.reason);
    }
  });

  return successResponse(res, 201, "Inquiry submitted successfully", inquiry);
});

exports.getAllInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  return successResponse(res, 200, "Inquiries fetched successfully", inquiries);
});

exports.getInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return errorResponse(res, 404, "Inquiry not found");
  }

  return successResponse(res, 200, "Inquiry fetched successfully", inquiry);
});

exports.updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return errorResponse(res, 404, "Inquiry not found");
  }

  inquiry.status = req.body.status || inquiry.status;
  const updatedInquiry = await inquiry.save();

  return successResponse(
    res,
    200,
    "Inquiry status updated successfully",
    updatedInquiry
  );
});

exports.deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return errorResponse(res, 404, "Inquiry not found");
  }

  await inquiry.deleteOne();

  return successResponse(res, 200, "Inquiry deleted successfully");
});