# Webskitters interview test (Node.js, Express, MongoDB)

## 📌 Overview

This is a **Webskitters interview test** built using **Node.js, Express, MongoDB**. It allows users to register, authenticate via JWT, create and manage question answers and categories.

## 🚀 Features

- **User Authentication** with JWT
- **Email verification** through nodemailer
- **Seeding of Categories**
- **CSV import**
- **CRUD operations** for questions and answers
- **MongoDB Integration** with Mongoose
- **TypeScript Support**
- **Environment Variable Configuration**
- **Complete Dockerization**

## 🛠️ Installation

### 1. Clone the repository

```sh
git clone https://github.com/SaptakBN/webskitters-test.git
cd webskitters-test
```

### 2. Go inside server directory and install dependencies

```sh
cd server
npm i
```

### 2. Due to security reasons i have not shared my smtp details

> Please go to the .env and change the EMAIL and EMAIL_PASS to valid smtp otherwise email verification will not work

### 3. Move to Root directory and launching docker containers

```sh
cd ..
npm start
```

### 4. Server should be listning on

```sh
http://localhost:5000
```

### 5. Database should be listning on

```sh
mongodb://localhost:27018/test
```

### 6. Sample file for csv has been provided in the root directory for bulk question intert

```sh
sample.csv
```

## 📌 API Endpoints

### 🟢 User Authentication

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/register`      | Register a new user            |
| POST   | `/api/login`         | Authenticate user & return JWT |
| GET    | `/api/verify/:token` | Verify user email              |

### 👤 User Management

| Method | Endpoint                   | Description                               |
| ------ | -------------------------- | ----------------------------------------- |
| GET    | `/api/user/profile`        | Get user profile (auth required)          |
| PUT    | `/api/user/profile/update` | Update user profile (auth + image upload) |

### 🏷️ Category Management

| Method | Endpoint                       | Description                                        |
| ------ | ------------------------------ | -------------------------------------------------- |
| GET    | `/api/category/`               | Get all categories (auth required)                 |
| GET    | `/api/category/question-count` | Get categories with question count (auth required) |
| GET    | `/api/category/:categoryId`    | Get questions by category (auth required)          |

### ❓ Question Management

| Method | Endpoint                           | Description                                   |
| ------ | ---------------------------------- | --------------------------------------------- |
| POST   | `/api/question/upload`             | Upload questions via CSV (auth + file upload) |
| POST   | `/api/question/answer/:questionId` | Answer a specific question (auth required)    |
| GET    | `/api/question/search`             | Search questions with answers (auth required) |

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
