# WorkFlow

A modern project management dashboard built with React, Redux Toolkit and EmailJS.

WorkFlow allows users to manage projects, tasks and team members through a responsive and interactive dashboard.

## Features

-  Dashboard with project and task statistics
- Project management
  - Add projects
  - Edit projects
  - Delete projects
  - Search projects
  - Filter by status
  - Progress tracking
-  Task management
  - Add tasks
  - Edit tasks
  - Delete tasks
  - Search tasks
  - Filter by status
  - Filter by priority
  - Deadline management
-  Team management
  - Add team members
  - Edit team members
  - Delete team members
  - Search team members
  - Filter by role
- Real-time in-app notifications
-  Email notifications with EmailJS
-  Settings management
-  Dark mode
-  LocalStorage persistence
-  Responsive design for desktop, tablet and mobile

##  Technologies

- React
- React Router
- Redux Toolkit
- React Redux
- EmailJS
- JavaScript
- CSS
- Vite
- LocalStorage

##  Project Structure

```text
src/
├── components/
│   ├── Sidebar.jsx
│   └── Notifications.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   ├── Tasks.jsx
│   ├── Team.jsx
│   └── Settings.jsx
│
├── services/
│   └── emailService.js
│
├── store/
│   ├── store.js
│   ├── projectsSlice.js
│   ├── tasksSlice.js
│   ├── teamSlice.js
│   └── notificationsSlice.js
│
├── App.jsx
├── main.jsx
└── index.css