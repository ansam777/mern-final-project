# StoryLoop - Episodic Writing & Technical Series Platform

StoryLoop is a full-stack MERN platform designed for authors and developers to publish structured episodic content, tutorials, and multi-part guides.

## Problem Statement
Traditional blogging platforms lack sequential structure for multi-part guides and episodic storytelling. StoryLoop organizes related content into parent series with ordered chapters, view tracking, and seamless reader navigation.

## Features
- **User Authentication:** JWT-based user registration and login.
- **Series Management:** Create and publish multi-part story or tutorial series.
- **Episodic Reader:** Sequential reading navigation (Next/Previous) with view metrics.
- **Responsive UI:** Clean React interface with four core application states (Loading, Success, Empty, Error).

## Tech Stack
- **Frontend:** React (Vite), Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JSON Web Tokens (JWT), bcryptjs password hashing

## Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/storyloop
JWT_SECRET=your_jwt_secret_key