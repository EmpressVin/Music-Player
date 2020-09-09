const getAppDataPath = require('appdata-path');
const path = require('path');

module.exports = {
  development: {
    debug: true,
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/music-library-dev.sqlite',
    },
    migrations: {
      directory: './db/migrations',
    },
  },
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.join(getAppDataPath('music-player'), 'music-library.sqlite'),
    },
    migrations: {
      directory: './db/migrations',
    },
  },
};
