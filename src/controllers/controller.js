import client from "../config/config.js";
import {
  sendWaitingListEmail,
  checkEmailExists,
} from "../services/services.js";

async function addEmailToUser(req, res) {
  // console.log(req.body);
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).send("Email and role are required to add a user.");
  }
  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const query =
      "INSERT INTO users(email, role, date_enrolled) VALUES($1, $2, CURRENT_DATE) RETURNING *;";
    const values = [email, role];
    await client.query(query, values);
    await sendWaitingListEmail(email);
    return res.status(200).json({ message: "Joined successfully!" });
  } catch (err) {
    console.error("Error adding user to the database:", err);
    return res.status(500).json({ message: "Error Joining the list." });
  }
}

export default addEmailToUser;
