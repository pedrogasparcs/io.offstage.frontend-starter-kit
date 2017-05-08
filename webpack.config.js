// Sort of based on http://www.jonathan-petitcolas.com/2015/05/15/howto-setup-webpack-on-es6-react-application-with-sass.html
/*
 Notes:
 > look at package.json scripts for command line directives
 > don't forget .babelrc
 > look at https://github.com/webpack/extract-text-webpack-plugin/issues/30 for sass loader configuration
 > https://github.com/ampedandwired/html-webpack-plugin

 npm dependencies for webpack setup:

 "babel-core": "^6.13.2",
 "babel-loader": "^6.2.4",
 "babel-polyfill": "^6.16.0",
 "babel-preset-es2015": "^6.13.2",
 "babel-preset-react": "^6.11.1",
 "classnames": "^2.2.5",
 "css-loader": "^0.23.1",
 "eslint": "^3.5.0",
 "eslint-plugin-react": "^6.2.2",
 "extract-text-webpack-plugin": "^1.0.1",
 "fetch-ie8": "^1.4.3",
 "file-loader": "^0.8.4",
 "html-webpack-plugin": "^2.22.0",
 "img-loader": "^1.2.0",
 "jsx-loader": "^0.13.2",
 "node-sass": "^3.8.0",
 "querystring": "^0.2.0",
 "react": "^15.3.0",
 "react-dom": "^15.3.0",
 "react-hot-loader": "^1.3.0",
 "sass-loader": "^4.0.0",
 "style-loader": "^0.13.1",
 "svgo": "^0.6.1",
 "svgo-loader": "^1.1.0",
 "url-loader": "^0.5.6",
 "webpack": "^1.13.1",
 "webpack-dev-server": "^1.14.1"

 */

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function getEntrySources (sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8081')
    sources.push('webpack/hot/only-dev-server')
  }
  return sources
}

let webpackConfig = {
  entry: {
    index: getEntrySources([
      'babel-polyfill',
      './src/js/index.js'
    ])
  },
  output: {
    // with publicPath configured index.html can call the same path for the js and dev-server will take precedence when running
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot-loader',
          'jsx-loader',
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        loader: process.env.NODE_ENV !== 'production' ? 'style-loader!css-loader!sass-loader' : ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=8192',
          'img'
        ]
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=[path][name].[hash].[ext]',
        include: 'img'
      },
      {
        test: /\.svg$/,
        loader: 'file',
        include: 'img'
      },
      {
        test: /\.woff$/,
        // Inline small woff files and output them below font/.
        // Set mimetype just in case.
        loader: 'url',
        query: {
          name: 'font/[hash].[ext]',
          limit: 5000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf$|\.eot$/,
        loader: 'file',
        query: {
          name: 'font/[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/style.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      xhtml: true,
      api: 'http://localhost:8000/api/',
      title: 'Custom template',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/ejs/index.ejs'), // Load a custom template (ejs by default see the html-webpack-plugin -> FAQ for details)
      chunks: ['index'],
      environment: process.env.NODE_ENV !== 'production' ? 'dev' : '',
      files: {
        'css': process.env.NODE_ENV === 'production' ? [ 'style.css' ] : []
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]/* if configured access each inside project like e.g. let Strings = require('Strings');
   ,
   externals: {
   'Config': JSON.stringify(require('./config.json')),
   'Strings': JSON.stringify(require('./strings.json'))
   } */
}


if (process.env.NODE_ENV === "production") {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      sourceMap: true
    })
  )
}

module.exports = webpackConfig
