// Express
import express, { Application } from "express";

// Swagger
import { swaggerSpecs } from "./swagger";
import swaggerUi from "swagger-ui-express";
import routes from "../api/routes/routes";

const app: Application = express();
export const port = process.env.PORT || 8000;

app.use("/v1", routes);

// swagger: not working. low priority. todo some time in the future id necessary.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
