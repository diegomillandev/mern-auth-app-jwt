import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { body, param } from "express-validator";
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

router.post(
  "/confirm-account",
  body("token")
    .notEmpty()
    .withMessage("token is required")
    .isString()
    .withMessage("token must be a string"),
  handleInputErrors,
  AuthController.confirmAccount
);

router.post(
  "/login",
  body("email").notEmpty().isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("password is required"),
  handleInputErrors,
  AuthController.loginAccount
);

router.post(
  "/forgot-password",
  body("email").notEmpty().isEmail().withMessage("Email is required"),
  handleInputErrors,
  AuthController.forgotPassword
);

router.post(
  "/validate-token",
  body("token")
    .notEmpty()
    .withMessage("token is required")
    .isString()
    .withMessage("token must be a string"),
  handleInputErrors,
  AuthController.validateToken
);

router.post(
  "/reset-password/:token",
  param("token")
    .notEmpty()
    .withMessage("token is required")
    .isString()
    .withMessage("token must be a string"),
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
  AuthController.resetPasswordWithToken
);

export default router;
