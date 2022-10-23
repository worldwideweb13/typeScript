# Nuxt学習で参考にしたサイト/メモ
- [Vue.js 3.0のComposition APIを使ってみた](https://re-engines.com/2020/06/15/vue-composition-api/)

  compositionAPI利用時とVue2利用時の書き方の比較。主にVueのライフサイクルフック(ref,reactive)の使い方を主眼に解説。
  
```vue.js
 const countRef = ref(0) // 追加
```

- [Vue3のComposition APIをつかって既存のVueコンポーネントを書き換えてみた](https://note.com/mizutory/n/n59ecb2aeb0a3)
  - vue.jsで変数の変更などが会った時に、画面表示も変更するようにしたい場合、リアクティブな値として扱う必要がある。
  - リアクティブな値 = `ref(),reactive()` で囲われた変数、配列。
  - setup関数内でのrefとreactiveの使い分け、リアクティブな要素に値を入れ直す時の方法.以下を参照。

``` Vue.js
const currentLatLng = ref(null);   

currentLatLng.value = {name: 'new object'}
```

- [RSCSSの概要](https://rfs.jp/sb/html-css/html-css-guide/rscss.html)
  - Components、Elements、Variants の３つのレイヤー毎に命名規則がある。
    - component..."-" を使って単語を繋ぐ。cf(tab-component)
    - Elements...コンポーネントレイヤー内で使われる単語のため、シンプルな記述で良い。基本は単語１つ。cf (body,text)
    - Variants...既存のコンポーネントやエレメントと構成が同じで、見た目や機能が違うものを作りたい場合は、新規に作り直すのではなく、バリアントを使う。

- [【Vue.js】タブ切り替え](https://into-the-program.com/vue-tab/)
以下の記述を参考に作成

```
        <li @click="isSelect('1')" v-bind:class="{'active': isActive === '1'}">All</li>
```

...結論、タブ毎に違うコンテンツ(表や、テキストなどタブ毎に表示形式が変わる場合は、slotを使う。)

- [Vue-v-forループの最後の小道具にいるかどうかを確認する](https://www.web-dev-qa-db-ja.com/ja/vue.js/vuevfor%E3%83%AB%E3%83%BC%E3%83%97%E3%81%AE%E6%9C%80%E5%BE%8C%E3%81%AE%E5%B0%8F%E9%81%93%E5%85%B7%E3%81%AB%E3%81%84%E3%82%8B%E3%81%8B%E3%81%A9%E3%81%86%E3%81%8B%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B/831576229/)

`v-for`ディレクティブで「配列の最後のみ」特定の条件のDOMをレンダリングする。

```Vue.js
<span v-for="(val,key,index) of person">
  key: {{key}}, val: {{val}}
<span v-if="index != Object.keys(person).length - 1">

```

### VeeValidate...Vueで使えるvalidationライブラリー
[VeeValidateでVue.js用の超便利なバリデーションを実装する](https://www.kabanoki.net/4955/)

  - `validation-observer`でform全体を囲み `validation-provider`で各入力フォームを囲むことでvalidationルールを設定可能。
  - `<validation-provider></validation-provider>`内の`slot-scope`に入力フィールドの状態が入っていおり、この状態を基に、validation error を表示する。
  - validationルールを記述することで、様々なvalidatyionを設定することができる。

### [nuxtで画面遷移時のパラメータ受け渡し(params, query)](https://codelikes.com/nuxt-query-or-params/)
  - フォルダ構成をURLディレクトリに合わせる。パラメータをディレクトリに組み込みたい場合は、以下のような構成
 ```
└── users
    └── _id.vue
 ```
  -  画面遷移は　`method:{ function-name(){...} }`で...内に以下のように記述
 ```Vue.js
 this.$router.push({ path: `users/999` });
 ```
 
 ### VueRouterを使ったButtonコンポーネントのリンク先の記述の仕方...`$router.push`を使う
 - 関数`() => {}`の`{}`を省略して、リンク先のみを直接`button`タグ内に記述
```Vue.js
  <Button label="ページ２へ" @click="() => $router.push('/page02')" />
```


### OA AUTHに関しての考察
<p align="center">
  <img src="https://user-images.githubusercontent.com/75665390/197398645-783e9932-3620-4dfb-b837-60c3ac61640e.png" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/75665390/197398585-c652aea3-15ad-4ba8-93a3-34c4d090536b.png" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/75665390/197398714-975e5f91-85a4-4328-8bde-f89c37de2796.png" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/75665390/197398739-9a55973b-034b-470d-ac59-3cbd7fb2b795.png" />
</p>

# Nuxt 学習 〜index〜
- [RestAPIを参考にルーティングをつくる](https://github.com/worldwideweb13/typeScript/commit/ec0110205af6197c57d7a0d3d7c2db760c22bb7c)
- [テーブルをつくりリンクを張ってみる]()
- [Vue.js devtools (GoogleChrome拡張機能)]()
- [テーブルをつくりリンクを張ってみる]()
- [オートインポート機能]()
- [フォルダ名なしでオートインポートする方法]()
- [ルーティング Nuxtの場合]()
