module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    chat: [`${__dirname}/web/chat/index.jsx`],
    tasks: [`${__dirname}/web/tasks/index.jsx`],
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: 'file-loader',
      },
    ],
  },
};
