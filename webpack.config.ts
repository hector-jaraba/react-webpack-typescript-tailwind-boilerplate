import path from 'path'
import {Configuration, DefinePlugin} from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import pckg from './package.json'

const webpackConfig = (): Configuration => ({
    entry: './src/index.tsx',
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})],
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'build.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
                exclude: ['/build', '/node_modules'],
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(ttf|eot|svg)$/,
                loader: 'file-loader',
            },
        ],
    },
    devServer: {
        port: 5000,
        open: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
            title: pckg.name,
            templateContent: `<div id="root"></div>`,
        }),
        // DefinePlugin allows you to create global constants which can be configured at compile time
        new DefinePlugin({
            'process.env': process.env.production || !process.env.development,
        }),
        new ForkTsCheckerWebpackPlugin({
            // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}',
            },
        }),
    ],
})

export default webpackConfig
