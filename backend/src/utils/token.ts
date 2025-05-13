import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../constants/env";

export const generateToken = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const toUrlSafeBase64 = (text: string): string => {
  return text.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromUrlSafeBase64 = (text: string): string => {
  let base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  return base64;
};

export const encryptWithAES = async (token: string): Promise<string> => {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  return toUrlSafeBase64(encrypted);
};

export const decryptWithAES = async (ciphertext: string): Promise<string> => {
  const encrypted = fromUrlSafeBase64(ciphertext);
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
