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

* [TS-libs](typeScript/TS-libs) プロジェクトの実行環境    ※これらのサードパーティライブラリーをインストールした際は、`npm start`でサーバー再起動をかけることで変更が適用されます 
  * [lodash](https://lodash.com/) のインストール　※webpackで利用するため `npm i --save lodash`
  * [@types/lodash](https://www.npmjs.com/package/@types/lodash/) のインストール `npm install --save-dev @types/lodash`
  * [class-transfer](https://www.npmjs.com/package/class-transformer#installation) のインストール
    * `npm install class-transformer --save`
    * `npm install reflect-metadata --save`
  * [class-validator](https://www.npmjs.com/package/class-validator) のインストール `npm install class-validator --save`

* [TS-mapApp](typeScript/TS-mapApp)...キーワード検索でGoogleMapを表示します。GoogleMapAPI,typeScriptで作成しました。
  * 動作をさせる際は、axiosをインストールします。　`npm install --save axios`
  * 型定義`type GoogleGeocrdingResponse`は、[GoogleMapAPI公式のレスポンス定義](https://developers.google.com/maps/documentation/geocoding/requests-geocoding)を参考に作成
  * 

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

