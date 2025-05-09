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
