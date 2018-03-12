const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pageConfig = require('./src/entry.js')
const uglify = require('uglifyjs-webpack-plugin')

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'

let entries = {}

for(let key in pageConfig) {
  let info = pageConfig[key]
  entries[info.name] = [info.dist]
}

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    new webpack.DefinePlugin({
        // 定义全局变量
        'process.env':{
            'NODE_ENV': JSON.stringify(nodeEnv)
        }
    })
]

if (isPro) {
  plugins.push(
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
      }),
      new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          comments: false,
          ie8: true
      }),
      new AssetsPlugin({
        filename: '/build/assets.json'
      }),
      new uglify()
  )
} else {
  // entries.app.unshift('react-hot-loader/patch', `webpack-dev-server/client?http://localhost:3000`, 'webpack/hot/only-dev-server')

  for (let key in entries) {
    entries[key].unshift('react-hot-loader/patch')
  }

  plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  )
}

entries.vendor = ['react', 'react-dom']

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: isPro ? 'source-map' : 'inline-source-map',
    entry: entries,
    output: {
        // filename: '[name].[chunkhash].js',
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: isPro ? '/' : '/build/',
        chunkFilename: '[name].js'
    },
    // BASE_URL是全局的api接口访问地址
    plugins,
    // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            // "components": path.resolve(__dirname, "src/components"),
            // "containers": path.resolve(__dirname, "src/containers"),
            "assets": path.resolve(__dirname, "src/assets"),
            "style": path.resolve(__dirname, "src/style"),
            "utils": path.resolve(__dirname, "src/utils"),
            "config": path.resolve(__dirname, "src/config.js"),
            "commons": path.resolve(__dirname, "src/commons"),
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
        }, {
            test: /\.(less|css)$/,
            use: isPro ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ["css-loader", "less-loader"]
                }) : ["style-loader", "css-loader", "less-loader"]
        }, {
        // }, {
        //     test: /\.less$/,
        //     use: isPro ? ExtractTextPlugin.extract({
        //             fallback: 'style-loader',
        //             use: ["css-loader", "less-loader"]
        //         }) : ["style-loader", "css-loader", "less-loader"]
        // }, {
        //     test: /\.css$/,
        //     use: isPro ? ExtractTextPlugin.extract({
        //             fallback: 'style-loader',
        //             use: ["css-loader"]
        //         }) : ["style-loader", "css-loader"]
        // }, {
            test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
            use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
        }]
    }
};

