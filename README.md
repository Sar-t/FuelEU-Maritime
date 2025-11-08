⚓ FuelEU Maritime Compliance Platform

A full-stack platform to manage, analyze, and visualize FuelEU Maritime compliance data, built with React + TypeScript + TailwindCSS (frontend) and Node.js + TypeScript + PostgreSQL (backend) using a Hexagonal Architecture.

This project demonstrates clear separation of concerns, real-world domain modeling, and AI-assisted software development following clean architectural principles.

🚀 Features Overview
Module	Description
Routes	Displays all vessel routes and allows setting baselines
Compare	Compares baseline vs current routes and visualizes GHG intensity difference
Banking	Manages banking and applying of compliance balances
Pooling	Pools ships’ compliance balances for collective adjustment
🧱 Architecture Summary
FuelEU-Maritime/
├── backend/
│   ├── src/
│   │   ├── core/                 # Domain + Use-cases + Ports
│   │   ├── adapters/             # HTTP controllers + PostgreSQL repositories
│   │   ├── infrastructure/       # Database + Server
│   │   └── tests/                # Unit and integration tests
│   ├── .env                      # Database credentials
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── core/                 # Domain + Application logic
│   │   ├── adapters/ui/          # React components and pages
│   │   ├── adapters/infrastructure/ # API clients
│   │   ├── pages/                # RoutesPage, ComparePage, BankingPage, PoolingPage
│   │   ├── App.tsx               # Main navigation UI
│   │   └── main.tsx              # Entry point
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   └── package.json
│
├── AGENT_WORKFLOW.md
├── REFLECTION.md
└── README.md

🧩 Tech Stack
Frontend

⚛️ React + TypeScript

🎨 TailwindCSS for styling

📊 Recharts for visualizations

Backend

🟦 Node.js + Express + TypeScript

🗄 PostgreSQL (via pg)

🧩 Clean Hexagonal Architecture

⚙️ Setup & Run Instructions
🧠 Prerequisites

Node.js ≥ 18

PostgreSQL installed and running

Git & npm

🖥 Backend Setup
cd backend
npm install


Create .env:

DATABASE_URL=postgres://postgres:root@localhost:5432/fueleu
PORT=4000


Run migrations and seeds:

psql $DATABASE_URL -f src/infrastructure/db/migrations/001_init.sql
psql $DATABASE_URL -f src/infrastructure/db/seeds/seed_routes.sql


Start backend server:

npm run build
npm run dev


Backend runs on: http://localhost:4000

🌐 Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on: http://localhost:5173

🧪 Testing
Backend Tests
cd backend
npm run test

Manual UI Tests

Open the app on port 5173

Navigate between tabs — Routes, Compare, Banking, Pooling

Confirm data loads correctly from backend

🧠 Functional Highlights
🛳 Routes

Fetches seeded routes from PostgreSQL

Allows setting a baseline (POST /routes/:id/baseline)

⚖️ Compare

Compares route GHG intensities vs baseline

Displays compliance (% difference)

Includes Recharts bar visualization

💰 Banking

Manages banking and applying of compliance balances

Validates CB > 0 before banking

⚓ Pooling

Pools ships’ CBs for collaborative balancing

Validates rules: sum ≥ 0, no ship exits worse off

🎨 UI Design Highlights

Gradient header with animated active tabs

Responsive card-based layout

Clean typography and spacing

Soft blue/indigo gradient theme

Recharts for real-time visualization

🧠 Core Formula Reference
Target (2025) = 89.3368 gCO₂e/MJ
Energy (MJ) = fuelConsumption × 41,000
Compliance Balance (CB) = (Target − Actual) × Energy


Positive CB → Surplus

Negative CB → Deficit

📚 API Endpoints
Endpoint	Method	Description
/routes	GET	Fetch all routes
/routes/:id/baseline	POST	Set baseline route
/routes/comparison	GET	Compare baseline vs others
/compliance/cb?shipId&year	GET	Compute compliance balance
/banking/bank	POST	Bank positive CB
/banking/apply	POST	Apply banked CB
/pools	POST	Create a compliance pool
📊 Sample Screenshots

(Add actual screenshots before submission)

Routes	Compare	Banking	Pooling

	
	
	
🤖 AI Agent Collaboration

This project was built using AI-assisted development combining:

ChatGPT (GPT-5) for reasoning and architectural guidance

GitHub Copilot for inline code suggestions

Cursor AI Editor for file generation and refactoring

All outputs were validated, refactored, and tested manually.

👨‍💻 Author
Sarthak Tomar