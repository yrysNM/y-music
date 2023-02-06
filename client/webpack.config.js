const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: __dirname + "/src/index.tsx",
    // inline-source-map bar line 
    devtool: "inline-source-map",
    output: {
        path: path.join(__dirname, "/public/dist/"),
        publicPath: "/dist/",
        filename: "bundle.js",
    },
    watch: true,
    devServer: {
        static: __dirname + "/public/",
        port: 3033, //  change the port
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/i,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(tsx|ts)?$/i,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: [
                    "svg-inline-loader",
                    "@svgr/webpack",
                    // {
                    //     loader: "react-svg-loader", options: {
                    //         js: true // true outputs JSX tags
                    //     }
                    // },
                    "react-svg-loader",
                    "svg-url-loader"],
                oneOf: [
                    {
                        include: path.resolve(__dirname, '../node_modules/'),
                        use: ['svg-react-loader', 'react-svg-loader']
                    },
                    {
                        include: path.resolve(__dirname, '../src/'),
                        use: ['url-loader', 'svg-url-loader', "@svg/webpack"]
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe|svg?g|gif|mp3|webp)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.jsx', '.ts', '.js'],
    },
    plugins: [
        // index html script жасау ушын
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html'
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ]
}