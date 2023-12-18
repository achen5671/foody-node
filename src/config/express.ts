// Express
import express, { Application } from "express";

// Swagger
import { swaggerSpecs } from "./swagger";
import swaggerUi from "swagger-ui-express";
import routes from "../api/routes/routes";

import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import compress from "compression";
import connectMongoDB from "../db/mongodb";
import { IUser } from "../db/models/User";

declare global {
  namespace Express {
    export interface Request {
      user: IUser;
      userId: string;
    }
  }
}

const app: Application = express();
export const port = process.env.PORT || 8000;

connectMongoDB();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

app.use("/v1", routes);

// swagger: not working. low priority. todo some time in the future if necessary.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
