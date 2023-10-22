import { Request, Response } from "express";
import express from "express";
import OpenAIClient from "../../openai/api";
import BaseRouter from "./BaseRouter";

class OpenAIRoutes extends BaseRouter {
  public router: express.Router;

  constructor() {
    super();
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    // TEST ROUTE
    this.router.get("/", (req: Request, res: Response) => {
      res.send("Welcome to Express & TypeScript Server");
    });

    this.router.post(
      "/food",
      this.tryWrapper(async (req, res) => {
        const { ingredients } = req.body;

        const recipe = await OpenAIClient.getFood(ingredients);

        this.sendSuccessResponse(res, { recipe });
      })
    );
  }
}

export default new OpenAIRoutes().router;
