import React from "react";

interface TodoListProps {
  // items...配列の中にオブジェクト形式で値をもつプロパティ[{key => val..},{}...]の構造
  // これを表すとき、"itemName : {}[]" と記述する
  items: { id: string; text: string }[];
}

// <interfaceName>...引数の型を定義できる
const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
