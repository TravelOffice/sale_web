import { Notification, NotificationData } from '@domain/entities/Notification';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: Notification[],
  unreadCount: number,
}

const initialState : NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlide = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    onNotificationsRetrieved: (state, action: PayloadAction<NotificationData>) => {
      const { notifications, unreadCount } = action.payload;
      state.notifications = notifications;
      state.unreadCount = unreadCount;
    },
    onNotificationsUpdated: (state, action: PayloadAction<NotificationData>) => {
      const { notifications, unreadCount } = action.payload;
      state.notifications = notifications;
      state.unreadCount = unreadCount;
    },
    markAllRead: (state) => {
      state.unreadCount = 0;
    },
  },
});

// Actions
export const notificationActions = notificationSlide.actions;

// Reducers
export const notificationReducers = notificationSlide.reducer;
