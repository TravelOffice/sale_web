import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import { Conversation } from '@domain/entities/Conversation';
import { useConversations, useMessages } from '@hooks/chat';
import { SendMessageRequestParams } from '@domain/entities/SendMessageRequestParams';
import { useDispatch } from 'react-redux';
import { chatActions } from '@redux/slices/chatSlice';
import ChatLog from './ChatLog';
import Sidebar from './SidebarLeft';
import UserProfileSidebar from './UserProfileSidebar';
import '@styles/base/pages/app-chat.scss';
import '@styles/base/pages/app-chat-list.scss';

const AppChat = () => {
  // ** States
  const [conversation, setConversation] = useState<Conversation | undefined>(undefined);
  const [sidebar, setSidebar] = useState(false);
  const [userSidebarRight, setUserSidebarRight] = useState(false);
  const [userSidebarLeft, setUserSidebarLeft] = useState(false);
  const [conversations, fetchingConversations] = useConversations();
  const [messages, dispatchSendMessage] = useMessages(conversation?.id);
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
    setConversation(item);
    dispatch(chatActions.onMessageRead(item));
  };

  const sendMessage = useCallback((params: SendMessageRequestParams) => {
    dispatchSendMessage(params);
  }, [messages]);
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
              messages={messages}
              handleSidebar={handleSidebar}
              userSidebarLeft={userSidebarLeft}
              selectedConversation={conversation}
              handleUserSidebarRight={handleUserSidebarRight}
              onSendMessage={sendMessage}
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
