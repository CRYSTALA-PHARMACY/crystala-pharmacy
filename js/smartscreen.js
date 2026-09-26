/* ═══════════════════════════════════════════════════════════════════
   CRYSTALA PHARMACY — دليل تجاوز شاشة SmartScreen التفاعلي (v1)
   ─────────────────────────────────────────────────────────────────
   الفكرة: العميل يحمّل المثبّت ثم يفزع من الشاشة الزرقاء ويمسح الملف.
   الحل: نافذة إرشادية تظهر عند أول ضغطة على أي زر تحميل ويندوز
   (.exe / .zip — ما عدا أندرويد apk) فيها محاكاة متحركة للخطوات،
   ثم يكمل التحميل بضغطة واحدة. وتُدمج نسخة ثانية داخل قسم الدليل.

   • بعد أول تأكيد تُسجَّل النافذة كـ"مُشاهدة" ولا تظهر مجدداً.
   • عدّادات قياس (shown / passed) تُرسل لنفس خدمة عداد الزيارات
   لتعرف المالك نسبة من وصل للتحميل فعلاً.
   • كل النصوص هنا — لا شيء في index.html.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SEEN_KEY = 'crystala_ss_seen_v1';
  var COUNTER_NS = 'crystala-v2';
  var COUNTER_API = 'https://abacus.jasoncameron.dev/';
  var WA_NUMBER = '201211629768';
  var WA_MSG_HELP = 'أهلاً، أنا أثبّت نظام CRYSTALA PHARMACY وظهرت لي شاشة SmartScreen الزرقاء عند تشغيل المثبّت — أحتاج مساعدة في خطوة More info / Run anyway';

  /* ترتيب المشاهد: [المدة بالمللي ثانية، التعليق أسفل المسرح] — المجموع ≈ 17 ثانية */
  var SCENES = [
    { dur: 3400, caption: 'التحميل اكتمل — اضغط دبل-كليك على ملف التثبيت' },
    { dur: 4000, caption: 'تظهر الشاشة الزرقاء «Windows protected your PC» — تحذير قياسي لكل برنامج جديد يعمل أوفلاين… لا تمسح الملف!' },
    { dur: 4000, caption: 'اضغط «More info» (مزيد من المعلومات) — الرابط الصغير في أسفل النافذة' },
    { dur: 4000, caption: 'ثم اضغط «Run anyway» (التشغيل على أي حال) — يبدأ التثبيت الطبيعي فوراً' },
    { dur: 3400, caption: 'اكتمل التثبيت — بيانات صيدليتك على جهازك أنت، آمنة 100%' }
  ];

  /* ── أيقونات SVG صغيرة ─────────────────────────────────────────── */
  var SVG = {
    cursor: '<svg viewBox="0 0 24 24" fill="#fff" stroke="#16283c" stroke-width="1.4"><path d="M5.5 3.2 19 12.4l-5.6 1.1 3 5.9-2.6 1.3-3-5.9-4 4.2Z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"/><path d="M11 7h2v6h-2zm0 8h2v2h-2z" fill="#eaf3fb"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v6h6"/></svg>',
    point: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V6m0 0-5 5m5-5 5 5"/></svg>',
    replay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  };

  /* ── قوالب المشاهد (تُعاد كتابتها كل دورة لإعادة تشغيل الأنيميشن) ── */
  var DESK = '<div class="ss-desk">' +
    '<div class="ss-file"><span class="ss-file__ico">' + SVG.file + '<em>SETUP</em></span>' +
    '<span class="ss-file__name">CRYSTALA-MASTER.exe</span></div>' +
    '</div>';

  var TPL = [
    /* 1 — سطح المكتب + دبل كليك */
    function () {
      return DESK + '<div class="ss-cur">' + SVG.cursor + '<i class="ss-cur__ping"></i></div>';
    },
    /* 2 — ظهور SmartScreen */
    function () {
      return '<div class="ss-desk ss-desk--dim"><div class="ss-file"><span class="ss-file__ico">' + SVG.file + '<em>SETUP</em></span>' +
        '<span class="ss-file__name">CRYSTALA-MASTER.exe</span></div></div>' +
        '<div class="ss-warn" dir="ltr">' +
        '<div class="ss-warn__head">' + SVG.shield + '<b>Windows protected your PC</b></div>' +
        '<div class="ss-warn__body"><p><b>Windows Defender SmartScreen</b> prevented an unrecognized app from starting. Running this app might put your PC at risk.</p></div>' +
        '<div class="ss-warn__foot"><span class="ss-warn__link">More info</span><span class="ss-warn__btn">Don\u2019t run</span></div>' +
        '<div class="ss-point ss-point--more" dir="rtl">' + SVG.point + '<span>اضغط هنا</span></div>' +
        '</div>';
    },
    /* 3 — More info ← ظهور Run anyway */
    function () {
      return '<div class="ss-desk ss-desk--dim"><div class="ss-file"><span class="ss-file__ico">' + SVG.file + '<em>SETUP</em></span>' +
        '<span class="ss-file__name">CRYSTALA-MASTER.exe</span></div></div>' +
        '<div class="ss-warn ss-warn--big" dir="ltr">' +
        '<div class="ss-warn__head">' + SVG.shield + '<b>Windows protected your PC</b></div>' +
        '<div class="ss-warn__body"><p><b>Windows Defender SmartScreen</b> prevented an unrecognized app from starting. Running this app might put your PC at risk.</p>' +
        '<p class="ss-warn__pub">App: CRYSTALA-PHARMACY-MASTER-Server-1.6.4.exe<br><b>Unknown publisher</b></p></div>' +
        '<div class="ss-warn__foot"><span class="ss-warn__btn ss-warn__btn--run">Run anyway</span><span class="ss-warn__btn">Don\u2019t run</span></div>' +
        '<div class="ss-point ss-point--run" dir="rtl">' + SVG.point + '<span>اضغط هنا</span></div>' +
        '</div>';
    },
    /* 4 — التثبيت يبدأ */
    function () {
      return '<div class="ss-setup">' +
        '<div class="ss-setup__bar"><i></i><i></i><i></i><em>CRYSTALA PHARMACY — Setup</em></div>' +
        '<div class="ss-setup__body">' +
        '<b>جاري تجهيز الصيدلية على جهازك…</b>' +
        '<div class="ss-prog"><i></i></div>' +
        '<ul class="ss-checks">' +
        '<li style="--d:.3s">قاعدة البيانات PostgreSQL 17</li>' +
        '<li style="--d:1.3s">خدمات النظام وجدار الحماية</li>' +
        '<li style="--d:2.3s">اختصارات سطح المكتب</li>' +
        '</ul></div></div>';
    },
    /* 5 — النهاية */
    function () {
      return '<div class="ss-done">' +
        '<img src="assets/img/logo-512.png" alt="CRYSTALA PHARMACY" />' +
        '<b>بياناتك محلياً، آمنة 100%</b>' +
        '<span>اكتمل التثبيت — افتح النظام وابدأ تجربتك المجانية 30 يوماً</span>' +
        '</div>';
    }
  ];

  /* ── أدوات ─────────────────────────────────────────────────────── */
  function seen() { try { return localStorage.getItem(SEEN_KEY) === '1'; } catch (e) { return false; } }
  function markSeen() { try { localStorage.setItem(SEEN_KEY, '1'); } catch (e) {} }
  function beacon(key) {
    try { fetch(COUNTER_API + 'hit/' + COUNTER_NS + '/' + key).catch(function () {}); } catch (e) {}
  }
  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── بناء نسخة من المسرح المتحرك داخل أي عنصر ─────────────────── */
  function mountDemo(root) {
    root.innerHTML =
      '<div class="ss-demo">' +
      '<div class="ss-stage"><div class="ss-stage__inner"></div>' +
      '<span class="ss-live">دليل متحرك · 17 ثانية</span></div>' +
      '<div class="ss-cap"></div>' +
      '<div class="ss-ctrl">' +
      '<div class="ss-dots">' + SCENES.map(function () { return '<i></i>'; }).join('') + '</div>' +
      '<button class="ss-replay" type="button" aria-label="إعادة التشغيل">' + SVG.replay + ' إعادة</button>' +
      '</div></div>';

    var stage = root.querySelector('.ss-stage__inner');
    var cap = root.querySelector('.ss-cap');
    var dots = root.querySelectorAll('.ss-dots i');
    var timer = null, idx = 0, playing = false;

    function show(i) {
      idx = i;
      stage.innerHTML = TPL[i]();
      cap.textContent = SCENES[i].caption;
      dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
    }
    function schedule() {
      clearTimeout(timer);
      if (!playing) return;
      timer = setTimeout(function () {
        show((idx + 1) % SCENES.length);
        schedule();
      }, SCENES[idx].dur);
    }
    function play() {
      if (reducedMotion()) { playing = false; show(0); return; }
      playing = true; show(0); schedule();
    }
    function stop() { playing = false; clearTimeout(timer); }

    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { stop(); show(k); });
    });
    root.querySelector('.ss-replay').addEventListener('click', play);

    show(0);
    if (!reducedMotion()) { playing = true; schedule(); }
    return { play: play, stop: stop };
  }

  /* ── النافذة المنبثقة ──────────────────────────────────────────── */
  var modalEl = null, modalDemo = null, pendingUrl = null;

  function ensureModal() {
    if (modalEl) return;
    modalEl = document.createElement('div');
    modalEl.className = 'ss-modal';
    modalEl.hidden = true;
    modalEl.innerHTML =
      '<div class="ss-modal__bd" data-ss-close></div>' +
      '<div class="ss-modal__box" role="dialog" aria-modal="true" aria-label="إرشادات تجاوز شاشة Windows الزرقاء">' +
      '<button class="ss-modal__x" type="button" data-ss-close aria-label="إغلاق">' + SVG.x + '</button>' +
      '<div class="ss-modal__hd">' +
      '<h3>خطوة أخيرة قبل التحميل — مهمة جداً</h3>' +
      '<p>عند تشغيل المثبّت ستظهر شاشة زرقاء <b>SmartScreen</b>. هذه <b>ليست مشكلة في الملف</b> — إنها رسالة قياسية يعرضها ويندوز على كل برنامج جديد يعمل أوفلاين 100% مثل نظامنا، لأنه لا يجد سجلاً جاهزاً له. شاهد الخطوات (17 ثانية) وستثبّت بثقة:</p>' +
      '</div>' +
      '<div class="ss-modal__demo"></div>' +
      '<div class="ss-chips"><span>1. More info</span><span>2. Run anyway</span><span>3. يبدأ التثبيت عادي</span></div>' +
      '<div class="ss-modal__acts">' +
      '<button class="ss-go" type="button">فهمت — حمّل الآن</button>' +
      '<a class="ss-wa" data-ss-wa="modal" target="_blank" rel="noopener">ظهرت لي الشاشة وأحتاج مساعدة</a>' +
      '</div>' +
      '<p class="ss-modal__note">بعد الضغط على «فهمت» لن تظهر هذه النافذة على هذا المتصفح مرة أخرى.</p>' +
      '</div>';
    document.body.appendChild(modalEl);

    modalDemo = mountDemo(modalEl.querySelector('.ss-modal__demo'));

    modalEl.querySelectorAll('[data-ss-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    modalEl.querySelector('.ss-go').addEventListener('click', function () {
      markSeen();
      beacon('ss_passed');
      if (pendingUrl) { window.open(pendingUrl, '_blank', 'noopener'); }
      closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modalEl.hidden) closeModal();
    });
  }

  function openModal(url) {
    ensureModal();
    pendingUrl = url || null;
    modalEl.querySelector('.ss-go').textContent = url ? 'فهمت — حمّل الآن' : 'تم — فهمت الخطوات';
    modalEl.hidden = false;
    document.body.style.overflow = 'hidden';
    modalDemo.play();
    beacon('ss_shown');
  }
  function closeModal() {
    if (!modalEl) return;
    modalEl.hidden = true;
    document.body.style.overflow = '';
    modalDemo.stop();
  }

  /* ── ربط الواتساب + أزرار المعاينة + اعتراض أزرار التحميل ──────── */
  function wire() {
    document.querySelectorAll('[data-ss-wa]').forEach(function (a) {
      a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_MSG_HELP);
    });
    document.querySelectorAll('[data-ss-preview]').forEach(function (b) {
      b.addEventListener('click', function () { openModal(null); });
    });

    /* اعتراض نقرات أزرار تحميل ويندوز (exe / zip) — أندرويد apk مستثنى */
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var a = t.closest('a[href*="releases/download"]');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (/\.apk(?:\?|#|$)/i.test(href)) return;
      if (seen()) return;
      e.preventDefault();
      openModal(a.href);
    });

    /* تشغيل نسخة الدليل المدمجة داخل قسم التحميل (إن وُجدت) */
    var inline = document.getElementById('ss-demo-inline');
    if (inline) mountDemo(inline);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
