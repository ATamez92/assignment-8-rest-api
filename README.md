# Assignment 9 — Database-Backed REST API

A RESTful API built using Node.js, Express, and PostgreSQL for Assignment 9.

This application extends the previous Assignment 8 REST API by replacing its in-memory JavaScript array with a persistent PostgreSQL database.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- node-postgres (`pg`)
- Nodemon
- Postman

## Getting Started

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a local PostgreSQL database named `assignment9_db`.
4. Create an `items` table with the columns `id`, `title`, `description`, and `completed`.
5. Create a `.env` file in the project root containing the database connection settings.
6. Run `npm run dev` to start the Express server.

The API runs at `http://localhost:3000`.

### Environment Variables

The `.env` file should contain the following settings, with the password replaced by your own PostgreSQL credentials:

```dotenv
PGHOST=localhost
PGPORT=5432
PGDATABASE=assignment9_db
PGUSER=postgres
PGPASSWORD=YOUR_POSTGRESQL_PASSWORD
```

The `.env` file is excluded from Git using `.gitignore`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/items` | Retrieve all database records |
| GET | `/api/items/:id` | Retrieve one item by ID |
| POST | `/api/items` | Create and save a new item |
| PUT | `/api/items/:id` | Update an existing item |
| DELETE | `/api/items/:id` | Permanently delete an item |

## Postman Testing Results

All five endpoints were tested locally using Postman.

| Method | Endpoint | Status Code | Result |
|---|---|---|---|
| GET | `/api/items` | 200 OK | Retrieved all items from PostgreSQL |
| GET | `/api/items/1` | 200 OK | Retrieved an existing item |
| GET | `/api/items/999` | 404 Not Found | Correctly handled a nonexistent item |
| POST | `/api/items` | 201 Created | Inserted a new database row |
| PUT | `/api/items/:id` | 200 OK | Updated a saved database row |
| DELETE | `/api/items/:id` | 200 OK | Permanently deleted a database row |
| GET | `/api/items/:id` after deletion | 404 Not Found | Confirmed that the deleted item no longer exists |

### POST Request Example

**Endpoint:** `POST /api/items`

**Request Body:**

```json
{
  "title": "PostgreSQL API Test",
  "description": "Testing persistent database inserts",
  "completed": false
}
```

**Result:** The server returned `201 Created` with the newly inserted item and its automatically generated database ID.

### PUT Request Example

**Endpoint:** `PUT /api/items/:id`

**Request Body:**

```json
{
  "title": "PostgreSQL API Test - Updated",
  "description": "Successfully updated using PostgreSQL",
  "completed": true
}
```

**Result:** The server returned `200 OK` with the updated row. A subsequent GET request confirmed the changes were saved.

### DELETE Verification

The DELETE request returned `200 OK`. A subsequent GET request for the deleted item's ID returned `404 Not Found`, confirming that PostgreSQL removed the record.

### Database Persistence Test

The Express server was stopped and restarted using `npm run dev`. A GET request after restarting returned the same existing database records and IDs, confirming that resource data persists independently of the Express application's memory.

## Conclusion

The application successfully performs all five REST operations using PostgreSQL. Database-generated identifiers, parameterized SQL queries, input validation, and appropriate HTTP status codes are used throughout the API.