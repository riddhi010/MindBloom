// ✅ mailer.js
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMail = async ({ to, subject, html }) => {
  const msg = {
    to,
    from: "letusmindbloom@gmail.com", // ✅ must match your verified SendGrid sender
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully to", to);
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error.message);
    throw error;
  }
};
