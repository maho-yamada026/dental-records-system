# アーキテクチャ設計

最終更新: TICKET-001完了時点

---

## システム構成

```
ブラウザ
  │
  ▼
Next.js 15 (App Router)
  ├── フロントエンド: React Server Components / Client Components
  └── バックエンド:   Route Handlers (API Routes)
          │
          ▼
      Prisma ORM
          │
          ▼
      PostgreSQL 16 (Docker)
```

---

## DBリレーション

```
clinics
  │
  ├── patients (clinic_id → clinics.id)
  │     │
  │     ├── treatment_records (patient_id → patients.id, clinic_id → clinics.id)
  │     └── appointments      (patient_id → patients.id, clinic_id → clinics.id)
  │
  └── （treatment_records, appointments も直接 clinic_id を持つ）

import_logs（独立テーブル・外部キーなし）
```

---

## API構成

Next.js App RouterのRoute Handlersを使用（`src/app/api/` 以下）。
RESTful設計を採用。

```
src/app/api/
├── import/
│   ├── patients/route.ts       # POST: 患者CSVインポート
│   ├── treatments/route.ts     # POST: 診療CSVインポート
│   └── appointments/route.ts  # POST: 予約CSVインポート
├── patients/
│   ├── route.ts                # GET: 患者検索
│   └── [id]/
│       └── treatments/route.ts # GET: 診療履歴取得
```

---

## 設計方針

### フロントエンド
- **App Router採用**: Server ComponentsによるSSRを基本とし、インタラクティブな部分のみClient Componentsを使用
- **Tailwind CSS v4**: ユーティリティファーストでスタイリング

### バックエンド
- **APIはRoute Handlers**: Next.js内でAPIを完結させ、別サーバーを立てない
- **Prismaによる型安全なDB操作**: 生SQLを避け、型推論を最大活用

### DB設計
- **UUIDを主キー**に採用（将来的な分散・外部連携を考慮）
- **patient_code**: 外部システム（Apotool & Box）の患者IDを別フィールドで保持し、内部IDと分離
- **clinic_id を各テーブルに持つ**: マルチクリニック対応を最初から設計に組み込む
- **source フィールド**: `csv_import` / `manual` でデータの来歴を管理
- **import_logs**: CSVインポートの成否・エラー詳細を記録し、運用時のトラブルシュートを容易に

### インデックス設計
- `patients.patient_code`: 外部システムIDによる検索
- `patients.clinic_id`: 医院別絞り込み
- `treatment_records.patient_id`, `clinic_id`, `treatment_date`: 診療履歴検索の主要条件

---

## 採用技術の理由

| 技術 | 理由 |
|---|---|
| Next.js 15 App Router | フロント・バックを一体で管理でき、小規模チームに適合 |
| Prisma | TypeScript型安全・マイグレーション管理・Studio付属で開発効率が高い |
| PostgreSQL | JSONBサポート（import_logs.error_detail）・信頼性 |
| Tailwind CSS v4 | 設定レスでPostCSS経由の軽量セットアップが可能 |
| pnpm | 高速・ディスク効率・厳格な依存解決 |

---

## 重要な設計判断

1. **フォルダ名の日本語対応**: Docker・create-next-appがプロジェクト名に日本語を使えないため、Dockerは `-p dental-records` で明示指定。Next.jsは手動セットアップ。

2. **TICKET-002のスキーマをTICKET-001で先行実装**: セットアップ時にDB全体像が明確だったため、スキーマ定義・マイグレーションをまとめて実施。TICKET-002はレビュー・シード確認が主タスクとなる。

3. **pnpm 11のビルドスクリプトポリシー**: `pnpm-workspace.yaml` の `allowBuilds` でprisma/esbuild等を明示許可。`pnpm.yaml` では効かないことを確認済み。
