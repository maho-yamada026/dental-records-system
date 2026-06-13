# TICKET-012: テスト実装

## 概要
主要機能のテストを実装し、リグレッションを防ぐ。

## テスト方針
- **ユニットテスト**: CSVパーサー・バリデーションロジック
- **APIテスト（統合テスト）**: 各エンドポイントをテスト用DBに対して実行
- **E2Eテスト**: 主要ユーザーシナリオをPlaywrightで確認

## ユニットテスト対象（vitest）
- CSVパーサー（TICKET-003）
  - 正常系・異常系・文字コード
- バリデーションロジック
- UPSERTの重複排除ロジック

## APIテスト対象（vitest + supertest）
- `POST /api/import/patients` — 正常・エラー行混在・重複
- `POST /api/import/treatments`
- `GET /api/patients` — 各検索条件の組み合わせ
- `GET /api/patients/:id/treatments` — 日付・部位フィルタ
- 認証なしアクセス → 401

## E2Eテスト対象（Playwright）
1. ログイン → 患者検索 → 詳細閲覧 シナリオ
2. CSVインポート → 結果確認 シナリオ

## タスク
- [ ] vitest セットアップ（テスト用DB設定）
- [ ] CSVパーサーのユニットテスト
- [ ] 患者インポートAPIのテスト
- [ ] 患者検索APIのテスト
- [ ] 診療履歴APIのテスト
- [ ] Playwright セットアップ
- [ ] E2Eシナリオ2本実装
- [ ] CI（GitHub Actions）へのテスト組み込み

## 完了条件
- `pnpm test` でユニット・APIテストが全てパスする
- E2E 2シナリオが正常に完了する
- CIでPush時に自動テストが走る
