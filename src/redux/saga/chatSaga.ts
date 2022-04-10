import {
  all, call, cancelled, put, take, takeEvery, takeLatest, select,
} from 'redux-saga/effects';
import { chatActions } from '@redux/slices/chatSlice';
import { chatPresenter } from '@adapter/presenters';
import { Conversation } from '@domain/entities/Conversation';
import { PayloadAction } from '@reduxjs/toolkit';
import { Message, MessageData } from '@domain/entities/Message';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { RootState } from '@redux/store';

function* getConversation() {
  const data : Conversation[] = yield call(chatPresenter.getConversations);
  yield put({ type: chatActions.onConversationsRetrieved.type, payload: data });
}

function* getConversationMessages(action: PayloadAction<Conversation | undefined>) {
  const conversation = action.payload;
  if (!conversation) {
    yield put({ type: chatActions.onMessagesRetrieved.type, payload: [] });
  } else {
    const data : Message[] = yield call(chatPresenter.getMessages, conversation);
    yield put({ type: chatActions.onMessagesRetrieved.type, payload: data });
  }
}

/**
 * Create redux-saga event channel to listen to new message. Whenever receiving a message,
 * this channel should emit it. By using this event in infinite loop, the app
 */
function createSubscriptionChannel() : EventChannel<Message> {
  return eventChannel((emit) => {
    const obs = chatPresenter.subscribeNewMessage().subscribe({
      next: (value) => {
        if (value.data) {
          const rawMsg = value.data.onNewMessageReceived.data;
          const newMsg = {
            ...rawMsg,
            messageData: JSON.parse(rawMsg.messageData),
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
      const conversations : Conversation[] = yield select(selector);
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
      const isCancelled : boolean = yield cancelled();
      if (isCancelled) {
        subscriptionChannel.close();
      }
    }
  }
}

function* sendMessage(action: PayloadAction<[MessageData, Conversation?]>) {
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
}

function* loadMoreConversationMessages(action: PayloadAction<Conversation | undefined>) {
  const conversation = action.payload;
  if (!conversation) {
    return;
  }
  const messages : Message[] = yield call(chatPresenter.loadMoreMessage, conversation);
  yield put({ type: chatActions.onMoreMessagesLoaded.type, payload: messages });
}

export default function* chatSaga() {
  yield all([
    takeLatest(chatActions.getConversations, getConversation),
    takeLatest(chatActions.getMessages, getConversationMessages),
    takeEvery(chatActions.sendMessage, sendMessage),
    takeLatest(chatActions.subscribeNewMessage, subscribeNewMessageEvent),
    takeLatest(chatActions.loadMoreMessages, loadMoreConversationMessages),
  ]);
}
