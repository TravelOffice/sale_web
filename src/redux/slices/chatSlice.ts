import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/Conversation';
import { Message, MessageData } from '@domain/entities/Message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PAGE_SIZE } from '@utils/ChatUtils';
import ConversationState from '@redux/slices/others/ConversationState';
import GetConversationState from '@redux/slices/others/GetConversationState';
import SuccessConversationState from '@redux/slices/others/SuccessConversationState';
import ErrorConversationState from '@redux/slices/others/ErrorConversationState';

interface ChatState {
  conversations: Conversation[],
  fbConversations: ConversationState,
  zaloConversations: ConversationState,
  messages: Message[],
  selectedConversation?: Conversation,
  canLoadMore: boolean,
  fetchingMessages: boolean,
  loadingMoreMessages: boolean,
  firstLoad: boolean,
  sendingAttachmentMessage: boolean,
  showingAttachmentMsgPreview: boolean,
  isChatActionError: boolean,
  chatActionErrorMessage: string,
}

const initialState : ChatState = {
  conversations: [],
  fbConversations: new ConversationState(),
  zaloConversations: new ConversationState(),
  messages: [],
  canLoadMore: true,
  fetchingMessages: false,
  loadingMoreMessages: false,
  firstLoad: true,
  sendingAttachmentMessage: false,
  showingAttachmentMsgPreview: false,
  isChatActionError: false,
  chatActionErrorMessage: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getConversations: (state) => {
      state.fbConversations = new GetConversationState();
      state.zaloConversations = new GetConversationState();
    },
    getFbConversations: (state) => {
      state.fbConversations = new GetConversationState();
    },
    getZaloConversations: (state) => {
      state.zaloConversations = new GetConversationState();
    },
    onFbConversationRetrieved: (state, action: PayloadAction<Conversation[]>) => {
      state.fbConversations = new SuccessConversationState(action.payload);
    },
    onGetFbConversationsFailed: (state, action: PayloadAction<string>) => {
      state.fbConversations = new ErrorConversationState(action.payload);
    },
    onZaloConversationsRetrieved: (state, action: PayloadAction<Conversation[]>) => {
      state.zaloConversations = new SuccessConversationState(action.payload);
    },
    onGetZaloConversationsFailed: (state, action: PayloadAction<string>) => {
      state.zaloConversations = new ErrorConversationState(action.payload);
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
    toggleAttachmentMessagePreview: (state, action: PayloadAction<boolean>) => {
      state.showingAttachmentMsgPreview = action.payload;
    },
    sendAttachmentMessage: (
      state,
      _action: PayloadAction<[File, AttachmentMessageType, Conversation?]>,
    ) => {
      state.showingAttachmentMsgPreview = false;
      state.sendingAttachmentMessage = true;
    },
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
      } else {
        // Count unseenMessages of conversation if the new message has come from subscription
        // Don't count message if sender is TO user
        const ofConversation = state.conversations.find(
          (conversation) => conversation.contact.id === message.customerId,
        );
        if (ofConversation && message.customerId === message.sender) {
          ofConversation.unseenMessages += 1;
        }
      }
    },
    onAttachmentMessageSent: (state) => {
      state.sendingAttachmentMessage = false;
    },
    onSendMessageError: (state, action: PayloadAction<string>) => {
      state.sendingAttachmentMessage = false;
      state.isChatActionError = true;
      state.chatActionErrorMessage = action.payload;
    },
  },
});

// Actions
export const chatActions = chatSlice.actions;

// Reducers
export const chatReducers = chatSlice.reducer;

export default { chatActions, chatReducers };
