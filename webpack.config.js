const path = require('path');

module.exports = {
  entry: path.resolve( __dirname, "src/index.tsx" ),
  output: {
    filename: "app.js",
    publicPath: "public/",
    path: path.resolve( __dirname, "dist" )
  },
  mode: "development",
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  devServer: {
    inline: false,
    publicPath: "/dist/"
  }
}
