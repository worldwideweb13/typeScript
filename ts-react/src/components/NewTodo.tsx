import React, { useRef } from "react";
import "./NewTodo.css";

// App.tsxからでPropsで関数(onAddTodo={todoAddHandler} )を引数に受け取っているため、typeで引数の型を定義
type NewTodoProps = {
  // onAddTodo: App.tsxで定義されているtodoAddHandler()の引数、戻り値に合わせた型
  onAddTodo: (todoText: string) => void;
};

// <>...ここではファンクションコンポーネントのジェネリック型
const NewTodo: React.FC<NewTodoProps> = (props) => {
  // useRef()...inputエレメントなどの入力値を監視して、任意のタイミングで取得する状態管理プロパティ
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // textInputRef.current!.value...currentはuseRef()のメソッド。
    // value...HTMLInputElement属性が保証されているので、.valueで入力値が取得可
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
  };
  return (
    // onSubmit...フォームを送信する時に処理を実行する
    // ref...ユーザーの入力値を取得する属性
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo内容</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">TODO追加</button>
    </form>
  );
};

export default NewTodo;
