// node.js では通常common.js構文を使って記述を行うが、tsを使う場合はesmoduleで記述することが可能
// const express = require("express");
// es moduleでのimport方法
import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./root/todos";
// json(body-parser)...ミドルウェアで、json形式でクライアントから取得したデータをreq.body経由で取得、操作できるようにします
import { json } from "body-parser";

const app = express();
// json(body-parser)を使うことで、req.bodyのjsonオブジェクトを受け取れるようになる
app.use(json());

/*
 use("route", filename)... ここでは"route"(/todos)へのリクエストは全てfilename(todoRoutes)のルーティング設定を利用する、という意味
*/
app.use("/todos", todoRoutes);
/*
 use( () => {} )...ミドルウェア関数. ここでは app.use() のエラーハンドラー関数【app.use()のエラー処理】を表す
 引数の型はexpressにて定義されており、以下の記述はエラーハンドラ関数の典型的な呼び出し
*/
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
