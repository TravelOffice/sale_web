import React, {
  useState, useEffect, useRef, FormEvent,
} from 'react';
import Avatar from '@components/Avatar/Avatar';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  MessageSquare, Menu, PhoneCall, Video, Search, MoreVertical, Mic, Image, Send,
} from 'react-feather';
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupText,
  UncontrolledDropdown,
} from 'reactstrap';
import { RootState } from '@redux/store';
import { Message } from '@domain/entities/Message';
import { Conversation } from '@domain/entities/Conversation';
import { SendMessageRequestParams } from '@domain/entities/SendMessageRequestParams';
import { formatChatData } from '@utils/ChatUtils';
import { Contact } from '@domain/entities/Contact';
import AdminUser from '@domain/entities/AdminUser';

export interface ChatLogProps {
  handleUserSidebarRight: () => void,
  handleSidebar: () => void,
  userSidebarLeft: boolean,
  selectedConversation?: Conversation,
  messages: Message[],
  onSendMessage: (params: SendMessageRequestParams) => void,
}

export interface MessageGroup {
  senderId: string,
  messages: Array<Message>
}

function renderChats(messages: Message[], currentUser: AdminUser, contact: Contact) {
  const isMe = (sender: string) => sender === currentUser.id;
  return formatChatData(messages).map((item) => (
    <div
      key={item.messages[0].timestamp.getTime()}
      className={classnames('chat', {
        'chat-left': !isMe(item.senderId),
      })}
    >
      <div className="chat-avatar">
        <Avatar
          imgWidth={36}
          imgHeight={36}
          className="box-shadow-1 cursor-pointer"
          img={isMe(item.senderId) ? currentUser.avatar : contact.avatar}
        />
      </div>

      <div className="chat-body">
        {item.messages.map((chat) => (
          <div key={chat.timestamp.getTime()} className="chat-content">
            <p>{chat.messageData.text}</p>
          </div>
        ))}
      </div>
    </div>
  ));
}

const ChatLog = (props: ChatLogProps) => {
  const {
    handleUserSidebarRight, handleSidebar, userSidebarLeft, selectedConversation,
    messages, onSendMessage,
  } = props;
  const authState = useSelector((state: RootState) => state.auth);
  const currentUser = authState.currentUser!;
  const currentUserId = currentUser.id;
  const customerId = selectedConversation?.id;
  const contact = selectedConversation?.contact;

  // State
  // const [messages, dispatchSendMessage] = useMessages(selectedConversation?.id);
  const [messageText, setMessageText] = useState('');
  const [scrollViewRef, setScrollViewRef] = useState<HTMLElement | null>(null);

  const chatArea = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef) {
      scrollViewRef.scrollTop = Number.MAX_SAFE_INTEGER;
    }
  };

  // If user chat is not empty scrollToBottom
  useEffect(() => {
    const selectedUserLen = messages.length;

    if (selectedUserLen) {
      scrollToBottom();
    }
  }, [selectedConversation, messages]);

  // Opens right sidebar & handles its data
  const handleAvatarClick = () => {
    handleUserSidebarRight();
  };

  // On mobile screen open left sidebar on Start Conversation Click
  const handleStartConversation = () => {
    if (!selectedConversation && !userSidebarLeft && window.innerWidth < 992) {
      handleSidebar();
    }
  };

  // Send a message
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageText.length && customerId) {
      setMessageText('');
      const params : SendMessageRequestParams = {
        customerId,
        recipient: customerId,
        sender: currentUserId,
        messageData: JSON.stringify({ text: messageText }),
      };
      onSendMessage(params);
    }
  };

  // ChatWrapper tag based on chat's length
  // const ChatWrapper = selectedConversation && messages.length ? PerfectScrollbar : 'div';

  return (
    <div className="chat-app-window">
      <div className={classnames('start-chat-area', { 'd-none': selectedConversation })}>
        <div className="start-chat-icon mb-1">
          <MessageSquare />
        </div>
        <h4 className="sidebar-toggle start-chat-text" onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div>
      {selectedConversation && (
        <div className={classnames('active-chat', { 'd-none': false })}>
          <div className="chat-navbar">
            <header className="chat-header">
              <div className="d-flex align-items-center">
                <div className="sidebar-toggle d-block d-lg-none me-1" onClick={handleSidebar}>
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight="36"
                  imgWidth="36"
                  img={contact?.avatar}
                  className="avatar-border user-profile-toggle m-0 me-1"
                  onClick={handleAvatarClick}
                />
                <h6 className="mb-0">{contact?.fullName}</h6>
              </div>
              <div className="d-flex align-items-center">
                <PhoneCall size={18} className="cursor-pointer d-sm-block d-none me-1" />
                <Video size={18} className="cursor-pointer d-sm-block d-none me-1" />
                <Search size={18} className="cursor-pointer d-sm-block d-none" />
                <UncontrolledDropdown className="more-options-dropdown">
                  <DropdownToggle className="btn-icon" color="transparent" size="sm">
                    <MoreVertical size="18" />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      View Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Mute Notifications
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Report
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </header>
          </div>

          <PerfectScrollbar containerRef={(ref) => setScrollViewRef(ref)} ref={chatArea} className="user-chats" options={{ wheelPropagation: false }}>
            {
              messages.length > 0 && (
                <div className="chats">{renderChats(messages, currentUser, selectedConversation.contact)}</div>
              )
            }
          </PerfectScrollbar>

          <Form className="chat-app-form" onSubmit={(e) => handleSendMessage(e)}>
            <InputGroup className="input-group-merge me-1 form-send-message">
              <InputGroupText>
                <Mic className="cursor-pointer" size={14} />
              </InputGroupText>
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message or use speech to text"
              />
              <InputGroupText>
                <Label className="attachment-icon mb-0" for="attach-doc">
                  <Image className="cursor-pointer text-secondary" size={14} />
                  <input type="file" id="attach-doc" hidden />
                </Label>
              </InputGroupText>
            </InputGroup>
            <Button className="send" color="primary">
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Send</span>
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ChatLog;
