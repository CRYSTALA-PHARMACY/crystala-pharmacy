/* ═══════════════════════════════════════════════════════════════════
   CRYSTALA PHARMACY — منطق الصفحة (v2)
   ⚠️ كل ما تحتاج تحديثه مستقبلاً موجود في كائن CONFIG أدناه فقط:
   روابط التحميل، البصمات، الإصدار، وسائل التواصل.
   ═══════════════════════════════════════════════════════════════════ */

const CONFIG = {
  version: '1.6.4',
  releaseDate: '22 سبتمبر 2026',

  // روابط التحميل — استبدلها بروابط GitHub Releases عند نشر مستودعك
  downloads: [
    {
      id: 'master',
      icon: 'server',
      title: 'مثبّت الماستر — الخادم الرئيسي',
      desc: 'النظام الكامل على جهاز واحد: الخادم + قاعدة بيانات PostgreSQL 17 + الواجهة + كل المتطلبات مضمّنة. يُثبَّت على جهاز الصيدلية الرئيسي ويخدم بقية الأجهزة — لا يحتاج إنترنت إطلاقاً.',
      size: '275 MB',
      os: 'ويندوز 10/11 — 64-بت',
      filename: 'CRYSTALA-PHARMACY-Setup-1.6.4-Clean.exe',
      sha256: 'e5c0c3052071f05c73bd0223be5bd083f056fb40a440b1ccde6cd38061496d25',
      url: 'https://github.com/tamertamer1212/crystala-pharmacy/releases/download/v1.6.4/CRYSTALA-PHARMACY-Setup-1.6.4-Clean.exe',
      primary: true
    },
    {
      id: 'client',
      icon: 'desktop',
      title: 'مثبّت عميل الشبكة — أجهزة الكاشير',
      desc: 'تطبيق ويندوز لأجهزة الكاشير والاستقبال يفتح النظام مباشرة من الماستر (كروميوم مضمّن — يعمل بدون متصفح وبدون تثبيت أي متطلبات، وكاميرته تقرأ الباركود وQR).',
      size: '179 MB',
      os: 'ويندوز 7 SP1 وما أحدث',
      filename: 'CRYSTALA-PHARMACY-Client-Setup-1.6.4.exe',
      sha256: '1feff00bf1f0a8d77a36099f9fa2c7d318dd3ec0a027b7e62d5b5e5c4b59547e',
      url: 'https://github.com/tamertamer1212/crystala-pharmacy/releases/download/v1.6.4/CRYSTALA-PHARMACY-Client-Setup-1.6.4.exe',
      primary: false
    },
    {
      id: 'android',
      icon: 'phone',
      title: 'تطبيق أندرويد',
      desc: 'عميل مصغّر للهاتف: يكتشف الماستر تلقائياً على شبكة الواي فاي، بماسح ZXing أصلي يقرأ 12 صيغة باركود وQR وGS1 DataMatrix — لبحث الأصناف وتأكيد الروشتات.',
      size: '1 MB',
      os: 'أندرويد 5.0 وما أحدث',
      filename: 'CRYSTALA-PHARMACY-1.6.4-aligned-signed.apk',
      sha256: 'd90ddd962287e8868edd75736238fa5ab053a0425f20cf8e4e352999422d43f4',
      url: 'https://github.com/tamertamer1212/crystala-pharmacy/releases/download/v1.6.4/CRYSTALA-PHARMACY-1.6.4-aligned-signed.apk',
      primary: false
    },
  ],

  // وسائل التواصل
  contact: {
    whatsapp: { label: 'واتساب المبيعات والدعم', value: '0121 162 9768', href: 'https://wa.me/201211629768' },
    email:    { label: 'البريد الإلكتروني', value: 'crystala.erp@gmail.com', href: 'mailto:crystala.erp@gmail.com' },
    support:  { label: 'الدعم الفني (عن بُعد)', value: 'جلسات AnyDesk / TeamViewer بالتنسيق', href: 'https://wa.me/201211629768' }
  }
};

/* ── أيقونات SVG مشتركة ─────────────────────────────────────── */
const ICONS = {
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 6.5h.01M6 17.5h.01"/></svg>',
  desktop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21h8M12 16v5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 6-6 6 6 6M16 6l6 6-6 6M13 4l-2 16"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15L2 22l5.15-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.9.9-2.98-.2-.31a8.1 8.1 0 1 1 6.79 3.7Zm4.47-6.07c-.24-.12-1.44-.71-1.66-.8-.22-.08-.38-.12-.54.13-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.1 3.64.57.25 1.02.4 1.37.5.58.19 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 7 9 6 9-6"/></svg>',
  support: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a7 7 0 0 0-7 7v3l-1.5 3h17L19 13v-3a7 7 0 0 0-7-7Z"/><path d="M9 20a3 3 0 0 0 6 0"/></svg>'
};

