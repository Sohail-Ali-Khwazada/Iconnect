# 💬 iConnect

**iConnect** is a real-time chat application built using the MERN stack and Socket.io. It enables users to sign up, log in, and chat instantly with others. The app includes features like auto-generated profile pictures, online/offline status indicators, and a responsive interface built with Daisy UI.

---

## 🚀 Features

- 🔐 Secure user authentication using JSON Web Tokens (JWT)
- 💬 Real-time one-to-one messaging via Socket.io
- 🔐 End-to-end encryption (E2EE) for secure conversations
- ⌨️ Typing indicators to enhance chat interactivity
- 🖼️ Auto-generated profile pictures of initial according to username
- 🟢 Online/offline user status indicators
- 📱 Fully responsive UI using Daisy UI + Tailwind CSS
- 🔄 RESTful API architecture for frontend-backend communication
- 🧩 Clean and scalable folder structure with separate client and server codebases

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Daisy UI
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose

**Other Tools:**
- Socket.io (real-time communication)
- JWT (authentication)
- CORS and dotenv (config and cross-origin support)

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/f898f263-58ca-497a-8c04-0ca68dbe3b1d)
![image](https://github.com/user-attachments/assets/a837d605-9b9c-4973-91a9-fc5a57b10762)
![image](https://github.com/user-attachments/assets/5e76f0bb-58b2-409c-8d18-f16c855c12be)




---

## 📦 Installation (Local Setup)

### Prerequisites

- Node.js and npm
- MongoDB installed and running locally or a cloud database (e.g., MongoDB Atlas)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Sohail-Ali-Khwazada/Iconnect.git
cd iconnect
```

---

### 2. Backend Setup (`/backend`)

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` folder and add:

```
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
FRONTEND_URI=http://localhost:5173
```

Then start the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup (`/frontend`)

```bash
cd frontend
npm install
```

Create a `.env` file in the `/frontend` folder and add:

```
VITE_BACKEND_URI = "http://localhost:5000"
```

Then start the frontend:

```bash
npm run dev
```

Your React app will start on `http://localhost:5173`

---

## 🌐 Environment Variables

| Variable         | Description                          |
|------------------|--------------------------------------|
| `MONGO_URI`       | MongoDB connection string            |
| `ACCESS_TOKEN_SECRET`      | Secret key for signing JWTs          |
| `FRONTEND_URI`    | Allowed CORS origin (frontend URL)   |

---

## 📁 Folder Structure

```
iconnect/
├── frontend/         # React frontend (Vite)
│   ├── src/
│   ├── public/
│   └── ...
├── backend/         # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── ...
└── README.md
```

---
