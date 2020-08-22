// Imports realated to node and electron
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

// Imports for NPM libraries
import { Model } from 'objection';
import knex from 'knex';
import knexOptions from '../../../knexfile';

// Check the current enviornment and load the appropriate Knex config object
const isDevelopment = process.env.NODE_ENV !== 'production';
const config = isDevelopment ? knexOptions.development : knexOptions.production;

const client = knex(config);

// In production if computer doesn't have a database file then copy it from the app folder to the appdata folder
if (!isDevelopment) {
  try {
    fs.accessSync(config.connection.filename, fs.constants.F_OK);
  } catch (error) {
    fs.copyFileSync(
      path.join(app.getAppPath(), '..', '/db/music-library.sqlite'),
      config.connection.filename
    );
  }
}

// Give the knex client to objection.js
Model.knex(client);

export default client;
