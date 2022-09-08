import { Request, Response } from "express";
import { HttpException } from "../exceptions";
import { User } from "../models";

class AuthController {
  /**
   * @desc    Create a new user
   * @route   POST /api/auth/signup
   * @access  Public
   */
  public async postSignup(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) throw new HttpException(409, "User already exists");

    const user = await User.create({ email, name, password });

    res
      .status(201)
      .json({ token: user.generateToken(), userId: user._id.toString() });
  }

  /**
   * @desc    Login the user
   * @route   POST /api/auth/login
   * @access  Public
   */
  public async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      throw new HttpException(401, "Invalid email or password");

    res
      .status(200)
      .json({ token: user.generateToken(), userId: user._id.toString() });
  }
}

export default AuthController;
