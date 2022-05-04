# typeScript

* 制作期間: 2021年10月~　11月　30日間
* 使用技術: Laravel,MySQL,BootStrap,Jquery,Html,CSS
* 使用API: LineメッセージAPI(Liff)

### 概要
typeScriptの自学習用リポジトリ。"TS-プロジェクト名"でリポジトリを分けて、分野毎の学習をしています。


### typeScriptの学習環境作成手順

* TSを動かす上で必要なnode-moduleは重いので、各プロジェクトファイルから抜いてあります。
対象ファイル直下でnode-moduleをインストールすることで動作確認が取れます。

node-module　のインストール
```
npm install
```

* [TS-libs](typeScript/TS-libs) プロジェクトの実行環境
  * [lodash](https://lodash.com/) のインストール　※webpackで利用するため `npm i --save lodash`
  * [@types/lodash](https://www.npmjs.com/package/@types/lodash/) のインストール `npm install --save-dev @types/lodash`

* TS-libs　TS-DemoApp ではwebpackを利用しています。これらのフォルダでは、webpackをインストールしてアプリケーションの実行環境を作っています

開発環境でのwebpackインストールコマンド
```
npm install --save-dev webpack webpack-cli webpack -dev-server typescript ts-loader
```
typeScript  の全ファイルの変化を監視する（ウォッチモード）
```
tsc -w
```
 
### 開発の苦労した点

