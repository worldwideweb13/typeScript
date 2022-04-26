/* 一般的にデコレーターはクラスに追加するもの
   デコレーターは最終的にはただの関数
   デコレーターはクラス宣言の直前に@関数名で宣言することで、対象クラスに@"関数名"の関数を適用する
   デコレーターが呼び出させるのはクラスをnewする時ではない。JSがクラスの定義を見つけた時に実行される。
  デコレーターはクラスの初期設定に関する何かを行う。   
*/ 

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
  /* デコレータ関数の実行部分はクラス宣言時に実行される
     -T extend {new}...{}は引数にクラスを持つことを表す. 
      newは予約語で"new"というキーワードを使って、オブジェクトを作ることができる関数=constructor関数 という意味を表す
      newは任意の数の引数を受け取るためレストパラメーター(...arg)をany型の配列(any:[])で設定
     -new(...args: any[]): {name: string}...new関数はオブジェクトを返す{}.
      返されるオブジェクトにはnameというプロパティが必ず入っているため、 {name: string}
  */ 
  return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
    /* 呼び出し元のconstructor(originalConstructor)を継承した新しいクラスに置き換える
       置き換えたクラスは、クラスのインスタンス化されたタイミングで実行される
       デコレーターファクトリーでクラスを書き換えることで、インスタンス作成時に実行されるデコレータ関数を作成できた
    */
    return class extends originalConstructor {
      // 新しいクラス(無名クラス)にconstructorを設定する
      // _...引数として設定する必要はあるが、今は利用することがない時、"_"と記述する
      constructor(..._: any[]){
        super(); // originalConstructor(呼び出し元のconstructor関数)を実行（継承）
        console.log('テンプレートを表示');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }    
      }
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

// const pers = new Person();

// console.log(pers);


//プロパティにデコレーターを使う(プロパティデコレーター)場合
// 引数は２つ設定
//  1(target)はインスタンスのプロパティにデコレーターを設定した場合、targetにはクラスのプロトタイプが渡される
//  1(target)はスタティックのプロパティにデコレーターを設定した場合、targetにはコンストラクタ関数が渡される
// プロトタイプ...クラスのプロパティを抜いたクラス内の、constructor,関数一覧を示す構造体
//  2(propertyName)の名前
function Log(target: any, propertyName: string | Symbol){
  console.log("property デコレータ");
  console.log(target,propertyName);
}

/* アクセサーデコレーター
PropertyDescriptor...オブジェクトのプロパティのメタ属性でデータアクセスに関する取り決めを保持している。 
 例えば,writable(書き換え可否), configurable(ディスクリプタの変更可否), enumerable(プロパティ列挙に現れるか否か)
 詳細は https://00m.in/HsK5k 参照
*/
function Log2(target: any, name: string, descripter: PropertyDescriptor){
  console.log("Accssor デコレータ");
  console.log(target);
  console.log(name);
  console.log(descripter);
}

// メソッドデコレーター
function Log3(target: any, name: string | symbol, descripter: PropertyDescriptor) {
  console.log("Method デコレータ");
  console.log(target);
  console.log(name);
  console.log(descripter);
}

// パラメータデコレータ
function Log4(target: any, name: string | Symbol, position: number){
  console.log("Parameter デコレータ");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: String;
  private _price: number;

  @Log2
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

  @Log3
  getPriceWithTax(@Log4 tax: number){
    return this._price * (1 + tax);
  }

}

// デコレーターはインスタンス化した時に呼び出される訳ではない。
const p1 = new Product('Book', 100);
const p2 = new Product('Book2', 200);

function Autobind(_: any, _2: string, descripter: PropertyDescriptor){
  const originalMethod = descripter.value;
  const adjDescrupter: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescrupter;
}


class Printer {
  message = 'クリックしました!';

  @Autobind
  showMessage(){
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener('click', p.showMessage);

// ---

interface ValidatorConfig {
  // key : {key:val} 
  [prop: string]: {
    [validatable: string]: string[] // ['required', 'positive']
  }
}

const registerValidators: ValidatorConfig  = {};

// Courseインスタンスのプロパティtitleのプロパティデコレーター
function Required(target: any, propName: string) {
  // target (プロトタイプ)のconstructorが持っている名前(title)を参照. それをregisterValidatorsのkeyに設定する
  registerValidators[target.constructor.name] = {
    // 以下の一文を入れることで配列に値が追加されるようになる（ない場合は、値が上書きされてしまう）
    ...registerValidators[target.constructor.name],
    [propName]: ['required'],
  }
}

// Courseインスタンスのプロパティpriceのプロパティデコレーター
function PositiveNumber(target: any, propName: string) {
  // target (プロトタイプ)のconstructorが持っている名前(price)を参照. それをregisterValidatorsのkeyに設定する
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: ['positive'],
  }
}


let isValid = true;
function validate(obj: any){
  const objValidatorConfig = registerValidators[obj.constructor.name];
  console.log(objValidatorConfig);
  // 何もプロパティに値が設定されていないときはtrueで返す
  if(!objValidatorConfig) {
    return true;
  }
  for(const prop in objValidatorConfig){
    console.log(prop);
    for(const validator of objValidatorConfig[prop]){
      switch(validator) {
        case 'required':
          isValid =  isValid && !!obj[prop];
          break;
        case 'positive':
          isValid =  isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}


class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;
  constructor(t: string, p : number){
    this.title = t;
    this.price = p;
  }
}

// validationの実装
const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  // +...number型にキャスト
  const price = +priceEl.value;
// デコレーター関数
  const createCourse = new Course(title, price);
  if(!validate(createCourse)){
    alert('正しく入力して下さい！');
    return;
  }
  console.log(createCourse);
});
