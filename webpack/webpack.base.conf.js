const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { 
  isDev,
  CDNPath,
} = require('./getBaseInfo');

const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: CDNPath,
    path: path.resolve(__dirname, '../dist'),
    filename: isDev ? '[name].js' : '[name]-[chunkhash].js',
    chunkFilename: isDev ? '[name].js' : '[name]-[contenthash:8].js',
    assetModuleFilename: isDev ? '[name].js' : '[name]-[contenthash:8][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.less$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [styleLoader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { 
      "@": path.resolve("src") 
    },
  },
  plugins: [
    new DefinePlugin({
      'process.env.profile_name': JSON.stringify(process.env.profile_name),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
      chunkFilename: '[name]-[contenthash:8].css',
      ignoreOrder: true,
    }),
  ],
  performance: {
    // 创建后超过 250kb 的资源 是否给警告
    hints: false,
  },
};