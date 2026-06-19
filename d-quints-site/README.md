# d-quints-site

[D-quints 技術提言書 v1.0](../D-quints-overview-v1.0.md) を静的 Web ページとして公開するサイトです。

**本ディレクトリの Artefact（`src/`・`dist/`）は、`spec/site-overview.md` と `convention/coding-conventions.md` を SSOT として設計・生成された成果物です。** 提言書本文はリポジトリルートの `D-quints-overview-v1.0.md` からビルド時に注入します。

| 位置づけ | Phase 0 公開物（提言の読み物 + Spec 駆動の最小実例） |
|---|---|
| 検証 | Phase 1 以降（契約テスト自動化・Spec Lint 等はスコープ外） |

---

## ディレクトリ構成

```
d-quints-site/
├── spec/                 # SSOT — サイト設計仕様書
├── convention/           # 具象化コンパイラ規約
├── src/                  # テンプレート・アセット（Artefact 層 A）
├── scripts/build.js      # MD → HTML ビルド（Artefact 層 B）
├── dist/                 # ビルド出力（GitHub Pages デプロイ対象）
└── package.json
```

---

## ビルド

```bash
npm ci
npm run build
```

- **入力:** `../D-quints-overview-v1.0.md` + `src/index.html`
- **出力:** `dist/index.html` + `dist/assets/**`

ローカルプレビュー:

```bash
npm run preview
```

---

## GitHub Pages へのデプロイ

本番は **so-ken.org** を使用する。GitHub Pages は使わない。

| 項目 | 値 |
|---|---|
| **本番 URL** | https://so-ken.org/research/d-quints/ |
| **デプロイ先** | `so-ken.org` の `/research/d-quints/` |
| **手順** | `npm run build` → `dist/` の中身を FTP 等でアップロード |

---

## 変更の手順（D-quints 原則）

1. `spec/site-overview.md` または `convention/coding-conventions.md` を更新
2. 必要に応じて AI または人間が Artefact を再生成
3. `npm run build` で `dist/` を再生成
4. Artefact の直接編集は禁止（[Hotfix 例外](./convention/coding-conventions.md#9-hotfix-例外プロトコル) のみ）

---

## 関連リンク（GitHub 公開時）

| 文書 | パス |
|---|---|
| 技術提言書 | [`D-quints-overview-v1.0.md`](../D-quints-overview-v1.0.md) |
| サイト Spec | [`spec/site-overview.md`](./spec/site-overview.md) |
| Convention | [`convention/coding-conventions.md`](./convention/coding-conventions.md) |

リポジトリ URL（想定）: https://github.com/so-ken-org/d-quints
