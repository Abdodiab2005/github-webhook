# Webhook Auto Deploy Server

سيرفر Node.js بسيط بيستقبل Webhook من GitHub أو أي منصة Git، وبيعمل `git pull` + إعادة تشغيل التطبيق تلقائيًا.  
مفيد للـ **auto deployment** على أي سيرفر.

---

## 🚀 المتطلبات
- Node.js v14 أو أحدث
- NPM
- PM2 (اختياري للتشغيل الدائم)
- Git

---

## 📥 التثبيت

```bash
# 1. نسخ الريبو
git clone https://github.com/Abdodiab2005/github-webhook.git
cd github-webhook

# 2. تثبيت الحزم
npm install

# هام
لا تنسى تعديل SECRET واضافة مفتاح قوي خاص بك 
