import { NextFunction, Response, Request } from "express";

type ControllerFn = (req: Request, res: Response) => Promise<void>;

export default class BaseRouter {
  sendSuccessResponse<T>(
    res: Response,
    payload?: any,
    ResponseType?: new (p: any) => T
  ): void {
    if (!payload) {
      res.status(200).send({ ok: true });
    } else {
      res.status(200).send(payload);
    }
  }

  tryWrapper =
    (controllerFn: ControllerFn) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await controllerFn(req, res);
      } catch (err) {
        // Logger.error(`Error for user ${req.user?.id}: ${err}`);
        next(err);
      }
    };
}
