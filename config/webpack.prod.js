const path = require('path');
const glob = require('glob')

const MinifyJsPlugin = require('babel-minify-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const ManifestPluginConfig = {
   fileName: 'asset-manifest.json'
}

const ImageminPluginConfig = {
   pngquant: {
      quality: '95-100'
   }
}

const postCssLoader = {
   loader: 'postcss-loader',
   options: {
      config: {
         path: './config/postcss.config.js'
      }
   }
}

const cssLoaderModules = {
   loader: 'css-loader',
   query: {
      importLoaders: 1,
      localIdentName: 'md_[sha1:hash:hex:4]',
      minimize: true,
      modules: true
   }
}

const sassLoaderModules = {
   loader: 'css-loader',
   query: {
      importLoaders: 2,
      localIdentName: 'md_[sha1:hash:hex:4]',
      minimize: true,
      modules: true
   }
}

module.exports = merge(common, {
   mode: 'production',
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'static/js/bundle.js',
   },
   module: {
      rules: [
         { test: /\.global\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', postCssLoader] },
         { test: /\.global\.(scss|sass)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', postCssLoader, 'sass-loader'] },
         { test: /^((?!\.global).)*\.css$/, use: [MiniCssExtractPlugin.loader, cssLoaderModules, postCssLoader] },
         { test: /^((?!\.global).)*\.(scss|sass)$/, use: [MiniCssExtractPlugin.loader, sassLoaderModules, postCssLoader, 'sass-loader'] },
      ],
   },
   plugins: [
      new MinifyJsPlugin(),
      new CleanWebpackPlugin(['dist/**/*'], { root: path.resolve(__dirname, '../') }),
      new ImageminPlugin(ImageminPluginConfig),
      new ManifestPlugin(ManifestPluginConfig),
      new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false, reportFilename: path.resolve(__dirname, '../dist/stats/bundle-size-report.html') }),
      new MiniCssExtractPlugin({ filename: 'static/css/[name].css', chunkFilename: '[id].css' }),
      new PurifyCSSPlugin({
         paths: glob.sync(path.join(__dirname, '../src/**/*.js')),
         purifyOptions: { info: true, minify: true, whitelist: ['md_*'] }
      }),
   ],
});
