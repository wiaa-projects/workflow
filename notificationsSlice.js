import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    message: "Welcome to WorkFlow!",
    type: "info",
    read: false,
    date: new Date().toLocaleString(),
  },
];

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.unshift({
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || "info",
        read: false,
        date: new Date().toLocaleString(),
      });
    },

    markAsRead: (state, action) => {
      const notification = state.find(
        (item) => item.id === action.payload
      );

      if (notification) {
        notification.read = true;
      }
    },

    markAllAsRead: (state) => {
      state.forEach((notification) => {
        notification.read = true;
      });
    },

    deleteNotification: (state, action) => {
      return state.filter(
        (notification) => notification.id !== action.payload
      );
    },

    clearNotifications: () => {
      return [];
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;