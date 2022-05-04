import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";

// function App() {
//   return <div className="App"></div>;
// }

// React.FC...react で提供されている型でJSXを戻り値で返すファンクションコンポーネント
const App: React.FC = () => {
  /*
   useState([])...戻り値に二つの引数を持つ. 一つは最新の状態のステート(配列), 二つ目は関数
   分割代入を使って、これら二つの引数を受け取る[todos, setTodos]
   useState<Todo[]>...Todo型（オブジェクト）を配列に入れた状態で管理する
  */
  const [todos, setTodos] = useState<Todo[]>([]);
  // タスクの追加ボタンが押された時に、入力値を受け取る関数
  const todoAddHandler = (text: string) => {
    /* setTodos([])...引数は配列形式を指定されているので、[{}]. ここで{}はTodo型
     Todoは./todo.model にて定義
     Reactがサポートしている仕様で、useState()で受け取った関数の引数(setTodos)を使う時
     setTodos(無名関数)で引数に無名関数を設定すると、無名関数の引数には最新のstateを取ることができる
     この特性を利用することで、setTodos((state)=>[...state, 今回の入力値]) で、stateを更新することができる
    */
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
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
