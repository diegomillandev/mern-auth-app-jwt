import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from "../constants/env";
dotenv.config();

const config = () => {
  return {
    host: SMTP_HOST,
    port: +SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
};

export const transporter = nodemailer.createTransport(config());
