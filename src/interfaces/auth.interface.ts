import { DocumentType } from "@typegoose/typegoose";
import { UserSchema } from "../models";
import { Request } from "express";

export interface DataStoredInToken {
  email: string;
  isAdmin: boolean;
  _id: string;
}

export interface RequestWithUser extends Request {
  user: DocumentType<UserSchema>;
}
