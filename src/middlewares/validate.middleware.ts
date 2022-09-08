import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions";
import { z, AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;

      return next();
    } catch (error) {
      throw new HttpException(422, "Validation error", error as object);
    }
  };
};

export default validate;
