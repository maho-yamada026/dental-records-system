# TICKET-007: 患者検索API

## 概要
患者ID・医院・治療部位などの条件で患者を検索するAPIを実装する。

## エンドポイント

### 患者一覧検索
```
GET /api/patients?patient_code=&clinic_id=&name=&page=&limit=
```
レスポンス例:
```json
{
  "total": 45,
  "page": 1,
  "data": [
    {
      "id": "uuid",
      "patient_code": "P-0123",
      "name": "山田 太郎",
      "name_kana": "ヤマダ タロウ",
      "birth_date": "1990-04-01",
      "clinic": { "id": "uuid", "name": "○○歯科クリニック" },
      "latest_treatment_date": "2026-05-20"
    }
  ]
}
```

### 患者詳細取得
```
GET /api/patients/:id
```

### 治療部位別検索
```
GET /api/patients?tooth_area=上顎左側犬歯&clinic_id=
```

## タスク
- [ ] 患者一覧検索エンドポイント実装
  - patient_code（前方一致）
  - 氏名・カナ（部分一致）
  - 医院絞り込み
  - 治療部位絞り込み（treatment_recordsとJOIN）
  - ページネーション対応
- [ ] 患者詳細エンドポイント実装
- [ ] Prismaクエリ最適化（N+1回避）
- [ ] APIテスト作成

## 完了条件
- 各検索条件で正しく絞り込みができる
- 200件以上の患者データで100ms以内にレスポンスを返せる
