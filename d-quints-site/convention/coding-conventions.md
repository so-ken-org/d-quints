---
version: "1.0"
meta:
  extends: d-quints-universal
  project: d-quints-site
  spec: spec/site-overview.md
---

# d-quints-site コーディング規約（具象化コンパイラ規約）

本書は `spec/site-overview.md` を実装するための **具象化コンパイラ規約** である。D-quints 普遍規約（§5）に準拠し、静的 Web サイトプロジェクト向けに具体化する。

> **Spec is source. AI is compiler.**

---

## 1. 技術スタック

| 項目 | 指定値 | 備考 |
|---|---|---|
| **Markup** | HTML5 | セマンティック要素を優先 |
| **スタイル** | CSS3（カスタムプロパティ使用） | プリプロセッサ不使用 |
| **スクリプト** | ES2020+（バニラ JS） | フレームワーク・Transpiler 不使用 |
| **ビルド** | Node.js 20 LTS + 単一ビルドスクリプト | MD パースに `marked` 等の軽量ライブラリ可 |
| **パッケージマネージャ** | npm | `package-lock.json` をコミット |
| **Artefact 分類** | 層 A: HTML/CSS/JS。層 B: `package.json`, ビルド脚本 | 層 C: なし |

---

## 2. ファイル・ディレクトリ規約

### 2.1 命名

| 対象 | 規則 | 例 |
|---|---|---|
| **HTML ファイル** | kebab-case | `index.html`, `404.html` |
| **CSS ファイル** | kebab-case | `main.css`, `print.css` |
| **JS ファイル** | kebab-case | `main.js`, `toc.js` |
| **ディレクトリ** | kebab-case、複数形 | `assets/`, `scripts/`, `partials/` |
| **CSS クラス** | BEM 風 kebab-case | `site-header`, `toc__link--active` |
| **CSS カスタムプロパティ** | kebab-case、`--` プレフィックス | `--color-accent` |
| **JS 定数** | UPPER_SNAKE_CASE | `SCROLL_THRESHOLD_PX` |
| **JS 関数・変数** | camelCase | `updateActiveTocItem` |

### 2.2 禁止命名

以下の汎用名は使用禁止（D-quints 普遍規約 §5.1）:

`tmp`, `data`, `foo`, `bar`, `item`, `wrapper`（意味のあるドメイン語に置換すること）

### 2.3 ファイル配置

```
src/assets/css/   ← スタイルシートのみ
src/assets/js/    ← クライアント JS のみ
scripts/          ← ビルド脚本（Node.js）のみ
dist/             ← 生成物。Git 管理方針は §8 参照
```

---

## 3. HTML 規約

### 3.1 基本

- `<!DOCTYPE html>` + `<html lang="ja">` を必須とする
- 文字コード UTF-8（`<meta charset="UTF-8">`）
- viewport メタタグ必須
- 1 ファイル 1 DocID 原則: `index.html` 先頭に `<!-- @spec DOC-PUB-002,DOC-PUB-003,DOC-PUB-005 -->`

### 3.2 セマンティクス

| 用途 | 要素 |
|---|---|
| サイトヘッダー | `<header class="site-header">` |
| 目次 | `<nav aria-label="目次">` |
| 本文 | `<main id="content">` |
| 章 | `<section>` + 見出し |
| フッター | `<footer class="site-footer">` |

### 3.3 アクセシビリティ

- すべての `<img>` に `alt`（装飾画像は `alt=""`）
- アイコンボタンに `aria-label`
- スキップリンク: `<a href="#content" class="skip-link">本文へスキップ</a>` を body 直後
- フォーカス可視: `:focus-visible` でアウトライン表示（`outline: none` 単独禁止）

### 3.4 コメント

- **処理説明の HTML コメントは禁止**（D-quints §4.1 / §5.4）
- 許可: `@spec` DocID 参照、ビルド脚本による自動生成マーカー

```html
<!-- @spec DOC-PUB-003 -->
<!-- generated: body-content — do not edit -->
```

---

## 4. CSS 規約

### 4.1 構造

```css
/* 1. カスタムプロパティ（:root） */
/* 2. リセット / ベース */
/* 3. レイアウト */
/* 4. コンポーネント */
/* 5. ユーティリティ */
/* 6. メディアクエリ（モバイルファースト） */
```

### 4.2 複雑度制限（D-quints §5.2）

| 項目 | 上限 |
|---|---|
| **セレクタネスト** | 不使用（CSS ネスト構文も原則フラット） |
| **!important** | 禁止 |
| **ID セレクタ** | JS フック用 `#content` 等のみ。スタイル指定禁止 |
| **1 ファイル行数** | 500 行以内。超過時はコンポーネント単位で分割 |

### 4.3 デザイントークン

- 色・フォント・余白は `:root` のカスタムプロパティで定義（Spec DOC-PUB-004 準拠）
- マジックナンバー禁止: 余白は `--spacing-unit` の倍数（8px 基準）

### 4.4 レスポンシブ

```css
/* モバイルファースト */
/* デフォルト: < 768px */
@media (min-width: 768px) { /* タブレット */ }
@media (min-width: 1024px) { /* デスクトップ — TOC サイドバー */ }
```

### 4.5 ユーザー設定尊重

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important; /* 唯一の !important 例外 */
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 5. JavaScript 規約

### 5.1 基本方針

- `'use strict';` 必須
- モジュール形式: ES modules（`<script type="module">`）
- グローバル汚染禁止。IIFE 不使用（module スコープで十分）
- 外部依存禁止（ビルド脚本を除く）

### 5.2 複雑度制限

