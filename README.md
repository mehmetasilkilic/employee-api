# Employee Management API - Setup Instructions

This is a simple API server that you'll use to build your Employee Management application. Follow these steps to get it running:

## Quick Setup

1. Clone the repository:

```bash
git clone https://github.com/mehmetasilkilic/employee-api
cd employee-api
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The API will be running at `http://localhost:3000`

## Available API Endpoints

1. Get All Employees (Paginated)

```
GET http://localhost:3000/api/employees?page=1&limit=10
```

2. Get Single Employee

```
GET http://localhost:3000/api/employees/:id
```

3. Create Employee

```
POST http://localhost:3000/api/employees
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfEmployment": "2023-01-15",
  "dateOfBirth": "1990-05-20",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com",
  "department": "Tech",
  "position": "Senior"
}
```

4. Update Employee

```
PUT http://localhost:3000/api/employees/:id
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfEmployment": "2023-01-15",
  "dateOfBirth": "1990-05-20",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com",
  "department": "Tech",
  "position": "Senior"
}
```

5. Delete Employee

```
DELETE http://localhost:3000/api/employees/:id
```

## Employee Data Structure

```typescript
interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfEmployment: string; // Format: YYYY-MM-DD
  dateOfBirth: string; // Format: YYYY-MM-DD
  phoneNumber: string;
  email: string;
  department: "Analytics" | "Tech";
  position: "Junior" | "Medior" | "Senior";
}
```

## Notes

- The API uses an in-memory database, so data will be reset when the server restarts
- Two sample employees are included by default
- The server includes CORS support for local development
- All endpoints return JSON responses
