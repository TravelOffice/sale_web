import SendMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/chat/Conversation';
import { Message, MessageData } from '@domain/entities/chat/Message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PAGE_SIZE } from '@utils/ChatUtils';
import ConversationState from '@redux/slices/others/ConversationState';
import GetConversationState from '@redux/slices/others/GetConversationState';
import SuccessConversationState from '@redux/slices/others/SuccessConversationState';
import ErrorConversationState from '@redux/slices/others/ErrorConversationState';
import { ChatPlatform, chatPlatforms } from '@domain/entities/chat/ChatPlatform';

interface ChatState {
  platformsConversations: Map<ChatPlatform, ConversationState>,
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

const initialState: ChatState = {
  platformsConversations: new Map(),
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
    getAllPlatformsConversations: (state) => {
      chatPlatforms.forEach((platform) => {
        state.platformsConversations.set(platform, new GetConversationState());
      });
    },
    getPlatformConversations: (state, action: PayloadAction<ChatPlatform>) => {
      const platform = action.payload;
      state.platformsConversations.set(platform, new GetConversationState());
    },
    onPlatformConversationsRetrieved: (
      state,
      action: PayloadAction<[ChatPlatform, Conversation[]]>,
    ) => {
      const [platform, conversations] = action.payload;
      state.platformsConversations.set(platform, new SuccessConversationState(conversations));
    },
    onGetPlatformConversationsFailed: (state, action: PayloadAction<[ChatPlatform, string]>) => {
      const [platform, errorMessage] = action.payload;
      state.platformsConversations.set(platform, new ErrorConversationState(errorMessage));
    },
    onNewConversation: (state, action: PayloadAction<Conversation>) => {
      const newConversation = action.payload;
      const platformConversations = state.platformsConversations.get(newConversation.chatPlatform);
      if (platformConversations) {
        state.platformsConversations.set(
          newConversation.chatPlatform,
          platformConversations?.onNewConversation(
            newConversation,
            state.selectedConversation,
          ),
        );
      }
    },
    onConversationSelected: (state, action: PayloadAction<Conversation>) => {
      const conversations: Conversation[] = Array
        .from(state.platformsConversations.values())
        .map((conversationState: ConversationState) => conversationState.conversations)
        .flat();
      const conversation = conversations.find((item) => item.id === action.payload.id);
      if (conversation) {
        // Change unseenMessages to zero to mark this conversation as read
        conversation.unseenMessages = 0;
        state.firstLoad = true;
      }
      if (conversation?.id !== state.selectedConversation?.id) {
        // Whenever the user select another conversation, clear messages which are showing
        state.messages = [];
      }
      state.selectedConversation = conversation && { ...conversation };
    },
    getMessages: (state, _action: PayloadAction<Conversation | undefined>) => {
      state.fetchingMessages = true;
    },
    subscribeNewMessage: (_state) => { },
    sendMessage: (_state, _action: PayloadAction<[MessageData, Conversation?]>) => { },
    toggleAttachmentMessagePreview: (state, action: PayloadAction<boolean>) => {
      state.showingAttachmentMsgPreview = action.payload;
    },
    sendAttachmentMessage: (
      state,
      _action: PayloadAction<[File, SendMessageType, Conversation?]>,
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
    assignChat: (_state, _action: PayloadAction<[Conversation, string]>) => {},
    onChatAssigned: (state, action: PayloadAction<[Conversation, string]>) => {
      const [conversation, newAssignee] = action.payload;
      // Update assignee for selected conversation
      if (state.selectedConversation) {
        state.selectedConversation.assignee = newAssignee;
      }

      // Update conversations list
      const { chatPlatform } = conversation;
      const platformConversations = state.platformsConversations.get(chatPlatform);
      if (platformConversations) {
        state.platformsConversations.set(
          chatPlatform,
          platformConversations?.onConversationAssigned(
            conversation,
            newAssignee,
          ),
        );
      }
    },
  },
});

// Actions
export const chatActions = chatSlice.actions;

// Reducers
export const chatReducers = chatSlice.reducer;

export default { chatActions, chatReducers };
