---
bc: PUB
version: 1.0.0
status: active
source_document: D-quints-overview-v1.0.md
---

# D-quints 技術提言書 公開サイト — 設計仕様書

本書は `D-quints-overview-v1.0.md`（技術提言書 v1.0）を静的 Web ページとして公開するための **Spec（SSOT）** である。実装（Artefact）は本 Spec と `convention/coding-conventions.md` に基づき生成・再生成する。

## プロジェクト概要

| 項目 | 内容 |
|---|---|
| **プロジェクト名** | d-quints-site |
| **目的** | 技術提言書を読みやすい静的 Web ページとして公開する |
| **公開対象** | 日本国内のソフトウェアエンジニア、情シス担当者、開発責任者 |
| **公開前提** | **GitHub リポジトリ公開** + **so-ken.org 本番サイト** |
| **ホスティング** | 本番: `so-ken.org/research/d-quints/`。ソース: GitHub |
| **Artefact 分類** | 層 A（Spec 完全派生）: HTML / CSS / JS。層 B: ビルド設定。層 C: なし |

### GitHub 公開の位置づけ

本プロジェクトは **D-quints 技術提言書 Phase 0** の公開物である。リポジトリ訪問者向けに、次を明示する。

| 表明 | 内容 |
|---|---|
| **生成の根拠** | Artefact は `spec/` と `convention/` を SSOT として設計・生成した成果物である |
| **スコープ** | 提言の読み物。Phase 1 PoC（契約テスト・Spec Lint 等）は対象外 |
| **検証** | 定量検証（H1〜H6）は Phase 1 以降。本サイトは検証前の最小実例 |

リポジトリルートの `README.md` およびサイトフッターに上記を記載する。

---

<!-- DocID: DOC-PUB-001 -->

## サイト全体要件

### 概要

技術提言書「D-quints 概論 v1.0」の全文を、単一ページまたは少数ページ構成の静的サイトとして公開する。長文ドキュメントとしての可読性・ナビゲーション性・権威性（著者・所属・公開日の明示）を確保する。

### 非機能要件

| カテゴリ | 要件 |
|---|---|
| **パフォーマンス** | 初回表示 LCP ≤ 2.5 秒（3G 相当回線、本文 HTML 500KB 以下を目安） |
| **アクセシビリティ** | WCAG 2.1 AA 準拠を目標。見出し階層・コントラスト・キーボード操作 |
| **レスポンシブ** | 320px〜1920px でレイアウト崩れなし |
| **SEO** | title / description / OGP / canonical を設定 |
| **保守** | 提言書改訂時は Spec 更新 → 再生成。手編集禁止（Hotfix 例外は Convention 参照） |
| **ブラウザ** | 最新 2 バージョンの Chrome / Firefox / Safari / Edge |

### ドメイン・URL（本番）

| 項目 | 値 |
|---|---|
| **公式サイト URL** | `https://so-ken.org/research/d-quints/` |
| **GitHub リポジトリ** | `https://github.com/so-ken-org/d-quints` |
| **ベースパス** | `/research/d-quints/` |
| **canonical** | `https://so-ken.org/research/d-quints/` |

> ビルド成果物 `dist/` の中身を `so-ken.org` 上の `/research/d-quints/` にアップロードする。

### OPEN

- `OPEN:` OGP 画像（`og:image`）— 初期リリースでは省略可

---

<!-- DocID: DOC-PUB-002 -->

## 情報設計・ページ構成

### 概要

提言書 1 本を中心とした **シングルページアプリケーション風の静的構成**（実体は静的 HTML 1 ファイル + アセット）とする。章立ては原稿の目次（§1〜§12 + Appendix A〜C）に準拠する。

### ページ一覧

| パス | 種別 | 内容 |
|---|---|---|
| `/` | メイン | 提言書全文（目次・本文・Appendix・改訂履歴・フッター） |
| `/404.html` | エラー | シンプルな Not Found ページ（任意、Convention で生成可否を決定） |

### ナビゲーション

