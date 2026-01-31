# Flow Forge


# FlowForge 🔥

FlowForge is a web-based workflow automation application that allows users to design, execute, and monitor technical workflows in a simple and structured way.

The project aims to demonstrate a modern backend architecture, a clear execution engine, and a user-friendly frontend interface, in a context similar to real-world tools like n8n, Zapier, or a simplified version of Temporal.

Project developed under WSL2 (Ubuntu) for a near-production environment.

## Presentation
### Objective
The goal of FlowForge is to allow a user to:
- Create workflows composed of nodes (triggers and actions)
- Define the execution order via connections
- Launch a workflow manually
- Monitor its execution, status, and logs
- The project is designed as a functional MVP, intentionally limited but technically robust, highlighting best practices in both backend and frontend development.

### Key Concepts

- Workflow: a static definition of a sequence of actions
- Node: a step in the workflow (e.g., manual trigger, HTTP action, log)
- Execution: the actual execution of a workflow
- Execution Logs: detailed records of each executed step

This separation clearly distinguishes between:

| design time and execution time

### Technical Architecture

Backend
- NestJS (Node.js, TypeScript)
- REST API
- TypeORM
- PostgreSQL
- JWT Authentication
- Modular Architecture (Workflows, Executions, Logs, Auth)


Frontend
- React
- Tailwind CSS
- Product-Oriented Interface (Dashboard, Simple Editing, Monitoring)
- Infrastructure
- Docker / Docker Compose
- Isolated Environments (Backend, Frontend, Database)
- Configuration via Environment Variables


### MVP Features:
- User Authentication
- CRUD Workflows
- Adding Nodes and Connections
- Manually Triggering a Workflow
- Sequential Node Execution
- Status Tracking (pending, running, success, failed)
- Execution History
- Detailed Logs per Execution

### Why FlowForge?

FlowForge is not just a simple CRUD application:
- It includes an execution engine
- It models states, events, and time
- It demonstrates product and architecture thinking

It's a project designed as a showcase of full-stack skills, closely aligned with real-world business challenges.

### Project Management

The project is managed via **Taiga** in order to reflect an organization close to a professional environment.

👉 Public backlog & roadmap:
https://tree.taiga.io/project/fred_dev-flow-forge

Tickets are organized into:
- Epics (major features)
- User stories (MVP)
- Technical tasks

### Launch the project (dev)
MVP Features:
- Visual Workflow Builder
- Sequential Execution
- Conditions
- Logs per Node
- Run History


Architecture: 
- Monorepo npm
- Modular backend
- ReactFlow frontend
- Relational database + JSONB

### Possible evolutions (excluding MVP)
Future improvements: 
- retryCount
- parentExecutionId
- environment
- version
- initiatedBy (user / system)
- Triggers webhook
- Exécution asynchrone / jobs
- Retry & gestion des erreurs avancée
- Versioning des workflows
- Visual editor drag & drop
- Multi-environnements (dev / prod)

---
---
## Start dev projects

### Start stack
````bash
docker compose up --build
````

URL: 
- UI: http://localhost:8081
- StoryBook: http://localhost:6006

### Create first admin
````bash
npm run cli:create-user -- \
  --email admin@flowforge.io \
  --password admin123 \
  --firstname adminFirstname\
  --lastname adminLastname \
  --role admin
````

### Run seeders or seeder by module

#### seeders
`````bash
npm run cli seed
`````

#### seeder list: 
1. user seeder 
`````bash
npm run cli seed --user=20
npm run cli seed --users
`````

2. workflow seeders
`````bash
npm run cli seed --workflow=100
npm run cli seed --workflows
`````






