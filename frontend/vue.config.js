module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    open: true,
    watchOptions: {
      ignored: /node_modules/
    },
    proxy: {
      '^/api/v1': {
        target: process.env.VUE_APP_PROXY_TARGET,
        pathRewrite: {
          '^/api/v1': '/api/v1'
        }
      },
      '^/admin': {
        target: process.env.VUE_APP_PROXY_TARGET,
        pathRewrite: {
          '/admin': '/admin'
        }
      }
    }
  }
}
