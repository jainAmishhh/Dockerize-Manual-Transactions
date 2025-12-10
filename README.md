Manual Transaction Manager (Dockerized)

A simple, containerized micro-project that represents the Manual Transaction section of the larger Artha Finance Platform.
This project lets users manually add, view, and manage their financial transactions without using any Account Aggregator integration.

It is designed to apply and demonstrate Docker concepts such as containers, images, volumes, networking, and multi-stage builds.

--------------------------------------------------------------------------------------------------------------------------------------

🚀 Features

Add manual transactions (amount, category, date, notes, etc.)
- View all transactions
- Edit or delete existing entries
- Lightweight backend (Express + MongoDB)

Simple frontend (React)

Fully Dockerized setup:

Backend container

Database container (MongoDB)

Optional frontend container

Docker networks for internal communication

Docker volumes for persistent database storage

Multi-stage Docker builds for optimization

--------------------------------------------------------------------------------------------------------------------------------------

🧱 Tech Stack

Backend
- Node.js
- Express.js
- MongoDB + Mongoose

Frontend
- React + Vite (or any UI framework you choose)

DevOps / Containerization
- Docker
- Docker Compose
- Multi-stage Docker builds
- Private or public Docker registry (optional)

--------------------------------------------------------------------------------------------------------------------------------------

🐳 Docker Features Used

- Dockerfile for backend and frontend
- Multi-Stage Builds for optimized production images
- Docker Compose for running multiple services
- MongoDB volume for persistent database storage

Docker Networks:
- backend-network for backend ↔ MongoDB communication

Environment variables stored in .env


