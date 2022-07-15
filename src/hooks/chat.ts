import { chatPresenter } from '@adapter/presenters';
import { ChatPlatform } from '@domain/entities/ChatPlatform';
import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import { ConversationSection } from '@features/Chat/ConversationSection';
import { chatActions } from '@redux/slices/chatSlice';
import { RootState } from '@redux/store';
import { FACEBOOK, ZALO } from '@utils/Constants';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useConversations = () => {
  const fbConversationsState = useSelector((state: RootState) => state.chat.fbConversations);
  const zaloConversationsState = useSelector((state: RootState) => state.chat.zaloConversations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chatActions.getConversations());
  }, []);
  return {
    fbConversationsState,
    zaloConversationsState,
  };
};

export const useMessages = (conversation?: Conversation): [Message[], boolean] => {
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

export const usePage = (platform: ChatPlatform) => useSelector(
  (state: RootState) => state.auth.linkedPages.find((page) => page.platform === platform),
);

export const useConversationSections = () => {
  const fbPage = usePage('facebook');
  const zaloPage = usePage('zalo');
  const { fbConversationsState, zaloConversationsState } = useConversations();
  const sections: ConversationSection[] = useMemo(() => {
    const conversations = [];
    if (fbPage) {
      conversations.push({ title: FACEBOOK, ...fbConversationsState });
    }
    if (zaloPage) {
      conversations.push({ title: ZALO, ...zaloConversationsState });
    }
    return conversations;
  }, [fbConversationsState, zaloConversationsState]);
  return sections;
};

export const useLoadMore = (conversation?: Conversation): [Function, boolean] => {
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
