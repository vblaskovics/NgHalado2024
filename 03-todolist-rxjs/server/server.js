// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = []; // In-memory "database" for todos

// Create a new todo
app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const newTodo = {
        id: todos.length + 1,
        title,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    res.json(todo);
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    const { title, completed } = req.body;
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({ error: 'Todo not found' });

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
