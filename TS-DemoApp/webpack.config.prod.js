// require("path")...Node.jsのコアモジュール
const path = require("path");
// "npm install --save-dev clean-webpack-plugin" にてターミナルからインストール後、使えるプロパティ
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    // 出力先フォルダ...tsconfig.jsonの"outDir": で指定されたフォルダと一致させる
    // path は絶対パスで記述するルールのためresoleve関数を使用
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
      },
      {
        directory: __dirname,
        publicPath: "/",
      },
    ],
  },
  // sourcemapがtsファイル毎に生成されるため、これらをbundle.js.mapに繋ぎ込んで下さい、という指示文
  // これにより、開発環境ではデバックがし易くなり、かつ bundle.jsで一つのファイルにまとめることができる
  devtool: "eval",
  module: {
    rules: [
      {
        //.ts の名前がついたファイルに node_modules直下のファイルを除き,ts-loaderを適用する
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // importされたモジュール(import {} from "dir")でどのような拡張子をつけて探すかを設定
  // dir.ts / dir.js の拡張子を補完して探すように設定
  resolve: {
    extensions: [".ts", ".js"],
  },
  // ファイルを参照する前に、dist直下のファイルを一度削除して、再描画する設定【常に最新のファイルを展開するように設定】
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
