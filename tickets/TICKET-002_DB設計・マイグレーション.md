# TICKET-002: DB設計・マイグレーション

## 概要
矯正歯科患者の診療履歴を管理するためのデータベーススキーマを設計し、Prismaマイグレーションを実装する。

## 主要テーブル設計

### patients（患者）
| カラム | 型 | 説明 |
|---|---|---|
| id | UUID | PK |
| patient_code | VARCHAR | 患者ID（外部システム連携用） |
| name | VARCHAR | 氏名 |
| name_kana | VARCHAR | 氏名（カナ） |
| birth_date | DATE | 生年月日 |
| clinic_id | UUID | FK → clinics |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### clinics（医院）
| カラム | 型 | 説明 |
|---|---|---|
| id | UUID | PK |
| name | VARCHAR | 医院名 |
| created_at | TIMESTAMP | |

### treatment_records（診療履歴）
| カラム | 型 | 説明 |
|---|---|---|
| id | UUID | PK |
| patient_id | UUID | FK → patients |
| clinic_id | UUID | FK → clinics |
| treatment_date | DATE | 診療日 |
| tooth_area | VARCHAR | 治療部位（例: 上顎左側犬歯） |
| treatment_type | VARCHAR | 処置内容 |
| doctor_note | TEXT | ドクターメモ |
| source | VARCHAR | データソース（csv_import / manual） |
| created_at | TIMESTAMP | |

### appointments（予約）
| カラム | 型 | 説明 |
|---|---|---|
| id | UUID | PK |
| patient_id | UUID | FK → patients |
| clinic_id | UUID | FK → clinics |
| appointment_datetime | TIMESTAMP | 予約日時 |
| status | VARCHAR | 状態（scheduled / completed / cancelled） |
| source | VARCHAR | データソース |
| created_at | TIMESTAMP | |

### import_logs（インポート履歴）
| カラム | 型 | 説明 |
|---|---|---|
| id | UUID | PK |
| file_name | VARCHAR | インポートしたファイル名 |
| import_type | VARCHAR | patient / appointment |
| total_rows | INT | 総行数 |
| success_rows | INT | 成功件数 |
| error_rows | INT | エラー件数 |
| error_detail | JSONB | エラー詳細 |
| imported_at | TIMESTAMP | |

## タスク
- [ ] Prisma schema.prisma に上記テーブルを定義
- [ ] 初回マイグレーション実行（`prisma migrate dev`）
- [ ] シードデータ作成（開発用ダミー患者・医院データ）
- [ ] インデックス設計（patient_code, clinic_id, treatment_date）

## 完了条件
- `prisma migrate dev` が正常に完了する
- `prisma db seed` でダミーデータが投入される
- 全テーブルが Prisma Studio で確認できる
