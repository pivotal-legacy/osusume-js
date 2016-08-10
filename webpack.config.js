var path = require("path");
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: __dirname + '/built-osusume-js',
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.EnvironmentPlugin([
            "API_SERVER",
            "S3_IDENTITY_POOL_ID",
            "GOOGLE_PLACES_KEY"
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
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: [
                  'file?hash=sha512&digest=hex&name=[hash].[ext]',
                  'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
            }
        ]
    }
};
