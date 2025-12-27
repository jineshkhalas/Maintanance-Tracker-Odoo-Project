# ⚙️MAINTAIN.IO
Enterprise Asset & Maintenance Management System
Maintain.io is a high-performance ERP module designed to streamline industrial maintenance workflows. <br> Built with a focus on Preventive Maintenance, it allows organizations to track assets, manage technical teams, and visualize work orders through an interactive Kanban board and a smart scheduling calendar.

## 🚀 Core Features
### 📦 Asset & Equipment Management <br>

Centralized Inventory: Track machinery by Name, Serial Number, Category, and Company.<br>

Live Status Tracking: Real-time visibility into whether an asset is Operational, Under Repair, or Scrapped.<br>

Technician Assignment: Link specific lead technicians and maintenance teams to each asset.<br>

---

### 📋 Interactive Kanban Board<br>

Visual Workflow: Move maintenance requests through four distinct stages: New, In Progress, Repaired, and Scrap.<br>

Overdue Alerts: Automatic visual indicators (pulsing red borders) for tasks past their scheduled date.<br>

Glassmorphism UI: A clean, modern aesthetic with micro-interactions like card rotation on hover.<br>

---

### 📅 Smart Preventive Calendar<br>
Schedule on Click: Click any empty date on the calendar to instantly open a pre-filled scheduling form.<br>

Reschedule via Drag-and-Drop: Move maintenance tasks between dates to automatically update the database.<br>

Filtered Views: Specifically designed to display Preventive Maintenance to keep the schedule clean.<br>

---

### 👥 Team & Workspace Management<br>
Multi-Company Support: Organize teams based on different factory branches or companies.<br>

Member Tracking: Manage technician rosters with comma-separated entries synced to the database.<br>

---

### 📱 Responsive "Desktop-First" Design<br>
Laptop Optimization: Grid layouts utilize full screen width on desktops for maximum data density.<br>

Mobile Fluidity: Columns and tables automatically switch to horizontal scroll and stack layouts on smaller devices.<br>

---

### 💻 Tech Stack
#### FrontEnd: React.js , Tailwind-CSS , Lucide-React Icons
#### BackEnd: Node.js , Express.js
#### Database: PostgreSQL
#### ORM: Prisma
#### API Client: Postman , Axios

---

## 🛠️ Installation & Setup
### 1. Prerequisites
  Node.js (v16+) <br>
  PostgreSQL instance (local or hosted)

### 2. Database Configuration
Create a **.env** file in the backend folder: <br>
`DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/maintenance_db?schema=public"`

### 3. Backend Setup <br>
`cd backend` <br>
`npm install`<br>
`npx prisma generate`<br>
`npx prisma db push`<br>
`npm run dev`<br>

### 4. Frontend Setup <br>
`cd frontend`
`npm install`
`npm run dev`


## 📊 Database Architecture <br>
The system uses a relational schema designed for referential integrity: <br>

Team: Handles work centers and company branches. <br>

User: Represents technicians and staff. <br>

Equipment (Assets): Stores machinery data with links to teams and lead technicians. <br>

Request: Manages individual maintenance tasks, linked to equipment and users. <br>

## 🎨 UI Design Principles <br>
Rounded Geometry: High-radius corners (rounded-[2rem]) for a modern, friendly ERP feel. <br>

Glassmorphism: Frosted glass backgrounds (backdrop-blur-md) used on headers and cards.<br>

High Contrast: font-black typography with wide tracking (tracking-widest) for professional labels.<br>

Interactive Feedback: Subtle hover translations and rotations to provide a tactile user experience.<br>


## API Endpoints Summary

## API Endpoints

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/api/equipment`        | Fetch all Assets                     |
| POST   | `/api/equipment`        | Register a new Asset                 |
| GET    | `/api/requests`         | Fetch all Maintenance Tasks          |
| PATCH  | `/api/requests/:id`     | Update task's status & schedule      |
| POST   | `/api/teams`            | Create new Maintenance Team          |


## 🤝 Contribution & Future Roadmap
We welcome contributions from the community! <br>
Whether it's fixing a bug, adding a feature, or improving documentation, your help is appreciated. <br>

### 💡 How to Contribute<br>
1. Fork the Project.<br>
2. Create your Feature Branch `(git checkout -b feature/AmazingFeature)`.<br>
3. Commit your Changes `(git commit -m 'Add some AmazingFeature')`.<br>
4. Push to the Branch `(git push origin feature/AmazingFeature)`.<br>
5. Open a Pull Request.<br>

## 👥 Contributors
### Priyanshu Jajal: https://github.com/PriyanshuJajal <br>
### Jinesh Khalas: https://github.com/jineshkhalas
