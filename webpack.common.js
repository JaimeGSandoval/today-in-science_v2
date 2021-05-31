/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/typescript/index.ts',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      favicon: './src/favicon.ico',
      inject: 'body',
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileBlacklist: [/\.(js|png|jpe?g|css|webp|ico)/],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].bundle.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/images', to: 'assets/images' },
        { from: './src/assets/icons', to: 'assets/icons' },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          // Sass
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets/fonts', // Folder fonts go into
            // using webpack.dev.conf use ./../fonts
            publicPath: './../assets/fonts', // Makes the path to find the fonts folder. Has to be the same value used for outputPath
            limit: 10000,
          },
        },
      },
      {
        test: /\.(png|jpg|webp)$/i,
        type: 'asset/resource',
        generator: {
          // for cache busting
          // filename: 'images/[hash][ext][query]',
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          // Disables attributes processing
          sources: false,
        },
      },
    ],
  },

  devtool: false,
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
