# HR Workflow Designer (React Flow)

## 🚀 Overview
This project is a mini HR Workflow Designer built using React and React Flow. It allows users to visually design workflows such as onboarding, approvals, and automated processes.

The system supports dynamic node configuration, workflow simulation, and export functionality.

---

## 🧩 Features

### 1. Workflow Canvas
- Drag-and-create workflow nodes
- Connect nodes with directed edges
- Supports multiple node types:
  - Start
  - Task
  - Approval
  - Automated
  - End

### 2. Node Configuration Panel
Each node type has configurable fields:

- **Start Node**
  - Title
  - Metadata (optional)

- **Task Node**
  - Title
  - Description
  - Assignee
  - Due Date

- **Approval Node**
  - Title
  - Approver Role
  - Auto-approve threshold

- **Automated Node**
  - Select action (mock API)
  - Dynamic parameters

- **End Node**
  - End message
  - Summary toggle

---

### 3. Mock API Layer
- `GET /automations`
- `POST /simulate`

Simulates workflow execution and returns step-by-step logs.

---

### 4. Workflow Simulation
- Executes workflow graph
- Displays execution logs
- Validates presence of Start node

---

### 5. Export Feature
- Export workflow as JSON

---

## 🏗 Architecture

The application follows modular design:

- **Components** → UI rendering
- **Hooks** → State logic
- **API Layer** → Mock backend abstraction
- **Utils** → Validation logic

State is managed using React hooks for simplicity and clarity.

---

## ⚙️ How to Run

```bash
npm install
npm run dev
