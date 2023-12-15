import { Request, Response } from "express";
import express from "express";
import OpenAIClient from "../../openai/api";
import BaseRouter from "./BaseRouter";
import { JoinRequest } from "./Request";
import User from "../../db/models/User";

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
        const joinRequest: JoinRequest = req.body;
        // TODO: Move to service layer
        const user = await User.create(joinRequest);
        await user.save();
        this.sendSuccessResponse(res);
      })
    );
  }
}

export default new AuthRoutes().router;
