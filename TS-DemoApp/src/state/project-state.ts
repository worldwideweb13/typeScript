namespace App {
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

  export class ProjectState extends State<Project> {
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
  export const projectState = ProjectState.getInstance();
}
