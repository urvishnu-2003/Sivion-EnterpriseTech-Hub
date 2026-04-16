const streamifier = require("streamifier");
const Application = require("../models/application.model");
const Job = require("../models/job.model");
const cloudinary = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");
const sendEmail = require("../utils/sendEmail");

const getAdminEmail = () =>
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  process.env.DEFAULT_ADMIN_EMAIL ||
  process.env.EMAIL_FROM;

// HELPER: Upload resume to Cloudinary
const uploadResumeToCloudinary = (fileBuffer, originalname) => {
  return new Promise((resolve, reject) => {
    const safeBaseName = originalname
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "career_resumes",
        resource_type: "raw",
        public_id: `resume-${Date.now()}-${safeBaseName}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// HELPER: send emails safely
const sendApplicationEmails = async ({
  fullName,
  email,
  phone,
  jobTitle,
  resumeUrl,
  status,
  type,
}) => {
  const adminEmail = getAdminEmail();

  const tasks = [];

  if (type === "submitted") {
    tasks.push(
      sendEmail({
        to: email,
        subject: "Application Received - Sivion EnterpriseTech Hub",
        text: `Hello ${fullName}, your application for ${jobTitle} has been received successfully. Our team will review it and get back to you soon.`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
            <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
              <h2 style="margin: 0 0 12px; color: #0f172a;">Application Received</h2>
              <p style="color: #334155; font-size: 15px;">Hello <strong>${fullName}</strong>,</p>
              <p style="color: #334155; font-size: 15px;">
                Thank you for applying for <strong>${jobTitle}</strong>.
              </p>
              <p style="color: #334155; font-size: 15px;">
                We have received your application successfully. Our hiring team will review it and contact you if your profile matches our requirements.
              </p>
              <p style="color: #334155; font-size: 15px; margin-top: 24px;">
                Regards,<br />
                Sivion EnterpriseTech Hub
              </p>
            </div>
          </div>
        `,
      })
    );

    tasks.push(
      sendEmail({
        to: adminEmail,
        subject: `New Job Application - ${jobTitle}`,
        text: `A new application was submitted.\n\nCandidate: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nJob: ${jobTitle}\nResume: ${resumeUrl || "Not uploaded"}`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
            <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
              <h2 style="margin: 0 0 12px; color: #0f172a;">New Job Application</h2>
              <p style="color: #334155; font-size: 15px;"><strong>Candidate:</strong> ${fullName}</p>
              <p style="color: #334155; font-size: 15px;"><strong>Email:</strong> ${email}</p>
              <p style="color: #334155; font-size: 15px;"><strong>Phone:</strong> ${phone}</p>
              <p style="color: #334155; font-size: 15px;"><strong>Job:</strong> ${jobTitle}</p>
              <p style="color: #334155; font-size: 15px;">
                <strong>Resume:</strong>
                ${resumeUrl
            ? `<a href="${resumeUrl}" target="_blank" rel="noopener noreferrer">View Resume</a>`
            : "Not uploaded"
          }
              </p>
            </div>
          </div>
        `,
      })
    );
  }

  if (type === "status-updated") {
    tasks.push(
      sendEmail({
        to: email,
        subject: `Application Status Updated - ${jobTitle}`,
        text: `Hello ${fullName}, your application status for ${jobTitle} has been updated to ${status}.`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
            <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
              <h2 style="margin: 0 0 12px; color: #0f172a;">Application Status Updated</h2>
              <p style="color: #334155; font-size: 15px;">Hello <strong>${fullName}</strong>,</p>
              <p style="color: #334155; font-size: 15px;">
                Your application for <strong>${jobTitle}</strong> has been updated to:
              </p>
              <p style="font-size: 20px; font-weight: 700; color: #0891b2; text-transform: capitalize;">
                ${status}
              </p>
              <p style="color: #334155; font-size: 15px; margin-top: 24px;">
                Regards,<br />
                Sivion EnterpriseTech Hub
              </p>
            </div>
          </div>
        `,
      })
    );

    tasks.push(
      sendEmail({
        to: adminEmail,
        subject: `Application Status Changed - ${jobTitle}`,
        text: `Application status updated.\n\nCandidate: ${fullName}\nEmail: ${email}\nJob: ${jobTitle}\nNew Status: ${status}`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
            <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
              <h2 style="margin: 0 0 12px; color: #0f172a;">Application Status Changed</h2>
              <p style="color: #334155; font-size: 15px;"><strong>Candidate:</strong> ${fullName}</p>
              <p style="color: #334155; font-size: 15px;"><strong>Email:</strong> ${email}</p>
              <p style="color: #334155; font-size: 15px;"><strong>Job:</strong> ${jobTitle}</p>
              <p style="color: #334155; font-size: 15px; text-transform: capitalize;"><strong>New Status:</strong> ${status}</p>
            </div>
          </div>
        `,
      })
    );
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Application email error:", result.reason?.message || result.reason);
    }
  });
};

// PUBLIC: Submit application
exports.submitApplication = asyncHandler(async (req, res) => {
  const { jobId, fullName, email, phone, experience, skills } = req.body;

  if (!jobId || !fullName || !email || !phone) {
    return errorResponse(
      res,
      400,
      "Job, full name, email, and phone are required"
    );
  }

  const job = await Job.findById(jobId);

  if (!job || !job.isActive) {
    return errorResponse(res, 404, "Job not found or inactive");
  }

  let resumeUrl = "";

  if (req.file) {
    const uploadedFile = await uploadResumeToCloudinary(
      req.file.buffer,
      req.file.originalname
    );
    resumeUrl = uploadedFile.secure_url;
  }

  const application = await Application.create({
    jobId,
    fullName,
    email,
    phone,
    experience,
    skills: Array.isArray(skills)
      ? skills
      : typeof skills === "string"
        ? skills.split(",").map((item) => item.trim())
        : [],
    resumeUrl,
    status: "pending",
    appliedAt: new Date(),
  });

  const populatedApplication = await Application.findById(application._id).populate(
    "jobId",
    "title department location type"
  );

  await sendApplicationEmails({
    fullName,
    email,
    phone,
    jobTitle: populatedApplication?.jobId?.title || "the selected role",
    resumeUrl,
    status: "pending",
    type: "submitted",
  });

  return successResponse(
    res,
    201,
    "Application submitted successfully",
    populatedApplication
  );
});

// PUBLIC: Get single application by id
exports.getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id).populate(
    "jobId",
    "title department location type description requirements isActive"
  );

  if (!application) {
    return errorResponse(res, 404, "Application not found");
  }

  return successResponse(
    res,
    200,
    "Application fetched successfully",
    application
  );
});

// PUBLIC: Update application
exports.updateOwnApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return errorResponse(res, 404, "Application not found");
  }

  if (application.status !== "pending") {
    return errorResponse(
      res,
      400,
      "Application cannot be edited after review has started"
    );
  }

  const { fullName, email, phone, experience, skills } = req.body;

  if (!email) {
    return errorResponse(
      res,
      400,
      "Email is required to update application"
    );
  }

  if (application.email !== email) {
    return errorResponse(
      res,
      403,
      "Forbidden: You can update only your own application"
    );
  }

  if (fullName !== undefined) application.fullName = fullName;
  if (phone !== undefined) application.phone = phone;
  if (experience !== undefined) application.experience = experience;

  if (skills !== undefined) {
    application.skills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
        ? skills.split(",").map((item) => item.trim())
        : [];
  }

  if (req.file) {
    const uploadedFile = await uploadResumeToCloudinary(
      req.file.buffer,
      req.file.originalname
    );
    application.resumeUrl = uploadedFile.secure_url;
  }

  const updatedApplication = await application.save();

  return successResponse(
    res,
    200,
    "Application updated successfully",
    updatedApplication
  );
});

// ADMIN ONLY: Get all applications
exports.getAllApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find()
    .populate("jobId", "title department location type isActive")
    .sort({ createdAt: -1 });

  return successResponse(
    res,
    200,
    "Applications fetched successfully",
    applications
  );
});

// ADMIN ONLY: Update application status
exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ["pending", "reviewed", "rejected", "hired"];

  if (!status || !allowedStatuses.includes(status)) {
    return errorResponse(
      res,
      400,
      "Valid status is required: pending, reviewed, rejected, hired"
    );
  }

  const application = await Application.findById(req.params.id).populate(
    "jobId",
    "title"
  );

  if (!application) {
    return errorResponse(res, 404, "Application not found");
  }

  application.status = status;

  const updatedApplication = await application.save();

  await sendApplicationEmails({
    fullName: application.fullName,
    email: application.email,
    phone: application.phone,
    jobTitle: application?.jobId?.title || "the selected role",
    resumeUrl: application.resumeUrl,
    status,
    type: "status-updated",
  });

  return successResponse(
    res,
    200,
    "Application status updated successfully",
    updatedApplication
  );
});

// ADMIN ONLY: Delete application
exports.deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return errorResponse(res, 404, "Application not found");
  }

  await application.deleteOne();

  return successResponse(res, 200, "Application deleted successfully");
});