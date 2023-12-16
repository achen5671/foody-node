import { Request, Response } from "express";
import express from "express";
import OpenAIClient from "../../openai/api";
import BaseRouter from "./BaseRouter";
import { InsertMealRequest, JoinRequest } from "./Request";
import User from "../../db/models/User";
import UserRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../middlewares/apiErrors";
import MealService from "../services/MealService";

class JwtRoutes extends BaseRouter {
  public router: express.Router;

  constructor() {
    super();
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { userId } = req;
        const body = req.body as InsertMealRequest;
        await MealService.addMeal(userId, body);
        this.sendSuccessResponse(res);
      })
    );

    this.router.delete(
      "/:mealId",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { mealId } = req.params;
        await MealService.deleteMeal(mealId);
        this.sendSuccessResponse(res);
      })
    );
  }
}

export default new JwtRoutes().router;
