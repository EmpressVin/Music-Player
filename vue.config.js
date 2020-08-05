const path = require("path");

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extraFiles: [
          {
            from: "db/music-library.sqlite",
            to: "resources/db/music-library.sqlite"
          }
        ]
      },
      externals: ["sqlite3", "knex"],
      nodeIntegration: true
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/renderer")
      }
    }
  },
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./src/renderer/main.js");
  }
};
