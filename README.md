# CRYSTALA-PHARMACY

نظام إدارة الصيدليات **CRYSTALA-PHARMACY** — يعمل بمعمارية **خادم-عميل** (Server-Client).

> Pharmacies management system built on a server-client architecture.

---

## ⚠️ اقرأ هذا قبل التحميل / Read before downloading

### 🏗️ بنية النظام / System Architecture

نظام CRYSTALA-PHARMACY مكوّن من جزأين أساسيين:

| المكوّن | الوظيفة | يعمل منفرداً؟ |
|---|---|---|
| 🖥️ **الماستر (Master / Server)** | يدير قاعدة البيانات، المخزون، الفواتير، والترخيص. يعمل على جهاز ويندوز واحد فقط. | ✅ نعم |
| 📱 **العميل (Client)** | واجهة استخدام تتصل بالماستر عبر الشبكة المحلية (Wi-Fi / LAN). متوفرة لأندرويد وويندوز. | ❌ لا — يتطلب الماستر |

**الخلاصة:** العملاء (Android / Windows Client) **لا يعملون منفرداً**. إن حمّلت العميل وحده دون وجود الماستر على شبكتك، فلن يعمل التطبيق.

---

### 📥 ماذا أحتاج أن أحمّل؟ / What should I download?

| حالتك / Your case | الملفات المطلوبة / Required files |
|---|---|
| 🏪 **صيدلية جديدة** (إعداد كامل من الصفر) | 1️⃣ `MASTER-Server` + 2️⃣ `CLIENT-Android` أو `CLIENT-Windows` (حسب تفضيلك) — **أو الحزمة الكاملة أدناه** |
| 💻 **أريد المتابعة من الكمبيوتر فقط** | `MASTER-Server` فقط (يحتوي على واجهة كاملة) |
| 📱 **أريد المتابعة من هاتفي** | `MASTER-Server` + `CLIENT-Android` |
| ➕ **جهاز إضافي** في نفس الصيدلية (الماستر مثبت مسبقاً) | `CLIENT-Android` أو `CLIENT-Windows` — واحد فقط |

---

### 📦 قائمة الملفات في الإصدار v1.6.4 / Files in v1.6.4

| الملف / File | النوع / Type | الحجم / Size | ملاحظات |
|---|---|---|---|
| `CRYSTALA-PHARMACY-MASTER-Server-1.6.4.exe` | 🔴 **مطلوب** | ~288 MB | الخادم الرئيسي — يجب تثبيته أولاً |
| `CRYSTALA-PHARMACY-CLIENT-Windows-1.6.4.exe` | 🟡 يتطلب الماستر | ~188 MB | عميل ويندوز |
| `CRYSTALA-PHARMACY-CLIENT-Android-1.6.4.apk` | 🟡 يتطلب الماستر | ~1 MB | عميل أندرويد |
| `CRYSTALA-PHARMACY-Full-Package-1.6.4.zip` | 🟢 موصى به للمبتدئين | ~478 MB | يحتوي على الثلاثة + دليل التثبيت |

➡️ **للمستخدمين الجدد:** ننصح بتحميل **`Full-Package`** لأنها تحتوي على كل ما تحتاجه مع دليل تثبيت مدمج.

---

### 🚀 خطوات التثبيت / Installation Steps

1. **حمّل** إما `MASTER-Server` أو `Full-Package` من [صفحة الإصدارات / Releases](../../releases).
2. **ثبّت الماستر** على كمبيوتر ويندوز رئيسي في الصيدلية.
3. **احفظ عنوان IP** للكمبيوتر الرئيسي (مثال: `192.168.1.10`).
4. **ثبّت العميل** على أجهزة إضافية (هاتف أندرويد أو كمبيوتر ويندوز آخر).
5. **في العميل، أدخل عنوان IP** الخاص بالماستر للاتصال.

> ⚠️ **تنبيه:** تأكد أن جميع الأجهزة على نفس الشبكة المحلية (Wi-Fi / LAN). العميل لا يعمل عبر الإنترنت العام لأسباب أمنية.

---

## 📊 تفاصيل تقنية / Technical Details

- **Master/Server:** Windows desktop app (.exe) — manages SQLite/PostgreSQL database
- **Clients:** Connect via local TCP — same subnet required
- **Authentication:** License-based, managed by the Master

---

## 🆘 الدعم / Support

- 📋 [افتح تذكرة / Open an issue](../../issues/new)
- 📖 [دليل التثبيت الكامل / Full install guide](../../wiki)
- 📧 تواصل عبر قسم Issues في المستودع

---

## 📜 الترخيص / License

جميع الحقوق محفوظة © CRYSTALA-PHARMACY.
الاستخدام مرخص لصيدليات معتمدة فقط.
