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
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./src/renderer/main.js");
  }
};
