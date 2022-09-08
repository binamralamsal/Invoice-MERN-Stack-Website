import { DocumentType } from "@typegoose/typegoose";
import { UserSchema } from "../models";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: DocumentType<UserSchema>;
    }
  }
}
