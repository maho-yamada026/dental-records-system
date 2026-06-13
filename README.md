# 歯科カルテシステム

矯正歯科患者の診療履歴を一元管理するWebアプリケーション。

## 技術スタック

- **フロントエンド/バックエンド**: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- **DB**: PostgreSQL 16
- **ORM**: Prisma
- **パッケージマネージャ**: pnpm

## セットアップ手順

### 前提条件

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env
```

`.env` を必要に応じて編集する。

### 3. DBの起動

```bash
docker-compose up -d
```

### 4. マイグレーション実行

```bash
pnpm db:migrate
```

### 5. シードデータ投入（任意）

```bash
pnpm db:seed
```

### 6. 開発サーバー起動

```bash
pnpm dev
```

`http://localhost:3000` でアクセス可能。

## 便利なコマンド

| コマンド | 説明 |
|---|---|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | 本番ビルド |
| `pnpm lint` | ESLintチェック |
| `pnpm format` | Prettier整形 |
| `pnpm db:migrate` | マイグレーション実行 |
| `pnpm db:studio` | Prisma Studio起動 |
| `pnpm db:seed` | シードデータ投入 |
| `docker-compose up -d` | DB起動 |
| `docker-compose down` | DB停止 |
