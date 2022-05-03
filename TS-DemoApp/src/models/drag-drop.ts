// interface はts独自の機能なのでコンパイルされた時に、drag-drop-interfaces.jsファイルの中身は空になる
namespace App {
  // Drag & Drop
  // Draggable...ドラックできるオブジェクト（プロジェクト）
  export interface Draggable {
    // DragEventはTSに組み込まれているイベント
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }
  // DragTarget... ドラックしたオブジェクトを配置する場所("active" | "finished" -projcets)
  export interface DragTarget {
    // dragOverHandler...dorag&drop中に、その場所が有効なdrop対象の場所かをブラウザに伝える
    dragOverHandler(event: DragEvent): void;
    // dragOverHandlerでdropの許可がでた時に、オブジェクトに変更を加える
    dropHandler(event: DragEvent): void;
    // ビジュアル上のフィードバックを行うときに使うハンドラー
    dragLeaveHandler(event: DragEvent): void;
  }
}
