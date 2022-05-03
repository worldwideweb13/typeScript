/* 
 tsconfig.jsonにて "outFile": "./dist/bundle.js" を設定
  複数ファイルに分割したtsファイルをbundels.jsに束ねてコンパイル
 ///...トリプルクラスディレクティブ...tsの機能でファイルの依存関係を表す
*/

/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-list.ts" />

namespace App {
  // インスタンスの生成
  new projectInput();
  new projectList("active");
  new projectList("finished");
}
