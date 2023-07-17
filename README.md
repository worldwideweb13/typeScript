# typeScript学習ガイドライン

### 概要
* 学習期間: 2022年4月~
* 使用技術: TypeScript, Express, React, Vue2,Vue3, Nuxt,
* 使用API: GoogleMapAPI, 
* typeScriptの自学習用リポジトリ。"TS-プロジェクト名"でリポジトリを分けて、分野毎の学習しました。
* Vue.js + typeScript, Nuxt.js 学習状況に関しては[こちら](https://github.com/worldwideweb13/typeScript/blob/main/ts-vue-grammer/README.md)を参照
* 現場で学んだことを記載

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

---
#### tsc のtips
* Data Typeに必須ではないオブジェクトを設定したい時`key?:`にすることで、必須ではない型（必ず必要ではないプロパティ）になる。

```vue
type Data = {
 label? : string,
}
```

- [【HTML5】Sectionタグの正しい使い方を解説！](https://jam25.jp/html/how-to-sectioningtag/)

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

* 型の変換 `{ value: string }[]` → `string[]`
```tsc
  const array = _objArr
    .filter((obj) => obj.startsAt !== undefined && obj.endsAt !== undefined)
    .map((obj) => ({ startsAt: obj.startsAt!, endsAt: obj.endsAt! }));
```

* `propertyName : A || B `
  * 使うとpropertyNameが判定式になる
  * A がfalseの場合はBをpropertyNameに適用する、という意味合い

* `propertyName : A ??B `
    * 使うとpropertyNameが判定式になる
    *  A がnull, undefinedの場合は、BをpropertyNameに適用する、という意味合い

* [JSDocs](https://www.typescriptlang.org/ja/docs/handbook/jsdoc-supported-types.html)
  * コメントアウトの書き方のガイドライン
  * ガイドラインに沿ってコードを書くことで、開発者コメントに自動でコメントアウトの説明がアノテーションとして表示されるようになる。

#### css 情報まとめ

* [CSSのwhite-spaceの使い方：pre、wrap、nowrapなどの違いは？](https://saruwakakun.com/html-css/basic/white-space)
* [複数行テキストの省略と-webkit-boxについて](https://t-yng.jp/post/wh-webkit-box)
* [画面サイズに合わせて高さを指定する3つの方法](http://weboook.blog22.fc2.com/blog-entry-411.html)
* [フロントエンドエンジニアが知るべきキャッシュを理解する](https://zenn.dev/kaa_a_zu/articles/f1430cf681b185)
* [【JavaScript】数値同士の比較結果がおかしい時に確認すべきこと](https://hiyo-code.com/%E3%80%90javascript%E3%80%91%E6%95%B0%E5%80%A4%E5%90%8C%E5%A3%AB%E3%81%AE%E6%AF%94%E8%BC%83%E7%B5%90%E6%9E%9C%E3%81%8C%E3%81%8A%E3%81%8B%E3%81%97%E3%81%84%E6%99%82%E3%81%AB%E7%A2%BA%E8%AA%8D%E3%81%99/)
* [背景（background）を2色にする](https://125naroom.com/web/3028)
  * `linear-gradient` を使う。

#### CSS Grid まとめ

* [「CSSグリッド」とは？基礎と使い方を解説](https://ferret-plus.com/8351)
  * grid　layout　の基本的な使い方
* [とうとうやってきた！CSSの新しいレイアウトモジュール「CSS Grid」って？](https://ferret-plus.com/6971?under_ct)
  * grid　layout　のが作成された背景
* [名前、電話番号、メールアドレス、郵便番号等の最適なmaxlengthはいくつか調べてみた](https://kyogom.com/tech/design/maxlength/)
  * maxlengthの設定値の参考までに。


#### unity メモ
* [Unityで地面を動かしたときの挙動](https://blog.narumium.net/2016/11/19/unity%E3%81%A7%E5%9C%B0%E9%9D%A2%E3%82%92%E5%8B%95%E3%81%8B%E3%81%97%E3%81%9F%E3%81%A8%E3%81%8D%E3%81%AE%E6%8C%99%E5%8B%95/)
* [Inspectorでセット、GetComponentで取得【Unityメモ】](https://nosystemnolife.com/inspector-getcomponent_unity/)
