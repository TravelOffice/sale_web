import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  conversations: Conversation[],
  messages: Message[],
  selectedConversation?: Conversation,
  canLoadMore: boolean
}

const initialState : ChatState = {
  conversations: [],
  messages: [],
  canLoadMore: true,
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
    onMessagesRetrieved: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
      state.canLoadMore = action.payload.length >= 10;
    },
    onMoreMessagesLoaded: (state, action: PayloadAction<Message[]>) => {
      const newMessages = action.payload;
      state.canLoadMore = newMessages.length >= 10;
      state.messages.push(...newMessages);
    },
    onNewMessage: (state, action: PayloadAction<Message>) => {
      // Update conversation list
      const message = action.payload;
      const predicate = (item: Conversation) => item.contact.id === message.customerId;
      const conversationIndex = state.conversations.findIndex(predicate);
      if (conversationIndex < 0) {
        // const newConv = {};
        // state.conversations = state.conversations.concat(action.payload);
        // TODO: saga fetchs conversation info by new customerid
      } else {
        // state.conversations[conversationIndex].lastMessage
      }
      // const index = state.conversations.findIndex((item) => item.id === action.payload.id);
      // if (index < 0) {
      //   state.conversations = state.conversations.concat(action.payload);
      // } else {
      //   state.conversations[index] = action.payload;
      // }
      // Update message list
      const { selectedConversation } = state;
      if (selectedConversation && selectedConversation.contact.id === message.customerId) {
        state.messages.push(message);
      }
    },
    onConversationSelected: (state, action: PayloadAction<Conversation>) => {
      const conversation = state.conversations.find((item) => item.id === action.payload.id);
      if (conversation) {
        conversation.unseenMessages = 0;
      }
      state.selectedConversation = action.payload;
    },
  },
});

// Actions
export const chatActions = chatSlice.actions;

// Reducers
export const chatReducers = chatSlice.reducer;

export default { chatActions, chatReducers };
