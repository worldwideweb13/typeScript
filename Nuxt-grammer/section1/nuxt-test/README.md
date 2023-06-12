# Nuxt 学習 〜index〜
---

* [RestAPIを参考にルーティングをつくる](https://github.com/worldwideweb13/typeScript/commit/ec0110205af6197c57d7a0d3d7c2db760c22bb7c)
* [テーブルをつくりリンクを張ってみる]()
* [オートインポート機能]()
* [フォルダ名なしでオートインポートする方法]()
* [ルーティング Nuxtの場合]()
* [Vue.js 3.0のComposition APIを使ってみた](https://re-engines.com/2020/06/15/vue-composition-api/)
  * Vueのライフサイクルフック(ref,reactive)の使い方を主眼に解説。
  * reactiveな値にすることによって、値が変わった時に、自動で画面の表示内容を変えることができるようになる。

```vue.js
 const countRef = ref(0) // 追加
```

* [Vue.jsで、親コンポーネントからもらった変数を子コンポーネントで更新したいときの対処法](https://qiita.com/masatomix/items/ab4f0488083554f5fceb)
* [Vue3のComposition APIをつかって既存のVueコンポーネントを書き換えてみた](https://note.com/mizutory/n/n59ecb2aeb0a3)
  * vue.jsで変数の変更などが会った時に、画面表示も変更するようにしたい場合、リアクティブな値として扱う必要がある。
  * リアクティブな値 = `ref(),reactive()` で囲われた変数、配列。
  * setup関数内でのrefとreactiveの使い分け、リアクティブな要素に値を入れ直す時の方法.以下を参照。
  * setup関数内で関数も記述し、関数名をreturnすることで外部から利用することが可能。

``` Vue.js
const currentLatLng = ref(null);   

currentLatLng.value = {name: 'new object'}
```

- [RSCSSの概要](https://rfs.jp/sb/html-css/html-css-guide/rscss.html)...Components、Elements、Variants の３つのレイヤー毎に命名規則がある。
   - component..."-" を使って単語を繋ぐ。cf(tab-component)
   - Elements...コンポーネントレイヤー内で使われる単語のため、シンプルな記述で良い。基本は単語１つ。cf (body,text)
   - Variants...既存のコンポーネントやエレメントと構成が同じで、見た目や機能が違うものを作りたい場合は、新規に作り直すのではなく、バリアントを使う。

- [【Vue.js】タブ切り替え](https://into-the-program.com/vue-tab/)
   - 結論、タブ毎に違うコンテンツ(表や、テキストなど表示する内容を変えたい時に、slotを使う。)

以下の記述を参考に作成

```
        <li @click="isSelect('1')" v-bind:class="{'active': isActive === '1'}">All</li>
```

- [Vue-v-forループの最後の小道具にいるかどうかを確認する](https://www.web-dev-qa-db-ja.com/ja/vue.js/vuevfor%E3%83%AB%E3%83%BC%E3%83%97%E3%81%AE%E6%9C%80%E5%BE%8C%E3%81%AE%E5%B0%8F%E9%81%93%E5%85%B7%E3%81%AB%E3%81%84%E3%82%8B%E3%81%8B%E3%81%A9%E3%81%86%E3%81%8B%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B/831576229/)

`v-for`ディレクティブで「配列の最後のみ」特定の条件のDOMをレンダリングする。

```Vue.js
<span v-for="(val,key,index) of person">
  key: {{key}}, val: {{val}}
<span v-if="index != Object.keys(person).length - 1">

```
-  `v-if`と`v-show`の使い分け
    - レンダリングをコントロールしていて、タグ自体の有無を操作している
    - cssをコントロールしていて、display:noneのオンオフを行う
      → エラー文言のような１画面内で頻繁に表示非表示が切り替わる可能性のある箇所は, v-show を使うべきで、１度画面が表示されたら切り替わることのないところ（ラベルの有無など）を操作するような場合は v-ifを使う

#### VeeValidate...Vueで使えるvalidationライブラリー
- [VeeValidateでVue.js用の超便利なバリデーションを実装する](https://www.kabanoki.net/4955/)
- [validation-observer,validation-providerの使い方基礎](https://sakitadaiki.hatenablog.com/entry/2021/04/07/112440)
  - `validation-observer`は検証エラーが出ている時にフォームの送信の実行ができないようにする。
  - `validation-provider`内で各入力フォーム`rules`を囲むことでvalidationルールを設定可能。
  - `<validation-provider></validation-provider>`内の`slot-scope`に入力フィールドの状態が入っていおり、この状態を基に、validation error を表示する。
  - validationルールを記述することで、様々なvalidatyionを設定することができる。

- [nuxtで画面遷移時のパラメータ受け渡し(params, query)](https://codelikes.com/nuxt-query-or-params/)
  - フォルダ構成をURLディレクトリに合わせる。パラメータをディレクトリに組み込みたい場合は、以下のような構成
 ```
└── users
    └── _id.vue
 ```
  -  画面遷移は　`method:{ function-name(){...} }`で...内に以下のように記述
 ```Vue.js
 this.$router.push({ path: `users/999` });
 ```
 
- VueRouterを使ったButtonコンポーネントのリンク先の記述の仕方...`$router.push`を使う
  - 関数`() => {}`の`{}`を省略して、リンク先のみを直接`button`タグ内に記述
```Vue.js
  <Button label="ページ２へ" @click="() => $router.push('/page02')" />
```
---

### GitHubに関してのHow to
- [it stash apply でエラーが出た時の対処法](https://honobonolab.com/git-stash-apply-error/)
  - `git stash` → `pop` する際に、untrackedのファイルと同名ファイルが存在する時などに戻せなくなる事象の対応方法。 
  - stash したファイルもmergeすることが可能。以下の手順で対応
  - stashしたファイルのmerge
```
git merge "stash@{0}"
```
- マージコミットが生成されるので、マージコミットを取り消し
```
git reset --soft head^
```

- [Git で 誤って master ブランチを編集してしまったとき](https://qiita.com/Salinger/items/839a6f467e27235cabc3)

#### gitHub branchの変更を他のbranchにpullする手順
- 想定される手順...Aさんの作業ブランチを自分が作業しているbranchBに取り込みたい。
1. Gitのリモートを取り込み、Aさんの作業ブランチを取得
```
git fetch
```
2. Aさんの作業ブランチ(A-branch)をローカルブランチにcheckout 
```
git checkout A-branch
```
3. A-branchを取り込みたい自分の作業ブランチにcheckout
```
git checkout my-branch
```
4. 自分の作業ブランチにA-branchを取り込む
```
git merge A-branch
```

- 現在チェックアウトしているブランチにマージされているローカルブランチを削除する
```
git branch --merged
```
---

- [Git用語：上流ブランチとは？](https://www-creators.com/archives/4931)
  - リモート追跡ブランチが存在するからといって、同名のローカルブランチの上流ブランチが設定済みとは限らない
- [プルリクエストの内容をローカル環境で稼働確認する(github)](https://qiita.com/great084/items/ad74dd064a2c2bc47cff])
  - 同じチーム内メンバーのプルリクに対しての操作
  - チームメンバーが作成したブランチのプルリク状態のソースを自分のローカルブランチに持ってくる方法

## 学びになった記事まとめ

- [[Vue.js] propsでnullが入ることも想定した書き方](https://qiita.com/00__/items/5259bda7c6b2462b4beb)
- vue.jsのfluxフロー
<p align="center">
  <img src="https://user-images.githubusercontent.com/75665390/200177768-0a27422a-379f-449b-bba5-7479b841bdf0.png" />
</p>

- [Vue.js $emit 使わないで props で method 渡したほうが良くない？](https://techblog.roxx.co.jp/entry/2020/07/09/092955)
- [【Vue3】親<->子間のコンポーネントメソッド発火方法](https://qiita.com/sakurada8514/items/8931318c1fb47e7121b3)
  - emitも親の値を子では更新しない、という方針は変わらない
  - 親からプロパティの更新関数(update)を記述する
  - 子コンポーネントでプロパティの更新関数を`emit`を使って更新する
  - emitを使うことで、親-子-孫のようにコンポーネントを分離した時に、関心の分離ができるようになる。(Presentationnal/model-componentパターン)
- [GULP 学習コンテンツ](https://note.com/ichikun_/n/n3aa2c5f59725)
  - アイコン(img)をアイコンフォントに変更するツール。
  - 画像、Saasなどの圧縮を行い、サイトの軽量化を図る。
 [【DartSass対応】どこよりも詳しいGulp 4環境構築【Mac編】](https://tips-web.net/gulp4-mac/)
- [SSRとは](https://www.ragate.co.jp/blog/articles/10524)
　　- サーバーサイドレンダリングの略
-  [Visual Studio Codeに定型文（スニペット）を登録する方法](https://slash-mochi.net/blog/2019/07/13/post-1978/)

composition API　のスニペット
```Vue.js
{
	"html": {
		"prefix": "composition api template",
		"body": [
			"<template>",
			"",
			"</template>",
			"",
			"<script lang=\"ts\">",
			"\timport { defineComponent } from '@nuxtjs/composition-api';",
			"\texport default defineComponent({",
			"\tname:'',",
			"\t});",
			"</script>",
			"",
			"<style lang=\"scss\" scoped>",
			"</style>",
			"",
		]
	}
}

```

## Docker開発環構築時のトラブルシューティング。
- コンテナ作成直後は、初期化スクリプトが色々走っている
- そのため、タイミングが悪いとDB処理が上手くいかない事があるかもしれない。
- 何度やっても失敗する場合は、
　`docker compose down -v`
で一旦コンテナを消し、もう一度下記コマンドでコンテナ再作成
`docker compose up -d`
　
その後は少し5～10分くらい時間をおいてみてから、
`make db_upgrade` でDBを最新化

## その他の学び

* [Container/Presentationalパターン再入門](https://zenn.dev/kazu777/articles/9460c75b7cd8d1)
  * Conteiner : 内部ロジック(API)
  * Presentational : 外見に関して関心を持つ
* [Vuetify.js 2.2のMenu, Tooltipコンポーネントについて](https://qiita.com/rubytomato@github/items/9bd8dc197f9ab406bead)
  * vuetify<v-menu>の使い方がGIF画像付きなので、直感的に参考になった。
- [https://wa3.i-3-i.info/word16265.html](サニタイズとは)
- [redisサーバー](https://www.fenet.jp/infla/column/technology/redis%E3%81%A8%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9%EF%BC%9F3%E3%81%A4%E3%81%AE%E7%89%B9%E5%BE%B4%E3%82%84%E4%BD%BF%E3%81%84/#:~:text=Redis%E3%81%A8%E3%81%AF%E3%80%81Key%2DValue%E3%82%B9%E3%83%88%E3%82%A2%E3%81%A8%E3%81%84%E3%81%86%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AA%E3%81%AE,%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%80%82)

* [複数のGitHubアカウントを使い分けたい時の設定方法とTips](https://zenn.dev/taichifukumoto/articles/how-to-use-multiple-github-accounts)
  * vuertify...vuetifyをプロジェクトにインストール後、`<v-card> </v-card> ` を宣言して、必要なpropsを渡すことで利用可能。
* [MacにHomebrew経由でnodenvを導入する]（＋PHPStorm対策）](https://qiita.com/alice37th/items/989af6749264de50bb85)
* [nuxt-linkを使うメリット](https://webrandum.net/nuxt-link/#:~:text=%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82-,nuxt%2Dlink%E3%81%AE%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88,-%E5%85%B7%E4%BD%93%E7%9A%84%E3%81%AA)

* [Promise all](https://www.youtube.com/watch?v=nCJYXNtiCGw)
  * 非同期処理を同時に走らせる。
  * Promise.all([①,②,③])

## Vue3 (compositionAPI)
- [Vue3 Composition APIにおいて、Providerパターン(provide/inject)の使い方と、なぜ重要なのか、理解する。](https://qiita.com/karamage/items/4bc90f637487d3fcecf0)
https://www.webdesignleaves.com/pr/plugins/vue-basic-02.html

```ts
 
import { useRouter } from '@nuxtjs/composition-api';
  
const router = useRouter();
  
  router.push({
    path: PAGE_URL.company.job.url,
  });

```
  
- `$auth`の使い方
```ts
import { useContext } from '@vue/composition-api';

export default {
  setup() {
    const auth = useContext().$auth;
    // Authを使用して認証情報を取得する処理を記述する
    auth.user...
  }
}
  
```

- `watch`関数についての注意事項
  - 通常、watch関数を使う場合、変数の変更は監視できるが、オブジェクト型プロパティの中身の値の変更は検知することができない。
  - オブジェクト型の値の変更を監視するには、第３引数の`deep`を使う必要がある。

```ts
setup(props) {

  const objectValue = reactive({
    propertyA : string
    propertyB : string  
  })
  
  watch(
    () => props.objectName,
    (newValue, _) => {
      objectValue.propertyA = newValue.organizationId;
      objectValue.propertyB = newValue.organizationName;
    },
    { deep: true }
  );

```

- [Array.prototype.includes(string)　](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
  - 却り値: boolean(true or false)
  - Array(配列)に　文字列(string)の値が入っているかを検索。
    - 存在する: true
    - しない: false

- [【Vue】エラー対処法：[Vue warn]: Property or method “〇〇” is not defined on the instance but referenced during render.](https://prograshi.com/language/vue-js/property-or-method-not-defined/)
- [テスト仕様書の注意事項](https://qiita.com/nacho0707/items/296471d649d5baf825b7)
  - 操作方法を明確にすること
  - インデントを駆使して、文章構造が一目でわかるようにすること

#### バージョン管理ファイル
- `package.json` ... プロジェクトファイルを動かす上で必要となるライブラリーや言語のバージョン情報
- `yarn.lock` `package-lock.json`...package.jsonに記載されているバージョン情報をもとにローカルPCの開発環境のバージョン情報を更新した記録ファイル。
- [Vue3 Composition APIにおいて、Providerパターン(provide/inject)の使い方と、なぜ重要なのか、理解する。](https://qiita.com/karamage/items/4bc90f637487d3fcecf0)
  - componentとしての独立性はなくなる。

---

### Open API Generator
- [PHP Conference Japan 2022: OpenAPIで楽に始めるスキーマ駆動開発実… / Taki Komiyama](https://www.youtube.com/watch?v=JBHeKc17KbM)
  - open APIの概要。何を目的としたサービスで何ができるかを説明してくれている。

### Nuxtで便利だったlibrary一覧　
* [vue-scrollto](https://note.com/aliz/n/nfd2bfc514ace)
  * ページ内リンクを貼るときにスムーススクロールを実装する
  * ライブラリーインストール後の初期状態では、`modules:[]`に追加した情報が記述されている。`plugins:[]` に追加して利用する方法もあり、この場合は、`plugins/vue-scrollto.js`を追加。プロジェクト次第だが、pluginsをページ実装のために利用するインストールしたライブラリー群として使っているプロジェクトの場合は、pluginsから読み込ませるようにすべき。
  * vue2,3 に対応済み(2023年5月現在)
  * [公式](https://www.npmjs.com/package/vue-scrollto)

---
### OA AUTHに関しての考察

1. クライアント(ユーザー端末)から認可サーバーにリクエストが飛ぶ。
2. 認可サーバーからユーザーにソーシャルログインを初めてする際に、個人情報の認証許可を求める。
3. ユーザーは認証許可に同意をして画面を進める
4. 認可サーバーはクライアント（ユーザー端末）に許可証を受け渡す。
5. クライアント（ユーザー端末）は許可証をもとにリソースサーバー（使いたいサービスを持っているサーバー）にアクセスする。

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
