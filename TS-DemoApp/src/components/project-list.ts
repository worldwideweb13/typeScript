import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import Component from "./base-component";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { ProjectItem } from "./project-item";

// projectList Class
export class projectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
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
