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
  "babel-preset-es2015": "^6.13.2",
  "babel-preset-react": "^6.11.1",
  "css-loader": "^0.23.1",
  "extract-text-webpack-plugin": "^1.0.1",
  "jsx-loader": "^0.13.2",
  "node-sass": "^3.8.0",
  "querystring": "^0.2.0",
  "react": "^15.3.0",
  "react-dom": "^15.3.0",
  "react-hot-loader": "^1.3.0",
  "sass-loader": "^4.0.0",
  "style-loader": "^0.13.1",
  "webpack": "^1.13.1",
  "webpack-dev-server": "^1.14.1"

*/

var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8081');
    sources.push('webpack/hot/only-dev-server');
  }
  return sources;
}

module.exports = {
  entry: {
    index: getEntrySources([
      './src/js/index.js'
    ])
    /*
    **** add one entry for each js file you want as a separate resource ****
    helloworld: getEntrySources([
      './src/js/helloworld.js'
    ])
    */
  },
  output: {
    // with publicPath configured index.html can call the same path for the js and dev-server will take precedence when running
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'jsx-loader', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        loader: process.env.NODE_ENV !== 'production'?'style-loader!css-loader!sass-loader':ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/style.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      xhtml: true,
      title: 'Custom template',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/ejs/index.ejs'), // Load a custom template (ejs by default see the html-webpack-plugin -> FAQ for details)
      chunks: ['index'],
      environment: process.env.NODE_ENV !== "production"?"dev":"",
      files: {
        "css": process.env.NODE_ENV === 'production'? [ "style.css" ] : []
      }
    })
  ]/* if configured access each inside project like e.g. let Strings = require('Strings');
  ,
  externals: {
      'Config': JSON.stringify(require('./config.json')),
      'Strings': JSON.stringify(require('./strings.json'))
  }*/
};
