# 🛒 Online Shop Backend

Backend API for an online shop built with Node.js and Express. This project provides user management, authentication, as well as product and cart management depending on the user's role.

---

## 📦 Features

- 🔐 User registration and login (Register / Login)
- 👤 Role-based system
  - **Admin**
  - **User**
- 🛍️ Product management (CRUD)
- 🧺 Cart functionality
  - Add products to cart
  - Update product quantity
  - Add new product if it does not exist

---

## 👥 Roles

### 🛡️ Admin
- Can create, read, update, and delete products (CRUD operations)

### 🙋 User
- Can add products to the cart
- If a product already exists, increase the quantity
- If a product does not exist, add it as a new product

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **Joi** – validation
- **dotenv** – environment variables
- **nanoid** – unique ID generation
- **nodemon** – development tool

---

## 📁 Project Structure (example)

```text
online-shop-backend/
│
├── db/
├── helper/
├── middleware/
├── routes/
├── schemas/
├── .env
├── index.js
└── package.json


## ⚙️ Installation

```bash
git clone https://github.com/your-username/online-shop-backend.git
cd online-shop-backend
npm install


## 🚀 Run Project

Development mode:

```bash
npm run dev


## 🔐 Environment Variables

Create a `.env` file and add the following example:

```env
PORT=3000



## 📡 API Endpoints (example)

### 🔑 Auth

| Method | Endpoint       | Description       |
|--------|----------------|-------------------|
| POST   | /auth/register | User registration |
| POST   | /auth/login    | User login        |
| POST   | /auth/logout   | User logout       |


### 📦 Products

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| GET    | /products      | Get all products        |
| POST   | /products      | Create product  (Admin) |
| PUT    | /products      | Update products (Admin) |
| PATCH  | /products/:id  | Update product  (Admin) |
| DELETE | /products/:id  | Delete product  (Admin) |



### 🧺 Basket

| Method | Endpoint             | Description                     |
|----------|--------------------|---------------------------------|
| GET      | /basket            | Get users basket                |
| GET      | /basket/:id        | Get user basket                 |
| POST     | /basket            | Add product to cart             |
| PUT      | /basket            | Update basket (Admin)           |
| PATCH    | /basket/:id        | Update product quantity         |


## 🧪 Validation

All requests are validated using the `Joi` library.


## 🧾 Scripts

```json
"scripts": {
  "dev": "nodemon index.js"
}


## 📌 Notes

- Authentication is implemented using **session-based mechanism**
- Endpoints are restricted based on user roles
- Product IDs are generated using `nanoid`


## ✨ Author

Avo