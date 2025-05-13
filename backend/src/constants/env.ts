import colors from "colors";
const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(colors.red.bold(`Missing environment variable: ${key}`));
  }

  return value;
};

export const PORT = getEnv("PORT", "5000");
export const MONGO_URI = getEnv("MONGO_URI");
export const SMTP_HOST = getEnv("SMTP_HOST");
export const SMTP_PORT = getEnv("SMTP_PORT");
export const SMTP_USER = getEnv("SMTP_USER");
export const SMTP_PASS = getEnv("SMTP_PASS");
export const EMAIL_SUPPORT_ACCOUNT = getEnv("EMAIL_SUPPORT_ACCOUNT");
export const SECRET_KEY = getEnv("SECRET_KEY");
export const JWT_SECRET = getEnv("JWT_SECRET");
