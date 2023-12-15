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
      "/login",
      this.tryWrapper(async (req, res) => {
        const { username, password } = req.body;
        console.log(username, password);
        this.sendSuccessResponse(res);
      })
    );

    // TODO: Incomplete
    this.router.post(
      "/logout",
      this.tryWrapper(async (req, res) => {
        this.sendSuccessResponse(res);
      })
    );
  }
}

export default new AuthRoutes().router;
