// 导入路径模块
var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    // 配置要打包的文件入口和打包到哪里的文件出口
    entry:path.join(__dirname , 'src/main.js'),
    output:{
        path:path.join(__dirname , 'dist'),
        filename:'bundle.js'
    },
    // 添加加载器
    module:{
        rules:[ // 数组中存放加载器的配置信息
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            // css-loader加载器,用于解析css文件
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'css-loader' ]
            // },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
              },
              // es6转es5
            //   babel-present-stage-0  babel-present-stage-1 
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                // include:/(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env']
                  }
                }
            },
            // 处理图片的加载器,使用的是url-loader和file-loader
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 90000
                    }  
                  }
                ]
            },
            {
                test: /\.(ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 90000
                        }
                    }
                ]
            },

        ]
    },
    plugins:[
        // 压缩的插件,但是我们一般不用,用-p
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),

        // 提取css的插件  (从bundle.js中提取)
        new ExtractTextPlugin("app.css"),
        // 自动生成html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            htmlWebpackPlugin: {
                "files": {
                    "css":["app.css"],
                    "js": ["bundle.js"]
                }
            },
            // 压缩 情怀至上
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),

    ],
    // webpack-dev-server
    devtool: 'eval',
    devServer: {
        contentBase: __dirname + '/src', // 当前服务器监听的路径
        hot: true,  // 热更新
        port:8080,  // 定义端口号
        host: 'localhost',
        open:true,    // 是否自动打开浏览器
        // openPage:''
    },


}