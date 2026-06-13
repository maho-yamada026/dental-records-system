# TICKET-001 ハンドオーバー: プロジェクトセットアップ・開発環境構築

## チケット概要

リポジトリを作成し、フロントエンド・バックエンドの開発環境を整備する。

## 実装内容

### Next.js プロジェクト初期化
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 をセットアップ
- `src/app/` 配下にlayout.tsx・page.tsx・globals.cssを作成
- `create-next-app` はフォルダ名の日本語制約でエラーになるため、手動でファイルを作成

### Prisma セットアップ
- `prisma/schema.prisma` にDB全テーブル定義（TICKET-002の設計を先行して組み込み）
- 初回マイグレーション実行済み（`20260613041030_init`）
- シードデータ投入済み（医院2件: 南歯科クリニック・北矯正歯科）

### Docker環境
- `docker-compose.yml`: PostgreSQL 16-alpine
- コンテナ名: `dental_records_db`、ポート: 5432
- **注意**: フォルダ名の日本語問題により、起動コマンドは `docker compose -p dental-records up -d` を使用すること

### ESLint / Prettier
- `eslint.config.mjs`: next/core-web-vitals + next/typescript
- `.prettierrc`: prettier-plugin-tailwindcss を含む設定

### pnpm設定
- pnpm 11のセキュリティポリシーにより、`pnpm-workspace.yaml` で `allowBuilds` を明示的に許可

## 変更ファイル一覧

```
.env.example
.gitignore
.prettierignore
.prettierrc
Dockerfile
README.md
docker-compose.yml
eslint.config.mjs
next.config.ts
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
postcss.config.mjs
prisma/schema.prisma
prisma/seed.ts
prisma/migrations/20260613041030_init/migration.sql
prisma/migrations/migration_lock.toml
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx
tsconfig.json
```

## 動作確認結果

| 確認項目 | 結果 |
|---|---|
| `docker compose -p dental-records up -d` でDB起動 | ✅ |
| `pnpm dev` でNext.js起動（http://localhost:3000） | ✅ (HTTP 200) |
| `pnpm db:studio` でPrisma Studio起動 | ✅ |
| `pnpm lint` | ✅ エラーなし |
| `pnpm db:seed` でシードデータ投入 | ✅ |

## レビュー結果

- **要件充足**: チケット記載の全タスクを完了
- **整合性**: TICKET-002のDB設計をschema.prismaに先行組み込み済みで整合性あり
- **設計**: スキーマはUUID主キー・外部キー・インデックス設計済み
- **セキュリティ**: `.env` は `.gitignore` で除外済み、秘密情報のコミットなし
- **lint/型/ビルド**: `pnpm lint` パス済み
- **拡張性**: App Router採用により今後のRoute Handler/Server Components対応が容易

## 未解決事項

- `prisma db seed` を直接呼ぶと tsx が PATH にないためエラー。`pnpm db:seed` 経由で実行すること（回避済み）
- Next.js 15.3.3 にセキュリティ脆弱性の警告あり（CVE-2025-66478）。パッチ版リリース後にアップグレード推奨

## 次チケットへの引き継ぎ事項

- TICKET-002（DB設計・マイグレーション）のスキーマはすでにschema.prismaに実装済みのため、マイグレーション・シード・インデックス確認が主タスクとなる
- 開発サーバー起動: `pnpm dev`
- DB起動: `docker compose -p dental-records up -d`
- Prisma Studio: `pnpm db:studio`
