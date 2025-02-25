# Blog CRUD (Node.js, Express, MongoDB, React and TypeScript)

## 📌 Overview

This is a **Blog CRUD** built using **Node.js, Express, MongoDB, React and TypeScript**. It allows users to register, authenticate via JWT, create and manage blog posts, and includes an admin approval system before posts are published.

## 🚀 Features

- **User Authentication** with JWT
- **CRUD operations** for blog posts
- **Admin Approval System** (only approved posts are listed)
- **MongoDB Integration** with Mongoose
- **TypeScript Support**
- **Environment Variable Configuration**
- **Complete Dockerization**

## 🛠️ Installation

### ⚠️ Make sure you have pnpm installed, if not

```sh
npm install -g pnpm
```

### 1️⃣ Clone the repository

```sh
git clone https://github.com/SaptakBN/interview-crud.git
cd interview-crud
```

### 2️⃣ Setting up dependency and launching docker containers

```sh
npm start
```

### 3️⃣ Server should be listning on

```sh
http://localhost:5000
```

### 4️⃣ Client should be listning on

```sh
http://localhost:3000
```

### 5️⃣ Database should be listning on

```sh
mongodb://localhost:27018/blogDB
```

### 🔑 Admin Credentials

> Admin user already seeded to database.
> Use this user to approve blog posts.

```sh
email: admin@gmail.com
password: 123456
```

## 📌 API Endpoints

### 🟢 User Authentication

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| POST   | `/api/register` | Register a new user            |
| POST   | `/api/login`    | Authenticate user & return JWT |

### 📝 Blog Post Management

| Method | Endpoint        | Description                                      |
| ------ | --------------- | ------------------------------------------------ |
| GET    | `/api/blog`     | Get all **approved** blog posts (sorted by date) |
| POST   | `/api/blog`     | Create a new blog post (default: pending)        |
| GET    | `/api/blog/:id` | Get a single blog post by ID                     |
| PUT    | `/api/blog/:id` | Update a blog post (author only)                 |
| DELETE | `/api/blog/:id` | Delete a blog post (author only)                 |

### 🔑 Admin Actions

| Method | Endpoint            | Description                                                  |
| ------ | ------------------- | ------------------------------------------------------------ |
| GET    | `/api/blog/pending` | Get all **pending** blog posts (sorted by date) (admin only) |
| PATCH  | `/api/admin/:id`    | Approve a blog post (admin only)                             |

### ℹ️ Other Commands

> Start without cache

```sh
npm run start:force
```

> View logs

```sh
npm run logs
```

> Restart containers

```sh
npm run restart
```

> Exit containers

```sh
npm run stop
```
# webskitters-test
# webskitters-test
