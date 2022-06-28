import { chatPresenter } from '@adapter/presenters';
import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/Conversation';
import { Message, MessageData } from '@domain/entities/Message';
import { chatActions } from '@redux/slices/chatSlice';
import { RootState } from '@redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { END, EventChannel, eventChannel } from 'redux-saga';
import {
  all, call, cancelled, put, select, take, takeEvery, takeLatest,
} from 'redux-saga/effects';

function* getConversation() {
  try {
    const data: Conversation[] = yield call(chatPresenter.getConversations);
    yield put({ type: chatActions.onConversationsRetrieved.type, payload: data });
  } catch (error) {
    // Do nothing
  }
}

function* getConversationMessages(action: PayloadAction<Conversation | undefined>) {
  try {
    const conversation = action.payload;
    if (!conversation) {
      yield put({ type: chatActions.onMessagesRetrieved.type, payload: [] });
    } else {
      const messages: Message[] = yield call(chatPresenter.getMessages, conversation);
      yield put({ type: chatActions.onMessagesRetrieved.type, payload: messages });
    }
  } catch (error) {
  // Do nothing
  }
}

/**
 * Create redux-saga event channel to listen to new message. Whenever receiving a message,
 * this channel should emit it. By using this event in infinite loop, the app
 */
function createSubscriptionChannel(): EventChannel<Message> {
  return eventChannel((emit) => {
    const obs = chatPresenter.subscribeNewMessage().subscribe({
      next: (value) => {
        if (value.data) {
          const rawMsg = value.data.onNewMessageReceived.data;
          const messageData = JSON.parse(rawMsg.messageData);
          if (messageData.attachments && messageData.attachments.length > 0) {
            messageData.attachments = messageData.attachments.map((attachment: any) => {
              // Transform original data
              const { type, payload, ...modifiedAttachment } = attachment;
              const [fileUri] = payload.url.split('?');
              const { length, [length - 1]: fileName } = fileUri.split('/');
              modifiedAttachment.mimeType = `${type}/*`;
              modifiedAttachment.url = payload.url;
              modifiedAttachment.name = fileName;

              return modifiedAttachment;
            });
          }

          // TODO: Support Zalo webhook event later
          const newMsg = {
            ...rawMsg,
            messageData,
            timestamp: new Date(rawMsg.timestamp),
          } as Message;
          emit(newMsg);
        }
      },
      complete: () => {
        emit(END);
      },
    });

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    return () => {
      obs.unsubscribe();
    };
  });
}

function* subscribeNewMessageEvent() {
  const subscriptionChannel = createSubscriptionChannel();
  while (true) {
    try {
      const message: Message = yield take(subscriptionChannel);
      // Notify to update messages list
      yield put({ type: chatActions.onNewMessage.type, payload: message });
      // Notify to update conversations list
      const selector = (state: RootState) => state.chat.conversations;
      const conversations: Conversation[] = yield select(selector);
      const conversation = conversations.find(
        (item: Conversation) => item.contact.id === message.customerId,
      );
      if (conversation) {
        const newConversation: Conversation = { ...conversation, lastMessage: message };
        yield put({ type: chatActions.onNewConversation.type, payload: newConversation });
      } else {
        // TODO: dispatch action to reload conversations
      }
    } finally {
      const isCancelled: boolean = yield cancelled();
      if (isCancelled) {
        subscriptionChannel.close();
      }
    }
  }
}

function* sendMessage(action: PayloadAction<[MessageData, Conversation?]>) {
  try {
    const [messageData, conversation] = action.payload;
    if (!conversation) {
      return;
    }
    const { facebookPage, zaloPage } = yield select((state: RootState) => state.auth);
    const sender = conversation.chatPlatform === 'facebook' ? facebookPage?.id : zaloPage?.id;
    if (!sender) {
      return;
    }
    const newMessage: Message = {
      id: '',
      customerId: conversation.contact.id,
      messageData,
      recipient: conversation.contact.id,
      sender,
      timestamp: new Date(),
      chatPlatform: conversation.chatPlatform,
    };
    yield call(chatPresenter.sendMessage, newMessage, conversation);
  } catch (error: any) {
    yield put({ type: chatActions.onSendMessageError.type, payload: error.message });
  }
}

function* sendAttachmentMessage(
  action: PayloadAction<[File, AttachmentMessageType, Conversation?]>,
) {
  try {
    const [attachment, attachmentType, conversation] = action.payload;
    if (!conversation) {
      return;
    }
    const { facebookPage, zaloPage } = yield select((state: RootState) => state.auth);
    const sender = conversation.chatPlatform === 'facebook' ? facebookPage?.id : zaloPage?.id;
    if (!sender) {
      return;
    }
    yield call(
      chatPresenter.sendAttachmentMessage, sender, attachment, attachmentType, conversation,
    );
    yield put({ type: chatActions.onAttachmentMessageSent.type });
  } catch (error: any) {
    yield put({ type: chatActions.onSendMessageError.type, payload: error.message });
  }
}

function* loadMoreConversationMessages(action: PayloadAction<Conversation | undefined>) {
  try {
    const conversation = action.payload;
    let messages: Message[] = [];
    if (conversation) {
      messages = yield call(chatPresenter.loadMoreMessage, conversation);
    }

    yield put({ type: chatActions.onMoreMessagesLoaded.type, payload: messages });
  } catch (error) {
    // Do nothing
  }
}

export default function* chatSaga() {
  yield all([
    takeLatest(chatActions.getConversations, getConversation),
    takeLatest(chatActions.getMessages, getConversationMessages),
    takeEvery(chatActions.sendMessage, sendMessage),
    takeLatest(chatActions.sendAttachmentMessage, sendAttachmentMessage),
    takeLatest(chatActions.subscribeNewMessage, subscribeNewMessageEvent),
    takeLatest(chatActions.loadMoreMessages, loadMoreConversationMessages),
  ]);
}
