module.exports ={
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      // 根值：默认是37.5，来自于设计稿大小的10分之一
      rootValue: 37.5, // 根植
      propList: ['*']
    }
  }
}
