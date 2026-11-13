const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// مصفوفة بسيطة لتمثيل قاعدة البيانات
let users = [
    { id: 1, name: 'Rayane', email: 'rayane@example.com' },
    { id: 2, name: 'Ahmed', email: 'ahmed@example.com' }
];

// 1. GET /api/users -> إرجاع كل المستخدمين (200 OK)
app.get('/api/users', (req, res) => {
    res.status(200).json({ success: true, data: users });
});

// 2. GET /api/users/:id -> جلب مستخدم محدد (200 OK أو 404 Not Found)
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        // 404: العنصر غير موجود
        return res.status(404).json({ success: false, error: 'User not found' });
    }

    // 200: تم العثور عليه بنجاح
    res.status(200).json({ success: true, data: user });
});

// 3. POST /api/users -> إضافة مستخدم جديد (201 Created أو 400 Bad Request)
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;

    // 400: البيانات ناقصة من العميل
    if (!name || !email) {
        return res.status(400).json({ success: false, error: 'Name and email are required' });
    }

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);

    // 201: تم إنشاء العنصر بنجاح
    res.status(201).json({ success: true, data: newUser });
});

// 4. مسار معالجة الخطأ غير المتوقع (500 Internal Server Error)
app.get('/api/error-test', (req, res) => {
    try {
        // محاولة تنفيذ كود يتضمن خطأ
        throw new Error('Database connection failed');
    } catch (error) {
        // 500: خطأ داخلي من السيرفر
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// 5. Handling 404 for Unknown Routes (أي مسار غير معرف)
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});