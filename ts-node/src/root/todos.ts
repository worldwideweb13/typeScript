import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";

// Routerを関数として呼び出し、その戻り値としてRouterオブジェクトを受け取る
const router = Router();

// routerにパスを登録する
// methodname(route, method)....routeのURIが呼び出されたとき、methodを実行します
router.post("/", createTodo);
router.get("/", getTodos);
// データ更新処理
router.patch("/:id", updateTodo);
router.delete("/:id",deleteTodo);

export default router;
