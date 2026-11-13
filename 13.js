const express = require('express');
const app = express();
const port = 3000;

// 1. كتابة الـ Middleware الخاص بنا (Logger)
const logger = (req, res, next) => {
    const time = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    console.log(`[${time}] ${method} request to ${url}`);

    // استدعاء next() ضروري جداً لكي لا يعلق الطلب!
    next();
};

// 2. تفعيل الـ Middleware لكل المسارات
app.use(logger);

// Routes
app.get('/api/users', (req, res) => {
    res.json({ message: 'Users list' });
});

app.get('/api/products', (req, res) => {
    res.json({ message: 'Products list' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});