const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    resolve({ status: res.statusCode, data: response });
                } catch (error) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// Test functions
async function testGetAllBooks() {
    console.log('\n1. Testing GET /books - Get all books');
    try {
        const response = await makeRequest('GET', '/books');
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function testGetBookById() {
    console.log('\n2. Testing GET /books/1 - Get book by ID');
    try {
        const response = await makeRequest('GET', '/books/1');
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function testCreateBook() {
    console.log('\n3. Testing POST /books - Create new book');
    try {
        const newBook = {
            title: "Pride and Prejudice",
            author: "Jane Austen"
        };
        const response = await makeRequest('POST', '/books', newBook);
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data.data.id; // Return the new book ID
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

async function testUpdateBook(bookId) {
    console.log(`\n4. Testing PUT /books/${bookId} - Update book`);
    try {
        const updatedBook = {
            title: "Updated Pride and Prejudice",
            author: "Jane Austen (Updated)"
        };
        const response = await makeRequest('PUT', `/books/${bookId}`, updatedBook);
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function testDeleteBook(bookId) {
    console.log(`\n5. Testing DELETE /books/${bookId} - Delete book`);
    try {
        const response = await makeRequest('DELETE', `/books/${bookId}`);
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function testErrorHandling() {
    console.log('\n6. Testing Error Handling');
    
    // Test getting non-existent book
    console.log('\n   Testing GET /books/999 - Non-existent book');
    try {
        const response = await makeRequest('GET', '/books/999');
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
    
    // Test creating book without required fields
    console.log('\n   Testing POST /books - Missing required fields');
    try {
        const invalidBook = { title: "Incomplete Book" }; // Missing author
        const response = await makeRequest('POST', '/books', invalidBook);
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run all tests
async function runTests() {
    console.log('🚀 Starting Books API Tests');
    console.log('Make sure the server is running on http://localhost:3000');
    
    await testGetAllBooks();
    await testGetBookById();
    
    const newBookId = await testCreateBook();
    if (newBookId) {
        await testUpdateBook(newBookId);
        await testDeleteBook(newBookId);
    }
    
    await testErrorHandling();
    
    console.log('\n✅ All tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { makeRequest, runTests }; 