# MicroGit – A Lightweight Version Control System (VCS)

MicroGit is a custom-built Version Control System inspired by Git, designed to manage repositories, track changes, and support collaborative workflows. It provides essential VCS operations such as initializing repositories, committing changes, pulling and pushing updates, reverting versions, deleting resources, managing issues, and visualizing daily activity using a heatmap.

This is my major project, developed using a modern full-stack architecture and deployed on AWS during testing. The EC2 instance was later stopped due to the AWS 750-hour yearly free-tier limit, but the deployment work demonstrates real cloud hosting experience.

---

## Tech Stack

### Backend
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  
- Yargs (CLI command handling)  
- Jest (Unit testing)

### Frontend
- HTML  
- CSS  
- JavaScript  
- React.js  
- Bootstrap  

### Cloud & Deployment
- AWS EC2  
- AWS Amplify  
- AWS S3 Storage  

---

## Core Features

### VCS Operations
- `init` – Initialize a new MicroGit repository  
- `commit` – Record file changes with version tracking  
- `push` – Upload commits to remote repository  
- `pull` – Fetch and update latest changes  
- `revert` – Restore any previous commit  
- `delete` – Remove repositories or specific commit entries  

### User Management
- User registration and login  
- Authentication and authorization using JWT  
- User-level access control for repositories  

### Repository Management
- Create repositories  
- Delete repositories  
- View commit history  
- Track contributors and change logs  

### Issues Module
- Create issues  
- Update issue details or status  
- Assign issues  
- Delete issues  
- Full CRUD support for issue management  

### Activity Heatmap
- Daily commit and activity tracking  
- Visual dashboard representing activity patterns similar to contribution graphs  

---

## Project Architecture

- Client: React + Bootstrap  
- Server: Node.js/Express REST API  
- Database: MongoDB for users, repositories, issues, and activity logs  
- CLI Tool: Yargs-based command-line interface  
- Authentication: JWT-secured API endpoints  
- Storage: AWS S3 for assets and repository files  

---

## Deployment Summary

The project was deployed on AWS using:
- EC2 for backend hosting  
- Amplify for frontend hosting  
- S3 bucket for file storage  

The EC2 instance was stopped after deployment due to the AWS free-tier 750-hour monthly usage limit, but the end-to-end deployment process was fully implemented, including configuration, environment setup, and runtime monitoring.

---

## Testing

Unit tests created using Jest for:
- Commit operations  
- Repository services  
- Authentication flow  

---

## Project Structure

## Project Structure

```
microgit/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── utils/
│   ├── tests/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## How to Run Locally

```bash
# Clone the repository
git clone <repo-url>

# Install global dependencies if needed
npm install

# Start backend server
cd server
npm install
npm start

# Start frontend
cd ../client
npm install
npm start
