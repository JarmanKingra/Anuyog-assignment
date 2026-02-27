# Consistency Tracker – Habit Tracking Application

A full-stack habit tracking application built with Node.js, Express, MongoDB, and JWT authentication.  
The app allows users to create habits, track daily completions, and analyze consistency using dynamic streak and completion calculations.

---

## 🚀 Live Demo

🔗 Live Link: [Add your deployed frontend URL here]  
🔗 Backend API: [Add backend URL if deployed separately]

---

## 🛠 Tech Stack

### Backend
- Node.js (v22+)
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Express Rate Limiting

### Frontend
- Next.js (App Router)
- Zustand (State Management)
- Tailwind CSS
- Chart.js (Data Visualization)

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- Password hashing
- JWT-based authentication
- Protected routes
- Ownership enforcement at database query level

### 📌 Habit Management
- Create habit
- View user's habits
- Edit habit
- Delete habit
- Mark habit as complete (daily)

### 📊 Analytics & Streak Logic
- Current streak calculation (active logic)
- Maximum streak calculation
- Completion rate percentage
- Total completions
- Habit duration tracking
- Visual consistency chart (Doughnut Chart)

### 🧠 Smart Design Decisions
- Dates stored as `"YYYY-MM-DD"` string to avoid timezone shift issues
- Streak values are computed dynamically (not stored in DB) to prevent stale derived data
- Compound unique index `{ habit, date }` prevents duplicate daily completion
- Optimized queries to avoid N+1 request issues

### 🛡 Security Enhancements
- Global API rate limiting (200 requests / 15 minutes per IP)
- Strict login rate limiting (5 attempts / 10 minutes per IP)
- Prevents brute-force and API abuse attacks

---
## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository


git clone <https://github.com/JarmanKingra/Anuyog-assignment.git>


### 2️⃣ Backend Setup


cd backend
npm install
npm run dev


Create `.env` file in backend:


PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


### 3️⃣ Frontend Setup


cd frontend
npm install
npm run dev


---

## 📈 Streak Calculation Logic

### Current Streak
- If today is not completed → start checking from yesterday
- Iteratively check previous days until a break is found

### Max Streak
- Logs sorted chronologically
- Compare day difference (1 day = continuous streak)
- Track maximum sequence

### Completion Rate


(totalCompletions / totalDaysSinceCreation) × 100


---

## 🧪 Optimization Improvements

- Consolidated queries to reduce API overhead
- Used Set for O(1) lookup in streak calculations
- Clean separation of business logic and route handling

---

## 🎯 Future Improvements (Optional Enhancements)

- Docker containerization
- CI/CD pipeline
- Redis caching for analytics
- Email verification
- Habit reminders

---

## 📄 License

This project is built for learning and demonstration purposes.

---

## 👨‍💻 Author

Jarman Jot Singh  
GitHub: https://github.com/JarmanKingra
LinkedIn: https://www.linkedin.com/in/jarman-jot-singh-53638623a/
