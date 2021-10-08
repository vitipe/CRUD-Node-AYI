module.exports = {
  entry: "./src/back/index.js",
  target: "node",
  watch: true,
  mode: "development",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.back.js"
  }
}
