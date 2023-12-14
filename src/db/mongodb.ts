import mongoose from "mongoose";

export default () => {
  mongoose.connect(process.env.DATABASE_URL as string);
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("Connected to Dababase"));
};
