var path = require("path");
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.EnvironmentPlugin([
            "API_SERVER"
        ])],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }
        ]
    }
};
