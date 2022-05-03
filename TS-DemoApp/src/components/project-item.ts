/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
  // ProjectItem Class...プロジェクトをリスト形式でHTMLに描画するためのクラス
  // implements...interface Draggable を適用する
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
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
}
