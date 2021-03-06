'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
function getDateTime () {
  var d, s;
  d = new Date();
  s = d.getFullYear(); // 取年份
  s += '' + ('0' + (d.getMonth() + 1)).substr(-2);// 取月份
  s += '' + ('0' + d.getDate()).substr(-2); // 取日期
  s += '' + ('0' + d.getHours()).substr(-2); // 取小时
  s += '' + ('0' + d.getMinutes()).substr(-2); // 取分
  // s += ':' + ('0' + d.getSeconds()).substr(-2); // 取秒
  return s;
}

const name = 'test-demo'

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

process.env.VUE_APP_BUILD_TIME = getDateTime();
process.env.VUE_APP_BASE_DOMAIN = process.env.NODE_ENV === 'production' ? '/' : '/';
process.env.VUE_APP_MIN_STR = process.env.NODE_ENV === 'production' ? '.min' : ''; // dev与prod环境切换引用压缩资源
process.env.VUE_APP_VERSION = require('./package.json').version + '_' + getDateTime();

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development', // 保存时进行lint检查
  productionSourceMap: false,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        "appId": "com.example.app",
        "productName": "x-player",//项目名，也是生成的安装文件名，即aDemo.exe
        "copyright": "Copyright © 2019",//版权信息
        "directories": {
          "output": "./dist"//输出文件路径
        },
        "win": {//win相关配置
          "target": [
            {
              "target": "nsis",//利用nsis制作安装程序
              "arch": [
                "x64",//64位
                "ia32"//32位
              ]
            }
          ]
        }
      }
    }
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   /* 当前业务系统 */
    //   '/api': {
    //     // target: 'http://yapi.dev.anoah.com/mock/1116',
    //     changeOrigin: true,
    //     secure: false
    //     // pathRewrite: {
    //     //   '^/api': '/api'
    //     // }
    //   }
    // }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '$public': resolve('public'),
        '@assets': resolve('src/assets'),
        '$root': resolve('')
      }
    }
  },
  chainWebpack (config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    /* config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])*/

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()


    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      );

    // 为图片添加版本号
    config.module
      .rule('images')
      .use('url-loader')
      .tap(() => {
        return {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: `img/[name].${process.env.VUE_APP_VERSION}.[ext]`
            }
          }
        };
      });
    // 为js添加版本号
    config.output.chunkFilename(`js/[name].${process.env.VUE_APP_VERSION}.js`);
    config.output.filename(`js/[name].${process.env.VUE_APP_VERSION}.js`);
  },
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
    extract: {
      // 为css添加版本号
      filename: `css/[name].${process.env.VUE_APP_VERSION}.css`,
      chunkFilename: `css/[name].${process.env.VUE_APP_VERSION}.css`
    }
  }
}
