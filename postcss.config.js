module.exports = {
  plugins: [
    require('autoprefixer')(),
    require('postcss-clean')({
      level: 2,
    }),
  ],
};
