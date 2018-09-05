const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const dist = 'dist'; // destination directory
//const localURL = 'http://mysite.loc'; // URL of your local environment

module.exports = {
    /**
     *  Entry source js files
     */
    entry: {
        main: ['@babel/polyfill', './src/js/main.js']
    },
    /**
     * Output js files
     */
    output: {
        path: path.resolve(__dirname, dist + '/assets/'),
        filename: 'js/[name].js', // 'js/[name].[hash].js',
        publicPath: dist + '/assets/'
    },
    /**
     * Load external files
     */
    /*externals: {
        google: 'google'
    },*/
    module: {
        rules: [
            /**
             *  ESLint will be used to lint all JavaScript.
             *  Please update .eslintrc.js for configuration. Site: http://eslint.org/
             */
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /(node_modules|vendors)/,
                loader: 'eslint-loader'
            },
            /**
             * Load Babel to compile ES6 to ES5
             * https://babeljs.io/
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            /**
             * Compile SCSS files to CSS
             */
            {
                test: /\.scss$/,
                use: [
                    /**
                     * MiniCssExtractPlugin
                     * https://webpack.js.org/plugins/mini-css-extract-plugin/
                     */
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            /**
             * Load all the font files needed using the file loader
             */
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../fonts/',
                    outputPath: 'fonts/'
                }
            },
            /**
             * Load all the background images used in the SCSS files
             */
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:8].[ext]',
                    publicPath: '../bg-img/',
                    outputPath: 'bg-img/'   // Background images folder is bg-img
                }
            }
        ]
    },
    plugins: [
        /**
         * The MiniCssExtractPlugin will compile all of the SCSS files
         * https://github.com/webpack-contrib/mini-css-extract-plugin
         */
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        /**
         * Browser Sync does Live Reload on http://localhost:3000/
         * https://www.npmjs.com/package/browser-sync-webpack-plugin
         */
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: [dist] } // destination directory
            //proxy: localURL // provide a url if you don't want to serve a directory
        }),
        /**
         * Automatically load modules instead of having to import or require them everywhere
         * https://webpack.js.org/plugins/provide-plugin/
         */
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ],
    optimization: {
        minimizer: [
            /**
             * Minimize JS files
             * https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
             */
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            /**
             * Minimize CSS files
             * https://github.com/NMFR/optimize-css-assets-webpack-plugin
             */
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { sourceMap: true }
            })
        ]
    },
    /**
     * Create source maps for JS and the SCSS files
     */
    devtool: 'source-map'
};