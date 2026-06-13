# プロジェクト全体コンテキスト

> このファイルだけ読めば現在の状態が理解できることを目的とする。チケット完了ごとに更新すること。

最終更新: TICKET-001完了時点

---

## プロジェクト概要

矯正歯科クリニック向けの患者カルテ管理Webアプリケーション。
Apotool & Box からエクスポートしたCSVデータをインポートし、患者・診療履歴・予約情報を一元管理する。

---

## 技術スタック

| 区分 | 技術 |
|---|---|
| フロントエンド | Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 |
| バックエンド | Next.js API Routes |
| DB | PostgreSQL 16 |
| ORM | Prisma 6 |
| パッケージ管理 | pnpm 11 |
| コンテナ | Docker (docker-compose) |
| リポジトリ | https://github.com/maho-yamada026/dental-records-system |

---

## 現在のディレクトリ構成

```
歯科カルテ/
├── docs/                          # ドキュメント
│   ├── project-context.md         # 本ファイル
│   ├── architecture.md            # アーキテクチャ設計
│   └── handover-ticket01.md       # TICKET-001 ハンドオーバー
├── fixtures/                      # サンプルCSVデータ
│   ├── patients_sample.csv
│   ├── treatments_sample.csv
│   └── appointments_sample.csv
├── prisma/
│   ├── schema.prisma              # DBスキーマ定義
│   ├── seed.ts                    # シードスクリプト
│   └── migrations/
│       └── 20260613041030_init/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx               # トップページ（仮）
│       └── globals.css
├── tickets/                       # チケット定義
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
└── pnpm-workspace.yaml
```

---

## DBモデル一覧

| モデル | テーブル名 | 概要 |
|---|---|---|
| Clinic | clinics | 医院マスタ |
| Patient | patients | 患者情報 |
| TreatmentRecord | treatment_records | 診療履歴 |
| Appointment | appointments | 予約情報 |
| ImportLog | import_logs | CSVインポート履歴 |

### リレーション
- Patient → Clinic (many-to-one)
- TreatmentRecord → Patient, Clinic (many-to-one)
- Appointment → Patient, Clinic (many-to-one)

---

## API一覧

| メソッド | パス | 概要 | 実装済み |
|---|---|---|---|
| POST | /api/import/patients | 患者CSVインポート | ❌ |
| POST | /api/import/treatments | 診療CSVインポート | ❌ |
| POST | /api/import/appointments | 予約CSVインポート | ❌ |
| GET | /api/patients | 患者検索 | ❌ |
| GET | /api/patients/[id]/treatments | 診療履歴取得 | ❌ |

---

## 実装済み機能

- [x] Next.js プロジェクトセットアップ（App Router + TypeScript + Tailwind CSS v4）
- [x] Prisma + PostgreSQL 接続設定
- [x] DBスキーマ定義・初回マイグレーション
- [x] Docker環境（PostgreSQL 16）
- [x] ESLint / Prettier 設定
- [x] シードデータ投入（医院2件）

---

## 未実装機能

- [ ] CSVパーサー・バリデーション（TICKET-003）
- [ ] 患者情報インポートAPI（TICKET-004）
- [ ] 診療・予約情報インポートAPI（TICKET-005）
- [ ] CSVインポート画面UI（TICKET-006）
- [ ] 患者検索API（TICKET-007）
- [ ] 診療履歴取得API（TICKET-008）
- [ ] 患者検索画面UI（TICKET-009）
- [ ] 診療履歴表示画面UI（TICKET-010）
- [ ] 認証・認可実装（TICKET-011）
- [ ] テスト実装（TICKET-012）
- [ ] デプロイ・インフラ設定（TICKET-013）

---

## 現在の進捗状況

| チケット | タイトル | 状態 |
|---|---|---|
| TICKET-001 | プロジェクトセットアップ | ✅ 完了 |
| TICKET-002 | DB設計・マイグレーション | ⚠️ スキーマ実装済み・シード投入済み（詳細確認要） |
| TICKET-003〜013 | 各機能実装 | ❌ 未着手 |

---

## 次に実施するチケット

**TICKET-002: DB設計・マイグレーション**

TICKET-001でスキーマ・マイグレーション・シードはすでに実装済み。
以下を確認・完了させること:
- Prismaスキーマの内容がチケット要件と完全に一致しているか確認
- インデックス設計の確認
- `prisma db seed` で全シードデータが正常投入されるか確認
- Prisma Studio で全テーブル確認

---

## 開発コマンド早引き

```bash
pnpm dev                                    # 開発サーバー起動
docker compose -p dental-records up -d      # DB起動（※プロジェクト名必須）
pnpm db:migrate                             # マイグレーション実行
pnpm db:studio                              # Prisma Studio起動
pnpm db:seed                               # シードデータ投入
pnpm lint                                   # ESLintチェック
```
