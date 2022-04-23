// 一般的にデコレーターはクラスに追加するもの
// デコレーターは最終的にはただの関数
// デコレーターはクラス宣言の直前に@関数名で宣言することで、対象クラスに@"関数名"の関数を適用する
// デコレーターが呼び出させるのはクラスをnewする時ではない。JSがクラスの定義を見つけた時に実行される。

// デコレーターファクトリ...デコレーターを何かに割り当てる時にカスタマイズできる機能
function Logger(logString: string) {
  console.log('LOGGER ファクトリ');

  // 匿名の関数をreturnする & 関数の引数を設定...デコレーターファクトリの書き方
  return function(constructor: Function) {
    // 実行したい処理はここの中に書く
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE ファクトリ');
  return function(constructor: any) {
    console.log('テンプレートを表示');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

// @Logger('ログ出力中 - PERSON')
// デコレーターは複数個使うことができる。
// デコレーター関数は下から順に実行される（今回の場合、@WithTemplate,@Loggerの順で実行される）
@Logger('ログ出力中')
@WithTemplate('<h1>Personオブジェクト</h1>', 'app')

class Person {
  name = 'Max';

  constructor() {
    console.log('Personオブジェクトを作成中...');
  }
}

const pers = new Person();

console.log(pers);

// デコレーター関数
// 引数は２つ設定
//  1(target)はインスタンスのプロパティにデコレーターを設定した場合、targetにはクラスのプロトタイプが渡される
//  1(target)はスタティックのプロパティにデコレーターを設定した場合、targetにはコンストラクタ関数が渡される
//  2(propertyName)の名前
function Log(target: any, propertyName: string | Symbol){
  console.log("property デコレータ");
  console.log(target,propertyName);
}


//プロパティにデコレーターを使う(プロパティデコレーター)場合

class Product {
  @Log
  title: String;
  private _price: number;

  // priceのセッター
  set price(val: number){
    if(val > 0){
      this._price = val;
    } else {
      throw new Error('不正な価格です - 0以下は設定できません');
    }
  }


  constructor(t: string, p: number){
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(tax: number){
    return this._price * (1 + tax);
  }

}
