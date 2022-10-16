import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);

      return next();
    } catch (error) {
      throw new HttpException(422, "Validation error", error as object);
    }
  };
};

export default validate;
