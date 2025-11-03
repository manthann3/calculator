# Calculator App
A full-stack calculator built using **React** and **Node.js**, designed to perform basic arithmetic operations with a modern, responsive interface.  
It demonstrates clean code structure, frontend-backend integration, and deploy-ready architecture.

---

## Features
- Perform addition, subtraction, multiplication, and division
- Sends audit events (e.g., 'DIGIT_PRESSED', 'DECIMAL_PRESSED', 'OPERATION_SELECTED', 'EQUALS_PRESSED', 'CLEAR_PRESSED', 'NUMBER_ENTERED') to the backend in real time
- Displays current input and result
- Responsive and minimal UI  
- Separate frontend (React) and backend (Node) setup
- Receives audit log events from the frontend
- Stores all calculator operations in sequence
- Provides an API to retrieve the full audit log in order
- Easy to deploy on Render / Netlify

---

## Tech Stack
  Frontend: React, Vite, Tailwind CSS
  Backend: Node.js, Express
  Database: MongoDB Atlas
  Tools: Git, Render, Netlify 

---

### 1. Clone the repository 
  git clone https://github.com/manthann3/calculator.git
  cd calculator

### 2. Install dependencies
  cd backend && npm install
  cd ../frontend && npm install

### 3. Run the project
 Start backend
  cd backend
  npm run dev
  
 Start frontend
  cd ../frontend
  npm run dev
