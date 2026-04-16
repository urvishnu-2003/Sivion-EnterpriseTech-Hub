const Contact = require("../models/contact.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");
const sendEmail = require("../utils/sendEmail");

const getAdminEmail = () =>
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  process.env.DEFAULT_ADMIN_EMAIL ||
  process.env.EMAIL_FROM;

exports.submitContact = asyncHandler(async (req, res) => {
  const { fullName, email, subject, message, phone, company } = req.body;

  if (!fullName || !email || !subject || !message) {
    return errorResponse(
      res,
      400,
      "Full name, email, subject, and message are required"
    );
  }

  const contact = await Contact.create({
    fullName,
    email,
    subject,
    message,
    phone,
    company,
  });

  const adminEmail = getAdminEmail();

  const results = await Promise.allSettled([
    sendEmail({
      to: email,
      subject: "We Received Your Contact Request - Sivion EnterpriseTech Hub",
      text: `Hello ${fullName}, we have received your contact request regarding "${subject}". Our team will get back to you soon.`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
            <h2 style="margin: 0 0 12px; color: #0f172a;">Contact Request Received</h2>
            <p style="color: #334155; font-size: 15px;">Hello <strong>${fullName}</strong>,</p>
            <p style="color: #334155; font-size: 15px;">
              Thank you for contacting Sivion EnterpriseTech Hub.
            </p>
            <p style="color: #334155; font-size: 15px;">
              We have received your message regarding <strong>${subject}</strong> and our team will respond soon.
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
      subject: `New Contact Form Submission - ${subject}`,
      text: `A new contact form was submitted.\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || "-"}\nCompany: ${company || "-"}\nSubject: ${subject}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
            <h2 style="margin: 0 0 12px; color: #0f172a;">New Contact Form Submission</h2>
            <p style="color: #334155; font-size: 15px;"><strong>Name:</strong> ${fullName}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Email:</strong> ${email}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Phone:</strong> ${phone || "-"}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Company:</strong> ${company || "-"}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Subject:</strong> ${subject}</p>
            <p style="color: #334155; font-size: 15px;"><strong>Message:</strong><br />${message}</p>
          </div>
        </div>
      `,
    }),
  ]);

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Contact email error:", result.reason?.message || result.reason);
    }
  });

  return successResponse(res, 201, "Contact form submitted successfully", contact);
});

exports.getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return successResponse(res, 200, "Contacts fetched successfully", contacts);
});

exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return errorResponse(res, 404, "Contact record not found");
  }

  await contact.deleteOne();

  return successResponse(res, 200, "Contact record deleted successfully");
});