import express from "express";
import OpenAIRoutes from "./OpenAIRoutes";
import { authorize } from "../middlewares/auth";
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
import JwtRoutes from "./JwtRoutes";
import MealRoutes from "./MealRoutes";

class Routes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.router.use(express.json());
    this.router.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.router.use("/status", (_req, res) => res.send("OK"));
    this.router.use("/auth", AuthRoutes);
    this.router.use("/openai", authorize, OpenAIRoutes);
    this.router.use("/users", authorize, UserRoutes);
    this.router.use("/meals", authorize, MealRoutes);
    // todo: remove at some point
    // used for development
    this.router.use("/jwt", JwtRoutes);
  }
}

export default new Routes().router;
