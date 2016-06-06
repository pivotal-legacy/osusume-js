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
            "API_SERVER",
            "S3_IDENTITY_POOL_ID"
        ])],
    node: {
      fs: 'empty'
    },
    module: {
        loaders: [
            {
              test: /aws-sdk/,
              loaders: [
                'transform?aws-sdk/dist-tools/transform'
              ]
            },
            {
                test: /\.(css|scss)$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            },
            {
                test: /\.json$/,
                loaders: ['json']
            }
        ]
    }
};
