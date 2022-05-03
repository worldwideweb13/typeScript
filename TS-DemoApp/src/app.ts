// トリプルクラスディレクティブ...tsの機能でファイルの依存関係を表す
/// <reference  path="drag-drop-interfaces.ts" />

// プロジェクト（ユーザーが登録するプロジェクト）のType
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public manday: number,
    public status: ProjectStatus
  ) {}
}

// project State Management...タスクの状態管理クラス
// hoge<T>...ジェネリック型. hogeクラス/関数の型はジェネリック
type Listener<T> = (items: T[]) => void;

class State<T> {
  // listnerers...関数の配列
  protected listeners: Listener<T>[] = [];

  // 関数を引数に受け取ってlistnerersに格納する
  addlistnerers(listenersFn: Listener<T>) {
    this.listeners.push(listenersFn);
  }
}

class ProjectState extends State<Project> {
  //  タスク一覧を管理するプロパティ
  private projects: Project[] = [];
  // アプリケーション全体で必ず一つのインスタンスしか存在しない
  private static instance: ProjectState;

  // private constructor...シングルトン。インスタンスが一つしかないことを保証するデザインパターン
  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  // プロジェクトを新たに追加する関数
  // この関数はタスクの登録ボタンが押された直後に実行される
  addProject(title: string, description: string, manday: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      manday,
      // ProjectStatusのデフォルト値はActiveに設定
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    /* 
         for(val of objects){}...反復可能なobjectsから要素を一つずつ取り出して{}の処理を実行する
         今回は関数を配列形式で保持する listnerers から関数を取り出して実行する
         実行する関数には引数にプロジェクト一覧の配列(projects)を渡す         
    */
    for (const listenersFn of this.listeners) {
      /* 
              const listenersFn = 関数 なので listenersFn(引数) で関数実行
              projectsはどこからでも書き換え可能なので、引数として無闇に利用するとバグの温床になる
              そのため、slice()メソッドでコピーした引数を利用するようにする
            */
      listenersFn(this.projects.slice());
    }
  }
}

// シングルトンで状態管理クラス（ProjectState）のインスタンス発行
const projectState = ProjectState.getInstance();

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

// component Class
// 抽象クラス(abstract)...インスタンス化不可。継承クラスでのみインスタンス化される
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    // 任意のパラメータは必須パラメータの後に設定しなければならない
    newElementId?: string
  ) {
    // コンテンツを表示するためにアクセスしなければいけない要素へのアクセス修飾子
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    /* importNode(arg1,bool)...arg1に取得するDOM要素、bool = deepCloneフラグ。arg1の下の階層の要素も取得する場合はtrue,
             templateElement.content...templateエレメントの内側の要素を取得したいときは'.content'
      */
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // firstElementChild...直下の子要素(importedNode直下の子要素をHTMLElementとして取得)
    this.element = importedNode.firstElementChild as U;
    // DOM要素に任意の名前のid名を追加（CSSを適用）
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  // index.html にrenderProjects() で描画したHTMLコンテンツを挿入
  // 引数やプログラムの実行順序によりエラーが生じる実装は、abstractを使い、呼び出し先で関数実行をする
  abstract configure(): void;
  abstract renderContent(): void;

  // index.html にrenderProjects() で描画したHTMLコンテンツを挿入する関数
  private attach(insertAtBeginning: boolean) {
    // beforebegin...element の直前に挿入 | beforeend...element 内部の、最後の子要素の後に挿入
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

// ProjectItem Class...プロジェクトをリスト形式でHTMLに描画するためのクラス
// implements...interface Draggable を適用する
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements DDinterfaces.Draggable
{
  private project: Project;

  // getter関数
  get manday() {
    if (this.project.manday < 20) {
      return this.project.manday.toString() + "人日";
    } else {
      return (this.project.manday / 20).toString() + "人月";
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  // implements Draggable
  dragStartHandler(event: DragEvent): void {
    // dataTransfer...drageventに存在するプロパティでドラッグしたオブジェクトのデータを保管しておける
    // setData(dataFormat,data)...第１引数にdataのデータ形式、第２引数にドロップした先のオブジェクトに渡す値
    event.dataTransfer!.setData("text/plain", this.project.id);
    // effectAllowed...ブラウザ上でカーソルがどのように表示されるのかを決めるプロパティ
    event.dataTransfer!.effectAllowed = "move";
  }
  dragEndHandler(_: DragEvent): void {
    console.log("drag終了");
  }

  // extends Component(継承)
  configure() {
    // 'dragstart','dragend' はaddEventListener事前に用意されているイベント引数
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  // extends Component(継承)
  renderContent() {
    // element...継承元のプロパテ。ここでは<template id="single-project">直下の子要素<ul>を指す
    // getterはプロパティと同じ形式で呼び出される(this.manday)
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.manday;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

// projectList Class
class projectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DDinterfaces.DragTarget
{
  assignedProjects: Project[];

  // constructor引数にリテラル or ユニオン型の'type'を設定
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    //  初期化
    this.assignedProjects = [];

    this.configure();
    // index.html にrenderProjects() で描画したHTMLコンテンツを挿入
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    //
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      // JSの初期設定でドラッグイベントにはドロップが許可されていない
      // そのためpreventDefault()により、初期動作を停止して、ドロップイベントを呼び出すことでドロップが可能になる
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      // element.classList...特定の要素のクラス名を追加したり、削除したり、参照したりすることが出来るプロパティ
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }
  @autobind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    // element.classList...特定の要素のクラス名を追加したり、削除したり、参照したりすることが出来るプロパティ
    listEl.classList.remove("droppable");
  }

  configure() {
    // element...継承元クラスのelement
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    /*  新しいプロジェクトが追加された時にaddListner関数実行。
        addListner関数は、ProjectState.listnerers に関数を配列形式で保持します
        addListner関数は引数に関数を取るため、引数に関数式を入れます...addListner(() => {})
        配列に保持する関数はrenderProjects()です。この関数はユーザーがプロジェクトの'登録'ボタンを押下した時に実行されます
         →submitHandler() → addProject() → for (const listenersFn of this.listnerers)...の順で実行されます
    */
    projectState.addlistnerers((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      // プロジェクト一覧を active or finished-projects-listタグ直下にliタグで挿入する
      this.renderProjects();
    });
  }

  // 実行中プロジェクト/完了プロジェクト  をDOMに追加
  renderContent() {
    const listId = `${this.type}-projects-list`;
    // ul要素のid名にactive-projects-list or finished-projects-list を追加
    this.element.querySelector("ul")!.id = listId;
    // h2要素のテキストに実行中プロジェクト / 完了プロジェクト を追加
    this.element.querySelector("h2")!.textContent =
      this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
  }

  // プロジェクト一覧をhtml要素に追加する関数
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    // 現在domに追加されているプロジェクトは全てクリアする
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(listEl.id, prjItem);
    }
  }
}

// projectInput Class
class projectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

// インスタンスの生成
const prjInput = new projectInput();
const activePrjList = new projectList("active");
const finishedPrhList = new projectList("finished");
