const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: { 
                        minimize: true
                    }
                }
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        contentBase: './dist',//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新,
        compress: true,
        port: 8088,
        hot: true //热加载
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        //每次打包都会先清除当前目录中dist目录下的文件
        new CleanWebpackPlugin('./dist/bundle.*.js'),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
    ],
    //由于压缩后的代码不易于定位错误, 配置该项后发生错误时即可采用source-map的形式直接显示你出错代码的位置  
    devtool: 'eval-source-map', 
    resolve: {  
        //配置简写, 配置过后, 书写该文件路径的时候可以省略文件后缀。  
        extensions: ['.js', '.jsx', '.coffee', '.css', './scss']  
    } 
};