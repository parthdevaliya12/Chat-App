# LinkUp - Premium Real-Time Chat Application

LinkUp is a full-stack, real-time messaging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It features a stunning, ultra-premium user interface with glassmorphism, dynamic animations, and seamless real-time communication powered by Socket.IO.

## ✨ Features

### 💬 Real-Time Communication
- **Instant Messaging**: Send and receive messages instantly using Socket.IO.
- **Online/Offline Status**: See who is currently online in real-time.
- **Typing Indicators**: Watch as your friends type their messages.
- **Message Editing & Deletion**: Made a typo? Edit or delete your messages seamlessly.
- **Instant Refresh**: Dedicated refresh functionality to sync messages without reloading the app.

### 🎨 Ultra-Premium UI/UX
- **Glassmorphism Design**: Sleek, frosted-glass bento box layouts for a modern feel.
- **Micro-Animations**: Smooth transitions, floating labels, and fluid page animations powered by `motion/react`.
- **Dark/Light Mode**: Beautifully curated Midnight (Dark) and Pearl (Light) themes with high-contrast accent colors.
- **Custom Scrollbars & Spinners**: Every detail, down to the scrollbars and loading indicators, is custom-tailored for a luxurious feel.
- **Fully Responsive**: Flawless experience on desktop, tablet, and mobile.

### 🔒 Security & Authentication
- **Robust Auth**: JWT-based authentication using HTTP Authorization headers and LocalStorage.
- **Profile Management**: Update your bio and profile picture seamlessly.
- **Cloud Storage**: Secure image uploading and hosting via Cloudinary.

## 🛠️ Technology Stack

**Frontend:**
- React 18 (Vite)
- Zustand (Global State Management)
- Tailwind CSS v4 (Styling & Design System)
- Socket.IO-Client (Real-time events)
- Motion / Framer Motion (Animations)
- Axios (HTTP Client)
- React Router (Routing)
- React Hot Toast / Sonner (Notifications)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database & Modeling)
- Socket.IO (WebSockets Server)
- JSON Web Tokens (JWT Authentication)
- Cloudinary (Image Storage)
- Bcrypt.js (Password Hashing)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas cluster or local MongoDB instance
- Cloudinary Account

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/LinkUp.git
cd "LinkUp"
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🌐 Deployment
LinkUp is completely deployment-ready.
- **Frontend** can be deployed seamlessly to platforms like Vercel or Netlify.
- **Backend** can be deployed to Render, Railway, or Heroku.
Make sure to configure the `BASE_URL` in the frontend `socket.js` and `axios.js` to point to your deployed backend URL.

## 📄 License
This project is licensed under the MIT License.
