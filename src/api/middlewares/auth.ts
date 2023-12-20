import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "./apiErrors";

// TODO: add refresh token
export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new UnauthorizedError());
    }

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(new UnauthorizedError());
    }

    await jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        req.userId = user.user_id; // not sure why this is user_id instead of id but meh
        next();
      }
    );
  } catch (e) {
    next(e);
  }
};
