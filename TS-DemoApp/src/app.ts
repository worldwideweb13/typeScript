// validation
interface Validatable {
  value: string | number;
  // ?...設定してもしなくても良い
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(ValidatableInput: Validatable) {
  let isValid = true;
  // requiredフラグがtrueの時は文字列有無のチェック式を実行
  if (ValidatableInput.required) {
    // isValid = 条件式1 && 条件式2...条件1,2が正の時、isValidはtrue, そうでなければ false
    // Interface Validatableのvalueの型がnumberの時.trim()が使えないため、.toString()でstring型に変換
    isValid = isValid && ValidatableInput.value.toString().trim().length !== 0;
  }
  // 最小文字数は入力された値が文字列の場合のみ動作する
  if (
    // != null...0が入力値になった場合の考慮
    ValidatableInput.minLength != null &&
    typeof ValidatableInput.value === "string"
  ) {
    isValid =
      isValid && ValidatableInput.value.length >= ValidatableInput.minLength;
  }

  if (
    ValidatableInput.min != null &&
    typeof ValidatableInput.value === "number"
  ) {
    isValid = isValid && ValidatableInput.value >= ValidatableInput.min;
  }

  if (
    ValidatableInput.maxLength != null &&
    typeof ValidatableInput.value === "string"
  ) {
    isValid =
      isValid && ValidatableInput.value.length <= ValidatableInput.maxLength;
  }

  if (
    ValidatableInput.max != null &&
    typeof ValidatableInput.value === "number"
  ) {
    isValid = isValid && ValidatableInput.value <= ValidatableInput.max;
  }
  return isValid;
}

// autobind decorator
function autobind(
  // _(アンダースコア)...引数として便宜上、設定するが関数内では利用しない。そのことをTSに明示的に示す記号
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  // originalMethod...関数の実態を取得
  const originalMethod = descriptor.value;
  const adjDescripter: PropertyDescriptor = {
    // configurable...メソッドの編集可能にする（true）
    configurable: true,
    // getメソッドでthisがoriginalMethodのオブジェクトを参照するように変更。
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescripter;
}

class projectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    // コンテンツを表示するためにアクセスしなければいけない要素へのアクセス修飾子
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    /* importNode(arg1,bool)...arg1に取得するDOM要素、bool = deepCloneフラグ。arg1の下の階層の要素も取得する場合はtrue,
           templateElement.content...templateエレメントの内側の要素を取得したいときは'.content'
    */
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // firstElementChild...直下の子要素(importedNode直下の子要素がformタグなのでHTMLFormElementに変換)
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // DOM要素に'user-input'タグを追加（CSSを適用）
    this.element.id = "user-input";
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
    this.attach();
  }

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
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    console.log(this.titleInputElement.value);
    // JSではタプル型のチェックはできないので、typeof関数などは使用不可
    // JSではタプル型は配列になるため、Array.isArray(array)関数でarrayが配列化をチェック
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      console.log(title, desc, manday);
      this.clearInputs();
    }
  }

  private configure() {
    /*
      .bind(this)...submitHandlerで使うthisの指し示すオブジェクトは、このコンテクスト（呼び出しもと）のthisと一緒です
       ↑の一文がない場合、addEventListener(arg1,method)のmethodで使われるthisは呼び出し元（送信ボタンのhtml要素）になる
      */
    //   this.element.addEventListener('submit',this.submitHandler.bind(this));
    this.element.addEventListener("submit", this.submitHandler);
  }

  // appタグ直下にelement要素を挿入する
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

// インスタンスの生成
const prjInput = new projectInput();
