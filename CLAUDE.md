# CLAUDE.md — 歯科カルテシステム

## 作業開始時の必須手順

新しい作業を開始する前に、必ず以下の順で現状を把握すること。

1. `docs/project-context.md` — 現在の進捗・実装済み機能・次チケット
2. `docs/architecture.md` — システム構成・DB設計・設計判断
3. 最新の `docs/handover-ticketXX.md` — 直前チケットの引き継ぎ事項

---

## プロジェクト概要

矯正歯科クリニック向けの患者カルテ管理Webアプリ。
CSVインポート・患者検索・診療履歴表示が主要機能。

**リポジトリ**: https://github.com/maho-yamada026/dental-records-system

---

## 技術スタック

| 区分 | 技術 |
|---|---|
| フロントエンド/バックエンド | Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 |
| DB | PostgreSQL 16 |
| ORM | Prisma 6 |
| パッケージ管理 | pnpm 11 |
| コンテナ | Docker (docker-compose) |

---

## 開発コマンド

```bash
pnpm dev                                    # 開発サーバー起動
docker compose -p dental-records up -d      # DB起動 ※プロジェクト名の明示が必須
pnpm db:migrate                             # Prismaマイグレーション実行
pnpm db:studio                              # Prisma Studio起動
pnpm db:seed                                # シードデータ投入
pnpm lint                                   # ESLintチェック
pnpm format                                 # Prettier整形
```

> **注意**: フォルダ名に日本語が含まれるため `docker compose up -d` は失敗する。
> 必ず `-p dental-records` を付けること。

---

## チケット完了後の必須手順

以下が完了するまで次チケットへ進まないこと。

### 1. 実装レビュー

以下の観点で確認すること。

- チケット要件を満たしているか
- 既存実装との整合性があるか
- DB設計・API設計・UI設計に問題がないか
- セキュリティ上の問題がないか
- lint・型チェック・ビルドが成功するか
- 将来的な拡張を妨げる設計になっていないか

### 2. ハンドオーバー作成

`docs/handover-ticketXX.md` を作成すること（XX はゼロ埋め2桁）。

記載内容:

- チケット概要
- 実装内容
- 変更ファイル一覧
- 動作確認結果
- レビュー結果
- 未解決事項
- 次チケットへの引き継ぎ事項

### 3. project-context.md 更新

`docs/project-context.md` を最新状態に更新すること。
このファイルは「現在のプロジェクト全体像」の唯一の情報源。

最低限以下を維持すること:

- プロジェクト概要
- 技術スタック
- 現在のディレクトリ構成
- DBモデル一覧
- API一覧
- 実装済み機能
- 未実装機能
- 現在の進捗状況
- 次に実施するチケット

### 4. architecture.md 更新（必要時）

DB構造・API構造・アーキテクチャに変更があった場合のみ `docs/architecture.md` を更新すること。

### 5. Gitコミット

上記が全て完了したらコミットすること。

---

## docs/ ファイルが存在しない場合

`docs/project-context.md` または `docs/architecture.md` が存在しない場合は、
コードベースと git ログから現状を読み取り、初期作成してからチケット作業を開始すること。

---

## 重要な設計・運用メモ

- **patient_code**: 外部システム（Apotool & Box）の患者IDを保持するフィールド。内部UUIDと分離されている
- **clinic_id を各テーブルに持つ**: マルチクリニック対応を前提とした設計
- **pnpm 11 のビルドスクリプト**: `pnpm-workspace.yaml` の `allowBuilds` で許可設定済み（`pnpm.yaml` では効かない）
- **TICKET-002 のスキーマは TICKET-001 で先行実装済み**: `prisma/schema.prisma` にDB全テーブルが定義されている
