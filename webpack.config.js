const path = require('path'); //Node JS syntax , comes with NodeJS
const autoprefixer = require('autoprefixer'); //to autoprix our css
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', //To apply certain optimization
  entry: './src/index.js', //entry point says which file webpack should have look at first
  output: {
    // where to put generated bundled output
    path: path.resolve(__dirname, 'dist'), //path should point at the folder where we want to store our generated output
    filename: 'bundle.js', //path.resolve to build absoulte path , '__dirname' is special global variable , which points to absolute path of that file, in this case it is webpack.config.js
    publicPath: '',
  },

  devtool: 'cheap-module-eval-source-map', //to debug original code , rather than bundled compiled code
  module: {
    rules: [
      {
        test: /\.js$/, //which files should be affected by this rule
        loader: 'babel-loader', //this tells which tool takes over for this file
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer()],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
