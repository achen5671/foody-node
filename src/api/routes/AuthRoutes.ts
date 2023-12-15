import { Request, Response } from "express";
import express from "express";
import OpenAIClient from "../../openai/api";
import BaseRouter from "./BaseRouter";

class AuthRoutes extends BaseRouter {
  public router: express.Router;

  constructor() {
    super();
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    // TODO: add send verification code to verify account before auth
  }
}

export default new AuthRoutes().router;
