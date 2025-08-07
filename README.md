# Books REST API

A simple REST API built with Node.js and Express to manage a list of books with CRUD operations.

## Features

- **GET /books** - Retrieve all books
- **GET /books/:id** - Retrieve a specific book by ID
- **POST /books** - Create a new book
- **PUT /books/:id** - Update an existing book
- **DELETE /books/:id** - Delete a book

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   node server.js
   ```

3. **Server will run on:** `http://localhost:3000`

## API Endpoints

### 1. Get All Books
- **URL:** `GET /books`
- **Description:** Returns all books in the system
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald"
      }
    ],
    "count": 1
  }
  ```

### 2. Get Book by ID
- **URL:** `GET /books/:id`
- **Description:** Returns a specific book by its ID
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    }
  }
  ```

### 3. Create New Book
- **URL:** `POST /books`
- **Description:** Creates a new book
- **Body:**
  ```json
  {
    "title": "New Book Title",
    "author": "Author Name"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book created successfully",
    "data": {
      "id": 4,
      "title": "New Book Title",
      "author": "Author Name"
    }
  }
  ```

### 4. Update Book
- **URL:** `PUT /books/:id`
- **Description:** Updates an existing book
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book updated successfully",
    "data": {
      "id": 1,
      "title": "Updated Title",
      "author": "Updated Author"
    }
  }
  ```

### 5. Delete Book
- **URL:** `DELETE /books/:id`
- **Description:** Deletes a book by ID
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book deleted successfully",
    "data": {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    }
  }
  ```

## Testing with Postman

1. **Import the following requests into Postman:**

### Get All Books
- Method: `GET`
- URL: `http://localhost:3000/books`

### Get Book by ID
- Method: `GET`
- URL: `http://localhost:3000/books/1`

### Create New Book
- Method: `POST`
- URL: `http://localhost:3000/books`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
  ```json
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen"
  }
  ```

### Update Book
- Method: `PUT`
- URL: `http://localhost:3000/books/1`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
  ```json
  {
    "title": "Updated Book Title",
    "author": "Updated Author Name"
  }
  ```

### Delete Book
- Method: `DELETE`
- URL: `http://localhost:3000/books/1`

## Error Handling

The API includes proper error handling for:
- Missing required fields (400 Bad Request)
- Book not found (404 Not Found)
- Invalid JSON format (400 Bad Request)

## Data Storage

Books are stored in memory (no database required). The initial data includes:
- The Great Gatsby by F. Scott Fitzgerald
- To Kill a Mockingbird by Harper Lee
- 1984 by George Orwell

## Web Interface

The project includes a modern web interface to interact with the API:

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open your browser and go to:** `http://localhost:3000`

3. **Features of the web interface:**
   - 📊 Real-time statistics (total books, last updated)
   - ➕ Add new books with a simple form
   - ✏️ Update existing books
   - 🗑️ Delete books with confirmation
   - 📖 View all books in a beautiful card layout
   - 🔄 Refresh button to reload data
   - 📱 Responsive design for mobile devices

## Project Structure

```
elevate node/
├── server.js                          # Main Express server with all CRUD endpoints
├── index.html                         # Modern web interface
├── package.json                       # Project configuration with start scripts
├── README.md                         # Comprehensive documentation
├── test-api.js                       # Test script to verify functionality
├── Books_API.postman_collection.json # Postman collection for testing
└── node_modules/                     # Dependencies
``` # elevate-rest-api
