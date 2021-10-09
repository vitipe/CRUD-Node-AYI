const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/front/index.js",
  mode: "development",
  watch: true,
  output: {
    path: __dirname + "/dist/public",
    filename: "bundle.front.js"
  },
  plugins: [
    new HtmlWebPackPlugin({ // esto agarra este html y con ese actualiza o crea uno siempre dentro del bundle de dist
      template: "./src/back/index.html",
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}
