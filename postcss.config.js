module.exports = {
  plugins: [
    require('autoprefixer'),
    {
      'postcss-px-to-viewport': {
        viewportWidth: 750,        // 设计稿的视口宽度
        unitToConvert: 'px',       // 需要转换的单位，默认为"px"
        unitPrecision: 3,          // 单位转换后保留的精度
        viewportUnit: 'vw',        // 希望使用的视口单位
        fontViewportUnit: 'vw',    // 字体使用的视口单位
        minPixelValue: 1,          // 设置最小的转换数值，如果为1，只有大于1的值才会被转换
        mediaQuery: false,         // 媒体查询中是否需要转换单位
      }
    }
  ]
}