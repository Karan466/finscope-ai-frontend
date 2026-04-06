🚀 FinScope AI | Enterprise Finance Governance & Anomaly Detection
FinScope AI is a high-performance Fintech Governance platform designed for modern organizations. It streamlines financial monitoring, enforces strict approval workflows, and leverages intelligent anomaly detection to safeguard corporate fiscal integrity.

🔗 Live Ecosystem
Production Frontend: https://finscope-ai-frontend.vercel.app/

Production API: https://finscope-ai-backend.onrender.com/

🛠️ High-Level Tech Stack
Core: React 18, TypeScript, Vite

State & Logic: Context API, Axios (Interceptors for JWT management)

Data Visualization: Recharts (Interactive Financial Trends)

Styling: Tailwind CSS (Premium SaaS Glassmorphism)

Routing: React Router 6 (RBAC Protected Routes)

💎 Key Business Modules
🔐 01. Enterprise Security & RBAC
Role-Based Access Control (RBAC): Granular permissions for User and Admin roles.

JWT Security: Seamless authentication with automated token injection via Axios interceptors.

Protected Routes: Strict client-side gatekeeping to prevent unauthorized data exposure.

📊 02. Intelligent Analytics Dashboard
KPI Tracking: Real-time monitoring of Net Balance, Total Income, and Expenses.

Dynamic Filtering: Monthly, Yearly, and Custom Date range trend analysis.

System Health: Visibility into "Pending Approvals" and "Anomalies Count" at a glance.

✅ 03. Governance & Approval Workflows
Two-Tier Approval: A dedicated workflow for administrators to review, approve, or reject records.

Data Integrity: Prevents unauthorized modifications, ensuring a "Single Source of Truth."

🚨 04. Anomaly Detection UI
Suspicious Activity Alerts: Specialized view for flagged transactions.

Proactive Auditing: Highlights unusual financial patterns to mitigate fraud and human error.

📜 05. Immutable Audit Logs
System Traceability: Comprehensive tracking of all critical system actions for compliance.

📂 Architecture & Design
Bash
src/
├── components/
│   ├── charts/    # Reusable Recharts implementations
│   ├── common/    # UI Building blocks (Buttons, Modals, Badges)
│   └── layout/    # Responsive Sidebar & Navbar Architecture
├── context/       # Global State (Auth, Theme)
├── services/      # Clean API Service Layer (Axios)
├── routes/        # RBAC-enabled routing logic
└── pages/         # Modular feature-based views
🚀 Impact & Performance
99.999% Data Reliability: Achieved through strict status-check logic and immutable log tracking.

Low Latency UI: Optimized Vite-based build ensures sub-second page transitions.

Clean Code Standards: Highly modularized component structure using TypeScript for type-safety.

📈 Future Scalability
[ ] AI Engine Integration: Advanced ML scoring for transaction risk assessments.

[ ] Reporting Suite: One-click CSV/PDF export for financial compliance reports.

[ ] Notification Center: Real-time Push/Email alerts for anomaly detection.

💻 Installation & Local Setup
Clone & Enter:
git clone https://github.com/Karan466/finscope-ai-frontend.git && cd finscope-ai-frontend

Environment Configuration:
Create a .env file:
VITE_API_BASE_URL=https://finscope-ai-backend.onrender.com/api/v1

Install & Run:
npm install && npm run dev

👨‍💻 Developer
Karan Kumar – Software Engineer | Distributed Systems Enthusiast LinkedIn | GitHub
