module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    disableHostCheck: true,
    open: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    proxy: {
      "^/api/v1/": {
        target: "http://backend:3000",
        pathRewrite: {
          "^/api/v1/": "/api/v1/",
        },
      },
    },
  },
};
