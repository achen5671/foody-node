import { Request, Response } from "express";
import express from "express";
import OpenAIClient from "../../openai/api";
import BaseRouter from "./BaseRouter";
import { JoinRequest } from "./Request";
import User from "../../db/models/User";
import UserRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../middlewares/apiErrors";

class JwtRoutes extends BaseRouter {
  public router: express.Router;

  constructor() {
    super();
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/:username",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { username } = req.params;

        const user = await UserRepository.findByUsername(
          username.toLowerCase()
        );

        if (!user || !user.id) {
          throw new BadRequestError(
            `User with username '${username.toLowerCase()}' does not exist`
          );
        }

        this.sendSuccessResponse(res, {
          userId: user.id,
          username: user.username,
          bearerAuth: `Bearer ${String(
            await jwt.sign(
              { user_id: user.id },
              process.env.SECRET_KEY as string
            )
          )}`,
        });
      })
    );
  }
}

export default new JwtRoutes().router;
