import React, {
  useState, useEffect, useRef, FormEvent, useMemo,
} from 'react';
import Avatar from '@components/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  MessageSquare,
  Menu,
  PhoneCall,
  Video,
  Search,
  MoreVertical,
  Mic, Send,
  Volume2,
  Image,
  File,
  Paperclip,
} from 'react-feather';
import {
  Form,
  Input,
  Button,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupText,
  UncontrolledDropdown,
  Spinner as ReactSpinner,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import { RootState } from '@redux/store';
import { Message, MessageData } from '@domain/entities/Message';
import { Conversation } from '@domain/entities/Conversation';
import { formatChatData, sortMessages } from '@utils/ChatUtils';
import { Contact } from '@domain/entities/Contact';
import AdminUser from '@domain/entities/AdminUser';
import Spinner from '@components/Spinner/Spinner';
import ChatMessage from '@features/Chat/components/ChatMessage';
import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';
import AttachmentMessagePreview from '@components/Chat/AttachmentMessagePreview';
import { chatActions } from '@redux/slices/chatSlice';

interface AttachmentMessageSetting {
  id: number,
  icon: JSX.Element,
  fileType: AttachmentMessageType,
  ignoreInZalo?: boolean,
}
const attachmentMessageSettings: AttachmentMessageSetting[] = [
  {
    id: 0,
    icon: <Video size={15} />,
    fileType: AttachmentMessageType.VIDEO,
    ignoreInZalo: true,
  },
  {
    id: 1,
    icon: <Volume2 size={15} />,
    fileType: AttachmentMessageType.AUDIO,
    ignoreInZalo: true,
  },
  {
    id: 2,
    icon: <Image size={15} />,
    fileType: AttachmentMessageType.IMAGE,
  },
  {
    id: 3,
    icon: <File size={15} />,
    fileType: AttachmentMessageType.FILE,
  },
];

export interface ChatLogProps {
  handleUserSidebarRight: () => void,
  handleSidebar: () => void,
  userSidebarLeft: boolean,
  selectedConversation?: Conversation,
  messages: Message[],
  fetching: boolean,
  onSendMessage: (params: MessageData) => void,
  onSendAttachmentMessage: (attachment: File, attachmentType: AttachmentMessageType) => void,
  onLoadMore: () => void,
  loadingMore: boolean,
  firstLoad: boolean,
}

export interface MessageGroup {
  senderId: string,
  messages: Array<Message>
}

function renderChats(messages: Message[], currentUser: AdminUser, contact: Contact) {
  const isMe = (sender: string) => sender !== contact.id;
  return formatChatData(messages).map((item) => (
    <div
      key={item.messages[0].id}
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
        {item.messages.map((message) => (
          <ChatMessage message={message} key={message.id} />
        ))}
      </div>
    </div>
  ));
}

function renderLoadMore(canLoadMore: boolean, loadingMore: boolean, onClick: Function) {
  if (loadingMore) {
    return (
      <div className="loading-more">
        <span>Loading more...</span>
      </div>
    );
  }
  if (canLoadMore) {
    return (
      <button className="load-more-btn" type="button" onClick={() => onClick()}>
        Click to load previous messages
      </button>
    );
  }
  return <></>;
}

const ChatLog = (props: ChatLogProps) => {
  const {
    handleUserSidebarRight, handleSidebar, userSidebarLeft, selectedConversation,
    messages, onSendMessage, fetching, onLoadMore, loadingMore, firstLoad, onSendAttachmentMessage,
  } = props;
  const authState = useSelector((state: RootState) => state.auth);
  const currentUser = authState.currentUser!;
  const customerId = selectedConversation?.id;
  const contact = selectedConversation?.contact;
  const canLoadMore = useSelector((state: RootState) => state.chat.canLoadMore);
  const isSendingAttachment = useSelector(
    (state: RootState) => state.chat.sendingAttachmentMessage,
  );
  const attachmentRef = useRef<HTMLInputElement | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [
    attachmentType,
    setAttachmentType,
  ] = useState<AttachmentMessageType>(AttachmentMessageType.FILE);
  // State
  const [messageText, setMessageText] = useState('');
  const [scrollViewRef, setScrollViewRef] = useState<HTMLElement | null>(null);

  const chatArea = useRef(null);

  const dispatch = useDispatch();

  // If user chat is not empty scrollToBottom
  useEffect(() => {
    if (messages.length && firstLoad && scrollViewRef) {
      setTimeout(() => {
        scrollViewRef.scrollTop = Number.MAX_SAFE_INTEGER;
      }, 100);
    }
  }, [selectedConversation, messages, scrollViewRef, firstLoad]);

  /**
   * Render dropdown items for sending attachment message
   * When user click dropdown item, a file chooser window will be shown
   * Then user can choose attachment file according to attachment type of given dropdown item
   * Supported attachment types are `file`, `audio`, `video`, `image`
   */
  const renderAttachmentItems = attachmentMessageSettings
    .filter((attachmentSetting) => (attachmentSetting.ignoreInZalo && selectedConversation?.chatPlatform === 'zalo') || selectedConversation?.chatPlatform === 'facebook')
    .map((attachmentSetting) => (
      <DropdownItem
        tag="span"
        key={attachmentSetting.id}
        onClick={() => {
          setAttachmentType(attachmentSetting.fileType);
          if (attachmentRef.current) {
            attachmentRef.current.accept = attachmentSetting.fileType === AttachmentMessageType.FILE ? '*/*' : `${attachmentSetting.fileType}/*`;
          }
          attachmentRef.current?.click();
        }}
      >
        {attachmentSetting.icon}
      </DropdownItem>
    ));

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

  /**
   * Send text message to customer
   * @param e Form event
   */
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageText.length && customerId) {
      setMessageText('');
      const messageData: MessageData = {
        text: messageText,
      };
      onSendMessage(messageData);
    }
  };

  /**
   * Handle file change
   * Attachment message will be delivered to customer
   * @param e Form event
   */
  const handleAttachmentChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0 && customerId) {
      // Set current attachment
      const file = target.files[0];
      setAttachment(file);
      // Trigger action to show attachment message preview that contain attachment information
      dispatch(chatActions.toggleAttachmentMessagePreview(true));
    }
  };

  const sortedMessages = useMemo(() => sortMessages(messages), [messages]);
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
              renderLoadMore(canLoadMore, loadingMore, onLoadMore)
            }
            {
              messages.length > 0 && (
                <div className="chats">{renderChats(sortedMessages, currentUser, selectedConversation.contact)}</div>
              )
            }
            {
              fetching && <Spinner className="loading-spinner" />
            }
          </PerfectScrollbar>

          <Form className="chat-app-form" onSubmit={(e) => handleSendMessage(e)}>
            <InputGroup className="input-group-merge form-send-message">
              <InputGroupText>
                <Mic className="cursor-pointer" size={16} />
              </InputGroupText>
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message or use speech to text"
              />
            </InputGroup>
            <UncontrolledButtonDropdown className="dropdown-icon-wrapper" direction="up">
              <DropdownToggle className="dropdown-toggle-split" color="fiat-primary" caret>
                {
                  isSendingAttachment ? <ReactSpinner className="me-25" color="primary" size="sm" /> : <Paperclip className="cursor-pointer text-secondary" size={16} />
                }
                <input ref={attachmentRef} type="file" id="attach-file" onChange={handleAttachmentChange} hidden />
              </DropdownToggle>
              <DropdownMenu hidden={isSendingAttachment} tag="div" end>
                {renderAttachmentItems}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <Button className="send" color="primary" disabled={isSendingAttachment}>
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Send</span>
            </Button>
          </Form>
          <AttachmentMessagePreview
            attachment={attachment}
            attachmentType={attachmentType}
            onCancelSendingAttachment={
              () => dispatch(chatActions.toggleAttachmentMessagePreview(false))
            }
            onSubmitSendingAttachment={() => {
              if (attachment) {
                dispatch(chatActions.toggleAttachmentMessagePreview(false));
                onSendAttachmentMessage(attachment, attachmentType);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatLog;
