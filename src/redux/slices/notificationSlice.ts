import { NotificationData, Notifications } from '@domain/entities/notification/Notification';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: NotificationData[],
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlide = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    onNotificationsRetrieved: (state, action: PayloadAction<Notifications>) => {
      const { notifications } = action.payload;
      state.notifications = notifications;
    },
    onNotificationsUpdated: (state, action: PayloadAction<Notifications>) => {
      const { notifications } = action.payload;
      state.notifications = notifications;
    },
    markAllRead: (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        unread: false,
      }));
    },
    markRead: (state, action: PayloadAction<string>) => {
      const channelId = action.payload;
      const index = state.notifications.findIndex(
        (notification) => notification.channelId === channelId,
      );
      if (index >= 0) {
        const notificationAsRead = {
          ...state.notifications[index],
          unread: false,
        };
        state.notifications[index] = notificationAsRead;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    subscribeNewNotification: (_state) => { },
  },
});

// Actions
export const notificationActions = notificationSlide.actions;

// Reducers
export const notificationReducers = notificationSlide.reducer;
