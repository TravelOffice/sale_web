import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/Conversation';
import { MessageData } from '@domain/entities/Message';
import {
  useConversations, useMessages,
} from '@hooks/chat';
import { chatActions } from '@redux/slices/chatSlice';
import { RootState } from '@redux/store';
import '@styles/base/pages/app-chat-list.scss';
import '@styles/base/pages/app-chat.scss';
import classnames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConversationSection } from '@features/Chat/ConversationSection';
import { FACEBOOK, ZALO } from '@utils/Constants';
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
  const [userSidebarLeft, setUserSidebarLeft] = useState(false);
  const { fbConversationsState, zaloConversationsState } = useConversations();
  const sections : ConversationSection[] = useMemo(() => ([
    { title: FACEBOOK, ...fbConversationsState },
    { title: ZALO, ...zaloConversationsState },
  ]), [fbConversationsState, zaloConversationsState]);
  const [messages, fetchingMessages] = useMessages(conversation);
  const dispatch = useDispatch();

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar);
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft);
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight);
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

  const onSendAttachmentMessage = (attachment: File, attachmentType: AttachmentMessageType) => {
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

  return (
    <>
      <Sidebar
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        userSidebarLeft={userSidebarLeft}
        handleUserSidebarLeft={handleUserSidebarLeft}
        onConversationSelected={onConversationSelected}
        conversationSections={sections}
      />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body">
            <div
              className={classnames('body-content-overlay', {
                show: userSidebarRight || sidebar || userSidebarLeft,
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
              onSendMessage={onSendMessage}
              onSendAttachmentMessage={onSendAttachmentMessage}
              onLoadMore={onLoadMore}
              loadingMore={loadingMore}
              firstLoad={firstLoad}
            />
            <UserProfileSidebar
              contact={conversation?.contact}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppChat;
