var path = require("path");

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: 'dist',
        filename: 'index_bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    })],
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
