# Zaico在庫確認アプリ

受注伝票PDFから品番と数量を自動で読み取り、Zaico APIで在庫を確認するWebアプリケーションです。

## 機能

- ✅ PDFから品番・数量を自動認識
- ✅ 手動入力にも対応
- ✅ Zaico APIで在庫数・更新日を取得
- ✅ 不足分をハイライト表示
- ✅ Excel形式でダウンロード可能
- ✅ APIトークンの自動保存

## ローカルで実行

### 必要なもの
- Node.js (v14以上)

### インストール

```bash
# 依存パッケージをインストール
npm install

# サーバーを起動
npm start
```

ブラウザで http://localhost:3000 にアクセス

## デプロイ

### Renderでデプロイ（推奨・無料）

1. https://render.com にアクセスしてアカウント作成
2. 「New +」→「Web Service」を選択
3. GitHubリポジトリを接続、または「Public Git repository」で直接URLを指定
4. 以下の設定：
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. 「Create Web Service」をクリック

数分でデプロイ完了し、URLが発行されます。

### 他のデプロイオプション

- **Railway**: https://railway.app
- **Vercel**: https://vercel.com
- **Heroku**: https://heroku.com

## 使い方

1. Zaico APIトークンを入力
2. 受注伝票PDFをアップロード（または手動入力）
3. 「在庫確認」ボタンをクリック
4. 結果を確認、必要に応じてExcelダウンロード

## 技術スタック

- **フロントエンド**: HTML, CSS, JavaScript
- **バックエンド**: Node.js, Express
- **PDF処理**: PDF.js
- **Excel出力**: SheetJS

## ライセンス

MIT
