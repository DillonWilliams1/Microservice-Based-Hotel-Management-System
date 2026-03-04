# Employee Management Service - Complete Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Backend Service](#backend-service)
- [Frontend Application](#frontend-application)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security](#security)
- [Deployment](#deployment)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Contributing](#contributing)

---

## 🎯 Overview

The Employee Management Service is a full-stack microservice designed for a Hotel Management System. It provides comprehensive employee data management capabilities including CRUD operations, authentication, role-based access control, and statistical analytics.

### Live Deployment
- **Frontend**: [https://employee-management-nu-eight.vercel.app](https://employee-management-nu-eight.vercel.app)
- **Backend**: [http://employee-service-prod.eba-qkxxwi2w.us-east-1.elasticbeanstalk.com](http://employee-service-prod.eba-qkxxwi2w.us-east-1.elasticbeanstalk.com)
- **API Health**: [Health Check](http://employee-service-prod.eba-qkxxwi2w.us-east-1.elasticbeanstalk.com/api/health)

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: ADMIN

---

## 🛠 Technology Stack

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 (Amazon Corretto) | Runtime Environment |
| **Spring Boot** | 3.2.1 | Application Framework |
| **Spring Security** | 6.x | Authentication & Authorization |
| **Spring Data JPA** | 3.x | Data Persistence Layer |
| **JWT (jjwt)** | 0.12.3 | Token-based Authentication |
| **H2 Database** | 2.x | Embedded Database |
| **Hibernate** | 6.x | ORM Framework |
| **Lombok** | Latest | Boilerplate Code Reduction |
| **SpringDoc OpenAPI** | 2.3.0 | API Documentation |
| **Spring Actuator** | 3.x | Health Monitoring |
| **Maven** | 3.x | Build Tool |

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Library |
| **React Router DOM** | 7.13.0 | Client-side Routing |
| **Vite** | 8.0.0-beta.13 | Build Tool & Dev Server |
| **Axios** | 1.13.5 | HTTP Client |
| **TanStack React Query** | 5.90.21 | Data Fetching & Caching |
| **Lucide React** | 0.574.0 | Icon Library |
| **ESLint** | 9.39.1 | Code Linting |

### Deployment Infrastructure
| Service | Technology | Details |
|---------|-----------|---------|
| **Backend Hosting** | AWS Elastic Beanstalk | Platform: Java 17 Corretto, Region: us-east-1 |
| **Instance Type** | AWS EC2 t3.micro | 2 vCPU, 1 GB RAM |
| **Frontend Hosting** | Vercel | Edge Network with Serverless Functions |
| **Database** | H2 File-based | Path: ./data/employeedb |
| **Proxy** | Vercel Serverless Functions | HTTPS to HTTP bridge |
| **Version Control** | GitHub | Source Code Repository |

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser (HTTPS)                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Vercel Frontend (React + Vite)                  │
│           https://employee-management-*.vercel.app           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          Vercel Serverless Proxy (/api/*)                   │
│              (HTTPS → HTTP Bridge)                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│        AWS Elastic Beanstalk (Spring Boot Backend)          │
│   employee-service-prod.eba-qkxxwi2w.us-east-1...          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐      │
│  │   Security   │  │ Controllers  │  │   Services  │      │
│  │   + JWT      │→ │   REST API   │→ │   Business  │      │
│  └──────────────┘  └──────────────┘  └─────────────┘      │
│                                              ↓               │
│                                      ┌─────────────┐        │
│                                      │ Repositories│        │
│                                      └──────┬──────┘        │
│                                             ↓               │
│                                      ┌─────────────┐        │
│                                      │ H2 Database │        │
│                                      │(File-based) │        │
│                                      └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow
1. **User Authentication**: User logs in via React frontend
2. **JWT Generation**: Backend validates credentials and issues JWT token (24h expiration)
3. **Token Storage**: Frontend stores JWT in localStorage
4. **Authenticated Requests**: All API calls include JWT in Authorization header
5. **Token Validation**: Spring Security validates JWT on each request
6. **Response**: Data returned in standardized JSON format

---

## 🔧 Backend Service

### Project Structure
```
backend/employeeManagementService/
├── src/
│   ├── main/
│   │   ├── java/com/nsbm/group03/employeeManagementService/
│   │   │   ├── config/                    # Configuration classes
│   │   │   │   ├── SecurityConfig.java    # Spring Security + CORS
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── DataInitializer.java   # Sample data loader
│   │   │   ├── controller/                # REST Controllers
│   │   │   │   ├── EmployeeController.java
│   │   │   │   ├── AuthController.java
│   │   │   │   └── HealthController.java
│   │   │   ├── dto/                       # Data Transfer Objects
│   │   │   │   ├── EmployeeDTO.java
│   │   │   │   ├── LoginRequest.java
│   │   │   │   └── RegisterRequest.java
│   │   │   ├── entity/                    # JPA Entities
│   │   │   │   └── Employee.java
│   │   │   ├── enums/                     # Enumerations
│   │   │   │   ├── Department.java
│   │   │   │   ├── EmployeeStatus.java
│   │   │   │   └── Role.java
│   │   │   ├── exception/                 # Exception Handling
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   ├── repository/                # Data Access Layer
│   │   │   │   └── EmployeeRepository.java
│   │   │   ├── response/                  # Response Wrappers
│   │   │   │   └── ApiResponse.java
│   │   │   ├── service/                   # Business Logic
│   │   │   │   ├── EmployeeService.java
│   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   └── JwtService.java
│   │   │   └── EmployeeManagementServiceApplication.java
│   │   └── resources/
│   │       └── application.properties     # Configuration
│   └── test/                              # Unit Tests
├── pom.xml                                # Maven Dependencies
├── Dockerfile                             # Docker Configuration
├── Procfile                               # Heroku Deployment
├── AUTHENTICATION_GUIDE.md                # Auth Documentation
└── README.md
```

### Key Backend Components

#### 1. Security Configuration (`SecurityConfig.java`)
- **JWT Authentication**: Token-based stateless authentication
- **CORS Configuration**: Allows requests from:
  - `http://localhost:5173` (Development)
  - `http://localhost:3000` (Alternative Dev)
  - `https://employee-management-nu-eight.vercel.app` (Production)
- **Password Encoding**: BCrypt with strength 12
- **Public Endpoints**: `/api/auth/**`, `/api/health`, `/actuator/**`, `/swagger-ui/**`
- **Protected Endpoints**: All `/api/employees/**` routes require authentication

#### 2. JWT Service (`JwtService.java`)
- **Algorithm**: HS384 (HMAC with SHA-384)
- **Token Expiration**: 24 hours
- **Claims**: Subject (username), Issued At, Expiration
- **Secret Key**: 256-bit secure random key

#### 3. Employee Entity (`Employee.java`)
```java
@Entity
@Table(name = "employees")
public class Employee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;      // Unique, required
    private String password;      // BCrypt encrypted
    private String email;         // Unique, required
    private String firstName;
    private String lastName;
    private String phone;
    private String position;
    
    @Enumerated(EnumType.STRING)
    private Department department;  // FRONT_DESK, HOUSEKEEPING, etc.
    
    @Enumerated(EnumType.STRING)
    private EmployeeStatus status;  // ACTIVE, INACTIVE, ON_LEAVE
    
    @Enumerated(EnumType.STRING)
    private Role role;              // ADMIN, MANAGER, EMPLOYEE
    
    private BigDecimal salary;
    private LocalDate hireDate;
    private String address;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

#### 4. Employee Repository (`EmployeeRepository.java`)
Custom queries for advanced search:
- `findByUsername(String username)`
- `findByEmail(String email)`
- `findByDepartment(Department department)`
- `findByStatus(EmployeeStatus status)`
- `findByFirstNameContainingOrLastNameContaining(String firstName, String lastName)`
- `countByStatus(EmployeeStatus status)`

#### 5. Data Initialization (`DataInitializer.java`)
- Creates admin user on startup if doesn't exist
- Loads 30+ sample employees across departments
- Ensures data consistency with idempotent operations

### API Endpoints

#### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Login with username/password | ❌ |
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/validate` | Validate JWT token | ✅ |

#### Employee Management Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/employees` | Get all employees | ✅ |
| GET | `/api/employees/{id}` | Get employee by ID | ✅ |
| POST | `/api/employees` | Create new employee | ✅ |
| PUT | `/api/employees/{id}` | Update employee | ✅ |
| DELETE | `/api/employees/{id}` | Delete employee | ✅ |
| PATCH | `/api/employees/{id}/status` | Update status | ✅ |
| GET | `/api/employees/search` | Search by name | ✅ |
| GET | `/api/employees/department/{dept}` | Filter by department | ✅ |
| GET | `/api/employees/status/{status}` | Filter by status | ✅ |
| GET | `/api/employees/statistics` | Get statistics | ✅ |
| GET | `/api/employees/statistics/departments` | Department stats | ✅ |
| GET | `/api/employees/count` | Total count | ✅ |
| GET | `/api/employees/count/active` | Active count | ✅ |

#### Health & Monitoring
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Service health check | ❌ |
| GET | `/actuator/health` | Detailed health info | ❌ |
| GET | `/swagger-ui.html` | API Documentation | ❌ |

### API Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* Response payload */ },
  "timestamp": "2026-03-04T02:10:33.265211023"
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "timestamp": "2026-03-04T02:10:33.265211023"
}
```

---

## 💻 Frontend Application

### Project Structure
```
frontend/employee-management/
├── src/
│   ├── components/              # Reusable Components
│   │   ├── EmployeeCard.jsx    # Employee display card
│   │   ├── EmployeeForm.jsx    # Create/Edit form
│   │   ├── EmployeeList.jsx    # Employee grid/list
│   │   ├── SearchBar.jsx       # Search functionality
│   │   ├── FilterPanel.jsx     # Department/Status filters
│   │   ├── StatCard.jsx        # Statistics card
│   │   └── Navbar.jsx          # Navigation bar
│   ├── pages/                   # Page Components
│   │   ├── Login.jsx           # Authentication page
│   │   ├── Dashboard.jsx       # Main dashboard with stats
│   │   ├── EmployeeManagement.jsx  # Employee CRUD
│   │   ├── CreateEmployee.jsx  # New employee form
│   │   └── EditEmployee.jsx    # Edit employee form
│   ├── context/                 # React Context
│   │   └── AuthContext.jsx     # Authentication state
│   ├── services/                # API Services
│   │   └── api.js              # Axios instance & services
│   ├── assets/                  # Static assets
│   ├── App.jsx                  # Root component
│   ├── main.jsx                # Entry point
│   ├── App.css                 # Global styles
│   └── index.css               # Base styles
├── api/                         # Vercel Serverless Functions
│   └── proxy.js                # HTTPS to HTTP proxy
├── public/                      # Public assets
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── vercel.json                 # Vercel deployment config
├── package.json                # Dependencies
└── README.md
```

### Key Frontend Components

#### 1. Authentication Context (`AuthContext.jsx`)
- Manages user authentication state
- Provides login/logout functions
- Stores JWT token in localStorage
- Automatic token validation
- Protected route handling

#### 2. API Service (`api.js`)
```javascript
// Environment-based API endpoint
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'  // Vercel proxy
  : 'http://employee-service-prod.eba-qkxxwi2w...';  // Direct

// Request interceptor: Adds JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Handles 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

#### 3. Vercel Proxy Function (`api/proxy.js`)
Solves Mixed Content security issues (HTTPS → HTTP):
```javascript
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  
  // Extract path and forward to backend
  const { path } = req.query;
  const backendUrl = `http://employee-service-prod.eba-qkxxwi2w.../${path}`;
  
  // Forward request with headers and body
  const response = await fetch(backendUrl, {
    method: req.method,
    headers: { ...req.headers },
    body: req.body
  });
  
  // Return response
  res.status(response.status).json(await response.json());
}
```

#### 4. Routing (`App.jsx`)
```javascript
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/employees" element={<ProtectedRoute><EmployeeManagement /></ProtectedRoute>} />
  <Route path="/employees/create" element={<ProtectedRoute><CreateEmployee /></ProtectedRoute>} />
  <Route path="/employees/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
</Routes>
```

### UI Features
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark/Light Theme**: Modern gradient backgrounds
- **Real-time Search**: Instant employee filtering
- **Department Filters**: Quick filter by department/status
- **Statistics Dashboard**: Visual cards showing key metrics
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Skeleton loaders during data fetch
- **Error Handling**: User-friendly error messages
- **Success Notifications**: Toast-style confirmations

---

## ✨ Features

### Authentication & Authorization
✅ **JWT Token-based Authentication**
- 24-hour token expiration
- Secure token storage in localStorage
- Automatic token refresh on page reload
- Session persistence

✅ **Role-based Access Control (RBAC)**
- ADMIN: Full access to all features
- MANAGER: Employee management access
- EMPLOYEE: Read-only access (future)

✅ **Secure Password Management**
- BCrypt hashing with salt
- Password strength validation (planned)
- Password reset functionality (planned)

### Employee Management
✅ **CRUD Operations**
- Create new employees with validation
- Read/View employee details
- Update employee information
- Delete employees with confirmation
- Bulk operations (planned)

✅ **Advanced Search & Filter**
- Search by name (first/last name)
- Filter by department
- Filter by status (Active/Inactive/On Leave)
- Sort by multiple columns (planned)

✅ **Department Management**
- FRONT_DESK
- HOUSEKEEPING
- MAINTENANCE
- FOOD_AND_BEVERAGE
- KITCHEN
- SECURITY
- MANAGEMENT
- ACCOUNTING
- HUMAN_RESOURCES
- IT

✅ **Employee Status Tracking**
- ACTIVE: Currently working
- INACTIVE: Not currently employed
- ON_LEAVE: Temporarily absent
- TERMINATED: Employment ended (planned)

### Dashboard & Analytics
✅ **Statistical Overview**
- Total employee count
- Active employees count
- Department-wise distribution
- Status-wise breakdown
- Salary analytics (planned)
- Hire date trends (planned)

✅ **Visual Data Representation**
- Stat cards with icons
- Color-coded status indicators
- Department distribution charts (planned)
- Performance metrics (planned)

### Technical Features
✅ **API Health Monitoring**
- Spring Boot Actuator integration
- Health check endpoint
- Service status indicators

✅ **CORS Configuration**
- Multiple origin support
- Credentials support
- All HTTP methods allowed

✅ **Data Validation**
- Backend: Bean Validation (JSR-380)
- Frontend: Form validation with error display
- Email format validation
- Phone number validation
- Required field validation

✅ **Error Handling**
- Global exception handler
- User-friendly error messages
- HTTP status code handling
- Network error recovery

✅ **Performance Optimization**
- React Query for data caching
- Lazy loading (planned)
- Code splitting (planned)
- Image optimization (planned)

---

## 📚 API Documentation

### Swagger/OpenAPI
- **URL**: [http://employee-service-prod.eba-qkxxwi2w.us-east-1.elasticbeanstalk.com/swagger-ui.html](http://employee-service-prod.eba-qkxxwi2w.us-east-1.elasticbeanstalk.com/swagger-ui.html)
- **Interactive API Testing**: Test endpoints directly from browser
- **Schema Documentation**: Complete request/response schemas
- **Authentication Support**: Test with JWT tokens

### Sample API Requests

#### Login Request
```bash
curl -X POST http://employee-service-prod.eba-qkxxwi2w.us-east-1.elasticbeanstalk.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### Get All Employees
```bash
curl -X GET http://employee-service-prod.eba-qkxxwi2w.us-east-1.elasticbeanstalk.com/api/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Create Employee
```bash
curl -X POST http://employee-service-prod.eba-qkxxwi2w.us-east-1.elasticbeanstalk.com/api/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username":"john.doe",
    "password":"password123",
    "email":"john.doe@hotel.com",
    "firstName":"John",
    "lastName":"Doe",
    "phone":"0771234567",
    "position":"Receptionist",
    "department":"FRONT_DESK",
    "salary":55000,
    "hireDate":"2024-01-15",
    "status":"ACTIVE",
    "role":"EMPLOYEE",
    "address":"123 Main St, Colombo"
  }'
```

---

## 🗄 Database Schema

### Employee Table
```sql
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100),
    department VARCHAR(50),
    status VARCHAR(20),
    role VARCHAR(20),
    salary DECIMAL(10,2),
    hire_date DATE,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Indexes
- PRIMARY KEY on `id`
- UNIQUE INDEX on `username`
- UNIQUE INDEX on `email`
- INDEX on `department` (for filtering)
- INDEX on `status` (for filtering)

### Database Configuration
```properties
# H2 File-based Database
spring.datasource.url=jdbc:h2:file:./data/employeedb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=admin
spring.datasource.password=admin

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Console (Development only)
spring.h2.console.enabled=false
```

---

## 🔒 Security

### Authentication Flow
1. **User Login**: POST `/api/auth/login` with credentials
2. **Credential Validation**: Backend validates against database
3. **JWT Generation**: Create signed JWT token with claims
4. **Token Response**: Return token + user details to frontend
5. **Token Storage**: Frontend stores in localStorage
6. **Authenticated Requests**: Include token in Authorization header
7. **Token Validation**: Backend validates signature & expiration
8. **Access Grant**: Process request if valid, reject if invalid

### Security Measures
✅ **Password Security**
- BCrypt hashing with cost factor 12
- Never store plain text passwords
- Password validation on registration

✅ **JWT Security**
- HS384 algorithm (HMAC SHA-384)
- 256-bit secret key
- Token expiration (24 hours)
- Subject claim validation

✅ **CORS Policy**
- Whitelist specific origins
- Credentials support enabled
- Preflight request handling

✅ **HTTP Security Headers** (Recommended additions)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy (planned)

✅ **Input Validation**
- Bean Validation annotations
- SQL injection prevention (JPA)
- XSS prevention (planned)

### Security Best Practices Implemented
- ✅ Stateless authentication (JWT)
- ✅ No session management required
- ✅ Secure password storage
- ✅ Token-based API access
- ✅ HTTPS in production (frontend)
- ⏳ Rate limiting (planned)
- ⏳ HTTPS for backend (planned)
- ⏳ API request throttling (planned)

---

## 🚀 Deployment

### Backend Deployment (AWS Elastic Beanstalk)

#### Prerequisites
- AWS CLI installed and configured
- AWS EB CLI installed (`pip install awsebcli`)
- AWS account with appropriate permissions

#### Deployment Steps
```bash
# 1. Navigate to backend directory
cd backend/employeeManagementService

# 2. Build the application
mvn clean package -DskipTests

# 3. Initialize Elastic Beanstalk (first time only)
eb init -p "Corretto 17 running on 64bit Amazon Linux 2023" -r us-east-1

# 4. Create environment (first time only)
eb create employee-service-prod --instance-type t3.micro

# 5. Deploy updates
eb deploy

# 6. Check status
eb status

# 7. View logs
eb logs --all

# 8. Open in browser
eb open
```

#### Configuration
- **Platform**: Java 17 with Corretto on Amazon Linux 2023
- **Instance Type**: t3.micro (2 vCPU, 1 GB RAM)
- **Auto Scaling**: Single instance (cost optimization)
- **Health Monitoring**: Enhanced health reporting enabled
- **Environment Variables**: Set via EB console or `.ebextensions`

#### Health Check
- Endpoint: `/api/health`
- Interval: 30 seconds
- Timeout: 5 seconds
- Healthy threshold: 3
- Unhealthy threshold: 5

### Frontend Deployment (Vercel)

#### Prerequisites
- Vercel CLI installed (`npm i -g vercel`)
- Vercel account linked

#### Deployment Steps
```bash
# 1. Navigate to frontend directory
cd frontend/employee-management

# 2. Install dependencies
npm install

# 3. Build for production (optional, Vercel does this)
npm run build

# 4. Deploy to Vercel
vercel --prod

# 5. View deployment
# URL will be displayed in terminal
```

#### Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/proxy?path=:path*"
    },
    { 
      "source": "/(.*)", 
      "destination": "/index.html" 
    }
  ]
}
```

#### Environment Variables (Vercel)
- `NODE_ENV=production` (automatic)
- API calls routed through `/api` proxy

### Continuous Deployment
- **Backend**: Manual deployment via EB CLI
- **Frontend**: Automatic deployment on git push (if connected to Vercel Git)
- **Recommended**: Set up CI/CD pipeline with GitHub Actions

---

## 💻 Development Setup

### Backend Setup

#### Prerequisites
- Java 17 (OpenJDK or Amazon Corretto)
- Maven 3.6+
- IDE: IntelliJ IDEA / Eclipse / VS Code

#### Steps
```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd backend/employeeManagementService

