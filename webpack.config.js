const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

let mode = "development";
if (process.env.NODE_ENV === "production") mode = "production";

const rules = [
  {
    test: /\.((c|sa|sc)ss)$/i,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          // Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
          // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
          importLoaders: 1,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              [
                "postcss-preset-env",
                {
                  // Options
                },
              ],
            ],
          },
        },
      },
      {
        loader: "sass-loader",
      },
    ],
  },
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
        // cacheDirectory: "false",
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
    // В режиме разработки все изображения будут помещаться в build/assets
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
  new Dotenv(),
];

module.exports = (env) => {
  return {
    mode,
    plugins,
    entry: "./src/index.js",
    module: { rules },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "@modules": path.resolve(__dirname, "src/modules"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@API": path.resolve(__dirname, "src/api"),
        "@store": path.resolve(__dirname, "src/store"),
        "@icons": path.resolve(__dirname, "src/images/icons"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@portals": path.resolve(__dirname,"src/portals/*")
      },
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      assetModuleFilename: "assets/[name][hash][ext]",
    },
    devServer: {
      hot: true,
      https: true,
      historyApiFallback: true,
    },
    devtool: "inline-source-map",
  };
};
