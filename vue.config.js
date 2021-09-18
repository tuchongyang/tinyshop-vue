module.exports = {
  // publicPath: "",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import '@/assets/css/variable.scss';
        @import '@/assets/css/mixins.scss';
        `,
      },
    },
  },
  devServer: {
    proxy: "http://tinyshop.tucy.top",
  },
}
