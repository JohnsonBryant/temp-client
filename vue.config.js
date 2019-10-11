module.exports = {
  publicPath: './',
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
    },
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
};
