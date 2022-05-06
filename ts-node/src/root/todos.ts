import { Router } from "express";

// Routerを関数として呼び出し、その戻り値としてRouterオブジェクトを受け取る
const router = Router();

// routerにパスを登録する
router.post("/");
router.get("/");
// データ更新処理
router.patch("/:id");
router.delete("/:id");

export default router;
