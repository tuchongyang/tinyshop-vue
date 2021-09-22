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
    proxy: {
      public: {
        target: "http://tinyshop.tucy.top",
        ws: true,
        changeOrigin: true,
      },
      api: {
        target: "http://tinyshop.tucy.top",
        ws: true,
        changeOrigin: true,
      },
    },
  },
}
