import { catchErrors } from "../utils/catch-errors";
import User from "../models/user-model";
import { compareValue, hashValue } from "../utils/bcrypt";
import { BAD_REQUEST, CREATED } from "../constants/http";
import { messages } from "../utils/messages";
import { decryptWithAES, encryptWithAES, generateToken } from "../utils/token";
import Token from "../models/token-model";
import { AuthEmail } from "../emails/auth-email";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = catchErrors(async (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return res
        .status(BAD_REQUEST)
        .json({ message: messages.USER_ALREADY_EXISTS });
    }

    // hashValue
    const hashPassword = await hashValue(password);

    // Create a new user
    const newUser = new User({
      email,
      password: hashPassword,
    });

    // Generate a verification token
    const token = generateToken();
    const encryptToken = await encryptWithAES(token);

    const newToken = new Token({
      userId: newUser._id,
      token,
    });

    AuthEmail.sendConfirmationEmail({
      user: {
        email: newUser.email,
        name: newUser.email,
        token: encryptToken,
      },
    });

    // Save the user to the database
    await Promise.all([newUser.save(), newToken.save()]);

    return res.status(CREATED).json({ message: messages.ACCOUNT_CREATED });
  });

  static confirmAccount = catchErrors(async (req, res) => {
    const { token: ciphertext } = req.body;

    const token = await decryptWithAES(ciphertext);

    const validateToken = await Token.findOne({
      token,
    });

    if (!validateToken) {
      return res.status(BAD_REQUEST).json({ message: messages.INVALID_TOKEN });
    }

    const user = await User.findById(validateToken.userId);

    if (!user) {
      return res.status(BAD_REQUEST).json({ message: messages.USER_NOT_FOUND });
    }

    // Update the user to set emailVerified to true
    user.verified = true;

    // Save the updated user
    await user.save();

    // Delete the token from the database
    await Token.deleteOne({ _id: validateToken._id });

    return res.status(CREATED).json({ message: messages.ACCOUNT_CONFIRMED });
  });

  static loginAccount = catchErrors(async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res
        .status(BAD_REQUEST)
        .json({ message: messages.INVALID_CREDENTIALS });
    }

    if (!userExists.verified) {
      const tokenExists = await Token.findOne({ userId: userExists._id });

      if (tokenExists) {
        await Token.deleteOne({ _id: tokenExists._id });
      }

      const token = generateToken();
      const encryptToken = await encryptWithAES(token);

      const newToken = new Token({
        userId: userExists._id,
        token,
      });

      AuthEmail.sendConfirmationEmail({
        user: {
          email: userExists.email,
          name: userExists.email,
          token: encryptToken,
        },
      });

      await newToken.save();

      return res
        .status(BAD_REQUEST)
        .json({ message: messages.ACCOUNT_NOT_CONFIRMED });
    }

    // Check if the password is correct
    const isPasswordValid = await compareValue(password, userExists.password);

    if (!isPasswordValid) {
      return res
        .status(BAD_REQUEST)
        .json({ message: messages.INVALID_CREDENTIALS });
    }

    // Generate a JWT token
    const token = generateJWT({ userId: userExists!._id as string });

    res.json(token);
  });
}