/* ── بناء بطاقات التحميل ─────────────────────────────────────── */
function buildDownloads() {
  const grid = document.getElementById('dl-grid');
  if (!grid) return;
  grid.innerHTML = CONFIG.downloads.map(d => `
    <article class="dl-card reveal">
      <div class="dl-card__head">
        <div class="dl-card__icon">${ICONS[d.icon] || ICONS.server}</div>
        <div>
          <h3 class="dl-card__title">${d.title}</h3>
          <p class="dl-card__desc">${d.desc}</p>
        </div>
      </div>
      <div class="dl-card__meta">
        <span class="chip">${d.size}</span>
        <span class="chip">${d.os}</span>
        <span class="chip chip--ok">SHA-256 موثّق</span>
      </div>
      <div class="dl-card__hash" title="بصمة SHA-256 — انسخها وتحقق بعد التحميل">
        <span style="flex:1">${d.sha256}</span>
        <button class="copy" data-hash="${d.sha256}" type="button">نسخ</button>
      </div>
      <div class="dl-card__actions">
        <a class="btn ${d.primary ? 'btn--primary' : 'btn--ghost'}" href="${d.url}" target="_blank" rel="noopener">
          ${ICONS.download} تحميل ${d.filename}
        </a>
      </div>
    </article>`).join('');

  grid.querySelectorAll('.copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.hash);
        const old = btn.textContent;
        btn.textContent = 'تم النسخ ✓';
        setTimeout(() => btn.textContent = old, 1600);
      } catch {
        // السياق غير الآمن (HTTP) — خطة بديلة موثوقة
        const ta = document.createElement('textarea');
        ta.value = btn.dataset.hash;
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch { /* يُترك للمستخدم يدوياً */ }
        ta.remove();
        const old = btn.textContent;
        btn.textContent = 'تم النسخ ✓';
        setTimeout(() => btn.textContent = old, 1600);
      }
    });
  });
}

/* ── بطاقات التواصل ──────────────────────────────────────────── */
function buildContact() {
  const wrap = document.getElementById('contact-cards');
  if (!wrap) return;
  const items = [
    { icon: 'whatsapp', ...CONFIG.contact.whatsapp },
    { icon: 'mail', ...CONFIG.contact.email },
    { icon: 'support', ...CONFIG.contact.support }
  ];
  wrap.innerHTML = items.map(c => `
    <a class="contact-card reveal" href="${c.href}" ${c.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
      <span class="contact-card__icon">${ICONS[c.icon]}</span>
      <span><b>${c.label}</b><span>${c.value}</span></span>
    </a>`).join('');
}

/* ── التنقل ──────────────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav') || document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');

  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', () => links.classList.toggle('is-open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('is-open')));

  // تمييز القسم النشط في القائمة
  const sections = ['modules', 'features', 'architecture', 'security', 'download', 'pricing', 'faq']
    .map(id => document.getElementById(id)).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.querySelectorAll('a[href^="#"]').forEach(a =>
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  }
}

/* ── الأسئلة الشائعة ─────────────────────────────────────────── */
function initFaq() {
  document.querySelectorAll('.faq__item').forEach(item => {
    const q = item.querySelector('.faq__q');
    const a = item.querySelector('.faq__a');
    q.addEventListener('click', () => {
      const open = item.classList.contains('is-open');
      document.querySelectorAll('.faq__item.is-open').forEach(o => {
        o.classList.remove('is-open');
        o.querySelector('.faq__a').style.maxHeight = null;
        o.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── حركة الظهور عند التمرير ─────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

/* ── عدادات الأرقام المتحركة ─────────────────────────────────── */
function initCounters() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  const animate = el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    if (!('IntersectionObserver' in window)) { el.textContent = target + suffix; return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(el);
        const dur = 1400, t0 = performance.now();
        const tick = now => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    io.observe(el);
  };
  nums.forEach(animate);
}

/* ── شريط تقدم القراءة + زر العودة ───────────────────────────── */
function initScrollUi() {
  const bar = document.getElementById('scroll-progress');
  const toTop = document.getElementById('to-top');
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if (toTop) toTop.classList.toggle('is-visible', h.scrollTop > 600);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── التشغيل ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildDownloads();
  buildContact();
  initNav();
  initFaq();
  initReveal();
  initCounters();
  initScrollUi();
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