# 2. Install dependencies
mvn clean install

# 3. Run application
mvn spring-boot:run

# Alternative: Run JAR
mvn clean package
java -jar target/employeeManagementService-0.0.1-SNAPSHOT.jar

# 4. Access application
# API: http://localhost:8080/api
# H2 Console: http://localhost:8080/h2-console (if enabled)
# Swagger: http://localhost:8080/swagger-ui.html
```

#### Application Properties
```properties
# Server Configuration
server.port=8080

# Database
spring.datasource.url=jdbc:h2:file:./data/employeedb

# JWT Secret (Change in production!)
jwt.secret=your-secret-key-here

# CORS Origins
cors.allowed.origins=http://localhost:5173,http://localhost:3000
```

### Frontend Setup

#### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

#### Steps
```bash
# 1. Navigate to frontend directory
cd frontend/employee-management

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# URL: http://localhost:5173

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

#### Environment Configuration
Create `.env` file (optional):
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Development Workflow
1. **Backend**: Start Spring Boot application
2. **Frontend**: Start Vite dev server
3. **Testing**: Use Swagger UI for API testing
4. **Debugging**: Check browser console and network tab
5. **Logging**: Backend logs in console

---

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=EmployeeServiceTest

# Run with coverage
mvn clean test jacoco:report
```

### Frontend Testing (Planned)
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Manual Testing Checklist
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Create new employee
- [ ] Edit existing employee
- [ ] Delete employee
- [ ] Search employees by name
- [ ] Filter by department
- [ ] Filter by status
- [ ] View statistics
- [ ] Logout and session clear
- [ ] Token expiration handling

---

## 🤝 Contributing

### Code Standards
- **Java**: Follow Google Java Style Guide
- **JavaScript/React**: Follow Airbnb JavaScript Style Guide
- **Commits**: Use Conventional Commits format
- **Branching**: Feature branches from `develop`

### Contribution Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example**:
```
feat(auth): add password reset functionality

