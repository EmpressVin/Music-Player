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
      chainWebpackMainProcess: config => {
        config.resolve.alias
          .set('#', path.resolve(__dirname, 'src/main'))
          .set('Constants', path.resolve(__dirname, 'src/constants'));
      },
      chainWebpackRendererProcess: config => {
        config.resolve.alias
          .set('@', path.resolve(__dirname, 'src/renderer'))
          .set('Constants', path.resolve(__dirname, 'src/constants'));
      },
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
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./src/renderer/main.js');
  },
};
