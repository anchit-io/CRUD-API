# CRUD API

A production-ready RESTful CRUD API built with Node.js, Express, Prisma, PostgreSQL, and deployed on AWS using Jenkins CI/CD.

## Features

- RESTful CRUD operations
- PostgreSQL (AWS RDS)
- Prisma ORM
- Health Check Endpoint
- PM2 Process Management
- Nginx Reverse Proxy
- HTTPS using Let's Encrypt
- Jenkins CI/CD Pipeline
- GitHub Webhook Integration

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma
- AWS EC2
- AWS RDS
- Jenkins
- Nginx
- PM2

## Project Structure

```
src/
prisma/
Jenkinsfile
package.json
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /health | Health Check |
| GET | /users | Get Users |
| POST | /users | Create User |
| PUT | /users/:id | Update User |
| DELETE | /users/:id | Delete User |

## Deployment

- Hosted on AWS EC2
- PostgreSQL hosted on AWS RDS
- Reverse Proxy using Nginx
- HTTPS enabled using Let's Encrypt
- CI/CD through Jenkins

## Health Endpoint

```
GET /health
```

Example Response

```json
{
  "status":"healthy",
  "database":"connected"
}
```

## CI/CD Pipeline

GitHub Push

↓

GitHub Webhook

↓

Jenkins

↓

Install Dependencies

↓

Prisma Generate

↓

PM2 Restart

## Decision Notes

### Why AWS EC2?

Provides flexibility for hosting multiple applications.

### Why RDS?

Managed PostgreSQL with automated backups and high availability.

### Why Jenkins?

Automates deployment after every GitHub push.

### Why PM2?

Keeps Node.js applications running and restarts them automatically.

### Why Nginx?

Acts as a reverse proxy and handles HTTPS termination.

## Author

Anchit Mishra
