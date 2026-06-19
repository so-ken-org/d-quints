// @spec DOC-PUB-007

'use strict';

const SCROLL_THRESHOLD_PX = 800;
const TOC_ACTIVE_CLASS = 'toc__link--active';
const TOC_PANEL_OPEN_CLASS = 'is-open';
const BACK_TO_TOP_VISIBLE_CLASS = 'is-visible';

const tocNav = document.querySelector('.toc-nav');
const tocToggle = document.querySelector('.toc-nav__toggle');
const tocPanel = document.querySelector('.toc-nav__panel');
const tocLinks = document.querySelectorAll('.toc__link');
const backToTop = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('h2[id]');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToTarget(target) {
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';
  target.scrollIntoView({ behavior, block: 'start' });
}

function setActiveTocLink(activeId) {
  tocLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle(TOC_ACTIVE_CLASS, isActive);
  });
}

function updateBackToTopVisibility() {
  if (!backToTop) {
    return;
  }
  const isVisible = window.scrollY > SCROLL_THRESHOLD_PX;
  backToTop.hidden = !isVisible;
  backToTop.classList.toggle(BACK_TO_TOP_VISIBLE_CLASS, isVisible);
}

function handleTocToggle() {
  const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
  tocToggle.setAttribute('aria-expanded', String(!isExpanded));
  tocPanel.classList.toggle(TOC_PANEL_OPEN_CLASS, !isExpanded);
}

function handleTocClick(event) {
  const link = event.target.closest('.toc__link');
  if (!link) {
    return;
  }

  event.preventDefault();
  const targetId = link.getAttribute('href').slice(1);
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  scrollToTarget(target);
  setActiveTocLink(targetId);

  if (window.innerWidth < 1024 && tocPanel.classList.contains(TOC_PANEL_OPEN_CLASS)) {
    tocToggle.setAttribute('aria-expanded', 'false');
    tocPanel.classList.remove(TOC_PANEL_OPEN_CLASS);
  }
}

function handleBackToTopClick() {
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';
  window.scrollTo({ top: 0, behavior });
}

function initScrollSpy() {
  if (!sections.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveTocLink(visible[0].target.id);
      }
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function initDesktopTocPanel() {
  if (window.innerWidth >= 1024 && tocPanel) {
    tocPanel.classList.add(TOC_PANEL_OPEN_CLASS);
  }
}

if (tocToggle) {
  tocToggle.addEventListener('click', handleTocToggle);
}

if (tocNav) {
  tocNav.addEventListener('click', handleTocClick);
}

if (backToTop) {
  backToTop.addEventListener('click', handleBackToTopClick);
}

window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
window.addEventListener('resize', initDesktopTocPanel);

initDesktopTocPanel();
initScrollSpy();
updateBackToTopVisibility();
