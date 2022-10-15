# Nuxt学習で参考にしたサイト/メモ
- [Vue.js 3.0のComposition APIを使ってみた](https://re-engines.com/2020/06/15/vue-composition-api/)

  compositionAPI利用時とVue2利用時の書き方の比較。主にVueのライフサイクルフック(ref,reactive)の使い方を主眼に解説。

- [Vue3のComposition APIをつかって既存のVueコンポーネントを書き換えてみた](https://note.com/mizutory/n/n59ecb2aeb0a3)

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

# Nuxt 学習 〜index〜
- [RestAPIを参考にルーティングをつくる](https://github.com/worldwideweb13/typeScript/commit/ec0110205af6197c57d7a0d3d7c2db760c22bb7c)
- [テーブルをつくりリンクを張ってみる]()
- [Vue.js devtools (GoogleChrome拡張機能)]()
- [テーブルをつくりリンクを張ってみる]()
- [オートインポート機能]()
- [フォルダ名なしでオートインポートする方法]()
- [ルーティング Nuxtの場合]()
