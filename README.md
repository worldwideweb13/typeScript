# typeScript

* 制作期間: 2021年10月~　11月　30日間
* 使用技術: Laravel,MySQL,BootStrap,Jquery,Html,CSS
* 使用API: LineメッセージAPI(Liff)

### 概要
中小企業向けにLineを使用した顧客へのメッセージングツールを作成しました。以下の機能を実装しています。基本的には、フリーメール(gmailなど)のLine版です。
* メッセージ一覧表示
* 登録ラインチャンネル一覧表示
* チェンネルフレンド一覧表示
* LinePushメッセージ送信

### 利用環境/再現手順
* Laravel6,php8系
* [LineDeveloperアカウント](https://developers.line.biz/ja/)にてラインチャンネルを事前に作成する必要があります。(チャンネルはlineメッセージAPIを利用する設定にすること)
* DBはgs_db.sqlをMySqlにインポートして下さい。テストデータが既に含まれているデータファルになりますのでSeederファイルの利用は不要です。
* テストデータの編集、流し込みも可能です。その際はSeederを利用して作成しておりますのでこちらを参照ください。

 
### 開発の苦労した点
Laravelを使用したLineミニアプリの作成事例の文献が中々見つからず、手探りでの作成になりました。本アプリの作成を通じ、LineBotAPIとPushMesagingAPIの作成の流れを大まかに把握することができました。

