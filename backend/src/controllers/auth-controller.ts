import { Request, Response } from "express";

export class AuthController {
  static register = async (req: Request, res: Response) => {
    console.log("Register endpoint hit");
  };
}
