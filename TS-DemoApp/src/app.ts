/* 
 tsconfig.jsonにて "outFile": "./dist/bundle.js" を設定
  複数ファイルに分割したtsファイルをbundels.jsに束ねてコンパイル
 ///...トリプルクラスディレクティブ...tsの機能でファイルの依存関係を表す
*/

import { projectInput } from "./components/project-input.js";
import { projectList } from "./components/project-list.js";

// インスタンスの生成
new projectInput();
new projectList("active");
new projectList("finished");
