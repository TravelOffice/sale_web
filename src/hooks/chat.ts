import { chatPresenter } from '@adapter/presenters';
import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import { chatActions } from '@redux/slices/chatSlice';
import { RootState } from '@redux/store';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useConversations = () : [Conversation[], boolean] => {
  const conversations = useSelector((state: RootState) => state.chat.conversations);
  const fetching = useSelector((state: RootState) => state.chat.fetchingConversations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chatActions.getConversations());
  }, []);
  return [conversations, fetching];
};

export const useMessages = (conversation?: Conversation) : [Message[], boolean] => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const fetching = useSelector((state: RootState) => state.chat.fetchingMessages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chatActions.getMessages(conversation));
  }, [conversation]);

  // Subscribe to new message
  useEffect(() => {
    dispatch(chatActions.subscribeNewMessage());
  }, []);
  return [messages, fetching];
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
