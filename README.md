# D-quints

**D-quints 概論 — 仕様駆動生成モデルによる AI 時代のソフトウェア開発構造再定義**

| 項目 | 内容 |
|---|---|
| **著者** | 村田 純一 / [一般社団法人 創研](https://so-ken.org) |
| **文書** | [技術提言書 v1.0](./D-quints-overview-v1.0.md) |
| **公開サイト** | **https://so-ken.org/research/d-quints/** |
| **ソース** | [d-quints-site](./d-quints-site/)（本リポジトリ） |
| **ライセンス** | © 2026 村田 純一 / 一般社団法人 創研. All rights reserved. |

---

## このリポジトリについて

本リポジトリは **D-quints 技術提言書 v1.0（Phase 0）** を GitHub 上で公開するためのものです。

| パス | 内容 | 役割 |
|---|---|---|
| [`D-quints-overview-v1.0.md`](./D-quints-overview-v1.0.md) | 技術提言書本文 | コンテンツの SSOT |
| [`d-quints-site/spec/`](./d-quints-site/spec/) | サイト設計仕様書 | レイアウト・UX の SSOT |
| [`d-quints-site/convention/`](./d-quints-site/convention/) | 具象化コンパイラ規約 | 実装制約 |
| [`d-quints-site/src/`](./d-quints-site/src/) ・ [`dist/`](./d-quints-site/dist/) | HTML / CSS / JS | **Artefact（生成物）** |

### Spec と規約を SSOT とした生成物

**`d-quints-site/` 配下の Artefact は、`spec/site-overview.md` と `convention/coding-conventions.md` を Single Source of Truth（SSOT）として設計・生成された成果物です。** 提言書本文は `D-quints-overview-v1.0.md` からビルド時に HTML へ注入します。

| 含むもの | 含まないもの（Phase 0 のスコープ外） |
|---|---|
| Spec 駆動の静的サイト | Phase 1 PoC（注文 BC 等） |
| 提言書の Web 公開 | 契約テストの自動化 |
| DocID / `@spec` によるトレーサビリティ | Tier 1 Spec Lint パイプライン |
| `npm run build` による再生成 | 定量検証（H1〜H6） |

> **Spec is source. AI is compiler.**  
> 本リポジトリは提言の **読み物と最小実例** です。検証は [提言書 §11](./D-quints-overview-v1.0.md#11-検証方針と今後のロードマップ) のロードマップ（Phase 1 以降）で行う前提です。

---

## GitHub 公開

### リポジトリ URL（想定）

```
https://github.com/so-ken-org/d-quints
```

組織名・リポジトリ名は公開時に合わせて更新してください。

### 公開 URL

| 項目 | URL |
|---|---|
| **公式サイト（本番）** | **https://so-ken.org/research/d-quints/** |
| **ソース・提言書 MD** | https://github.com/so-ken-org/d-quints |

ビルド成果物 `d-quints-site/dist/` を `so-ken.org` の `/research/d-quints/` に配置する。

| 項目 | 値 |
|---|---|
| **GitHub リポジトリ** | `https://github.com/so-ken-org/d-quints` |
| **ベースパス** | `/research/d-quints/` |
| **canonical** | `https://so-ken.org/research/d-quints/` |

### 主要リンク（GitHub 上）

| リンク | URL |
|---|---|
| 提言書（Markdown） | `https://github.com/so-ken-org/d-quints/blob/main/D-quints-overview-v1.0.md` |
| サイト Spec | `https://github.com/so-ken-org/d-quints/tree/main/d-quints-site/spec` |
| Convention | `https://github.com/so-ken-org/d-quints/tree/main/d-quints-site/convention` |

---

## クイックスタート

```bash
cd d-quints-site
npm ci
npm run build
npm run preview
```

ブラウザで `http://localhost:3000`（`serve` のポートは環境により異なります）を開き、提言書が表示されることを確認してください。

---

## 改訂・貢献

- 提言書本文の変更: `D-quints-overview-v1.0.md` を編集 → `d-quints-site` で再ビルド
- サイトの変更: **Artefact を直接編集せず** `spec/` または `convention/` を更新してから再生成
- 緊急修正: [Hotfix 例外プロトコル](./d-quints-site/convention/coding-conventions.md#9-hotfix-例外プロトコル) に従う

---

## ライセンス

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ja) — © 2026 村田 純一 / [一般社団法人 創研](https://so-ken.org)

---

## 連絡先

- **メール:** info@so-ken.org
- **Web:** https://so-ken.org
