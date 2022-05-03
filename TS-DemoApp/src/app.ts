/* 
 tsconfig.jsonにて "outFile": "./dist/bundle.js" を設定
  複数ファイルに分割したtsファイルをbundels.jsに束ねてコンパイル
 ///...トリプルクラスディレクティブ...tsの機能でファイルの依存関係を表す
*/

/// <reference  path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/decorator.ts" />
/// <reference path="./components/base-component.ts" />
/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" />

namespace App {
  // インスタンスの生成
  new projectInput();
  new projectList("active");
  new projectList("finished");
}
