import express from "express";
import OpenAIRoutes from "./OpenAIRoutes";

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
    this.router.use("/openai", OpenAIRoutes);
  }
}

export default new Routes().router;
