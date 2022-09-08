import {
  pre,
  prop,
  DocumentType,
  modelOptions,
  getModelForClass,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";

@pre<UserSchema>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
})
@modelOptions({
  options: {
    customName: "User",
  },
})
export class UserSchema {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ default: false })
  public isAdmin!: boolean;

  @prop()
  public resetToken?: string;

  @prop({ type: () => Date })
  public resetTokenExpiration?: Date;

  public async comparePassword(
    this: DocumentType<UserSchema>,
    password: string
  ) {
    return await bcrypt.compare(password, this.password);
  }

  public generateToken(this: DocumentType<UserSchema>) {
    return jwt.sign(
      { _id: this._id.toString(), email: this.email, isAdmin: this.isAdmin },
      config.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
  }

  public async updatePassword(
    this: DocumentType<UserSchema>,
    password: string
  ) {
    this.password = password;
    this.resetToken = undefined;
    this.resetTokenExpiration = undefined;
    await this.save();
  }
}

export default getModelForClass(UserSchema);
