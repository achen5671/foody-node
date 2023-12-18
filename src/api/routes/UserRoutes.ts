import express from "express";
import BaseRouter from "./BaseRouter";
import UserService from "../services/UserService";
import {
  CalculateCaloricIntakeRequest,
  FavoriteMealRequest,
  PatchSelfRequest,
  WeightProgressRequest,
} from "./Request";

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

    this.router.get(
      "/self",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { userId } = req;
        console.log(userId);
        const user = await UserService.getSelf(userId);
        this.sendSuccessResponse(res, user);
      })
    );

    this.router.patch(
      "/self",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const body = req.body;
        const { userId } = req;
        // todo: look into ways to sanitate request by using type or interface
        delete body.password;
        await UserService.patchSelf(userId, body);
        this.sendSuccessResponse(res);
      })
    );

    this.router.get(
      "/profile/:username",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { username } = req.params;
        const user = await UserService.getProfile(username);
        this.sendSuccessResponse(res, user);
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
      "/favorite-meals",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { userId } = req;
        const request: FavoriteMealRequest = req.body;
        await UserService.addFavoriteMeal(userId, request);
        this.sendSuccessResponse(res);
      })
    );

    this.router.post(
      "/weight-progress",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { userId } = req;
        const body = req.body as WeightProgressRequest;
        await UserService.addWeightProgress(userId, body);
        this.sendSuccessResponse(res);
      })
    );

    this.router.post(
      "/calories/calculate",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const body = req.body as CalculateCaloricIntakeRequest;
        const calories = await UserService.calculateCaloricIntake(body);
        this.sendSuccessResponse(res, { calories });
      })
    );

    this.router.get(
      "/weight-progress/:submissionId/delete",
      this.tryWrapper(async (req: express.Request, res: express.Response) => {
        const { userId } = req;
        const { submissionId } = req.params;
        await UserService.deleteWeightSubmission(userId, submissionId);
        this.sendSuccessResponse(res);
      })
    );
  }
}

export default new UserRoutes().router;
