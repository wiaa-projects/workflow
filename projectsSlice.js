import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Modern redesign of company website",
    progress: 75,
    status: "In Progress",
  },
  {
    id: 2,
    name: "Mobile Application",
    description: "React-based mobile application",
    progress: 50,
    status: "In Progress",
  },
  {
    id: 3,
    name: "E-commerce Platform",
    description: "Full-stack online shopping platform",
    progress: 30,
    status: "In Progress",
  },
  {
    id: 4,
    name: "CRM System",
    description: "Customer relationship management system",
    progress: 100,
    status: "Completed",
  },
];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },

    updateProject: (state, action) => {
      const index = state.findIndex(
        (project) => project.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteProject: (state, action) => {
      return state.filter(
        (project) => project.id !== action.payload
      );
    },
  },
});

export const {
  addProject,
  updateProject,
  deleteProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;