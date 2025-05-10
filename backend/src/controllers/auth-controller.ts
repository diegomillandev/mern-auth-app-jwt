import { catchErrors } from "../utils/catch-errors";
import User from "../models/user-model";
import { hashValue } from "../utils/bcrypt";
import { BAD_REQUEST, CREATED } from "../constants/http";
import { messages } from "../utils/messages";

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

    // Save the user to the database
    await newUser.save();
    return res.status(CREATED).json({ message: messages.ACCOUNT_CREATED });
  });
}
