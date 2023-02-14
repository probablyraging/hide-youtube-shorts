const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
    const dstPath = argv.env.dstPath;
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            background: './js/background.js',
            main: './js/main.js',
            popup: './js/popup.js',
            styles: './css/styles.css'
        },
        output: {
            path: path.resolve(__dirname, `./${dstPath}/js`),
            filename: isProduction ? '[name].min.js' : '[name].js'
        },
        optimization: {
            minimize: isProduction
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.svg$/,
                    use: {
                        loader: 'raw-loader',
                    }
                }
            ]
        },
        plugins: [
            isProduction && new UglifyJsPlugin({
                parallel: true,
                sourceMap: true
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? '[name].min.css' : '[name].css'
            }),
            isProduction && new OptimizeCssAssetsPlugin()
        ].filter(Boolean)
    };
};

// webpack --mode production