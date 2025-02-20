// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database
let employees = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    dateOfEmployment: "2023-01-15",
    dateOfBirth: "1990-05-20",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
    department: "Tech",
    position: "Senior",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    dateOfEmployment: "2023-02-01",
    dateOfBirth: "1992-08-15",
    phoneNumber: "+1987654321",
    email: "jane.smith@example.com",
    department: "Analytics",
    position: "Medior",
  },
];

// Helper functions
const isEmailUnique = (email, excludeId = null) => {
  return !employees.some((emp) => emp.email === email && emp.id !== excludeId);
};

// GET /api/employees - Get all employees with pagination
app.get("/api/employees", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedEmployees = employees.slice(start, end);

  res.json({
    data: paginatedEmployees,
    pagination: {
      total: employees.length,
      currentPage: page,
      totalPages: Math.ceil(employees.length / limit),
    },
  });
});

// GET /api/employees/:id - Get single employee
app.get("/api/employees/:id", (req, res) => {
  const employee = employees.find((emp) => emp.id === req.params.id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.json(employee);
});

// POST /api/employees - Create new employee
app.post("/api/employees", (req, res) => {
  const newEmployee = req.body;

  // Check for unique email
  if (!isEmailUnique(newEmployee.email)) {
    return res.status(400).json({ error: "Email address already exists" });
  }

  // Add new employee with generated ID
  const employeeWithId = {
    id: uuidv4(),
    ...newEmployee,
  };

  employees.push(employeeWithId);
  res.status(201).json(employeeWithId);
});

// PUT /api/employees/:id - Update employee
app.put("/api/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployee = req.body;

  // Check if employee exists
  const index = employees.findIndex((emp) => emp.id === employeeId);
  if (index === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }

  // Check for unique email
  if (!isEmailUnique(updatedEmployee.email, employeeId)) {
    return res.status(400).json({ error: "Email address already exists" });
  }

  // Update employee
  employees[index] = {
    ...employees[index],
    ...updatedEmployee,
  };

  res.json(employees[index]);
});

// DELETE /api/employees/:id - Delete employee
app.delete("/api/employees/:id", (req, res) => {
  const employeeId = req.params.id;

  // Check if employee exists
  const index = employees.findIndex((emp) => emp.id === employeeId);
  if (index === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }

  // Remove employee
  employees = employees.filter((emp) => emp.id !== employeeId);
  res.status(204).send();
});

// Start server
app.listen(port, () => {
  console.log(`Employee API running at http://localhost:${port}`);
});
