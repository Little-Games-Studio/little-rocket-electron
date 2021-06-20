const rules = require('./webpack.rules');
/* 
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
}); */

module.exports = {
    // Put your normal webpack config below here
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|.webpack)/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }]
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            }
        ],
    },
};
