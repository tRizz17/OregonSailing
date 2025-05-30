# Oregon Sailing Races

A full-stack web application for discovering and managing sailing races in Oregon. Built with React (frontend) and Node.js/Express/MongoDB (backend).

---

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Seed the Database (Optional)](#4-seed-the-database-optional)
  - [5. Run the Application](#5-run-the-application)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Project Overview
This app allows users to browse, view, and manage sailing races in Oregon. It features:
- Dynamic race listings
- Automatic cleanup of past races
- Responsive UI with modals for race details
- MongoDB Atlas or local MongoDB support

---

## Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **MongoDB Atlas** account (or local MongoDB instance)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <repo-root-directory>
```

### 2. Install Dependencies
Install dependencies for both frontend and backend:

```bash
# In the root directory, install frontend dependencies
cd <repo-root-directory>
npm install

# In the server directory, install backend dependencies
cd server
npm install
```

### 3. Configure Environment Variables

#### Backend (`server/.env`):
Create a `.env` file in the `server` directory with the following:
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/sailing-races?retryWrites=true&w=majority
```
Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

#### Frontend (`.env`):
Create a `.env` file in the root directory with:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed the Database (Optional)
To populate the database with sample race data:
```bash
cd server
npm run seed
```

### 5. Run the Application

#### Start the Backend
```bash
cd server
npm run dev
```

#### Start the Frontend (in a new terminal)
```bash
cd <repo-root-directory>
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure
```
<repo-root-directory>/
├── src/                # Frontend source code
│   ├── api/            # API client
│   ├── components/     # Reusable React components
│   ├── data/           # Static data (if any)
│   └── pages/          # Page components (Home, About, etc.)
├── server/             # Backend source code
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── scripts/    # Database seeding script
│   └── .env            # Backend environment variables
├── .env                # Frontend environment variables
├── .gitignore
└── README.md
```

---

## Troubleshooting
- **CORS errors:** Ensure both frontend and backend are running, and API URLs are correct.
- **MongoDB connection issues:** Double-check your `.env` credentials and network access in MongoDB Atlas.
- **Port conflicts:** Make sure nothing else is running on ports 5000 (backend) or 5173 (frontend).
- **Seeding errors:** Ensure MongoDB is accessible and the connection string is correct.

---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and open a Pull Request

---

For questions or help, contact the project maintainer. 