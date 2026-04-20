# HR Workflow Designer (React Flow)

## Overview

The HR Workflow Designer is a visual workflow-building tool that allows users to design, configure, and simulate HR processes such as onboarding, approvals, and automated actions.

The application provides an interactive canvas where users can create nodes, connect them, and define workflow logic in a structured and intuitive way.

---

## Features

### Workflow Canvas

- Interactive drag-and-drop canvas
- Create and position workflow nodes
- Connect nodes with directed edges
- Smooth curved connections with arrow indicators

Supported node types:
- Start
- Task
- Approval
- Automated
- End

---

### Node Configuration

Each node can be configured dynamically through a side panel.

- Update node title in real-time
- Reflect changes instantly on the canvas
- Clean separation between UI and node data

---

### Workflow Simulation

- Simulates execution of workflow steps
- Validates presence of Start node
- Displays step-by-step execution logs
- Helps visualize workflow behavior

---

### Export Functionality

- Export workflow as JSON file
- Export canvas as image (JPG)
- Enables sharing and persistence

---

## Architecture

The application follows a modular frontend architecture:

- React Flow handles graph rendering and interactions
- React Hooks manage state (nodes, edges, selection)
- Custom node components define UI
- Utility functions handle export and simulation

---

## Tech Stack

- React.js
- React Flow
- html2canvas

---

## Project Structure
src/
├── App.jsx
├── main.jsx
├── index.css
---

## Setup Instructions

```bash
npm install
npm run dev
