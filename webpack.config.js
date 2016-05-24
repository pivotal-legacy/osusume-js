var path = require("path");
module.exports = {
    entry: "./src/js/main.js",
    output: {
	path: path.resolve(__dirname, "build/assets"),
	publicPath: "/assets/",
        filename: "bundle.js"
    },
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
