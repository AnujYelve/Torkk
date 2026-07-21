/**
 * Reusable Email Service (Nodemailer)
 * ─────────────────────────────────────────────────────────────
 * Decoupled from business logic. All modules call sendEmail().
 * If email fails, it logs the error but does NOT throw —
 * business operations (like DB saves) must not fail due to email.
 */

const nodemailer = require("nodemailer");
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM,
  NODE_ENV,
} = require("../config/env");

// ─── Transporter ─────────────────────────────────────────────

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  if (NODE_ENV === "development" && !EMAIL_USER) {
    // Development: use Ethereal (fake SMTP) as fallback when no creds provided
    console.log(
      "[Email] No SMTP credentials found. Email sending will be skipped in development."
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    tls: { rejectUnauthorized: NODE_ENV === "production" },
  });

  return transporter;
};

// ─── Core Send Function ───────────────────────────────────────

const sendEmail = async ({ to, subject, html, text }) => {
  const transport = getTransporter();

  if (!transport) {
    console.log(`[Email] Skipped (no transporter): To=${to} | Subject=${subject}`);
    return { skipped: true };
  }

  try {
    const info = await transport.sendMail({
      from: `"Torkkk" <${EMAIL_FROM}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]+>/g, ""),
    });

    console.log(`[Email] Sent: ${info.messageId} → ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    // Log but do NOT re-throw — email failure must not crash the request
    console.error(`[Email] Failed to send to ${to}: ${err.message}`);
    return { success: false, error: err.message };
  }
};

// ─── Email Templates ──────────────────────────────────────────

const emailTemplates = {
  /**
   * Notification to company when a contact form is submitted.
   */
  contactNotification: (data) => ({
    subject: `[Torkkk] New Contact Message — ${data.subject || data.inquiryType || "General"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #e94560; margin: 0; font-size: 24px;">New Contact Submission</h1>
          <p style="color: #aaa; margin: 5px 0 0;">Torkkk Marketing Website</p>
        </div>
        <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e0e0e0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name</strong></td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ""}
            ${data.subject ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Subject</strong></td><td style="padding: 8px 0;">${data.subject}</td></tr>` : ""}
            ${data.inquiryType ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Inquiry Type</strong></td><td style="padding: 8px 0;">${data.inquiryType}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;">
          <h3 style="color: #333; margin: 0 0 8px;">Message</h3>
          <p style="color: #555; line-height: 1.6; background: #fff; padding: 12px; border-radius: 4px; border-left: 4px solid #e94560;">${data.message}</p>
          <p style="color: #999; font-size: 12px; margin-top: 16px;">Submitted at: ${new Date().toLocaleString()}</p>
        </div>
        <div style="background: #e0e0e0; padding: 12px 20px; border-radius: 0 0 8px 8px; text-align: center;">
          <p style="color: #666; font-size: 12px; margin: 0;">Torkkk Admin Dashboard → Contact Submissions</p>
        </div>
      </div>
    `,
  }),

  /**
   * Notification to company when a career application is submitted.
   */
  applicationNotification: (data) => ({
    subject: `[Torkkk] New Application — ${data.jobTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #e94560; margin: 0; font-size: 24px;">New Job Application</h1>
          <p style="color: #aaa; margin: 5px 0 0;">Torkkk Careers</p>
        </div>
        <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e0e0e0;">
          <h2 style="color: #333; margin: 0 0 16px;">Position: ${data.jobTitle}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name</strong></td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ""}
            ${data.resumeUrl ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Resume</strong></td><td style="padding: 8px 0;"><a href="${data.resumeUrl}">View Resume</a></td></tr>` : ""}
          </table>
          ${data.coverLetter ? `
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;">
          <h3 style="color: #333; margin: 0 0 8px;">Cover Letter</h3>
          <p style="color: #555; line-height: 1.6; background: #fff; padding: 12px; border-radius: 4px; border-left: 4px solid #e94560;">${data.coverLetter}</p>
          ` : ""}
          <p style="color: #999; font-size: 12px; margin-top: 16px;">Submitted at: ${new Date().toLocaleString()}</p>
        </div>
        <div style="background: #e0e0e0; padding: 12px 20px; border-radius: 0 0 8px 8px; text-align: center;">
          <p style="color: #666; font-size: 12px; margin: 0;">Torkkk Admin Dashboard → Career Applications</p>
        </div>
      </div>
    `,
  }),

  /**
   * Confirmation to applicant that their application was received.
   */
  applicationConfirmation: (data) => ({
    subject: `Your application to Torkkk has been received`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #e94560; margin: 0; font-size: 24px;">Application Received</h1>
          <p style="color: #aaa; margin: 5px 0 0;">Torkkk</p>
        </div>
        <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e0e0e0;">
          <p style="color: #333;">Hi ${data.name},</p>
          <p style="color: #555; line-height: 1.6;">Thank you for applying for the <strong>${data.jobTitle}</strong> position at Torkkk. We've received your application and our team will review it shortly.</p>
          <p style="color: #555; line-height: 1.6;">We'll be in touch if your profile matches what we're looking for.</p>
          <p style="color: #555; margin-top: 24px;">Best regards,<br><strong>The Torkkk Team</strong></p>
        </div>
      </div>
    `,
  }),
};

module.exports = { sendEmail, emailTemplates };
