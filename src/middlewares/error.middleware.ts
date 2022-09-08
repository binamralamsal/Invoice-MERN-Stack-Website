import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = error.status || 500;
  const message: string = error.message || "Something went wrong";
  const extraDetails: object = error.extraDetails || {};

  console.error(
    `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
  );

  res.status(status).json({ message, ...extraDetails });
};

export default errorMiddleware;
