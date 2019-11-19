const HtmlWebPackPlugin = require("html-webpack-plugin");
const ProvidePlugin = require("webpack-provide-global-plugin");
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
    // externals: [ 
        // nodeExternals()
        // {
        //     'three': 'three',
        //     'react-three-fiber': 'react-three-fiber',
        // }
    // ], // in order to ignore all modules in node_modules folder
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
    plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./src/index.html",
    //         filename: "./index.html"
    //     }),
        // new ProvidePlugin({
        //     'React':     'react',
        //     '$':          'jquery',
        //     '_':          'lodash',
        //     'ReactDOM':   'react-dom',
        //     'cssModule':  'react-css-modules',
        //     'Promise':    'bluebird',
        //     'axios': 'axios'
        // })
    ],
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '-',
          automaticNameMaxLength: 30,
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
    }
}