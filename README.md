# assignment-8-rest-api
Node.js and Express REST API for Assignment 8

## API Testing

The REST API was tested locally using Postman while the Express server was running at `http://localhost:3000`.

### Test Results

| HTTP Method | Endpoint | Status Code | Result |
|---|---|---|---|
| GET | `/api/resources` | 200 OK | Successfully retrieved all resources. |
| GET | `/api/resources/1` | 200 OK | Successfully retrieved the resource with ID 1. |
| GET | `/api/resources/99` | 404 Not Found | Correctly returned an error for a nonexistent resource. |
| POST | `/api/resources` | 201 Created | Successfully created a new resource with an automatically generated ID. |
| PUT | `/api/resources/1` | 200 OK | Successfully updated an existing resource while preserving its ID. |
| DELETE | `/api/resources/2` | 200 OK | Successfully deleted the resource with ID 2. |
| GET | `/api/resources/2` | 404 Not Found | Confirmed that the deleted resource could no longer be retrieved. |

### POST Request Example

**Method:** POST

**URL:** `http://localhost:3000/api/resources`

**Request Body:**

```json
{
  "title": "Final API Testing",
  "description": "Verify all REST endpoints",
  "completed": false
}
```

**Result:** The server returned `201 Created` with the submitted properties and an automatically generated resource ID.

### PUT Request Example

**Method:** PUT

**URL:** `http://localhost:3000/api/resources/1`

**Request Body:**

```json
{
  "title": "Task Number One - Updated",
  "description": "Updated successfully using PUT",
  "completed": true
}
```

**Result:** The server returned `200 OK` with the updated resource. A subsequent GET request confirmed the changes were stored in memory.

### DELETE Verification

A DELETE request to `/api/resources/2` returned `200 OK`. A subsequent GET request to the same resource returned `404 Not Found`, confirming successful removal.

### Conclusion

All five required REST endpoints returned the expected HTTP status codes during testing with Postman. The server also recorded incoming request timestamps, HTTP methods, and requested paths through the custom logging middleware.

Resource data is stored in a JavaScript array and resets when the server restarts.