const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "~@/styles/_mixins.scss";
            @import "~@/styles/_variables.scss";
            @import "~@/styles/utility.scss";
          `,
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extraFiles: [
          {
            from: 'db/music-library.sqlite',
            to: 'resources/db/music-library.sqlite',
          },
        ],
      },
      externals: ['sqlite3', 'knex'],
      nodeIntegration: true,
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/renderer'),
        Constants: path.resolve(__dirname, 'src/constants'),
      },
    },
  },
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./src/renderer/main.js');
  },
};
