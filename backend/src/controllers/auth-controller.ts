import { Request, Response } from "express";
import { catchErrors } from "../utils/catch-errors";

export class AuthController {
  static register = catchErrors(async (req, res) => {
    const { email, password } = req.body;
  });
}
