import { Request, Response } from "express";
import express from "express";
import OpenAIClient from "../../openai/api";
import BaseRouter from "./BaseRouter";
import User from "../../db/models/User";
import { JoinRequest } from "./Request";

class AuthRoutes extends BaseRouter {
  public router: express.Router;

  constructor() {
    super();
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/join",
      this.tryWrapper(async (req, res) => {
        const joinRequest: JoinRequest = req.body;
        const user = await User.create(joinRequest);
        await user.save();
        this.sendSuccessResponse(res);
      })
    );

    this.router.post(
      "/login",
      this.tryWrapper(async (req, res) => {
        const { username, password } = req.body;
        this.sendSuccessResponse(res);
      })
    );
  }
}

export default new AuthRoutes().router;
