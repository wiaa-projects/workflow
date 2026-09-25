import { configureStore } from "@reduxjs/toolkit";

import projectsReducer from "./projectsSlice";
import tasksReducer from "./tasksSlice";
import teamReducer from "./teamSlice";
import notificationsReducer from "./notificationsSlice";

const savedProjects = localStorage.getItem(
  "workflow_projects"
);

const savedTasks = localStorage.getItem(
  "workflow_tasks"
);

const savedTeam = localStorage.getItem(
  "workflow_team"
);

const savedNotifications = localStorage.getItem(
  "workflow_notifications"
);

const preloadedState = {
  projects: savedProjects
    ? JSON.parse(savedProjects)
    : undefined,

  tasks: savedTasks
    ? JSON.parse(savedTasks)
    : undefined,

  team: savedTeam
    ? JSON.parse(savedTeam)
    : undefined,

  notifications: savedNotifications
    ? JSON.parse(savedNotifications)
    : undefined,
};

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    team: teamReducer,
    notifications: notificationsReducer,
  },

  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "workflow_projects",
    JSON.stringify(state.projects)
  );

  localStorage.setItem(
    "workflow_tasks",
    JSON.stringify(state.tasks)
  );

  localStorage.setItem(
    "workflow_team",
    JSON.stringify(state.team)
  );

  localStorage.setItem(
    "workflow_notifications",
    JSON.stringify(state.notifications)
  );
});

export default store;