const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')

module.exports = {
    entry: {
        creep_coeff: './src/calculations/creep_coeff/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/src/static/'
    },
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
    watch: true
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./src/index.html",
    //         filename: "./index.html"
    //     })
    // ]
}