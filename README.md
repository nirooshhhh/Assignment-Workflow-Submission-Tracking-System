# 📚 Assignment Workflow & Submission Tracking System

A production-ready **RESTful API** built with **Node.js**, **Express.js**, and **MongoDB/Mongoose** for managing academic assignments and student submissions.

---

## 📁 Project Structure

```
assignment-tracker/
│
├── config/
│   └── db.js                 # MongoDB connection
│
├── models/
│   ├── Assignment.js        # Assignment schema
│   └── Submission.js        # Submission schema
│
├── controllers/
│   ├── assignmentController.js
│   └── submissionController.js
│
├── routes/
│   ├── assignmentRoutes.js
│   └── submissionRoutes.js
│
├── middleware/
│   └── logger.js            # request logging middleware
│
├── utils/
│   └── statusHelper.js      # handle active/closed logic
│
├── .env
├── server.js                # entry point
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally **OR** a MongoDB Atlas cluster URI

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create .env file
`MONGO_URI=your_mongodb_connection_string
 PORT=5000` 

### Step 3: Run the Server
```bash
npm run dev
```

Server will start at: **http://localhost:5000**

---

## 🛣️ API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/assignments` | Create new assignment |
| `GET` | `/api/assignments` | Get all assignments |
| `GET` | `/api/assignments/:id` | Get single assignment |
| `PUT` | `/api/assignments/:id` | Update assignment |
| `DELETE` | `/api/assignments/:id` | Delete assignment + submissions |
| `POST` | `/api/submissions/:assignmentIdt` | Submit an assignment |
| `GET` | `/api/submissions/:assignmentId` | Get all submissions for assignment |

---

## 📬 Sample Postman Test Data

### 1. Create Assignment

**POST** `http://localhost:5000/api/assignments`

**Body:**
```json
{
  "title": "DSA Homework",
  "subject": "DSA",
  "description": "Solve problems",
  "dueDate": "2026-06-01"
}
```

**Success Response (201):**
```json
{
    "title": "DSA Homework",
    "subject": "DSA",
    "description": "Solve problems",
    "dueDate": "2026-06-01T00:00:00.000Z",
    "status": "active",
    "_id": "69f5ccb012f5ac81bdf7f550",
    "createdAt": "2026-05-02T10:06:40.248Z",
    "updatedAt": "2026-05-02T10:06:40.248Z",
    "__v": 0
}
```

---

### 2. Get All Assignments

**GET** `http://localhost:5000/api/assignments`

**Success Response (200):**
```json
{
        "_id": "69f5ccb012f5ac81bdf7f550",
        "title": "DSA Homework",
        "subject": "DSA",
        "description": "Solve problems",
        "dueDate": "2026-06-01T00:00:00.000Z",
        "status": "active",
        "createdAt": "2026-05-02T10:06:40.248Z",
        "updatedAt": "2026-05-02T10:06:40.248Z",
        "__v": 0
    },
    {
        "_id": "69f5cd4612f5ac81bdf7f551",
        "title": "Math Homework",
        "subject": "Mathematics",
        "description": "Solve problems",
        "dueDate": "2026-06-01T00:00:00.000Z",
        "status": "active",
        "createdAt": "2026-05-02T10:09:10.416Z",
        "updatedAt": "2026-05-02T10:09:10.416Z",
        "__v": 0
    }
```

---

### 3. Get Assignment by ID

**GET** `http://localhost:5000/api/assignments/69f5ccb012f5ac81bdf7f550`

**Success Response (200):**
```json
{
    "_id": "69f5ccb012f5ac81bdf7f550",
    "title": "DSA Homework",
    "subject": "DSA",
    "description": "Solve problems",
    "dueDate": "2026-06-01T00:00:00.000Z",
    "status": "active",
    "createdAt": "2026-05-02T10:06:40.248Z",
    "updatedAt": "2026-05-02T10:06:40.248Z",
    "__v": 0
}
```

