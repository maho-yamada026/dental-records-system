# TICKET-008: 診療履歴取得API

## 概要
患者ごとの診療履歴を時系列で取得するAPIを実装する。

## エンドポイント

### 診療履歴一覧（時系列）
```
GET /api/patients/:id/treatments?from=&to=&tooth_area=
```
レスポンス例:
```json
{
  "patient_id": "uuid",
  "treatments": [
    {
      "id": "uuid",
      "treatment_date": "2026-05-20",
      "tooth_area": "上顎左側犬歯",
      "treatment_type": "ワイヤー調整",
      "doctor_note": "0.016 NiTi に変更",
      "clinic": { "id": "uuid", "name": "○○歯科クリニック" }
    }
  ]
}
```

### 予約履歴一覧
```
GET /api/patients/:id/appointments?from=&to=&status=
```

### 治療部位サマリ（治療部位ごとの直近処置）
```
GET /api/patients/:id/tooth-summary
```
レスポンス例:
```json
{
  "patient_id": "uuid",
  "tooth_summary": [
    {
      "tooth_area": "上顎左側犬歯",
      "treatment_count": 8,
      "latest_date": "2026-05-20",
      "latest_type": "ワイヤー調整"
    }
  ]
}
```

## タスク
- [ ] 診療履歴一覧エンドポイント実装（日付範囲・部位フィルタ対応）
- [ ] 予約履歴一覧エンドポイント実装
- [ ] 治療部位サマリエンドポイント実装
- [ ] 時系列ソート（treatment_date DESC）
- [ ] Prismaクエリ最適化
- [ ] APIテスト作成

## 完了条件
- 指定患者の全診療履歴を時系列で取得できる
- 治療部位・期間で絞り込みができる
- 治療部位ごとのサマリを取得できる
