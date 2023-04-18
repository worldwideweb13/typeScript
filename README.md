# typeScript学習ガイドライン

### 概要
* 学習期間: 2022年4月~
* 使用技術: TypeScript, Express, React, Vue, Nuxt,
* 使用API: GoogleMapAPI, 
* typeScriptの自学習用リポジトリ。"TS-プロジェクト名"でリポジトリを分けて、分野毎の学習しました。
* Vue.js + typeScript, Nuxt.js 学習状況に関しては[こちら](https://github.com/worldwideweb13/typeScript/blob/main/ts-vue-grammer/README.md)を参照
* 現場で学んだことを記載

### typeScript各学習ファイルの確認事項
* TSを動かす上で必要なnode-moduleは重いので、各プロジェクトファイルから抜いてあります。
対象ファイル直下でnode-moduleをインストールすることで動作確認が取れます。

### node-module　のインストール
```
$ npm install
```
typeScript  の全ファイルの変化を監視する（ウォッチモード）
```
$ tsc -w
```

* TS-libs　TS-DemoApp ではwebpackを利用しています。これらのフォルダでは、webpackをインストールしてアプリケーションの実行環境を作っています。`npm install --save @types/google.maps`
* [TS-libs](TS-libs) プロジェクトの実行環境    ※これらのサードパーティライブラリーをインストールした際は、`npm start`でサーバー再起動をかけることで変更が適用されます 
  * [lodash](https://lodash.com/) のインストール　※webpackで利用するため `npm i --save lodash`
  * [@types/lodash](https://www.npmjs.com/package/@types/lodash/) のインストール `npm install --save-dev @types/lodash`
  * [class-transfer](https://www.npmjs.com/package/class-transformer#installation) のインストール
    * `npm install class-transformer --save`
    * `npm install reflect-metadata --save`
  * [class-validator](https://www.npmjs.com/package/class-validator) のインストール `npm install class-validator --save`
* [TS-mapApp](typeScript/TS-mapApp)...キーワード検索でGoogleMapを表示します。GoogleMapAPI,typeScriptで作成しました。
  * 動作をさせる際は、axiosをインストールします。　`npm install --save axios`
  * 型定義`type GoogleGeocrdingResponse = {...}`は、[GoogleMapAPI公式のレスポンス定義](https://developers.google.com/maps/documentation/geocoding/requests-geocoding)を参考に作成
  * [GoogleMapの@types](https://www.npmjs.com/package/@types/google.maps) を使うことでts環境でgooglemap関数の型補完を使えるようになります。

---
### Node.js & Express & typeScript の開発環境作成
ここでは[ts-node](ts-node) の実行環境に必要なパッケージ、サードパーティライブラリーを記載しておく
[本アプリケーション](ts-node)は、ExpressにてCRUD処理を実装したアプリケーションになります。[Postman](https://www.postman.com/)にて動作確認を行いました。

* プロジェクトファイルに package.json の作成 / typeScriptpプロジェクトとして初期化　※ [tsconfig.json](typeScript/ts-node/tsconfig.json) の設定はソース参照。

```
$ npm init
$ tsc --init
```

* expressフレームワーク/ body-parser のインストール　。　　body-parserはexpressサーバーで受け取ったリクエストパラメーターをパースするためのパッケージ
```
$ npm install --save express body-parser
```
* 開発環境で必要なパッケージのインストール nodemon...JSファイルをnode.jsで実行し、ファイルやフォルダの変更を監視。変更があった時にnode.js のアプリケーションサーバーを自動で再起動する（開発の効率化）
* nodemonを利用するにあたりpackage.jsonで追記が必要。詳細は[package.json](typeScript/ts-node/package.json) 参照。 
```
$ npm install --save-dev nodemon
```

* Node.js　express関数、型定義の読み込み　のため@typesをインストール　
```
$ npm install --save-dev @types/node
$ npm install --save-dev @types/express
```

```
$ npm install --save-dev webpack webpack-cli webpack -dev-server typescript ts-loader
```

### tsc のtips
- Data Typeに必須ではないオブジェクトを設定したい時
- `key?:`にすることで、必須ではない型（必ず必要ではないプロパティ）になる。

```vue
type Data = {
 label? : string,
}
```

* [三項演算子の適切な使い方（条件演算子）](https://qiita.com/smicle/items/7d3b9881834dc0142fb7)

#### 配列
- stringかnumberが入る配列の宣言
```vue
export type Data = {
  numOrStringArray: Array<number | string>
}
```
- stringが入る配列 or numberが入る配列　の宣言方法
```vue
export type Data = {
  numArrayOrStringArray: string | number[]
}
```

- 型の変換 `{ value: string }[]` → `string[]`
```tsc
  const array = _objArr
    .filter((obj) => obj.startsAt !== undefined && obj.endsAt !== undefined)
    .map((obj) => ({ startsAt: obj.startsAt!, endsAt: obj.endsAt! }));
```
- `propertyName : A || B `
  - 使うとpropertyNameが判定式になる
  - A がfalseの場合はBをpropertyNameに適用する、という意味合い

- [[Vue.js] propsでnullが入ることも想定した書き方](https://qiita.com/00__/items/5259bda7c6b2462b4beb)

- [daisyui](https://daisyui.com/)
  - laravelで使えるcssフレームワーク
  - tailwindCssをベースとしたフレームワーク
- [JSDocs](https://www.typescriptlang.org/ja/docs/handbook/jsdoc-supported-types.html)
  - コメントアウトの書き方のガイドライン
  - ガイドラインに沿ってコードを書くことで、開発者コメントに自動でコメントアウトの説明がアノテーションとして表示されるようになる。

