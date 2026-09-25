import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Create homepage",
    project: "Website Redesign",
    priority: "High",
    status: "In Progress",
    deadline: "25 Sep 2026",
  },
  {
    id: 2,
    title: "Build login page",
    project: "Website Redesign",
    priority: "Medium",
    status: "Completed",
    deadline: "22 Sep 2026",
  },
  {
    id: 3,
    title: "Create API integration",
    project: "Mobile Application",
    priority: "High",
    status: "To Do",
    deadline: "28 Sep 2026",
  },
  {
    id: 4,
    title: "Design product page",
    project: "E-commerce Platform",
    priority: "Low",
    status: "To Do",
    deadline: "30 Sep 2026",
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },

    updateTask: (state, action) => {
      const index = state.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteTask: (state, action) => {
      return state.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;