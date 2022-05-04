import React from "react";

interface TodoListProps {
  // items...配列の中にオブジェクト形式で値をもつプロパティ[{key => val..},{}...]の構造
  // これを表すとき、"itemName : {}[]" と記述する
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

// <interfaceName>...引数の型を定義できる
const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    //methodName.bind(null,引数)...この書き方でmethodNameに引数を渡すことができる
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={props.onDeleteTodo.bind(null, todo.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
