**📦 Dockerized MERN Transactions App (Personal Finance Tracker)**

A simple, containerized micro-project that represents the Manual Transaction section of the larger Artha Finance Platform.

A fully containerized MERN stack financial transaction manager deployed using:
- Docker
- Docker Compose
- Nginx Reverse Proxy
- MongoDB (as a service container)
- AWS EC2 (Ubuntu Server)

This project allows authenticated users to track Income/Expenses with filtering, categories, CRUD, analytics UI, and secure JWT authentication.

--------------------------------------------------------------------------------------------------------------------------------------

**🚀 Live Deployment**

This project is deployed on an AWS EC2 instance using Docker Compose.

🌐 If running locally or on EC2, access via:
http://your-ec2-public-ip

--------------------------------------------------------------------------------------------------------------------------------------

**🚀 Features**

✅ User Authentication
- Signup & Login
- JWT-based session security

✅ Transaction Management
- Add, Edit, Delete
- Income / Expense classification
- Category tagging
- Merchant tagging
- Date selection

✅ Advanced Filters
- Search
- Category
- Type
- Date Range (Today, 7 Days, 30 Days)

✅ Analytics UI
- Summary cards
- Net balance calculation
- Color-coded icons


✅ Fully Dockerized setup:
- Simple frontend (React)
- Backend container
- Database container (MongoDB)
- Optional frontend container
- Docker networks for internal communication
- Docker volumes for persistent database storage
- Multi-stage Docker builds for optimization

--------------------------------------------------------------------------------------------------------------------------------------

**🧱 Tech Stack**

**Backend**
- Node.js
- Express.js
- JWT Authentication
- MongoDB Mongoose ORM
  
**Frontend**
- React + Vite
- TailwindCSS
- Axios with Interceptors
- Lucide Icons

**DevOps / Containerization**
- Docker
- Docker Compose
- Multi-stage Docker builds
- Nginx (Reverse Proxy + Static Serving)
- MongoDB Container
- AWS EC2 (Ubuntu)

--------------------------------------------------------------------------------------------------------------------------------------

**🏗️ Project Architecture**

Dockerize-Manual-Transactions/
│
├── client/               # React frontend
│   ├── src/
│   ├── Dockerfile
│   └── .env
│
├── server/               # Node.js backend
│   ├── src/
│   ├── Dockerfile
│   └── .env
│
├── nginx/
│   ├── default.conf      # Nginx reverse proxy config
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

--------------------------------------------------------------------------------------------------------------------------------------

**🐳 Docker Setup (Production)**

✔️ Build & Run All Containers
- docker compose up --build -d

✔️ Stop Containers
- docker compose down

✔️ View Logs
- docker logs backend_server -f
- docker logs frontend_server -f
- docker logs nginx -f
- docker logs mongo -f

--------------------------------------------------------------------------------------------------------------------------------------

**⚙️ Environment Variables**

Frontend (client/.env)
- VITE_API_BASE_URL=http://localhost/api

Backend (server/.env)
- PORT=5000
- MONGO_URL=mongodb://mongo:27017/arthaDB
- JWT_SECRET_KEY=ARTHA_MINDFULNESS
- FRONTEND_URL=http://nginx:80

--------------------------------------------------------------------------------------------------------------------------------------

**🌱 Learning Outcomes**
Through this project, I learned:
- Multi-container orchestration with Docker Compose
- Creating multi-stage Dockerfiles
- Running MongoDB in Docker with volumes
- Building a production React app using Nginx
- Setting up reverse proxy routing
- Managing environment variables in containers
- Debugging CORS, ports, healthchecks, and network issues
- Deploying on AWS EC2 via SSH
- Persisting DB using host volumes

--------------------------------------------------------------------------------------------------------------------------------------

**🛠️ Commands Used During Deployment**

SSH into EC2:
- ssh -i "your-key.pem" ubuntu@your-public-ip

Clone Repo:
- git clone https://github.com/jainAmishhh/Dockerize-Manual-Transactions.git

Start Services:
- docker compose up --build -d

Restart Everything:
- docker compose down && docker compose up -d

--------------------------------------------------------------------------------------------------------------------------------------

**👨‍💻 Author**

Amish Jain

Full-Stack & DevOps Learner
- LinkedIn: https://www.linkedin.com/in/amish-jain-b06680279/
- GitHub: https://github.com/jainAmishhh
