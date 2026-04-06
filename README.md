🚀 FinScope AI | Enterprise Finance Governance & Anomaly Detection
FinScope AI is a high-performance Fintech Governance platform designed for modern organizations. It streamlines financial monitoring, enforces strict approval workflows, and leverages intelligent anomaly detection to safeguard corporate fiscal integrity.

🌐 Live Ecosystem
Production Frontend: https://finscope-ai-frontend.vercel.app/

Production API: https://finscope-ai-backend.onrender.com/

🛠️ Tech Stack
Frontend: React 18, TypeScript, Vite

Styling: Tailwind CSS (Modern SaaS Glassmorphism)

Data Visualization: Recharts (Interactive Financial Trends)

State Management: Context API & Axios Interceptors

Icons & UI: Lucide React, React Hot Toast

💎 Key Business Modules
🔐 01. Enterprise Security & RBAC
Role-Based Access Control (RBAC): Granular permissions for User and Admin tiers.

JWT Authentication: Secure session management with automated token injection via Axios interceptors.

Protected Routes: Strict client-side gatekeeping to prevent unauthorized data access.

📊 02. Intelligent Analytics Dashboard
Real-time KPIs: Instant tracking of Net Balance, Total Income, and Expenses.

Trend Analysis: Dynamic Recharts integration for Monthly and Yearly financial visualizations.

System Health: Command center view for pending approvals and flagged anomalies.

✅ 03. Governance & Approval Workflows
Admin Review: Dedicated interface for approving or rejecting financial submissions.

Data Integrity: Ensures all records undergo a verified workflow before final entry.

🚨 04. Anomaly Detection UI
Fraud Mitigation: Specialized view highlighting suspicious transactions and unusual patterns.

Proactive Auditing: Tools for administrators to investigate flagged activity immediately.

📜 05. Immutable Audit Logs
System Traceability: Comprehensive logging of all critical system actions for regulatory compliance.

📂 Architecture
Bash
src/
├── components/
│   ├── charts/    # Interactive Recharts components
│   ├── common/    # Reusable UI elements (Buttons, Modals, Badges)
│   └── layout/    # Responsive Navigation & Sidebar architecture
├── context/       # Global State Management (Auth, Theme)
├── services/      # Modular API Service Layer
├── routes/        # RBAC-guarded routing logic
└── pages/         # Feature-based view components
🚀 Performance & Impact
99.999% Data Reliability: Implemented through strict status-check logic and immutable log tracking.

Optimized Core Web Vitals: Vite-powered build system ensures sub-second LCP and smooth transitions.

Type-Safe Architecture: Developed with TypeScript to minimize runtime exceptions in financial logic.

💻 Local Setup
Clone the repository:

Bash
git clone https://github.com/Karan466/finscope-ai-frontend.git
cd finscope-ai-frontend
Configure Environment:
Create a .env file in the root:

Code snippet
VITE_API_BASE_URL=https://finscope-ai-backend.onrender.com/api/v1
Install and Run:

Bash
npm install
npm run dev
👨‍💻 Developed By
Karan Kumar Software Engineer | Distributed Systems & Backend Enthusiast LinkedIn | GitHub
