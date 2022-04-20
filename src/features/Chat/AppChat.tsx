import React, { useState } from 'react';
import classnames from 'classnames';
import { Conversation } from '@domain/entities/Conversation';
import {
  useConversations, useMessages,
} from '@hooks/chat';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '@redux/slices/chatSlice';
import { MessageData } from '@domain/entities/Message';
import { RootState } from '@redux/store';
import ChatLog from './ChatLog';
import Sidebar from './SidebarLeft';
import UserProfileSidebar from './UserProfileSidebar';
import '@styles/base/pages/app-chat.scss';
import '@styles/base/pages/app-chat-list.scss';

const AppChat = () => {
  // ** States
  const conversation = useSelector((state: RootState) => state.chat.selectedConversation);
  const loadingMore = useSelector((state: RootState) => state.chat.loadingMoreMessages);
  const firstLoad = useSelector((state: RootState) => state.chat.firstLoad);
  const [sidebar, setSidebar] = useState(false);
  const [userSidebarRight, setUserSidebarRight] = useState(false);
  const [userSidebarLeft, setUserSidebarLeft] = useState(false);
  const [conversations, fetchingConversations] = useConversations();
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

  const onSendAttachmentMessage = (attachment: File) => {
    dispatch(chatActions.sendAttachmentMessage([attachment, conversation]));
  };

  const onLoadMore = () => {
    dispatch(chatActions.loadMoreMessages(conversation));
  };
  return (
    <>
      <Sidebar
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        userSidebarLeft={userSidebarLeft}
        handleUserSidebarLeft={handleUserSidebarLeft}
        onConversationSelected={onConversationSelected}
        conversations={conversations}
        fetching={fetchingConversations}
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
