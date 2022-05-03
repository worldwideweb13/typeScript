namespace App {
  // component Class
  // 抽象クラス(abstract)...インスタンス化不可。継承クラスでのみインスタンス化される
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
}
