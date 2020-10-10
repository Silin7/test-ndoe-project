

module.exports = {
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'dist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  /* webpack-dev-server 相关配置 */
  devServer: {
      /* 自动打开浏览器 */
      open: true,
      /* 设置为0.0.0.0则所有的地址均能访问 */
      host: '0.0.0.0',
      port: 8089,
      https: false,
      hotOnly: false,
      /* 使用代理 */
      proxy: {
        // '/': {
        //     /* 目标代理服务器地址 */
        //     target: 'http://localhost:3000',
        //     /* 允许跨域 */
        //     changeOrigin: true,
        // },
        '/api': {
          target: 'http://localhost:3000',  //这里后台的地址模拟的;应该填写你们真实的后台接口
          changOrigin: true,  //允许跨域
          pathRewrite: {
            /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
              实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
             */
            '^/api': '' 
          }
        },
      },
  },
}
