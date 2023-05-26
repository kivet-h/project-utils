const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const ESLintPlugin = require('eslint-webpack-plugin');
const config = require('./config')

const APP_PATH = path.resolve(__dirname, '../example/src');
const MAP_PATH = path.resolve(__dirname, '../src');
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: path.resolve(__dirname, "../example/src/index.tsx")
    },
    output: {
        filename: "static/js/[name].[chunkhash:8].js", // 每个输出js的名称
        path: path.resolve(__dirname, "../build"), // 打包的出口文件夹路径
        clean: true, // webpack4需要配置clean-webpack-plugin删除dist文件，webpack5内置了。
        publicPath: "/", // 打包后文件的公共前缀路径
    },
    resolve: {
        extensions: ['.json', '.tsx', '.ts', '.jsx', '.js'],
        alias: {
            "@": APP_PATH,
            "@@": MAP_PATH,
            "dist": DIST_PATH
        },
        modules: [path.resolve(__dirname, "../node_modules")],
    },
    module: {
        rules: [

            {
                test: /\.(j|t)sx?$/,
                include: [APP_PATH, MAP_PATH],
                enforce: 'pre',
                exclude: /node_modules/,
                use: ["thread-loader", 'babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp)$/,
                type: 'asset',
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                generator: {
                    filename: "static/images/[name].[contenthash:6][ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset',
                generator: {
                    filename: "static/fonts/[name].[contenthash:6][ext]", // 文件输出目录和命名
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: "static/media/[name].[contenthash:6][ext]", // 文件输出目录和命名
                },
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: config.indexPath,
            inject: true,
        }),
        new webpack.DefinePlugin({
            "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
        }),
        new ESLintPlugin({
            fix: true,
            extensions: ['js', 'ts', 'tsx'],
            exclude: 'node_modules'
        })
    ],
    // 开启webpack持久化存储缓存
    cache: {
        type: "filesystem", // 使用文件缓存
    },
}