| 要素 | 仕様 |
|---|---|
| **固定目次（TOC）** | デスクトップ（≥1024px）: 左サイドバーに sticky 表示。モバイル: 上部折りたたみまたはハンバーガー |
| **アンカーリンク** | 各見出し（h2/h3）に id 属性。目次クリックでスムーススクロール |
| **現在地ハイライト** | スクロール位置に応じて TOC の該当項目を active 表示 |
| **トップへ戻る** | 右下フローティングボタン（本文 2000px 超過時に表示） |

### ヘッダー

| 要素 | 内容 |
|---|---|
| **サイトタイトル** | D-quints 概論 |
| **サブタイトル** | 仕様駆動生成モデルによるAI時代のソフトウェア開発構造再定義 |
| **メタ行** | 技術提言書 v1.0 / 著者: 村田 純一 / 一般社団法人 創研 / 公開日: 2026-06-18 |
| **外部リンク** | 創研 https://so-ken.org（新規タブ、`rel="noopener noreferrer"`） |

### フッター

| 要素 | 内容 |
|---|---|
| **著作権** | © 2026 村田 純一 / 一般社団法人 創研. All rights reserved. |
| **連絡先** | info@so-ken.org |
| **位置づけ（1 行）** | 本サイトの実装は `spec/` と `convention/` を SSOT として生成した成果物です（技術提言書 v1.0 / Phase 0・検証前） |
| **GitHub リポジトリ** | `https://github.com/so-ken-org/d-quints`（新規タブ） |
| **提言書 Markdown** | `https://github.com/so-ken-org/d-quints/blob/main/D-quints-overview-v1.0.md` |
| **Spec / Convention** | リポジトリ内 `d-quints-site/spec/` ・`d-quints-site/convention/` へのリンク |

### 受入条件

- [ ] 目次の全 12 章 + Appendix A〜C がアンカーで到達可能
- [ ] モバイル幅 375px で TOC が操作可能
- [ ] ヘッダーに著者・所属・公開日が表示される

---

<!-- DocID: DOC-PUB-003 -->

## コンテンツ変換・表示仕様

### 概要

`D-quints-overview-v1.0.md` を HTML に変換し、提言書の構造・表・引用・コードブロックを忠実に再現する。

### 入力

| 名前 | 型 | 必須 | 説明 |
|---|---|---|---|
| source_md | file | yes | `D-quints-overview-v1.0.md`（リポジトリルート） |

### 変換ルール

| Markdown 要素 | HTML 出力 |
|---|---|
| `#` / `##` / `###` | `h1` / `h2` / `h3`（id は slug 化: 日本語見出しはローマ字または Unicode エスケープ slug） |
| テーブル | `<table>` + `<thead>` / `<tbody>`。横スクロールラッパー付き |
| `>` 引用 | `<blockquote>`。キャッチフレーズ（Spec is source 等）は視覚的強調クラス |
| コードフェンス | `<pre><code>` + 言語クラス。シンタックスハイライトは任意（Convention 参照） |
| リンク | 外部リンクは `target="_blank" rel="noopener noreferrer"` |
| 水平線 `---` | セクション区切り `<hr>` または余白のみ（デザインに委譲） |
| DocID コメント `<!-- DocID: ... -->` | HTML コメントとして保持（表示しない） |

### 除外・調整

| 項目 | 方針 |
|---|---|
| **目次（原稿内）** | 原稿 §目次 セクションは HTML 側 TOC に置換するため、本文からは除外可 |
| **メタ情報テーブル** | ヘッダーへ移動済みの場合、本文先頭の重複テーブルは省略可 |
| **改訂履歴** | フッター直前に独立セクションとして表示 |

### 受入条件

- [ ] 原稿の表がすべて HTML テーブルとして表示される
- [ ] コードブロック（Appendix A/B）が等幅フォントで表示される
- [ ] 内部アンカーリンク（§ 参照）が機能する

---

<!-- DocID: DOC-PUB-004 -->

## ビジュアルデザイン

### 概要

