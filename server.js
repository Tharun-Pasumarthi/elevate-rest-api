const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// CORS middleware for API requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Error handling middleware for JSON parsing errors
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid JSON format'
        });
    }
    next();
});

// In-memory storage for books
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" }
];

// Helper function to find book by ID
const findBookById = (id) => {
    return books.find(book => book.id === parseInt(id));
};

// Serve the main HTML page (must come before other routes)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API info endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the Books API',
        endpoints: {
            'GET /books': 'Get all books',
            'GET /books/:id': 'Get a specific book',
            'POST /books': 'Create a new book',
            'PUT /books/:id': 'Update a book',
            'DELETE /books/:id': 'Delete a book'
        }
    });
});

// GET /books - Return all books
app.get('/books', (req, res) => {
    res.json({
        success: true,
        data: books,
        count: books.length
    });
});

// GET /books/:id - Return a specific book by ID
app.get('/books/:id', (req, res) => {
    const book = findBookById(req.params.id);
    
    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    res.json({
        success: true,
        data: book
    });
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
    // Validation
    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: 'Title and author are required'
        });
    }
    
    // Generate new ID (simple increment)
    const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
    
    const newBook = {
        id: newId,
        title: title,
        author: author
    };
    
    books.push(newBook);
    
    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook
    });
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const book = findBookById(req.params.id);
    
    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    const { title, author } = req.body;
    
    // Update book properties
    if (title) book.title = title;
    if (author) book.author = author;
    
    res.json({
        success: true,
        message: 'Book updated successfully',
        data: book
    });
});

// DELETE /books/:id - Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook
    });
});

// General error handler
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET    /books');
    console.log('  GET    /books/:id');
    console.log('  POST   /books');
    console.log('  PUT    /books/:id');
    console.log('  DELETE /books/:id');
}); 