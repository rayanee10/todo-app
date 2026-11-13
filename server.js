const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// مصفوفة لتخزين المهام مؤقتاً
let tasks = [];

// 1. GET: جلب جميع المهام
app.get('/api/tasks', (req, res) => {
    res.status(200).json({
        success: true,
        tasks: tasks
    });
});

// 2. POST: إضافة مهمة جديدة
app.post('/api/tasks', (req, res) => {
    const { task } = req.body;

    if (!task || task.trim() === '') {
        return res.status(400).json({ success: false, error: 'Task text is required' });
    }

    const newTask = {
        id: Date.now(),
        text: task,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json({
        success: true,
        id: newTask.id,
        completed: newTask.completed,
        message: 'Task added successfully'
    });
});

// 3. PUT: تحديث حالة المهمة
app.put('/api/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
    }

    task.completed = !task.completed;

    res.status(200).json({
        success: true,
        completed: task.completed,
        message: `Task ${taskId} updated successfully`
    });
});

// 4. DELETE: حذف مهمة
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const taskExists = tasks.some(t => t.id === taskId);

    if (!taskExists) {
        return res.status(404).json({ success: false, error: 'Task not found' });
    }

    tasks = tasks.filter(t => t.id !== taskId);

    res.status(200).json({
        success: true,
        message: `Task ${taskId} deleted successfully`
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});