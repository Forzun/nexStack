![image](./packages/public/Screenshot%20from%202026-03-19%2013-55-40.png)

---
[![Watch the demo](./packages/public/Screencast%20from%202026-03-19%2010-19-13.mp4)]


# NexStack 

A full-stack website monitoring system inspired by BetterStack, built to learn real-world backend systems, background workers, and scalable architecture.

---

## 🔥 Overview

NexStack is a monitoring platform that allows users to:

- Track website uptime
- Measure response times
- Visualize performance with charts
- Manage multiple websites

---

## 🛠 Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- shadcn/ui

### Backend
- Node.js
- Express
- Prisma
- PostgreSQL

### System Design
- Redis Streams (background workers)
- Turborepo (monorepo setup)

---
## ⚙️ Features

- 🔐 Custom Authentication (no external libraries)
- 🌐 Add & manage multiple websites
- ⏱ Background workers for uptime checks
- 📊 Metrics aggregation (min / avg / max response time)
- 📈 Interactive dashboard with charts
- ⚡ Real-time-like monitoring architecture
- 🧩 Clean monorepo structure using Turborepo

---

## 🧠 How It Works

```text
User adds website
      ↓
Backend pushes job to Redis Stream
      ↓
Worker consumes job
      ↓
Checks website status (HEAD request)
      ↓
Stores response time + status in DB
      ↓
Backend aggregates data
      ↓
Frontend displays charts + metrics
```
## 📁 Project Structure

```text
apps/
  web/        → Next.js frontend + shadcn ui
  api/        → Express backend
  pusher/     → redis xAdd pusher
  worker/     → Redis consumer + worker

packages/
  ui/         → shared UI components
  database/   → prisma schema   

```
## how to run locally

```bash
git clone https://github.com/Forzun/nexStack.git
cd my-app 
pnpm install
```

## Before that setup env fils
```bash
DATABASE_URL=your_postgres_url
REDIS_URL=your_redis_url
JWT_SECRET=your_secret
````
## Now you can start locally

```bash
pnpm run dev
```

