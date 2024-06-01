import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import client from "../config/config.js";
export async function sendWaitingListEmail(email) {
  if (!email) {
    throw new Error("Email is required to send waiting list notification.");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.dreamhost.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: true,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to the MedicAppoint Waiting List",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center; padding: 20px; background-color: #e6f2ff;">
          <img src="cid:logo" alt="MedicAppoint" style="width: 100px; height: auto;" />
          <h1 style="color: #3454D1;">Welcome to MedicAppoint!</h1>
        </div>
        <div style="padding: 20px; background-color: #ffffff;">
          <p>Hi there,</p>
          <p>Thank you for joining the waiting list for <strong>MedicAppoint</strong>.</p>
          <p>MedicAppoint is a health application designed to make it easier for patients to book appointments with healthcare providers and for providers to connect with patients seamlessly.</p>
          <p>We are excited to have you on board and will notify you as soon as we launch!</p>
          <p>Best regards,</p>
          <p>The MedicAppoint Team</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #e6f2ff; color: #3454D1;">
          <p>Stay tuned for more updates!</p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: "logo.png",
        path: "public/logo.png",
        cid: "logo",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export const checkEmailExists = async (email) => {
  try {
    const query = `SELECT COUNT(*) FROM users WHERE email = $1`;
    const result = await client.query(query, [email]);
    return result.rows[0].count > 0;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
};
