# 💪 FitLog — Workout Library

**Train with intent. Log every set.**

FitLog is a modern, responsive workout library built with Next.js. It helps users explore exercises, view detailed workout information, organize their daily workout plans, save favorite exercises, and track completed workouts through a clean, dark-themed interface.

## 🌐 Live Demo

- **Live Website:** [fit-log-workout-library-six.vercel.app]
- **GitHub Repository:** [https://github.com/riaduldev/fit-log-app]

## ✨ Key Features

- **🏋️ Workout Library:** Browse exercises with images, muscle group tags, equipment information, duration, calories burned, and ratings.
- **🔍 Workout Details:** View detailed exercise information, including equipment, difficulty, sets, reps, and step-by-step instructions.
- **↕️ Smart Sorting:** Sort workouts by duration, calories burned, or rating to find suitable exercises easily.
- **📋 Today's Plan:** Add exercises to your daily workout plan and organize your training session with a five-exercise limit.
- **⭐ Save for Later:** Save favorite workouts and access them from the Saved tab on the My Plan page.
- **✅ Workout Tracking:** Mark planned exercises as completed and remove workouts when needed.
- **📊 Live Statistics:** Track the number of planned exercises, total workout duration, and estimated calories burned.
- **🔔 Toast Notifications:** Receive feedback when adding, saving, completing, or removing exercises.
- **📱 Fully Responsive Design:** Enjoy a consistent experience across mobile phones, tablets, laptops, and desktop screens.
- **⏳ Loading & Empty States:** Get clear feedback while workout data loads and when no exercises are available.
- **🚫 Custom 404 Page:** Display a user-friendly page for invalid routes.
- **💾 Persistent Data:** Store workout plan and saved exercise data in localStorage, if enabled in the implementation.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Application structure, routing, and page rendering |
| React | Component-based UI and interactive features |
| JavaScript / JSX | Application logic and UI development |
| Tailwind CSS | Utility-first styling and responsive layouts |
| daisyUI | Additional UI components and styling utilities |
| Lucide React | Icons for buttons, navigation, and workout statistics |
| React Toastify | Toast notifications for user actions |
| REST API | Fetching workout and exercise data |
| localStorage | Client-side persistence for plans and saved workouts, if implemented |
| Vercel | Deployment and hosting |

## 🧰 API Documentation

FitLog uses a REST API to retrieve workout information.

**Primary API**

- Get all workouts: `https://api.abcz.workers.dev/api/fitlog`
- Get a single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

**Alternative API**

- Get all workouts: `https://api.api-store.workers.dev/api/fitlog`
- Get a single workout: `https://api.api-store.workers.dev/api/fitlog/:id`

Replace `:id` with the ID of the workout you want to retrieve.

## 📁 Main Pages

| Route | Description |
|---|---|
| `/` | Home page with the hero section, workout library, and sorting |
| `/workouts/[id]` | Dynamic workout details page |
| `/my-plan` | Today's Plan, Saved workouts, and workout statistics |
| Not Found | Custom 404 page for invalid routes |

## 🚀 Getting Started

Follow these steps to run FitLog locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/riaduldev/fit-log-app
```

### 2. Navigate to the project directory

```bash
cd Fit-Log
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Responsive Design

FitLog is designed to adapt to different screen sizes:

- **Mobile:** Single-column workout cards and a mobile-friendly navigation menu.
- **Tablet:** Flexible layouts and a responsive workout grid.
- **Desktop:** Multi-column workout cards and a two-column workout details layout.

## 🎯 Project Goals

The main goal of FitLog is to provide a simple and effective workout management experience while practicing modern frontend development concepts, including reusable React components, Next.js App Router navigation, API integration, state management, responsive design, and interactive UI elements.

## 👨‍💻 Developer

**Riadul Islam**

Aspiring Frontend Developer | React.js | Next.js | TypeScript | Tailwind CSS

- **GitHub:** [@riaduldev](https://github.com/riaduldev)
- **Portfolio:** [riaduldev.vercel.app](https://riaduldev.vercel.app)
- **LinkedIn:** [riaduldev365](https://www.linkedin.com/in/riaduldev365/)

## 📄 License

This project was created for educational and portfolio purposes.

---

© 2026 FitLog — Workout Library. Train hard, log honest.
