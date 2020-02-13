module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    chat: [`${__dirname}/web/chat/index.jsx`],
  },
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
