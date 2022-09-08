import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

import config from "../config";
import { User } from "../models";
import { HttpException } from "../exceptions";
import {
  DataStoredInToken,
  RequestWithUser,
} from "../interfaces/auth.interface";

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (
    !(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
  )
    throw new HttpException(404, "Authorization token missing");

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = (await jwt.verify(
      token,
      config.JWT_SECRET
    )) as DataStoredInToken;

    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      throw new HttpException(401, "Wrong authorization token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new HttpException(401, "Wrong authentication token");
  }
};

export default authMiddleware;
