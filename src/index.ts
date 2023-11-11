import dotenv from "dotenv";
import "dotenv/config";

import { port } from "./config/express";

import app from "./config/express";

//For env File
dotenv.config();

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

/**
 * Exports express
 * @public
 */
export default app;
