var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "..", "public"),
        publicPath: "/"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json", ".html"],
        modules: ["node_modules", path.resolve(__dirname, "..", "src")]
    },
    resolveLoader: {
        modules: ["node_modules"]
    },
    mode: 'production',
    module: {
        rules: [
            {  
                test: /\.ts(x?)$/, 
                loader: "ts-loader",
                exclude: /node_modules/
            },
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                test: /\.css$/,
                exclude: /\.useable\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.useable\.css$/,
                loader: "style-loader/useable!css"
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "src/index.html",
          hash: true
        })
    ]
};