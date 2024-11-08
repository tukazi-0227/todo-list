# Todoリストを管理するアプリ
このアプリではタスクを日付ごとに追加でき、カレンダーを利用して分かりやすく管理できます。
**[Todoアプリ(URL)](https://todo-list-rho-opal.vercel.app/)**

## 概要
このアプリケーションは[Nuxt3、Nitro](https://nuxt.com/)フレームワーク、言語としてはフロント、バックエンド共に[Typescript](https://www.typescriptlang.org/)を使用しています。[Firebase](https://firebase.google.com/?hl=ja)フレームワークの[Firestore](https://firebase.google.com/docs/firestore?hl=ja)をデータベースに、認証機能として[Firebase Authentication](https://firebase.google.com/docs/auth?hl=ja)使用しています。
## 技術仕様
| 技術           | バージョン    |
| -------------- | ------------- |
| Nuxt.js        | 3.13.0         |
| Node.js        | 20.14.0      |
| Yarn           | 1.22.22       |

## データベース設計
| Collection           | Doc    | Collection | Doc |
| -------------- | ------------- | ------------- | ------------- |
| users        | userId      | toDo | field |
### フィールド設計
| Collection           | field    | type |
| -------------- | ------------- | ------------- |
| users  | userId      | string |
| toDo  | taskName      | string |
| toDo | taskText     | string |
| toDo | deadlineDate      | Date |
## 機能説明
| 機能    | 場所 | 機能説明  |
| -------------- | ------------- | ------------- |
| アカウント新規登録 | ログイン画面| アカウント登録ができ、ユーザーごとにデータを扱えます  |
| アカウントログイン | ログイン画面| アカウントログインができ、ユーザーごとにデータを扱えます  |
| タスクの追加 | To Do横のボタン| タスクをタスク名、日付、詳細情報で追加できます。タスク名と日付は必須項目です。  |
| 追加したタスクの閲覧  | To Do画面| 追加したタスクを閲覧できます。タスクの名前や日時、[詳細情報]をクリックすることで詳細情報を表示できます。  |
| 追加したタスクの編集 | To Do画面 [更新]ボタン| 追加したタスクを更新できます。[更新]ボタンをクリックすることで更新できます。  |
| 追加したタスクの削除 | To Do画面 [完了]ボタン| 追加したタスクを削除できます。[完了]ボタンをクリックすることで更新できます。  |
| カレンダー| 画面右 |本日の日付が緑、タスクのある日が青で表示されます。  |
| カレンダーでのタスク閲覧  | カレンダーの日付クリック| 指定した日付をクリックすることでタスクエリアにその日のタスクが表示されます。  |
| カレンダーでの詳細閲覧  | カレンダーエリアのタスク| タスク名がツールチップとなっており、タスクの詳細情報を確認できます。  |
## Setup
このプロジェクトでは[yarn](https://yarnpkg.com/)を使用して依存関係を管理しています。以下の手順でセットアップを行ってください。
また、Firebaseと連携する必要があります。

**リポジトリをクローン**

```bash
git clone https://github.com/tukazi-0227/todo-list.git
```

**依存関係をインストール**
```bash
yarn install
```

**環境構築**
```bash
# npm
npm run dev

# yarn
yarn dev
```