技術提言書としての信頼感と長時間読了の快適性を両立する。装飾過多を避け、タイポグラフィ中心のデザインとする。

### デザイントークン

| トークン | 値 | 用途 |
|---|---|---|
| `--color-bg` | `#fafafa` | ページ背景 |
| `--color-surface` | `#ffffff` | 本文カード背景 |
| `--color-text` | `#1a1a1a` | 本文 |
| `--color-text-muted` | `#5c5c5c` | メタ情報・キャプション |
| `--color-accent` | `#2563eb` | リンク・アクティブ TOC |
| `--color-accent-subtle` | `#eff6ff` | 引用背景 |
| `--color-border` | `#e5e7eb` | 表・区切り線 |
| `--font-serif` | `"Noto Serif JP", "Yu Mincho", serif` | 本文 |
| `--font-sans` | `"Noto Sans JP", "Hiragino Sans", sans-serif` | UI・見出し補助 |
| `--font-mono` | `"JetBrains Mono", "Consolas", monospace` | コード |
| `--max-content-width` | `720px` | 本文最大幅 |
| `--sidebar-width` | `240px` | TOC 幅（デスクトップ） |
| `--spacing-unit` | `8px` | 余白基準 |

### タイポグラフィ

| 要素 | サイズ（デスクトップ） | 行間 |
|---|---|---|
| h1 | 2rem | 1.3 |
| h2 | 1.5rem | 1.4 |
| h3 | 1.25rem | 1.4 |
| 本文 | 1rem (16px) | 1.75 |
| 表・コード | 0.875rem | 1.5 |

### コンポーネント

| コンポーネント | 仕様 |
|---|---|
| **blockquote（提言）** | 左ボーダー 4px accent、背景 `--color-accent-subtle`、italic |
| **table** | zebra striping なし。ヘッダー行は背景 `--color-bg` |
| **code block** | 背景 `#f3f4f6`、角丸 4px、横スクロール |
| **TOC active** | 左ボーダー accent、フォント weight 600 |

### 受入条件

- [ ] 本文と背景のコントラスト比 ≥ 4.5:1
- [ ] リンクと本文の視覚的区別が明確
- [ ] 768px 未満でサイドバー TOC が本文を圧迫しない

---

<!-- DocID: DOC-PUB-005 -->

## SEO・メタデータ・OGP

### 概要

検索エンジンと SNS シェア向けメタデータを `<head>` に設定する。

### 必須メタタグ

| name / property | 内容 |
|---|---|
| `<title>` | D-quints 概論 — 仕様駆動生成モデル \| 技術提言書 v1.0 |
| `<meta name="description">` | D-quints（Domain-Driven Design・Document-Driven Development・AI特性の融合）は、構造化された仕様書をSSOTとしAIをコンパイラとして位置づける開発モデル。3段階AI活用モデルによるコスト最適化を主軸とする技術提言書。 |
| `<meta name="author">` | 村田 純一 |
| `<meta name="keywords">` | Spec-Driven Development, LLM, AIコーディング, SSOT, DDD, 仕様駆動 |
| `<link rel="canonical">` | `https://so-ken.org/research/d-quints/` |
| `og:url` | canonical と同一 |
| `og:title` | title と同一 |
| `og:description` | description と同一 |
| `og:type` | article |
| `og:locale` | ja_JP |
| `twitter:card` | summary |

### 構造化データ（JSON-LD）

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "D-quints 概論",
  "author": { "@type": "Person", "name": "村田 純一" },
  "publisher": { "@type": "Organization", "name": "一般社団法人 創研", "url": "https://so-ken.org" },
  "datePublished": "2026-06-18",
  "inLanguage": "ja"
}
```

### 受入条件

- [ ] `<title>` と `description` が設定されている
- [ ] OGP タグが head 内に存在する
- [ ] JSON-LD が valid JSON としてパース可能

---

<!-- DocID: DOC-PUB-006 -->

## ディレクトリ構成・ビルド・デプロイ

### 概要

静的サイトの Artefact 配置と、Markdown 原稿から HTML を生成するビルド手順を定義する。

### ディレクトリ構成（Artefact）

```
d-quints-site/
├── spec/                          # SSOT（本書）
├── convention/                    # コーディング規約
├── src/
│   ├── index.html                 # テンプレート（プレースホルダー含む）
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css
│   │   ├── js/
│   │   │   └── main.js
│   │   └── fonts/                 # 必要に応じ Web フォント
│   └── partials/                  # ヘッダー・フッター等（任意）
├── dist/                          # ビルド出力（デプロイ対象）
├── scripts/
│   └── build.js                   # MD → HTML 変換スクリプト
└── package.json                   # ビルド依存（層 B）
```

### ビルドフロー

```
D-quints-overview-v1.0.md
        ↓  scripts/build.js
