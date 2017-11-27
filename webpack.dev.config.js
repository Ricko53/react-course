const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pageConfig = require('./src/entry.js')

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'

let entries = {}

// for(let key in pageConfig) {
//   let info = pageConfig[key]
//   entries[info.name] = info.dist
// }

entries.app = ['./entries/admin.js']

entries.vendor = ['react', 'react-dom']

entries.app.unshift('react-hot-loader/patch', `webpack-dev-server/client?http://localhost:3000`, 'webpack/hot/only-dev-server')

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    new webpack.DefinePlugin({
        // 定义全局变量
        'process.env':{
            'NODE_ENV': JSON.stringify(nodeEnv)
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
]

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: isPro ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 3000,
      host: "0.0.0.0",
      hot: true,
      inline: true
    },
    entry: entries,
    output: {
        // filename: '[name].[chunkhash].js',
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: isPro ? './build/' : '/build/',
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
            "components": path.resolve(__dirname, "src/components"),
            "containers": path.resolve(__dirname, "src/containers"),
            "utils": path.resolve(__dirname, "src/utils"),
            // 'react': isPro ? 'preact-compat/dist/preact-compat' : 'react', //如果你不想要preact，可以删除这一行
            // 'react-dom': isPro ? 'preact-compat/dist/preact-compat' : 'react-dom', //如果你不想要preact，可以删除这一行
            // 'create-react-class': 'preact-compat/lib/create-react-class' //如果你不想要preact，可以删除这一行
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
            test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
            use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
        }]
    }
};

