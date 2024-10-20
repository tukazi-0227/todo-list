# Todoリストを管理するアプリ
このアプリではタスクを日付ごとに追加でき、カレンダーを利用して分かりやすく管理できます。

## 概要
このアプリケーションは[Nuxt3](https://nuxt.com/)フレームワーク、[Prisma](https://www.prisma.io/)ORM、[SQLite](https://www.sqlite.org/)をデータベースに使用しています。
## 技術仕様
| 技術           | バージョン    |
| -------------- | ------------- |
| Node.js        | 22.8.0      |
| Yarn           | 1.22.22       |
| Prisma         | 5.20.0         |
| Nuxt.js        | 3.13.0         |
| better-sqlite3 | 11.4.0        |
## データベース設計
| Column           | Type    | Options |
| -------------- | ------------- | ------------- |
| id        | Int      | null:false, autoincrement |
| taskName  | String      | null:false |
| taskText | String?      | |
| deadlineDate | String      | null:false |
## 機能説明
| 機能    | 機能説明  |
| -------------- | ------------- |
| タスクの追加 | To Do横のボタンでタスクをタスク名、日付、詳細情報で追加できます。タスク名と日付は必須項目です。  |
| 追加したタスクの閲覧  | To Do画面で追加したタスクを閲覧できます。タスクの名前や日時、[詳細情報]をクリックすることで詳細情報を表示できます。  |
| 追加したタスクの編集 | To Do画面 [更新]ボタンで追加したタスクを更新できます。[更新]ボタンをクリックすることで更新できます。  |
| 追加したタスクの削除 | To Do画面 [完了]ボタンで追加したタスクを削除できます。[完了]ボタンをクリックすることで更新できます。  |
| カレンダー| 本日の日付が緑、タスクのある日が青で表示されます。  |
| カレンダーでのタスク閲覧  | 指定した日付をクリックすることでタスクエリアにその日のタスクが表示されます。  |
| カレンダーでの詳細閲覧  | タスクエリアのタスクがツールチップとなっており、タスクの詳細情報を確認できます。  |
## Setup
このプロジェクトでは[yarn](https://yarnpkg.com/)を使用して依存関係を管理しています。以下の手順でセットアップを行ってください。

**リポジトリをクローン**

```bash
git clone https://github.com/tukazi-0227/todo-list.git
```

**依存関係をインストール**
```bash
yarn install
```

**Prismaのセットアップとマイグレーションの実行**
```bash
npx prisma migrate dev --name init
```
このコマンドにより、初期マイグレーションが適用され、task.dbという名前のデータベースが作成されます。

**環境構築**
```bash
# npm
npm run dev

# yarn
yarn dev
```
