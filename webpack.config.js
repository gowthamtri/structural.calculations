const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        creep_coeff: './src/calculations/creep_coeff/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/src/static/'
    },
    // target: 'node', // in order to ignore built-in modules like path, fs, etc. 
    // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        unsafeCache: true,
        alias: {
            reactcomponents: path.resolve(__dirname, 'src', 'reactcomponents')
        }
    },
    watch: true,
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./src/index.html",
    //         filename: "./index.html"
    //     })
    // ]
}