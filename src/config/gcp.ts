import { Storage } from "@google-cloud/storage";
import path from "path";
import Multer from "multer";

const multer = Multer({
  storage: Multer.memoryStorage(),
  limit: {
    fileSize: 5 * 1024 * 1024, // limit 5 MB
  },
});

let projectId = "";
let keyFilename = "";

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket("");

export default bucket;