---

### 4. Update Assignment

**PUT** `http://localhost:5000/api/assignments/69f5ccb012f5ac81bdf7f550`

**Body:**
```json
{
  "title": "Updated Title",
  "subject": "Science",
  "description": "Updated description",
  "dueDate": "2026-06-10"
}
```

**Success Response (200):**
```json
{
    "_id": "69f5ccb012f5ac81bdf7f550",
    "title": "Updated Title",
    "subject": "Science",
    "description": "Updated description",
    "dueDate": "2026-06-10T00:00:00.000Z",
    "status": "active",
    "createdAt": "2026-05-02T10:06:40.248Z",
    "updatedAt": "2026-05-02T10:12:02.245Z",
    "__v": 0
}
```

---

### 5. Delete Assignment

**DELETE** `http://localhost:5000/api/assignments/665a1b2c3d4e5f6789abcdef`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Assignment and all related submissions deleted successfully."
}
```

---

### 6. Submit Assignment

**POST** `http://localhost:5000/api/submissions/69f5ccb012f5ac81bdf7f550`

**Body:**
```json
{
  "studentName": "Nirosh",
  "content": "My answers"
}
```

**Success Response (201):**
```json
{
    "assignmentId": "69f5ccb012f5ac81bdf7f550",
    "studentName": "Nirosh",
    "content": "My answers",
    "_id": "69f5ce3012f5ac81bdf7f552",
    "submittedAt": "2026-05-02T10:13:04.997Z",
    "createdAt": "2026-05-02T10:13:04.998Z",
    "updatedAt": "2026-05-02T10:13:04.998Z",
    "__v": 0
}
```

**Error — Duplicate Submission (409):**
```json
{
    "message": "You have already submitted this assignment"
}
```

---

### 7. Get All Submissions for Assignment

**GET** `http://localhost:5000/api/submissions`

**Success Response (200):**
```json
 {
        "_id": "69f5cffd12f5ac81bdf7f554",
        "assignmentId": "69f5cfdf12f5ac81bdf7f553",
        "studentName": "Nirosh",
        "content": "My answers2",
        "submittedAt": "2026-05-02T10:20:45.340Z",
        "createdAt": "2026-05-02T10:20:45.341Z",
        "updatedAt": "2026-05-02T10:20:45.341Z",
        "__v": 0
    },
    {
        "_id": "69f5d4fb24fbef1b9e206e91",
        "assignmentId": "69f5d4e324fbef1b9e206e90",
        "studentName": "Nirosh",
        "content": "My answers2",
        "submittedAt": "2026-05-02T10:42:03.547Z",
        "createdAt": "2026-05-02T10:42:03.548Z",
        "updatedAt": "2026-05-02T10:42:03.548Z",
        "__v": 0
    }
```

---

### 3. Get Assignment by ID

**GET** `http://localhost:5000/api/submissions/69f5d4e324fbef1b9e206e90`

**Success Response (200):**
```json
[
    {
        "_id": "69f5d4fb24fbef1b9e206e91",
        "assignmentId": "69f5d4e324fbef1b9e206e90",
        "studentName": "Nirosh",
        "content": "My answers2",
        "submittedAt": "2026-05-02T10:42:03.547Z",
        "createdAt": "2026-05-02T10:42:03.548Z",
        "updatedAt": "2026-05-02T10:42:03.548Z",
        "__v": 0
    }
```

---

## 🧰 Tech Stack

### 🔹 Backend
- Node.js – JavaScript runtime environment  
- Express.js – Web framework for building APIs  

### 🔹 Database
- MongoDB – NoSQL database  
- Mongoose – ODM for MongoDB  

### 🔹 Tools & Packages
- dotenv – Manage environment variables  
- nodemon – Auto-restart server during development  

### 🔹 Testing
- Postman – API testing tool  

### 🔹 Version Control
- Git – Version control system  
- GitHub – Code hosting platform
