// default export されたものは{}が省略できる(base-component.js でクラスに export className() されたもの)
// ./base-component.jsにアクセスする際はこのファイルでは'Cmp'と記述する
import Cmp from "./base-component";
// *...全ての関数、プロパティにアクセスする
// as Validation...validation.jsのプロパティにアクセスする際は'Validation.プロパティ名'で利用する
import * as Validation from "../util/validation";
// asは{}内でも宣言可能
import { autobind as Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

// projectInput Class
export class projectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    /*
      .bind(this)...submitHandlerで使うthisの指し示すオブジェクトは、このコンテクスト（呼び出しもと）のthisと一緒です
       ↑の一文がない場合、addEventListener(arg1,method)のmethodで使われるthisは呼び出し元（送信ボタンのhtml要素）になる
      */
    //   this.element.addEventListener('submit',this.submitHandler.bind(this));
    this.element.addEventListener("submit", this.submitHandler);
  }

  // renderContent() で実行すべき関数はないが、抽象クラスの制約を満たすために空で設定
  // 抽象(abstraci) に設定されたクラス・関数は継承先で必ず実行されなければいけない
  renderContent() {}

  // :[]...戻り値をタプル型に設定
  // タプル型...要素を追加・削除・変更できない.TS上で使える型（JSでは利用できない。JSでは配列として認識される）
  // | void..."戻り値がない"を設定することで、タプル型を返さなくてもよくなる。※1
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validation.Validatable = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(mandayValidatable)
    ) {
      alert("入力値が正しくありません。");
      // void型を返す（戻り値がない） ※1
      return;
    } else {
      // enteredMandayはnumber型なので'+'で変換
      return [enteredTitle, enteredDescription, +enteredManday];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.mandayInputElement.value = "";
  }

  // デコレーターの利用
  @Autobind
  // 登録ボタンが押された時に実行される関数
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    console.log(this.titleInputElement.value);
    // JSではタプル型のチェックはできないので、typeof関数などは使用不可
    // JSではタプル型は配列になるため、Array.isArray(array)関数でarrayが配列化をチェック
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      // 状態管理クラス（ProjectState）のインスタンス（ProjectState）にタスクを追加
      projectState.addProject(title, desc, manday);
      this.clearInputs();
    }
  }
}
