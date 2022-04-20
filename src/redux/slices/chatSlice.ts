import { Conversation } from '@domain/entities/Conversation';
import { Message, MessageData } from '@domain/entities/Message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PAGE_SIZE } from '@utils/ChatUtils';

interface ChatState {
  conversations: Conversation[],
  messages: Message[],
  selectedConversation?: Conversation,
  canLoadMore: boolean,
  fetchingConversations: boolean,
  fetchingMessages: boolean,
  loadingMoreMessages: boolean,
  firstLoad: boolean,
  sendingAttachmentMessage: boolean,
}

const initialState : ChatState = {
  conversations: [],
  messages: [],
  canLoadMore: true,
  fetchingConversations: false,
  fetchingMessages: false,
  loadingMoreMessages: false,
  firstLoad: true,
  sendingAttachmentMessage: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getConversations: (state) => {
      state.fetchingConversations = true;
    },
    onConversationsRetrieved: (state, action: PayloadAction<Conversation[]>) => {
      state.fetchingConversations = false;
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
    onConversationSelected: (state, action: PayloadAction<Conversation>) => {
      const conversation = state.conversations.find((item) => item.id === action.payload.id);
      if (conversation) {
        // Change unseenMessages to zero to mark this conversation as read
        conversation.unseenMessages = 0;
        state.firstLoad = true;
      }
      if (conversation?.id !== state.selectedConversation?.id) {
        // Whenever the user select another conversation, clear messages which are showing
        state.messages = [];
      }
      state.selectedConversation = action.payload;
    },
    getMessages: (state, _action: PayloadAction<Conversation | undefined>) => {
      state.fetchingMessages = true;
    },
    subscribeNewMessage: (_state) => {},
    sendMessage: (_state, _action: PayloadAction<[MessageData, Conversation?]>) => {},
    loadMoreMessages: (state, _action: PayloadAction<Conversation | undefined>) => {
      state.loadingMoreMessages = true;
      state.firstLoad = false;
    },
    onMessagesRetrieved: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
      state.canLoadMore = action.payload.length >= PAGE_SIZE;
      state.fetchingMessages = false;
    },
    onMoreMessagesLoaded: (state, action: PayloadAction<Message[]>) => {
      const newMessages = action.payload;
      state.canLoadMore = newMessages.length >= PAGE_SIZE;
      state.messages.push(...newMessages);
      state.loadingMoreMessages = false;
    },
    onNewMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      const { selectedConversation } = state;
      if (selectedConversation && selectedConversation.contact.id === message.customerId) {
        state.messages.push(message);
      }
    },
    onAttachmentMessageSent: (state) => {
      state.sendingAttachmentMessage = false;
    },
  },
});

// Actions
export const chatActions = chatSlice.actions;

// Reducers
export const chatReducers = chatSlice.reducer;

export default { chatActions, chatReducers };
