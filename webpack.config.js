const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        creep_coeff: './src/components/apps/creep_coeff/index.js'
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
    }
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./src/index.html",
    //         filename: "./index.html"
    //     })
    // ]
}