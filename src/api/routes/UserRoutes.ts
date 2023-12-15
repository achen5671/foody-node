import express from "express";
import BaseRouter from "./BaseRouter";
import UserService from "../services/UserService";
import { FavoriteMealRequest } from "./Request";

class UserRoutes extends BaseRouter {
  public router: express.Router;

  constructor() {
    super();
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/login",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { username, password } = req.body;
        console.log(username, password);
        this.sendSuccessResponse(res);
      })
    );

    // TODO: Incomplete
    this.router.post(
      "/logout",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        this.sendSuccessResponse(res);
      })
    );

    // NOTE: should favorite-meals exist in it's own route?
    this.router.post(
      "/favorite-meals/:mealId/delete",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { mealId } = req.params;
        const { userId } = req;
        await UserService.deleteFavoriteMeal(userId, mealId);
        this.sendSuccessResponse(res);
      })
    );

    this.router.post(
      "/favorite-meals/:userId",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { userId } = req.params;
        const request: FavoriteMealRequest = req.body;
        await UserService.addFavoriteMeal(userId, request);
        this.sendSuccessResponse(res);
      })
    );
  }
}

export default new UserRoutes().router;
