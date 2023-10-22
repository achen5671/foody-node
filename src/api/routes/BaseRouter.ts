import { NextFunction, Response, Request } from "express";
// import { snakeCase, transform, isArray, isObject } from "lodash";

type ControllerFn = (req: Request, res: Response) => Promise<void>;

export default class BaseRouter {
  // Use the ResponseType argument if there is a specific type or class the response must be,
  // otherwise every property in the payload object will be recursively
  // converted to snake case.
  sendSuccessResponse<T>(
    res: Response,
    payload?: any,
    ResponseType?: new (p: any) => T
  ): void {
    if (!payload) {
      res.status(200).send({ ok: true });
    } else {
      //   let snakeCaseResponse: any;
      //   if (ResponseType) {
      //     const responseObject =
      //       ResponseType === undefined ? {} : new ResponseType(payload);
      //     // if (!responseObject) {
      //     //   throw new ApiError(500, "unable to cast response");
      //     // }
      //     snakeCaseResponse = this.snakealize(payload);
      //   } else {
      //     snakeCaseResponse = this.snakealize(payload);
      //   }

      res.status(200).send();
      res.status(200).send(payload);
    }
  }

  //   snakealize = (obj: Record<string, unknown>) =>
  //     transform(
  //       obj,
  //       (
  //         result: Record<string, unknown>,
  //         value: unknown,
  //         key: string,
  //         target: any
  //       ) => {
  //         const camelKey = isArray(target) ? key : snakeCase(key);
  //         // eslint-disable-next-line no-param-reassign
  //         result[camelKey] = isObject(value)
  //           ? this.snakealize(value as Record<string, unknown>)
  //           : value;
  //       }
  //     );

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
