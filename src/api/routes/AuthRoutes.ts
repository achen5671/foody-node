import { Request, Response } from "express";
import express from "express";
import OpenAIClient from "../../openai/api";
import BaseRouter from "./BaseRouter";
import { JoinRequest, LoginRequest } from "./Request";
import User from "../../db/models/User";
import AuthService from "../services/AuthService";

class AuthRoutes extends BaseRouter {
  public router: express.Router;

  constructor() {
    super();
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    // TODO: send verification code to verify account before auth
    this.router.post(
      "/join",
      this.tryWrapper(async (req, res) => {
        // TODO: validate joinRequest
        const joinRequest: JoinRequest = req.body;
        // TODO: Move to service layer
        const user = await User.create(joinRequest);
        await user.save();
        this.sendSuccessResponse(res);
      })
    );

    this.router.post(
      "/login",
      this.tryWrapper(async (req, res) => {
        const loginRequest: LoginRequest = req.body;
        const token = await AuthService.login(loginRequest);
        this.sendSuccessResponse(res, { token });
      })
    );
  }
}

export default new AuthRoutes().router;
