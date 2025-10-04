# Expense Tracker Odoo (Development)

This repository contains a FastAPI backend and a React + Vite frontend for an Expense Management System.

Run with Docker Compose (recommended) — ensure Docker Desktop is running and set to Linux containers on Windows.

From the project root (PowerShell):

```powershell
docker-compose up --build
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API docs: http://localhost:8000/docs

If docker-compose fails to connect, ensure Docker Desktop is running. If you see errors about building Pillow or psycopg2, the backend Dockerfile includes the necessary system packages; rebuild after starting Docker.

Environment hints:
- `backend/.env` contains defaults for local development (change `SECRET_KEY`).
- Frontend is served by nginx in the container on port 3000 (host).

If you need to run without Docker, see the backend `requirements.txt` and frontend `package.json`.
