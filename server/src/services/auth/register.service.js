import User from "../../models/user.js";
import AppError from "../../utils/appError.js";
import transporter from "../email/email.service.js";
import { hashPassword } from "../../utils/password.js";
import registerTemplate from "../email/templates/registerTemplate.js";

export const registerUser = async ({ name, email, phone, password }) => {
  if (!name || !email || !phone || !password) {
    throw new AppError("All fields are required", 400);
  }

  const normalizedEmail = email.toLowerCase();


  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
   throw new AppError("Account already exists", 400);
  }

  const hashedPassword = await hashPassword(password);

  const data = {
    name,
    email: normalizedEmail,
    phone,
    password: hashedPassword,
  };

  const newUser = await User.create(data);

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: newUser.email,
    subject: "Welcome to TableOrbit 🎉 | 30% OFF Inside",
    html: registerTemplate({
      customerName: newUser.name,
      orderLink: process.env.FRONTEND_URL,
    }),
  });

  const userResponse = newUser.toObject();
  delete userResponse.password;

  return {
    userResponse,
  };
};
