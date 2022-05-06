import { RequestHandler } from "express";
import { off } from "process";
import { Todo } from "../models/todos";

/* 
 RequestHandler...関数の型定義。内容は以下
 RequestHandler = methodname(req: Request, res: Response, next: NextFunction) => {}
 ※ 本プロジェクトではexpressのtypesパッケージをインストールしているため利用可能な機能
*/

const TODOS: Todo[] = [];
export const createTodo: RequestHandler = (req, res, next) => {
  /* 
   as { text; string }...req.bodyの型定義. オブジェクト型で{ text: string }が入っている
   つまり、{"text" : "テキスト送信"} のjson形式でURIリクエストが出される
   ここではこのURIリクエストからkey(text) の値を取得している
  */

  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  //データ登録処理ができた場合は、status201を返す
  res.status(201).json({ message: "TODOを作成しました", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

// RequestHandler<{ id: string }>...req.params.idの型定義
export const updateTodo: RequestHandler<{ id: string }> = (req, res, nex) => {
  /* 
   req.params...paramsはリクエストパラメーターを表す
   /root/todos.ts のrouter.patch("/:id", updateTodo); にて'/:id' と定義しているのでparams.id でユーザー入力値のidを取得可能
  */
  const todoId = req.params.id;
  const updateText = (req.body as { text: string }).text;
  /* 
   array.findIndex( (引数) => 構文 )...配列内(array)の指定された関数( (引数)=>構文 )に合格する最初の要素の位置を返す
   この時、指定された関数( (引数)=>構文 )の引数は暗黙的に、arrayオブジェクトの要素一つを表します
   今回の場合、todoはTodo({id,text} を指します。
  */
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  // findIndexで対象のレコードが1件も見当たらない場合、-1が返されるためここでエラーハンドラーに値を渡す
  if (todoIndex < 0) {
    throw new Error("対象のTODOが見つかりませんでした");
  }

  TODOS[todoIndex] = new Todo(todoId, updateText);
  res.json({ message: "更新しました", updateTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("対象のTODOが見つかりませんでした");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: "TODOを削除しました" });
};
