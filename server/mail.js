import transporter from "./services/emailService.js";
import { MAIL_USER } from "./config.js";

const USER_EMAIL = "dk36733o5@gmail.com";

(async () => {
  try {
    const info = await transporter.sendMail({
      from: MAIL_USER,
      to: USER_EMAIL,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.error("Mail error:", err.message);
  }
})();
