import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/env";
import { Types } from "mongoose";

type JWTTokenPayload = {
  userId: string;
};

export const generateJWT = (userId: JWTTokenPayload): string => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
