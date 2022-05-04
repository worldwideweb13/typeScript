import React from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

// function App() {
//   return <div className="App"></div>;
// }

// React.FC...react で提供されている型でJSXを戻り値で返すファンクションコンポーネント
const App: React.FC = () => {
  const todos = [{ id: "t1", text: "typeScriptコースの完了" }];
  // タスクの追加ボタンが押された時に、入力値を受け取る関数
  const todoAddHandler = (text: string) => {
    console.log(text);
  };
  /* 
   onAddTodo...関数の参照. NewTodoに関数(todoHandler)を渡し、引き渡した先で、関数を実行する
  */
  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
