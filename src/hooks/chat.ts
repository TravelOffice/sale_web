import { chatPresenter } from '@adapter/presenters';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { Conversation } from '@domain/entities/chat/Conversation';
import { Message } from '@domain/entities/chat/Message';
import { ConversationSection } from '@features/Chat/ConversationSection';
import { chatActions } from '@redux/slices/chatSlice';
import ConversationState from '@redux/slices/others/ConversationState';
import { RootState } from '@redux/store';
import { platformTitleDefinitions } from '@utils/Constants';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useConversations = () => {
  const allConversationsStates = useSelector((state: RootState) => {
    const states = state.chat.platformsConversations.entries();
    return Object.fromEntries(states);
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chatActions.getAllPlatformsConversations());
  }, []);
  return allConversationsStates;
};

export const useMessages = (conversation?: Conversation): [Message[], boolean] => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const fetching = useSelector((state: RootState) => state.chat.fetchingMessages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chatActions.getMessages(conversation));
  }, [conversation]);

  return [messages, fetching];
};

export const usePage = (platform: ChatPlatform) => useSelector(
  (state: RootState) => state.auth.linkedPages.find((page) => page.platform === platform),
);

export const useIsPageConnecting = (platform: ChatPlatform) => useSelector(
  (state: RootState) => state.pageConnection.connecting[platform],
);

export const useConversationSections = () => {
  const linkedPages = useSelector((state: RootState) => state.auth.linkedPages);
  const allConversationsStates = useConversations();
  const sections: ConversationSection[] = useMemo(() => linkedPages.map((page) => {
    const { platform } = page;
    const platformConversationsState = allConversationsStates[platform];
    return {
      title: platformTitleDefinitions[platform],
      ...platformConversationsState,
    };
  }), [allConversationsStates]);
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

export const useAllPlatformConversations = () => useSelector((state: RootState) => {
  const platformConversationsMap = state.chat.platformsConversations;
  return Array
    .from(platformConversationsMap.values())
    .map((conversationState: ConversationState) => conversationState.conversations)
    .flat();
});