src/index.html（テンプレート + 生成本文）
        ↓  静的アセットコピー
dist/（デプロイ可能な完成物）
```

| ステップ | 入力 | 出力 |
|---|---|---|
| 1. MD パース | 原稿 MD | 本文 HTML フラグメント |
| 2. テンプレート合成 | `src/index.html` + フラグメント | `dist/index.html` |
| 3. アセットコピー | `src/assets/**` | `dist/assets/**` |

### デプロイ

| 項目 | 方針 |
|---|---|
| **成果物** | `dist/` ディレクトリ全体 |
| **CI** | push to main でビルド + デプロイ（Phase 2。初期は手動デプロイ可） |
| **キャッシュ** | HTML: no-cache または短 TTL。CSS/JS: ファイル名ハッシュまたはバージョンクエリ |

### 受入条件

- [ ] `npm run build`（または Convention で定義するコマンド）で `dist/index.html` が生成される
- [ ] `dist/` を静的ホストにアップロードするだけでサイトが表示される
- [ ] ビルド後も `src/` の手編集なしで再現可能（Spec + 原稿 MD が SSOT）

---

<!-- DocID: DOC-PUB-007 -->

## インタラクション仕様（JavaScript）

### 概要

最小限のバニラ JavaScript による UX 向上。フレームワーク不使用。

### 機能一覧

| ID | 機能 | トリガー | 振る舞い |
|---|---|---|---|
| **IX-001** | TOC 折りたたみ | モバイルで TOC トグルクリック | 目次パネル open/close。`aria-expanded` 更新 |
| **IX-002** | スムーススクロール | TOC リンククリック | `scrollIntoView({ behavior: 'smooth' })` |
| **IX-003** | TOC 現在地 | scroll / IntersectionObserver | 表示中セクションに対応する TOC 項目を active |
| **IX-004** | トップへ戻る | フローティングボタンクリック | `window.scrollTo({ top: 0, behavior: 'smooth' })` |
| **IX-005** | トップボタン表示 | scroll > 800px | ボタン fade-in / fade-out |

### 受入条件

- [ ] JavaScript 無効時も全文が読める（TOC は CSS のみまたは常時表示フォールバック）
- [ ] キーボードのみで TOC 操作可能
- [ ] `prefers-reduced-motion: reduce` 時はスムーススクロールを無効化

---

## ドメインルール

- 変更の起点は常に本 Spec。Artefact の手編集は禁止（Hotfix 例外は Convention 参照）
- 提言書本文の**意味的内容**は `D-quints-overview-v1.0.md` が SSOT。レイアウト・表示仕様は本 Spec が SSOT
- DocID 単位で再生成可能: PUB-003（コンテンツ）、PUB-004（CSS）、PUB-007（JS）は独立して再生成できる粒度とする

## 受入条件（サイト全体）

- [ ] 提言書 v1.0 の全文が Web 上で読める
- [ ] デスクトップ・モバイル双方で可読性が確保される
- [ ] 著者・所属・公開日・連絡先が明示される
- [ ] Spec + Convention に基づき `npm run build` で再生成できる
- [ ] Lighthouse アクセシビリティスコア ≥ 90（ローカル計測）

## OPEN

- `OPEN:` OGP 画像（`og:image`）の要否 — 初期リリースでは省略可。追加時は Spec 改訂
