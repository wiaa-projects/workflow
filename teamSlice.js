import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Sarah Martin",
    role: "Frontend Developer",
    email: "sarah@workflow.com",
    projects: 4,
  },
  {
    id: 2,
    name: "Yassine Amrani",
    role: "Backend Developer",
    email: "yassine@workflow.com",
    projects: 3,
  },
  {
    id: 3,
    name: "Emma Laurent",
    role: "UI/UX Designer",
    email: "emma@workflow.com",
    projects: 5,
  },
  {
    id: 4,
    name: "Adam Benali",
    role: "Project Manager",
    email: "adam@workflow.com",
    projects: 6,
  },
];

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addMember: (state, action) => {
      state.push(action.payload);
    },

    updateMember: (state, action) => {
      const index = state.findIndex(
        (member) => member.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteMember: (state, action) => {
      return state.filter(
        (member) => member.id !== action.payload
      );
    },
  },
});

export const {
  addMember,
  updateMember,
  deleteMember,
} = teamSlice.actions;

export default teamSlice.reducer;