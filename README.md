# Basic To-Do List Application

This is a basic To-Do list application that allows users to register, log in, and manage their to-do items. The backend is built with Node.js, Supabase, and MongoDB, and is deployed on Render. The frontend is a simple interface deployed on Netlify.

## Features

- User registration and login
- Create, read, update, and delete to-do items
- User authentication and session management
- Secure storage of user information and to-do items

## Technologies Used

- Node.js
- Express.js
- Supabase
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- CORS
- dotenv

## Getting Started

### Prerequisites

- Node.js v18.x or higher
- MongoDB
- pnpm

### Installation

1. Clone the repository:

```sh
git clone https://github.com/avinash-18-art/task-1--todo-Application.git
cd your-repo

## Project structure 
.
├── backend
│   ├── controllers
│   │   ├── authController.js
│   │   ├── sessionController.js
│   │   └── todoController.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   ├── models
│   │   ├── Session.js
│   │   ├── Todo.js
│   │   └── User.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── sessionRoutes.js
│   │   └── todoRoutes.js
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── public
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── styles.css
│   └── README.md
└── README.md


Install the dependencies:


pnpm install
Set up environment variables:
Create a .env file in the root directory and add the following:



PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_KEY=your-supabase-key
Start the server:


node index.js
API Endpoints
User Authentication
POST /api/auth/register: Register a new user.
Request body: { "email": "test@example.com", "password": "password123" }
POST /api/auth/login: Log in an existing user and create a session.
Request body: { "email": "test@example.com", "password": "password123" }
To-Do Operations
POST /api/todos: Create a new to-do item.
Request body: { "title": "Sample Todo", "description": "This is a sample todo item" }
Requires Authorization header: Bearer <token>
GET /api/todos: Retrieve all to-do items for the logged-in user.
Requires Authorization header: Bearer <token>
PUT /api/todos/
: Update a to-do item by ID.
Request body: { "title": "Updated Title", "description": "Updated description" }
Requires Authorization header: Bearer <token>
DELETE /api/todos/
: Delete a to-do item by ID.
Requires Authorization header: Bearer <token>
Session Management
GET /api/sessions: Retrieve all user sessions.
Requires Authorization header: Bearer <token>
Deployment
Backend
Deploy the backend on Render. Follow Render's documentation for deployment instructions.
Frontend
Create a simple frontend interface (e.g., using HTML, CSS, and JavaScript).
Deploy the frontend on Netlify. Follow Netlify's documentation for deployment instructions.
```