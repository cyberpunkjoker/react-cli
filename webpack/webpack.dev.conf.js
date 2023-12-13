const targetUrl = 'http://csgw.jd.com';

module.exports = {
  mode: 'development',
  devtool: "cheap-module-source-map",
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    }
  },
  devServer: {
    // host: 'local.jd.com',
    open: true,
    port: 8008,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: targetUrl,
        changeOrigin: true,
      },
    }
  },
};