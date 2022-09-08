import { Router } from "express";

import { validate } from "../middlewares";
import { AuthController } from "../controllers";
import Routes from "../interfaces/routes.interface";
import { loginSchema, signupSchema } from "../validators";

class AuthRoutes implements Routes {
  public path = "/api/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/signup",
      validate(signupSchema),
      this.authController.postSignup
    );
    this.router.post(
      "/login",
      validate(loginSchema),
      this.authController.postLogin
    );
  }
}

export default AuthRoutes;