- Add forgot password endpoint
- Implement email verification
- Add reset token generation

Closes #123
```

---

## 📝 License

This project is part of the Hotel Management System developed for NSBM Green University.

---

## 👥 Development Team

**Project**: Hotel Management System - Microservices Architecture  
**Module**: Employee Management Service  
**Institution**: NSBM Green University  
**Group**: Group 03

---

## 📞 Support & Contact

For issues, questions, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)
- **Email**: YOUR_EMAIL@example.com
- **Documentation**: This README + API Swagger docs

---

## 🔄 Version History

### Version 1.0.0 (Current - March 2026)
- ✅ Initial release with full CRUD functionality
- ✅ JWT authentication and authorization
- ✅ Deployed on AWS Elastic Beanstalk
- ✅ Frontend deployed on Vercel
- ✅ HTTPS proxy for mixed content handling
- ✅ 30+ sample employees with diverse departments
- ✅ Statistics and analytics dashboard
- ✅ Search and filter capabilities

### Planned Features (Version 2.0.0)
- ⏳ HTTPS for backend (AWS Certificate Manager + Load Balancer)
- ⏳ PostgreSQL/MySQL database migration
- ⏳ Advanced analytics and reports
- ⏳ Employee performance tracking
- ⏳ Attendance management integration
- ⏳ Leave management system
- ⏳ Payroll integration
- ⏳ File upload (profile pictures, documents)
- ⏳ Email notifications
- ⏳ Audit logging
- ⏳ Role permissions customization
- ⏳ Dark mode theme
- ⏳ Mobile app (React Native)

---

## 🎓 Learning Resources

### Backend Development
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT.io](https://jwt.io/)
- [AWS Elastic Beanstalk Guide](https://docs.aws.amazon.com/elasticbeanstalk/)

### Frontend Development
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query)
- [Vercel Documentation](https://vercel.com/docs)

### Architecture & Best Practices
- [Microservices Pattern](https://microservices.io/)
- [REST API Design](https://restfulapi.net/)
- [12-Factor App](https://12factor.net/)

---

## 🙏 Acknowledgments

- NSBM Green University for project guidance
- Spring Boot and React communities
- AWS and Vercel for hosting platforms
- Open source contributors

---

**Last Updated**: March 4, 2026  
**Status**: ✅ Production Ready  
**Deployment**: Live on AWS + Vercel

