# Taskify – Full Stack Todo Application

Taskify is a simple **full-stack Todo application** built to demonstrate real-world integration between a **React (Vite) frontend** and a **Spring Boot backend** using REST APIs. The project follows clean Git practices and is suitable for fresher-level portfolios.

---

## 🚀 Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6)
* HTML, CSS
* Fetch API / Axios

### Backend

* Java 8+
* Spring Boot
* Spring Web (REST APIs)
* Maven

### Database

* MySQL

### Tools

* Git & GitHub
* VS Code / IntelliJ IDEA
* Postman

---

## ✨ Features

* Create, read, update, and delete tasks (CRUD)
* Category-based task organization
* REST API based backend
* Frontend–backend integration
* Clean project structure (separate frontend & backend)
* Proper `.gitignore` configuration (no node_modules / target pushed)

---

## 📂 Project Structure

```
taskify-fullstack/
│
├── frontend/
│   └── taskify-ui/        # React (Vite) frontend
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
├── backend/
│   └── taskify-api/       # Spring Boot backend
│       ├── src/main/java/
│       ├── src/main/resources/
│       ├── pom.xml
│       └── mvnw
│
└── README.md
```

---

## 🔗 Backend API Endpoints

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| GET    | /tasks      | Get all tasks   |
| POST   | /tasks      | Create new task |
| PUT    | /tasks/{id} | Update a task   |
| DELETE | /tasks/{id} | Delete a task   |

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Vinu-Java/taskify-fullstack.git
cd taskify-fullstack
```

---

### 2️⃣ Run Backend (Spring Boot)

```bash
cd backend/taskify-api
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

Make sure MySQL is running and DB credentials are configured in `application.properties`.

---

### 3️⃣ Run Frontend (React)

```bash
cd frontend/taskify-ui
npm install
npm run dev
```

Frontend will start at:

```
http://localhost:5173
```

---

## 🧪 API Testing

* APIs tested using **Postman**
* Frontend communicates with backend via REST APIs

---

## 📌 Notes

* `node_modules/` and `target/` folders are ignored using `.gitignore`
* `.env` files are not committed
* No authentication (JWT) implemented yet (can be added later)

---

## 📈 Future Improvements

* User authentication (JWT)
* User-specific tasks
* Deployment (Vercel + Render)
* UI enhancements

---

## 👤 Author

**Vinu**
Aspiring Java / Full Stack Developer
GitHub: [https://github.com/Vinu-Java](https://github.com/Vinu-Java)

---

⭐ If you like this project, give it a star!
