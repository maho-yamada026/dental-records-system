# TICKET-004: 患者情報インポートAPI

## 概要
患者情報CSVをアップロードし、DBに取り込むAPIエンドポイントを実装する。

## エンドポイント
```
POST /api/import/patients
Content-Type: multipart/form-data
Body: file (CSV), clinic_id (UUID)
```

## レスポンス例
```json
{
  "import_log_id": "uuid",
  "total_rows": 320,
  "success_rows": 318,
  "error_rows": 2,
  "errors": [
    { "row": 45, "message": "患者IDが空です" },
    { "row": 102, "message": "生年月日の形式が不正です" }
  ]
}
```

## 処理フロー
1. CSVファイル受け取り（multipart）
2. TICKET-003 のパーサーでパース・バリデーション
3. 既存患者（patient_code一致）はUPSERT、新規はINSERT
4. import_logsテーブルに結果を記録
5. レスポンス返却

## タスク
- [ ] `/api/import/patients` エンドポイント実装
- [ ] ファイルアップロード処理（`formidable` または Next.js built-in）
- [ ] UPSERT処理（patient_code をキーに重複排除）
- [ ] import_logsへの記録
- [ ] エラーハンドリング（ファイル未選択、形式不正など）
- [ ] APIテスト作成

## 完了条件
- 正常なCSVをPOSTするとDBに患者データが登録される
- 同じpatient_codeで再インポートしても重複しない
- エラー行があっても正常行は登録され、エラー内容がレスポンスに含まれる
