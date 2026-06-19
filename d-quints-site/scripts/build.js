// @spec DOC-PUB-003,DOC-PUB-006

'use strict';

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(ROOT, '..');
const SOURCE_MD = path.join(REPO_ROOT, 'D-quints-overview-v1.0.md');
const TEMPLATE = path.join(ROOT, 'src', 'index.html');
const NOT_FOUND_TEMPLATE = path.join(ROOT, 'src', '404.html');
const OUTPUT = path.join(ROOT, 'dist', 'index.html');
const NOT_FOUND_OUTPUT = path.join(ROOT, 'dist', '404.html');
const ASSETS_SRC = path.join(ROOT, 'src', 'assets');
const ASSETS_DEST = path.join(ROOT, 'dist', 'assets');

const TOC_HEADING_PATTERN = /^(?:\d+\.|Appendix [ABC]:)/;

function slugify(text) {
  let slug = text.trim();
  slug = slug.replace(/\s+/g, '-');
  slug = slug.replace(/[（(]/g, '-').replace(/[）)]/g, '');
  slug = slug.toLowerCase();
  slug = slug.replace(/[^\w\u3000-\u9fff\u4e00-\u9fa5-]+/g, '-');
  slug = slug.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return slug;
}

function isExternalUrl(href) {
  return /^https?:\/\//i.test(href);
}

function preprocessMarkdown(raw) {
  const lines = raw.split('\n');
  const startIndex = lines.findIndex((line) => line.startsWith('## Abstract'));
  if (startIndex === -1) {
    throw new Error('Abstract section not found in source markdown');
  }

  const filtered = [];
  let skipToc = false;

  for (let i = startIndex; i < lines.length; i += 1) {
    const line = lines[i];

    if (line.startsWith('## 目次')) {
      skipToc = true;
      continue;
    }

    if (skipToc) {
      if (line.startsWith('## ') && !line.startsWith('## 目次')) {
        skipToc = false;
      } else {
        continue;
      }
    }

    if (line.startsWith('*© 2026')) {
      continue;
    }

    filtered.push(line);
  }

  return filtered.join('\n');
}

function configureMarked() {
  const headingIds = [];

  marked.use({
    gfm: true,
    breaks: false,
    renderer: {
      heading(token) {
        const plain = token.text;
        const id = slugify(plain);
        headingIds.push({ level: token.depth, text: plain, id });
        const inner = this.parser.parseInline(token.tokens);

        if (token.depth <= 3) {
          return `<h${token.depth} id="${id}">${inner}</h${token.depth}>\n`;
        }
        return `<h${token.depth}>${inner}</h${token.depth}>\n`;
      },
      link(token) {
        const inner = this.parser.parseInline(token.tokens);
        const titleAttr = token.title ? ` title="${token.title}"` : '';

        if (isExternalUrl(token.href)) {
          return `<a href="${token.href}"${titleAttr} target="_blank" rel="noopener noreferrer">${inner}</a>`;
        }
        return `<a href="${token.href}"${titleAttr}>${inner}</a>`;
      },
      blockquote(token) {
        const inner = this.parser.parse(token.tokens);
        const plain = token.text.trim();
        const isEmphasis =
          plain.includes('Spec is source') ||
          plain.includes('Cheap AI checks Spec') ||
          plain.includes('提言：');
        const classAttr = isEmphasis ? ' class="blockquote--emphasis"' : '';
        return `<blockquote${classAttr}>\n${inner}</blockquote>\n`;
      },
      table(token) {
        let header = '';
        let cell = '';

        for (let j = 0; j < token.header.length; j += 1) {
          cell += this.tablecell(token.header[j]);
        }
        header += this.tablerow({ text: cell });

        let body = '';
        for (let j = 0; j < token.rows.length; j += 1) {
          const row = token.rows[j];
          cell = '';
          for (let k = 0; k < row.length; k += 1) {
            cell += this.tablecell(row[k]);
          }
          body += this.tablerow({ text: cell });
        }

        if (body) {
          body = `<tbody>\n${body}</tbody>\n`;
        }

        return `<div class="table-scroll"><table>\n<thead>\n${header}</thead>\n${body}</table></div>\n`;
      },
    },
  });

  return headingIds;
}

function buildTocHtml(headingIds) {
  const items = headingIds.filter(
    (entry) => entry.level === 2 && TOC_HEADING_PATTERN.test(entry.text),
  );

  const links = items
    .map(
      (entry) =>
        `        <li class="toc__item"><a href="#${entry.id}" class="toc__link">${entry.text}</a></li>`,
    )
    .join('\n');

  return `      <ol class="toc__list">\n${links}\n      </ol>`;
}

function copyDirectory(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function injectTemplate(template, tocHtml, bodyHtml) {
  return template
    .replace('<!-- inject:toc -->', tocHtml)
    .replace('<!-- inject:body -->', bodyHtml);
}

function build404() {
  if (!fs.existsSync(NOT_FOUND_TEMPLATE)) {
    return;
  }
  fs.mkdirSync(path.dirname(NOT_FOUND_OUTPUT), { recursive: true });
  fs.copyFileSync(NOT_FOUND_TEMPLATE, NOT_FOUND_OUTPUT);
}

function main() {
  if (!fs.existsSync(SOURCE_MD)) {
    console.error(`Source markdown not found: ${SOURCE_MD}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(SOURCE_MD, 'utf8');
  const processed = preprocessMarkdown(raw);
  const headingIds = configureMarked();
  const bodyHtml = marked.parse(processed);
  const tocHtml = buildTocHtml(headingIds);

  const template = fs.readFileSync(TEMPLATE, 'utf8');
  const outputHtml = injectTemplate(template, tocHtml, bodyHtml);

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, outputHtml, 'utf8');

  copyDirectory(ASSETS_SRC, ASSETS_DEST);
  build404();

  console.log(`Built ${OUTPUT}`);
}

main();
