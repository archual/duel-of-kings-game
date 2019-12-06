const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
      '~': path.resolve(__dirname, './src/'),
      '@config': path.resolve(__dirname, './config'),
    },
  },
};
