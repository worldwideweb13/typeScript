/* 
 サードパーティライブラリーの利用手順
 lodash はJSのライブラリーのため、TSファイルではlodashのメソッドを利用することができない。
 そこで、@types と呼ばれる、npmパッケージ（tsへの変換ライブラリー）を入れることでlodashを利用可能になる
 @typesの実態はinterface.（そのため、自分で実装することも可能）インストールすることでtsでの型変換、jsへのコンパイルが可能になる
 このようにjsのライブラリを利用する際は、ts用の@types を探してプロジェクトファイルにインストールすることが常套手段となる
*/

import _ from "lodash";

console.log(_.shuffle([1, 2, 3]));

/* JSファイルで定義されたグローバル変数や、@types で提供されていないJSのサードパーティライブラリーを使いたいときにどうするか
 開発者にはプロパティが存在することがわかっているが、tsにそのことを伝えることができない時、declare構文を利用する. 
 declare...アンビエント宣言. これは必ず存在するプロパティのため、存在有無のチェックはしないで下さい という指示文
*/

declare var GLOBAL: any;

console.log(GLOBAL);

// class-transfer の利用
import "reflect-metadata";
import { plainToInstance } from "class-transformer";

import { Product } from "./product.model";

// const p1 = new Product("スコーン", 150);
// console.log(p1);

const products = [
  { title: "スコーン", price: 150 },
  { title: "トッポ", price: 180 },
];

// map関数を使って配列の値一つずつインスタンス化をする
// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

// class-transferを利用して配列をインスタンス化する
// plainToInstance(className,Array)...配列(Array)の値全てに、classNameを適用する
const loadedProducts = plainToInstance(Product, products);
for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
