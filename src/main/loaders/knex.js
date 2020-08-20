import { app } from "electron";
import path from "path";
import fs from "fs";

import knex from "knex";
import knexOptions from "../../../knexfile";

const isDevelopment = process.env.NODE_ENV !== "production";
const config = isDevelopment ? knexOptions.development : knexOptions.production;

const client = knex(config);

if (!isDevelopment) {
  try {
    fs.accessSync(config.connection.filename, fs.constants.F_OK);
  } catch (error) {
    fs.copyFileSync(
      path.join(app.getAppPath(), "..", "/db/music-library.sqlite"),
      config.connection.filename
    );
  }
}

export default client;
