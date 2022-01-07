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
        target: process.env.VUE_APP_BASE_URL,
        ws: true,
        changeOrigin: true,
      },
      api: {
        target: process.env.VUE_APP_BASE_URL,
        ws: true,
        changeOrigin: true,
      },
    },
  },
}
