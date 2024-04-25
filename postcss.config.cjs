module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
        //'last 2 versions', // 所有主流浏览器最近2个版本
      ],
      grid: true
    },
    // 'postcss-pxtorem': {
    //   // 根值：默认是37.5，来自于设计稿大小的10分之一
    //   rootValue: 1, // 根植
    //   propList: ['*']
    // }
  }
}
