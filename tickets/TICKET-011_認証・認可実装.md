# TICKET-011: 認証・認可実装

## 概要
医療データを扱うシステムのため、ログイン認証と権限管理を実装する。

## 要件
- ログイン: メールアドレス + パスワード認証
- セッション管理: JWT（HttpOnly Cookie）
- ロール: `admin`（管理者）/ `doctor`（ドクター） / `staff`（スタッフ）

## 権限マトリクス
| 機能 | admin | doctor | staff |
|---|---|---|---|
| CSVインポート | ○ | × | ○ |
| 患者検索・閲覧 | ○ | ○ | ○ |
| 診療履歴閲覧 | ○ | ○ | ○ |
| ユーザー管理 | ○ | × | × |
| 医院管理 | ○ | × | × |

## 技術選定
- `next-auth` v5（または `jose` で自前JWT）
- パスワードハッシュ: `bcryptjs`

## テーブル追加
```
users
- id (UUID)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- role (ENUM: admin, doctor, staff)
- clinic_id (UUID, FK) ← staff/doctorは所属医院に制限
- created_at
```

## タスク
- [ ] `users` テーブル追加・マイグレーション
- [ ] 認証API実装（`POST /api/auth/login`, `POST /api/auth/logout`）
- [ ] JWTセッション管理（HttpOnly Cookie）
- [ ] ミドルウェア実装（未認証→ログイン画面リダイレクト）
- [ ] ロールベースアクセス制御（RBAC）ミドルウェア
- [ ] ログイン画面 `/login` 実装
- [ ] 初期adminユーザーシード

## 完了条件
- 未ログインでアクセスするとログイン画面にリダイレクトされる
- ロールに応じてアクセスできるページが制限される
- セッションはブラウザを閉じても30日間維持される
