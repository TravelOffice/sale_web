import { Message } from '@domain/entities/chat/Message';
import { Conversation } from '@domain/entities/chat/Conversation';
import { groupMessages } from '@utils/ChatUtils';
import React, { useMemo } from 'react';
import classnames from 'classnames';
import Avatar from '@components/Avatar/Avatar';
import CustomerAvatar from '@components/Avatar/CustomerAvatar';
import ChatMessage from '@features/Chat/components/ChatMessage';
import { useCurrentUser } from '@hooks/auth';

export interface MessageListProps {
  currentConversation: Conversation,
  messages: Message[],
  onMessageClicked: (message: Message) => void,
}

export default function MessageList(props: MessageListProps) {
  const { currentConversation, messages, onMessageClicked } = props;
  const { contact } = currentConversation;
  const isMe = (sender: string) => sender !== contact.id;
  const messageGroups = useMemo(() => groupMessages(messages), [messages]);
  const currentUser = useCurrentUser()!;
  return (
    <>
      {
        messageGroups.map((group) => (
          <div
            key={group.messages[0].id}
            className={classnames('chat', { 'chat-left': !isMe(group.senderId) })}
          >
            <div className="chat-avatar">
              {
                isMe(group.senderId)
                  ? (
                    <Avatar
                      imgWidth="42"
                      imgHeight="42"
                      className="cursor-pointer"
                      color="light-primary"
                      img={currentUser.avatar}
                      content={currentUser.avatar ? undefined : currentUser.fullName}
                    />
                  ) : <CustomerAvatar conversation={currentConversation} />
              }
            </div>

            <div className="chat-body">
              {group.messages.map((message) => (
                <ChatMessage
                  message={message}
                  key={message.id}
                  onClick={onMessageClicked}
                  messageData={message.messageData}
                />
              ))}
            </div>
          </div>
        ))
      }
    </>
  );
}
