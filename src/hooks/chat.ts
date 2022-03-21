import { chatPresenter } from '@adapter/presenters';
import { Conversation } from '@domain/entities/Conversation';
import { Message, MessageData } from '@domain/entities/Message';
import { chatActions } from '@redux/slices/chatSlice';
import { RootState } from '@redux/store';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useConversations = () : [Conversation[], boolean] => {
  const conversations = useSelector((state: RootState) => state.chat.conversations);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setFetching(true);
    chatPresenter.getConversations().then((data) => {
      dispatch(chatActions.onConversationsRetrieved(data));
    }).finally(() => {
      setFetching(false);
    });
  }, []);
  return [conversations, fetching];
};

export const useMessages = (conversation?: Conversation) : [Message[], boolean] => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  // Fetch previous messages
  useEffect(() => {
    dispatch(chatActions.onMessagesRetrieved([]));
    setFetching(true);
    chatPresenter.getMessages(conversation).then((data) => {
      dispatch(chatActions.onMessagesRetrieved(data));
    }).finally(() => {
      setFetching(false);
    });
  }, [conversation]);

  // Subscribe to new message
  useEffect(() => {
    const subscription = chatPresenter.subscribeNewMessage().subscribe({
      next: (value) => {
        if (value.data) {
          const rawMsg = value.data.onNewMessageReceived.data;
          const newMsg = {
            ...rawMsg,
            messageData: JSON.parse(rawMsg.messageData),
            timestamp: new Date(rawMsg.timestamp),
          } as Message;
          dispatch(chatActions.onNewMessage(newMsg));
        }
      },
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, [messages]);
  return [messages, fetching];
};

export const useSendMessage = (messages: Message[], conversation?: Conversation) => {
  const auth = useSelector((state: RootState) => state.auth);
  return useCallback((messageData: MessageData) => {
    if (!conversation) {
      return;
    }
    const sender = conversation.type === 'facebook' ? auth.facebookPage?.id : auth.zaloPage?.id;
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
    };
    chatPresenter.sendMessage(newMessage, conversation).then(() => {
    });
  }, [messages, conversation]);
};

export const useLoadMore = (conversation?: Conversation) : [Function, boolean] => {
  const [loadingMore, setLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const loadMore = useCallback(() => {
    if (!conversation) {
      return;
    }
    setLoadingMore(true);
    chatPresenter.loadMoreMessage(conversation).then((result) => {
      dispatch(chatActions.onMoreMessagesLoaded(result));
    }).finally(() => setLoadingMore(false));
  }, [conversation]);
  return [loadMore, loadingMore];
};
