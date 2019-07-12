const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        logger: path.resolve(__dirname, 'src', 'index'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: 'tsconfig.json',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.join(__dirname, 'tsconfig.json'),
            useTypescriptIncrementalApi: true,
            async: false,
        }),
        new CleanWebpackPlugin(),
        new DeclarationBundlerPlugin({
            moduleName: 'notalogger',
            out: './logger.d.ts',
        })
    ],
};
