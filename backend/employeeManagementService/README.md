# Employee Management Service

Employee Management Service for Hotel Management System - manages employee information, departments, positions, and status.

## Features
- Create, Read, Update, Delete employee records
- Search employees by name
- Filter by department, position, and status
- Track employee hire dates and salaries
- Manage employee status (ACTIVE, INACTIVE, ON_LEAVE)

## Technology Stack
- Java 21
- Spring Boot 3.2.1
- Spring Data JPA
- H2 Database (in-memory)
- Maven

## API Endpoints

### Employee Operations
- `POST /api/employees` - Create new employee
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `GET /api/employees/email/{email}` - Get employee by email
- `GET /api/employees/department/{department}` - Get employees by department
- `GET /api/employees/status/{status}` - Get employees by status
- `GET /api/employees/position/{position}` - Get employees by position
- `GET /api/employees/search?name={name}` - Search employees by name
- `PUT /api/employees/{id}` - Update employee
- `PATCH /api/employees/{id}/status?status={status}` - Update employee status
- `DELETE /api/employees/{id}` - Delete employee

## Configuration
- **Server Port**: 8085
- **Database**: H2 in-memory database
- **H2 Console**: http://localhost:8085/h2-console
- **Database URL**: jdbc:h2:mem:employeedb

## Running the Service

### Using Maven
```bash
mvn spring-boot:run
```

### Using JAR
```bash
mvn clean package
java -jar target/employeeManagementService-0.0.1-SNAPSHOT.jar
```

### Using Docker
```bash
docker build -t employee-service .
docker run -p 8085:8085 employee-service
```

## Employee Model
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@hotel.com",
  "phone": "+1234567890",
  "position": "Front Desk Manager",
  "department": "Reception",
  "salary": 45000.00,
  "hireDate": "2024-01-15",
  "status": "ACTIVE",
  "address": "123 Main St, City, Country"
}
```

## Health Check
- http://localhost:8085/actuator/health
