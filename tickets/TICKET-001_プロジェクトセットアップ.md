# TICKET-001: プロジェクトセットアップ・開発環境構築

## 概要
リポジトリを作成し、フロントエンド・バックエンドの開発環境を整備する。

## 技術スタック
- **フロントエンド**: Next.js (App Router) + TypeScript + Tailwind CSS
- **バックエンド**: Next.js API Routes（または Node.js + Express）
- **DB**: PostgreSQL
- **ORM**: Prisma
- **パッケージマネージャ**: pnpm

## タスク
- [ ] GitHubリポジトリ作成
- [ ] Next.js プロジェクト初期化（TypeScript + Tailwind CSS）
- [ ] Prisma セットアップ・PostgreSQL接続設定
- [ ] `.env.example` 作成（DB接続情報、環境変数一覧）
- [ ] ESLint / Prettier 設定
- [ ] README.md 作成（セットアップ手順を記載）
- [ ] Dockerfileおよびdocker-compose.yml作成（PostgreSQL含む）

## 完了条件
- `docker-compose up` でDBが起動する
- `pnpm dev` でNext.jsが起動しトップページが表示される
- Prisma Studio でDBに接続できる
