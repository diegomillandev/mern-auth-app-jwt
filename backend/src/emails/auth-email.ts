import { transporter } from "../config/nodemailer";
import { EMAIL_SUPPORT_ACCOUNT } from "../constants/env";

interface sendVerificationTokenProps {
  user: {
    email: string;
    name: string;
    token: string;
  };
}

export class AuthEmail {
  static sendConfirmationEmail = async ({
    user,
  }: sendVerificationTokenProps) => {
    await transporter.sendMail({
      from: `Support <${EMAIL_SUPPORT_ACCOUNT}>`,
      to: user.email,
      subject: "MERN - Verify your account",
      text: `
        Hello,
        Thank you for registering with us. Please click the link below to verify your account:
        http://localhost:5000/api/auth/verify/${user.token}
        If you did not register, please ignore this email.
        Best regards,
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Hello,</h2>
          <p>Thank you for registering with us. Please click the link below to verify your account:</p>
          <a href="http://localhost:5000/api/auth/verify/${user.token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Account</a>
          <p>If you did not register, please ignore this email.</p>
          <p>Best regards,</p>
        </div>
      `,
    });
  };

  static sendForgotPasswordEmail = async ({
    user,
  }: sendVerificationTokenProps) => {
    await transporter.sendMail({
      from: `Support <${EMAIL_SUPPORT_ACCOUNT}>`,
      to: user.email,
      subject: "MERN - Reset your password",
      text: `
        Hello,
        We received a request to reset your password. Please click the link below to reset it:
        http://localhost:5000/api/auth/reset-password/${user.token}
        If you did not request this, please ignore this email.
        Best regards,
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Hello,</h2>
          <p>We received a request to reset your password. Please click the link below to reset it:</p>
          <a href="http://localhost:5000/api/auth/reset-password/${user.token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,</p>
        </div>
      `,
    });
  };
}
