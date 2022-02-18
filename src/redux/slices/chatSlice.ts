import { Conversation } from '@domain/entities/Conversation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  conversations: Conversation[]
}

const initialState : ChatState = {
  conversations: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    onConversationsRetrieved: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    onNewConversation: (state, action: PayloadAction<Conversation>) => {
      const index = state.conversations.findIndex((item) => item.id === action.payload.id);
      if (index < 0) {
        state.conversations = state.conversations.concat(action.payload);
      } else {
        state.conversations[index] = action.payload;
      }
    },
    onMessageRead: (state, action: PayloadAction<Conversation>) => {
      const conversation = state.conversations.find((item) => item.id === action.payload.id);
      if (conversation) {
        conversation.unseenMessages = 0;
      }
    },
  },
});

// Actions
export const chatActions = chatSlice.actions;

// Reducers
export const chatReducers = chatSlice.reducer;

export default { chatActions, chatReducers };
