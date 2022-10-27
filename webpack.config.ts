import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
// import CopyPlugin from 'copy-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import { join } from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import { Configuration as WConfiguration } from 'webpack-dev-server';

const isDev = process.env.NODE_ENV === 'development';
const srcDir = join(__dirname, 'src', 'frontend');

interface WebpackConfiguration extends Configuration {
  devServer?: WConfiguration;
}

const config: WebpackConfiguration = {
  mode: `${process.env.NODE_ENV}` as 'development' | 'production',
  entry: join(srcDir, 'index.tsx'),
  output: {
    path: join(__dirname, 'build', 'frontend'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({ extensions: ['.ts', '.tsx', '.json'] }),
    ],
  },
  optimization: {
    chunkIds: isDev ? 'named' : 'deterministic',
    mangleExports: isDev ? false : 'deterministic',
    minimize: !isDev,
    moduleIds: isDev ? 'named' : 'deterministic',
    splitChunks: { chunks: 'all' },
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: undefined },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/inline',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: join(srcDir, 'index.html'),
      filename: 'index.html',
      minify: !isDev,
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: join(srcDir, 'assets'),
    //       to: 'assets',
    //     },
    //   ],
    // }),
    ...(isDev ? [new ReactRefreshPlugin()] : []),
  ],
  devServer: {
    open: true,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
};

export default config;
