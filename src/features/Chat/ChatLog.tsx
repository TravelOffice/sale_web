import React, {
  FormEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import i18n from '@config/i18n';
import Avatar from '@components/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  File, Image, Menu, MessageSquare, MoreVertical, Paperclip, Search, Send, Video, Volume2,
} from 'react-feather';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  InputGroup,
  Spinner as ReactSpinner,
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
} from 'reactstrap';
import { RootState } from '@redux/store';
import { Message, MessageData } from '@domain/entities/chat/Message';
import { Conversation } from '@domain/entities/chat/Conversation';
import { messagesGroups, sortMessages } from '@utils/ChatUtils';
import User from '@domain/entities/User';
import Spinner from '@components/Spinner/Spinner';
import ChatMessage from '@features/Chat/components/ChatMessage';
import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';
import AttachmentMessagePreview from '@components/Chat/AttachmentMessagePreview';
import { chatActions } from '@redux/slices/chatSlice';
import Viewer from 'react-viewer';
import { ImageDecorator } from 'react-viewer/lib/ViewerProps';
import CustomerAvatar from '@components/Avatar/CustomerAvatar';

interface AttachmentMessageSetting {
  id: number,
  icon: JSX.Element,
  fileType: AttachmentMessageType,
  ignoreInZalo?: boolean,
}
const attachmentMessageSettings: AttachmentMessageSetting[] = [
  {
    id: 0,
    icon: <Video size={16} />,
    fileType: AttachmentMessageType.VIDEO,
    ignoreInZalo: true,
  },
  {
    id: 1,
    icon: <Volume2 size={16} />,
    fileType: AttachmentMessageType.AUDIO,
    ignoreInZalo: true,
  },
  {
    id: 2,
    icon: <Image size={16} />,
    fileType: AttachmentMessageType.IMAGE,
  },
  {
    id: 3,
    icon: <File size={16} />,
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

function renderChats(
  conversation: Conversation,
  messages: Message[],
  currentUser: User,
  onClickChatMessage: (message: Message) => void,
) {
  const { contact } = conversation;
  const isMe = (sender: string) => sender !== contact.id;

  return messagesGroups(messages).map((item) => (
    <div
      key={item.messages[0].id}
      className={classnames('chat', {
        'chat-left': !isMe(item.senderId),
      })}
    >
      <div className="chat-avatar">
        {
          isMe(item.senderId)
            ? (
              <Avatar
                imgWidth="42"
                imgHeight="42"
                className="cursor-pointer"
                color="light-primary"
                img={currentUser.avatar}
                content={currentUser.avatar ? undefined : currentUser.name}
              />
            ) : <CustomerAvatar conversation={conversation} />
        }
      </div>

      <div className="chat-body">
        {item.messages.map((message) => (
          <ChatMessage
            message={message}
            key={message.id}
            onClick={onClickChatMessage}
          />
        ))}
      </div>
    </div>
  ));
}

function renderLoadMore(canLoadMore: boolean, loadingMore: boolean, onClick: Function) {
  if (loadingMore) {
    return (
      <div className="loading-more">
        <span>{i18n.t('CHAT.LOADING_MORE')}</span>
      </div>
    );
  }
  if (canLoadMore) {
    return (
      <button className="load-more-btn" type="button" onClick={() => onClick()}>
        {i18n.t('CHAT.LOAD_MORE_BUTTON_TITLE')}
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
  const [imagePreviewerVisible, setImagePreviewerVisible] = useState(false);
  const [previewImages, setPreviewImages] = useState<ImageDecorator[]>([]);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
  const sortedMessages = useMemo(() => sortMessages(messages), [messages]);

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
    .filter((attachmentSetting) => (!attachmentSetting.ignoreInZalo && selectedConversation?.chatPlatform === 'zalo') || selectedConversation?.chatPlatform === 'facebook')
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
  const handleAvatarClicked = () => {
    handleUserSidebarRight();
  };

  // On mobile screen open left sidebar on Start Conversation Click
  const handleStartConversation = () => {
    if (!selectedConversation && !userSidebarLeft && window.innerWidth < 992) {
      handleSidebar();
    }
  };

  const handleChatMessageClicked = (selectedMessage: Message) => {
    // Set the image sources for image viewer
    const imageMessages = sortedMessages
      .filter((message) => {
        const { attachments } = message.messageData;
        if (attachments && attachments.length > 0) {
          const { mimeType } = attachments[0];
          return mimeType.startsWith('image/');
        }
        return false;
      });
    const imageSources = imageMessages
      .map((message) => {
        const [mAttachment] = message.messageData.attachments!;
        return { src: mAttachment.url || '', alt: mAttachment.name };
      });
    const selectedImageIndex = imageMessages.findIndex(
      (message) => message.id === selectedMessage.id,
    );
    // Show image viewer
    setPreviewImages(imageSources);
    setSelectedPreviewIndex(selectedImageIndex);
    setImagePreviewerVisible(true);
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

  return (
    <div className="chat-app-window">
      <div className={classnames('start-chat-area', { 'd-none': selectedConversation })}>
        <div className="start-chat-icon mb-1">
          <MessageSquare />
        </div>
        <h4 className="sidebar-toggle start-chat-text" onClick={handleStartConversation}>
          {i18n.t('CHAT.START_CONVERSATION')}
        </h4>
      </div>
      {selectedConversation && (
        <div className={classnames('active-chat', { 'd-none': false })}>
          <div className="chat-navbar">
            <header className="chat-header">
              <div className="d-flex align-items-center">
                <div className="sidebar-toggle d-block d-lg-none me-1" onClick={handleSidebar}>
                  <Menu size={20} />
                </div>
                <CustomerAvatar
                  conversation={selectedConversation}
                  className="avatar-border user-profile-toggle m-0 me-1"
                  onClick={handleAvatarClicked}
                />
                <h6 className="mb-0">{contact?.fullName}</h6>
              </div>
              <div className="d-flex align-items-center">
                <Search size={20} className="cursor-pointer d-sm-block d-none" />
                <UncontrolledDropdown className="more-options-dropdown">
                  <DropdownToggle className="btn-icon" color="transparent" size="sm">
                    <MoreVertical size="20" />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAvatarClicked();
                      }}
                    >
                      {i18n.t('CHAT.VIEW_CONTACT')}
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      {i18n.t('CHAT.MUTE_NOTIFICATIONS')}
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      {i18n.t('CHAT.CLEAR_CHAT_MESSAGES')}
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
                <div className="chats">
                  {
                    renderChats(
                      selectedConversation,
                      sortedMessages,
                      currentUser,
                      handleChatMessageClicked,
                    )
                  }
                </div>
              )
            }
            {
              fetching && <Spinner className="loading-spinner" />
            }
          </PerfectScrollbar>

          <Form className="chat-app-form" onSubmit={(e) => handleSendMessage(e)}>
            <InputGroup className="input-group-merge form-send-message">
              {/* TODO: Implement sending audio record file in the future */}
              {/* <InputGroupText> */}
              {/*  <Mic className="cursor-pointer" size={16} /> */}
              {/* </InputGroupText> */}
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={i18n.t('CHAT.MESSAGE_INPUT_PLACEHOLDER')}
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
              <span className="d-none d-lg-block">{i18n.t('CHAT.SEND_MESSAGE')}</span>
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
          <Viewer
            images={previewImages}
            visible={imagePreviewerVisible}
            onClose={() => { setImagePreviewerVisible(false); }}
            onMaskClick={() => { setImagePreviewerVisible(false); }}
            showTotal
            scalable
            downloadable={false}
            rotatable={false}
            zIndex={9999}
            activeIndex={selectedPreviewIndex}
          />
        </div>
      )}
    </div>
  );
};

export default ChatLog;
