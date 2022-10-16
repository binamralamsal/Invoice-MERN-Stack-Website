import { DocumentType } from "@typegoose/typegoose";
import { UserSchema } from "../models";

declare global {
  namespace Express {
    interface Request {
      user?: DocumentType<UserSchema>;
    }
  }
}

export {};
