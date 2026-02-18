# ආලකමන්දා Hotel - Employee Management Frontend

Modern and responsive React frontend application for managing hotel employees at **ආලකමන්දා Hotel**.

## 🚀 Features

- **Dashboard**: Real-time statistics and employee overview
- **Employee Directory**: View all employees with search and filtering
- **Employee Details**: Detailed view of individual employee information
- **Add/Edit Employee**: User-friendly forms for employee management
- **Statistics & Analytics**: Department-wise breakdown and insights
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **React 18**: UI library
- **Vite 8 Beta**: Build tool and dev server
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API calls
- **TanStack React Query**: Data fetching and caching
- **Lucide React**: Modern icon library
- **CSS3**: Custom styling with CSS variables

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on http://localhost:8085

## 🔧 Installation

1. **Navigate to the frontend directory**
   ```bash
   cd frontend/employee-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
frontend/employee-management/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Layout.css
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── EmployeeList.jsx
│   │   ├── EmployeeList.css
│   │   ├── EmployeeDetails.jsx
│   │   ├── EmployeeDetails.css
│   │   ├── AddEmployee.jsx
│   │   ├── EditEmployee.jsx
│   │   ├── EmployeeForm.css
│   │   ├── Statistics.jsx
│   │   └── Statistics.css
│   ├── services/         # API service layer
│   │   └── api.js
│   ├── App.jsx           # Root component with routing
│   ├── App.css           # Global styles and design system
│   ├── main.jsx          # Entry point
│   └── index.css         # Base styles
├── package.json
└── vite.config.js
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: Linear gradient from #1e40af to #1e3a8a
- **Secondary Green**: #10b981
- **Accent Gold**: #fbbf24
- **Danger Red**: #ef4444
- **Text Primary**: #1f2937
- **Text Secondary**: #6b7280
- **Background**: #f9fafb

### Components
- Cards with subtle shadows and hover effects
- Gradient buttons with smooth transitions
- Status badges (Active, Inactive, On Leave)
- Responsive tables and forms
- Loading spinners and animations

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:8085/api`. All API calls are centralized in `src/services/api.js`.

### Available API Methods

```javascript
// Employee CRUD
getAllEmployees()
getEmployeeById(id)
createEmployee(data)
updateEmployee(id, data)
deleteEmployee(id)

// Search & Filter
searchEmployees(name)
getEmployeesByDepartment(department)
getEmployeesByStatus(status)

// Statistics
getStatistics()
getDepartmentStatistics()
getActiveEmployeeCount()
getTotalEmployeeCount()
```

## 📱 Pages

### 1. Dashboard (`/`)
- Overview cards (Total, Active, Inactive, On Leave)
- Financial summary (Average Salary, Total Expense)
- Quick action links

### 2. Employee List (`/employees`)
- Table view of all employees
- Search by name or email
- Filter by department and status
- Action buttons (View, Edit, Delete)

### 3. Employee Details (`/employees/:id`)
- Complete employee information
- Avatar with initials
- Contact details and department info
- Edit and delete options

### 4. Add Employee (`/employees/add`)
- Form with validation
- All required fields
- Department and status dropdowns
- Submit to create new employee

### 5. Edit Employee (`/employees/edit/:id`)
- Pre-populated form with current data
- Update employee information
- Validation and error handling

### 6. Statistics (`/statistics`)
- Overall statistics cards
- Department-wise breakdown
- Progress bars showing workforce distribution
- Key insights panel

## 🔄 Routing

```javascript
Route: /                      → Dashboard
Route: /employees             → Employee List
Route: /employees/:id         → Employee Details
Route: /employees/add         → Add Employee
Route: /employees/edit/:id    → Edit Employee
Route: /statistics            → Statistics & Analytics
```

## 🧪 Development

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.3",
  "axios": "^1.7.9",
  "@tanstack/react-query": "^5.64.2",
  "lucide-react": "^0.469.0"
}
```

## 🎯 Features by Page

### Dashboard
- ✅ Real-time employee statistics
- ✅ Financial overview
- ✅ Quick navigation links
- ✅ Responsive stat cards

### Employee Management
- ✅ CRUD operations
- ✅ Search and filter
- ✅ Form validation
- ✅ Error handling
- ✅ Confirmation dialogs

### Statistics
- ✅ Department analytics
- ✅ Workforce distribution
- ✅ Salary insights
- ✅ Visual progress indicators

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- Make sure the backend service is running before starting the frontend
- Default API URL is `http://localhost:8085/api` (can be changed in `api.js`)
- Forms include client-side validation matching backend DTO constraints
- All dates are formatted to local timezone

## 🎨 Customization

### Change API URL
Edit `src/services/api.js`:
```javascript
const API_URL = 'http://your-api-url:port/api';
```

### Modify Colors
Edit `src/App.css` CSS variables:
```css
:root {
  --primary-color: #1e40af;
  --secondary-color: #10b981;
  --accent-color: #fbbf24;
  /* ... more colors */
}
```

## 📄 License

This project is part of the Microservice-Based Hotel Management System.

---

**ආලකමන්දා Hotel** - Employee Management System
