
# 🌐 Full-Stack User Management System

A **secure and dynamic full-stack web application** built using **React (frontend)** and **Node.js, Express, MySQL (backend)**.  
It follows the **MVC architecture**, implements **JWT authentication**, and provides CRUD functionalities for Users, Countries, and States.

---

## 📁 Folder Structure

```
project/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── stateController.js
│   └── countryController.js
│
├── models/
│   ├── userModel.js
│   ├── stateModel.js
│   └── countryModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── stateRoutes.js
│   └── countryRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── .env
├── .env-example
├── server.js
│
└── frontend/
    ├── public/
    └── src/
        ├── api/
        ├── assets/
        ├── components/
        ├── pages/
        └── styles/
```

---

## 🚀 Features

### 🖥️ Backend (Node.js + Express + MySQL)
- 🔐 JWT Authentication (Login & Register)
- ✨ CRUD Operations for Users, Countries, and States
- 🧩 Modular MVC Structure
- 🧠 Secure Environment Variables using `.env`
- 🧱 Protected API Routes with Middleware

### 🌐 Frontend (React + Bootstrap)
- 💡 Modern UI with React and Bootstrap
- 📋 Login and Registration Forms
- 🧾 User Dashboard with Add/Edit/Delete Functionality
- 🔔 Toast Notifications for Alerts
- 📱 Responsive Design

---

## ⚙️ Installation Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/user-management-system.git
cd user-management-system
```

### Step 2: Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the root directory:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=user_management
JWT_SECRET=your_jwt_secret
```

Run the backend server:
```bash
npm start
```

### Step 3: Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

**Frontend:** http://localhost:5173  
**Backend:** http://localhost:5000

---

## 🧱 Database Schema

### 🧍‍♀️ users
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(100) | User’s name |
| email | VARCHAR(100) | User’s email |
| phone | VARCHAR(20) | User’s phone number |
| city | VARCHAR(100) | City name |
| state_id | INT | Foreign key (states) |
| country_id | INT | Foreign key (countries) |
| pincode | VARCHAR(10) | Postal code |

### 🌍 countries
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(100) | Country name |
| country_code | VARCHAR(10) | Country code |

### 🏙️ states
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(100) | State name |
| country_id | INT | Foreign key (countries) |

---

## 🧠 API Endpoints Overview

### 🔐 Auth Routes (`/api/auth`)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and get JWT token |

### 🌍 Country Routes (`/api/countries`)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/createCountryAPI` | Add new country *(Protected)* |
| GET | `/listCountriesAPI` | Get all countries |

### 🏙️ State Routes (`/api/states`)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/createStateAPI` | Add new state *(Protected)* |
| GET | `/listStatesAPI` | Get all states |

### 🧍 User Routes (`/api/users`)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/createUserAPI` | Add new user *(Protected)* |
| GET | `/listUsersAPI` | Get all users *(Protected)* |
| GET | `/getUserByIdAPI/:id` | Get user by ID *(Protected)* |
| PUT | `/updateUserAPI/:id` | Update user *(Protected)* |
| DELETE | `/deleteUserAPI/:id` | Delete user *(Protected)* |

---

## 🧪 Sample `.env-example`
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=user_management
JWT_SECRET=your_secret_key
```

---

## 🧰 Scripts

### Backend
| Command | Description |
|----------|-------------|
| `npm start` | Run the backend server |
| `npm run dev` | Start server in development mode with Nodemon |

### Frontend
| Command | Description |
|----------|-------------|
| `npm run dev` | Start React frontend |
| `npm run build` | Build for production |

---

## ✨ Future Enhancements
- 🧑‍💼 Role-based Access Control (Admin/User)
- 📦 Pagination & Search in Dashboard
- 🖼️ Profile Image Upload
- 📊 Activity Logs
- 🐳 Docker Integration

---

## 👩‍💻 Author
**Preetiparna Das**  
📍 Odisha, India  
🎓 M.Tech | Java Full Stack Developer Intern @ Dupontengg Pvt. Ltd  
🌐 [GitHub](https://github.com/PPreetiparnaDas)

---

⭐ *If you like this project, give it a star on GitHub!* ⭐
