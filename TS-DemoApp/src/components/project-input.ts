// project-input.ts と依存関係にあるファイルを全て取り込みます
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
  // projectInput Class
  export class projectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const mandayValidatable: Validatable = {
        value: +enteredManday,
        required: true,
        min: 1,
        max: 1000,
      };

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(mandayValidatable)
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
    @autobind
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
}