| 項目 | 上限 |
|---|---|
| **1 関数行数** | 30 行以内 |
| **ネスト深度** | 2 以内 |
| **1 ファイル行数** | 200 行以内 |

### 5.3 DOM 操作

- `querySelector` / `querySelectorAll` を使用
- イベント委譲を優先（TOC リンク等）
- `IntersectionObserver` でスクロールスパイ（ポーリング禁止）

### 5.4 定数

```javascript
// @spec DOC-PUB-007
const SCROLL_THRESHOLD_PX = 800;
const TOC_ACTIVE_CLASS = 'toc__link--active';
```

### 5.5 コメント

- 処理説明コメント禁止
- `@spec` DocID 参照のみ許可

---

## 6. ビルド脚本規約（Node.js）

### 6.1 配置・命名

- `scripts/build.js` — メインビルド
- `scripts/` 内のみ Node.js 依存ライブラリ使用可

### 6.2 許可ライブラリ

| ライブラリ | 用途 |
|---|---|
| `marked` または `markdown-it` | MD → HTML 変換 |
| `fs`, `path`（標準） | ファイル I/O |

追加ライブラリは Spec 改訂 + Convention 更新を Gate とする。

### 6.3 ビルド脚本の振る舞い

```javascript
// 入力
const SOURCE_MD = '../D-quints-overview-v1.0.md';
const TEMPLATE = 'src/index.html';
const OUTPUT = 'dist/index.html';

// 処理
// 1. MD をパース → 本文 HTML
// 2. テンプレートの <!-- inject:body --> を置換
// 3. src/assets/ → dist/assets/ をコピー
// 4. 終了コード 0 / エラー時 1
```

### 6.4 npm scripts

```json
{
  "scripts": {
    "build": "node scripts/build.js",
    "preview": "npx serve dist"
  }
}
```

---

## 7. Markdown 原稿取り扱い

| ルール | 内容 |
|---|---|
| **SSOT** | 提言書本文は `D-quints-overview-v1.0.md` が SSOT。サイト側で本文を手書きしない |
| **変換のみ** | ビルド脚本は変換・除外ルール（Spec DOC-PUB-003）に従う |
| **改訂** | 提言書更新 → ビルド再実行。HTML 本文の直接編集禁止 |

---

## 8. Git・バージョン管理（GitHub 公開）

| 項目 | 方針 |
|---|---|
| **ホスティング** | GitHub リポジトリ `so-ken-org/d-quints`（想定）を公開 |
| **コミット対象** | `spec/`, `convention/`, `src/`, `scripts/`, `package.json`, `package-lock.json`, ルート `README.md`, `D-quints-overview-v1.0.md` |
| **dist/** | GitHub Actions でビルド・デプロイする場合は `.gitignore` のまま。手動デプロイ時はビルド後に `gh-pages` 等へ配信 |
| **原稿 MD** | リポジトリルートの `D-quints-overview-v1.0.md` |
| **公開サイト URL** | `https://so-ken.org/research/d-quints/` |
| **リポジトリ README** | Spec + Convention を SSOT とした生成物である旨を記載（ルート `README.md`） |

---

## 9. Hotfix 例外プロトコル

本番障害時のみ、Artefact の最小限手編集を許可する（D-quints §4.6 準拠）。

| ルール | 内容 |
|---|---|
| **条件** | 公開サイトの表示崩れ・リンク切れ等の緊急事態 |
| **記録** | Issue / チケットに DocID と変更内容を記載 |
| **期限** | 24 時間以内に Spec または Convention へバックポート |
| **検証** | バックポート後 `npm run build` で同等出力を確認 |
| **禁止** | Hotfix の恒久化、Spec 更新の先延ばし |

---

## 10. 品質ゲート（Gate D）

ビルド完了後、以下を確認する。

| チェック | 方法 |
|---|---|
| HTML 妥当性 | W3C Validator（警告は記録、エラーは修正） |
| リンク | 内部アンカーが存在することをビルド脚本で検証（任意） |
| アクセシビリティ | Lighthouse ≥ 90 |
| コントラスト | トークン値が WCAG AA を満たすこと |
| Convention 準拠 | 禁止命名・行数上限・コメント方針 |

---

## 11. セキュリティ

| 項目 | 方針 |
|---|---|
| **秘密情報** | API キー等を Spec / Convention / コードに書かない |
| **外部スクリプト** | CDN からの JS 読み込み禁止。フォントのみ Google Fonts 可（`preconnect` 付き） |
| **CSP** | Phase 2 で `Content-Security-Policy` ヘッダ検討。初期は不要 |
| **依存関係** | `npm audit` を CI で実行（Phase 2） |

---

## 12. AI 生成時の追加ルール（D-quints §5.5）

| ルール | 内容 |
|---|---|
| **推測禁止** | Spec に未記載の UI・機能を追加しない |
| **OPEN 未解決** | `OPEN:` 項目について勝手に決定しない。最小実装で省略可と Spec に明記されたもののみ省略 |
| **DocID 付与** | 生成する各ファイル先頭に `@spec` DocID を付与 |
| **再生成** | 変更は Spec 経由。コード直接修正は Hotfix 例外のみ |

---

## 13. 参照

| 文書 | パス |
|---|---|
| 設計仕様書（Spec） | `d-quints-site/spec/site-overview.md` |
| 技術提言書（コンテンツ SSOT） | `D-quints-overview-v1.0.md` |
| D-quints 普遍規約 | 提言書 §5 |

---

## 改訂履歴

| バージョン | 日付 | 変更内容 |
|---|---|---|
| **1.0** | **2026-06-19** | 初版。静的サイト向け具象化コンパイラ規約 |
