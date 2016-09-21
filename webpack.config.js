var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        './components'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/'
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