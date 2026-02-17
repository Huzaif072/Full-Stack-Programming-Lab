const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        signup: path.resolve(__dirname, 'src/signup.js'),
        membershipForm: path.resolve(__dirname, 'src/membershipForm.js'),
        debitStep: path.resolve(__dirname, 'src/debitStep.js'),
        submit: path.resolve(__dirname, 'src/submit.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp|mp4)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Online Membership',
            filename: 'signup.html',
            template: path.resolve(__dirname, 'src/signup.html'),
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            title: 'Online Membership',
            filename: 'membershipForm.html',
            template: path.resolve(__dirname, 'src/membershipForm.html'),
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            title: 'Online Membership',
            filename: 'debitStep.html',
            template: path.resolve(__dirname, 'src/debitStep.html'),
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            title: 'Online Membership',
            filename: 'submit.html',
            template: path.resolve(__dirname, 'src/submit.html'),
            inject: 'body',
        }),
    ],
};