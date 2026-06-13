# TICKET-005: 診療・予約情報インポートAPI

## 概要
診療履歴・予約情報CSVをアップロードし、DBに取り込むAPIエンドポイントを実装する。

## エンドポイント
```
POST /api/import/treatments
POST /api/import/appointments
Content-Type: multipart/form-data
Body: file (CSV), clinic_id (UUID)
```

## 処理フロー
1. CSVファイル受け取り
2. TICKET-003 のパーサーでパース・バリデーション
3. patient_code でpatientsテーブルを参照し、patient_idを解決
4. 紐付け不可の行はエラーとして記録（患者が未インポートの場合）
5. treatment_records / appointments にINSERT（重複チェックあり）
6. import_logsに記録

## 重複チェックのキー
- treatment_records: `patient_id + treatment_date + tooth_area + treatment_type`
- appointments: `patient_id + appointment_datetime`

## タスク
- [ ] `/api/import/treatments` エンドポイント実装
- [ ] `/api/import/appointments` エンドポイント実装
- [ ] patient_code → patient_id の名前解決ロジック
- [ ] 重複チェック・UPSERT処理
- [ ] import_logsへの記録
- [ ] APIテスト作成

## 完了条件
- 診療・予約CSVをインポートして正しくDBに格納される
- 患者が未登録の行はスキップされエラーとして報告される
- 再インポートしても重複レコードが生じない
