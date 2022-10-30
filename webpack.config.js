const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") mode = "production";

const rules = [
  {
    test: /\.m?js(x?)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        cacheDirectory: "true",
      },
    },
  },
  {
    test: /\.ts(x?)$/,
    use: "ts-loader",
    exclude: /node_modules/,
  },
  {
    test: /\.(html)$/,
    use: "html-loader",
  },
  {
    test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
    type: mode === "production" ? "asset" : "asset/resource", // В продакшен режиме
    // изображения размером до 8кб будут инлайнится в код
    // В режиме разработки все изображения будут помещаться в dist/assets
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/i,
    type: "asset/resource",
  },
];

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
];

module.exports = (env) => {
  return {
    mode,
    plugins,
    entry: "./src/index.js",
    module: { rules },
    resolve: {
      extensions: [
        ".tsx", 
        ".ts", 
        ".js", 
        ".jsx"
      ],
      alias:{
        "@modules":path.resolve( __dirname, "src/modules"),
        "@styles":path.resolve( __dirname, "src/styles")
      }
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: "assets/[name][hash][ext]",
      clean: true,
    },
    devServer: {
      hot: true,
    },
    devtool: "inline-source-map",
  };
};
