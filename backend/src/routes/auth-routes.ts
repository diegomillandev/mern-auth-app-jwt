import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validate";

const router = Router();

router.post(
  "/register",
  body("email").notEmpty().isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("password is required"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  handleInputErrors,
  AuthController.createAccount
);

export default router;
