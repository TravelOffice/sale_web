import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import SendMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/chat/Conversation';
import { MessageData } from '@domain/entities/chat/Message';
import { ConversationSection } from '@features/Chat/ConversationSection';
import { useAllPlatformConversations, useConversationSections, useMessages } from '@hooks/chat';
import useQueryParams from '@hooks/useQueryParams';
import { chatActions } from '@redux/slices/chatSlice';
import { RootState } from '@redux/store';
import '@styles/base/pages/app-chat-list.scss';
import '@styles/base/pages/app-chat.scss';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddLeadSidebar from '@features/Chat/AddLeadSidebar';
import ChatLog from './ChatLog';
import Sidebar from './SidebarLeft';
import UserProfileSidebar from './UserProfileSidebar';

const AppChat = () => {
  // ** States
  const conversation = useSelector((state: RootState) => state.chat.selectedConversation);
  const loadingMore = useSelector((state: RootState) => state.chat.loadingMoreMessages);
  const firstLoad = useSelector((state: RootState) => state.chat.firstLoad);
  const isChatActionError = useSelector((state: RootState) => state.chat.isChatActionError);
  const chatActionErrorMessage = useSelector(
    (state: RootState) => state.chat.chatActionErrorMessage,
  );
  const [sidebar, setSidebar] = useState(false);
  const [userSidebarRight, setUserSidebarRight] = useState(false);
  const [openLeadSidebarRight, setOpenLeadSidebarRight] = useState(false);
  const [userSidebarLeft, setUserSidebarLeft] = useState(false);
  const [isLoadByParams, setIsLoadByParams] = useState(false);
  const sections: ConversationSection[] = useConversationSections();
  const allPlatformConversations: Conversation[] = useAllPlatformConversations();
  const [messages, fetchingMessages] = useMessages(conversation);
  const dispatch = useDispatch();
  const useQuery = useQueryParams();

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar);
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft);
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight);
  // Handle event when click on add lead button
  const handleAddLeadSidebarRight = () => setOpenLeadSidebarRight(!openLeadSidebarRight);
  const handleOverlayClick = () => {
    setSidebar(false);
    setUserSidebarRight(false);
    setUserSidebarLeft(false);
  };

  const onConversationSelected = (item: Conversation) => {
    dispatch(chatActions.onConversationSelected(item));
  };

  const onSendMessage = (messageData: MessageData) => {
    dispatch(chatActions.sendMessage([messageData, conversation]));
  };

  const onSendAttachmentMessage = (attachment: File, attachmentType: SendMessageType) => {
    dispatch(chatActions.sendAttachmentMessage([attachment, attachmentType, conversation]));
  };

  const onLoadMore = () => {
    dispatch(chatActions.loadMoreMessages(conversation));
  };

  // Show error message when chat action failed
  useEffect(() => {
    if (isChatActionError) {
      toasty.show({ title: i18n.t('COMMON.ERROR'), type: 'error', message: chatActionErrorMessage });
    }
  }, [isChatActionError]);

  useEffect(() => {
    if (isLoadByParams) return;
    const chatPlatformParam = useQuery.get('chatPlatform');
    const conversationIdParam = useQuery.get('conversationId');
    if (chatPlatformParam && conversationIdParam) {
      const conversationToOpen = allPlatformConversations.find((platformConversation) => {
        const { chatPlatform, id } = platformConversation;
        return chatPlatformParam === chatPlatform && conversationIdParam === id;
      });
      if (conversationToOpen) {
        dispatch(chatActions.onConversationSelected(conversationToOpen));
        setIsLoadByParams(true);
      }
    }
  }, [useQuery, allPlatformConversations]);

  return (
    <>
      <Sidebar
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        userSidebarLeft={userSidebarLeft}
        handleUserSidebarLeft={handleUserSidebarLeft}
        onConversationSelected={onConversationSelected}
        selectedConversation={conversation}
        conversationSections={sections}
      />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body">
            <div
              className={classnames('body-content-overlay', {
                show: userSidebarRight || sidebar || userSidebarLeft || openLeadSidebarRight,
              })}
              onClick={handleOverlayClick}
            />
            <ChatLog
              fetching={fetchingMessages}
              messages={messages}
              handleSidebar={handleSidebar}
              userSidebarLeft={userSidebarLeft}
              selectedConversation={conversation}
              handleUserSidebarRight={handleUserSidebarRight}
              handleAddLeadSidebarRight={handleAddLeadSidebarRight}
              onSendMessage={onSendMessage}
              onSendAttachmentMessage={onSendAttachmentMessage}
              onLoadMore={onLoadMore}
              loadingMore={loadingMore}
              firstLoad={firstLoad}
            />
            <UserProfileSidebar
              conversation={conversation}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            />
            <AddLeadSidebar
              conversation={conversation}
              openAddLeadSidebar={openLeadSidebarRight}
              toggleAddLeadSidebarRight={handleAddLeadSidebarRight}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppChat;
