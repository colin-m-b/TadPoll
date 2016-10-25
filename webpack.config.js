var webpack = require('webpack');
var path = require('path');

module.exports = {
    //devtool: 'inline-source-map',
    entry: './components/',
    output: {
        path: 'public',
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
            },
            {   test: /\.css$/,
                exclude: /node_modules/,
                loaders: ["style", "css", "sass"]
            },
            {   test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};