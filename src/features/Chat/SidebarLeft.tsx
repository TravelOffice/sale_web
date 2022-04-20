import React, { useState, useEffect } from 'react';
import Avatar from '@components/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { formatDateToMonthShort } from '@utils/DateUtils';
import { isObjEmpty } from '@utils/CommonUtils';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  X, Search, CheckSquare, Bell, User, Trash,
} from 'react-feather';
import {
  CardText, InputGroup, InputGroupText, Badge, Input, Button, Label,
} from 'reactstrap';
import { RootState } from '@redux/store';
import { Conversation } from '@domain/entities/Conversation';
import { UserStatus } from '@domain/entities/AdminUser';
import Spinner from '@components/Spinner/Spinner';
import Images from '@themes/Images';

export interface SidebarLeftProps {
  sidebar: boolean,
  handleSidebar: () => void,
  userSidebarLeft: boolean,
  handleUserSidebarLeft: () => void,
  conversations: Array<Conversation>
  selectedConversation?: Conversation,
  onConversationSelected: (conversation: Conversation) => void,
  fetching: boolean,
}

const SidebarLeft = (props: SidebarLeftProps) => {
  const {
    sidebar, handleSidebar, userSidebarLeft, handleUserSidebarLeft,
    selectedConversation, onConversationSelected, conversations,
    fetching,
  } = props;
  const authState = useSelector((state: RootState) => state.auth);
  const userProfile = authState.currentUser;

  // ** State
  const [query] = useState('');
  const [about, setAbout] = useState('');
  const [active, setActive] = useState<Conversation>();
  const [status, setStatus] = useState<UserStatus>('online');
  const [filteredChat] = useState([]);

  // ** Handles User Chat Click
  const handleUserClick = (item: Conversation) => {
    setActive(item);
    onConversationSelected?.(item);
    if (sidebar) {
      handleSidebar();
    }
  };

  useEffect(() => {
    if (selectedConversation && !isObjEmpty(selectedConversation)) {
      setActive(selectedConversation);
    }
  }, []);

  // ** Renders Chat
  const renderChats = () => {
    if (conversations && conversations.length) {
      if (query.length && !filteredChat.length) {
        return (
          <li className="no-results show">
            <h6 className="mb-0">No Chats Found</h6>
          </li>
        );
      }
      const arrToMap = query.length && filteredChat.length ? filteredChat : conversations;

      return arrToMap.map((item) => {
        const time = formatDateToMonthShort(item.lastMessage?.timestamp || new Date());
        const { contact } = item;
        return (
          <li
            key={item.id}
            onClick={() => handleUserClick(item)}
            className={classnames({
              active: active?.id === item.id,
            })}
          >
            <Avatar img={contact.avatar || Images.defaultAvatar} imgHeight="42" imgWidth="42" />
            <div className="chat-info flex-grow-1">
              <h5 className="mb-0">{contact.fullName}</h5>
              <CardText className="text-truncate">
                {item.lastMessage ? item.lastMessage.messageData.text : ''}
              </CardText>
            </div>
            <div className="chat-meta text-nowrap">
              <small className="float-end mb-25 chat-time ms-25">{time}</small>
              {item.unseenMessages >= 1 ? (
                <Badge className="float-end" color="danger" pill>
                  {item.unseenMessages}
                </Badge>
              ) : null}
            </div>
          </li>
        );
      });
    }
    return null;
  };

  // // ** Handles Filter
  // const handleFilter = (e) => {
  //   setQuery(e.target.value);
  //   const searchFilterFunction = (contact) => contact.fullName.toLowerCase().
  //   includes(e.target.value.toLowerCase());
  //   const filteredChatsArr = chats.filter(searchFilterFunction);
  //   const filteredContactssArr = contacts.filter(searchFilterFunction);
  //   setFilteredChat([...filteredChatsArr]);
  //   setFilteredContacts([...filteredContactssArr]);
  // };

  const renderAboutCount = () => {
    if (userProfile && userProfile.about && userProfile.about.length && about.length === 0) {
      return userProfile.about.length;
    }
    return about.length;
  };

  return userProfile ? (
    <div className="sidebar-left">
      <div className="sidebar">
        <div
          className={classnames('chat-profile-sidebar', {
            show: userSidebarLeft,
          })}
        >
          <header className="chat-profile-header">
            <div className="close-icon" onClick={handleUserSidebarLeft}>
              <X size={14} />
            </div>
            <div className="header-profile-sidebar">
              <Avatar className="box-shadow-1 avatar-border" img={userProfile.avatar} size="xl" />
              <h4 className="chat-user-name">{userProfile.fullName}</h4>
              <span className="user-post">{userProfile.role}</span>
            </div>
          </header>
          <PerfectScrollbar className="profile-sidebar-area" options={{ wheelPropagation: false }}>
            <h6 className="section-label mb-1">About</h6>
            <div className="about-user">
              <Input
                rows="5"
                type="textarea"
                defaultValue={userProfile.about}
                onChange={(e) => setAbout(e.target.value)}
                className={classnames('char-textarea', {
                  'text-danger': about && about.length > 120,
                })}
              />
              <small className="counter-value float-end">
                <span className="char-count">{renderAboutCount()}</span>
                {' '}
                / 120
              </small>
            </div>
            <h6 className="section-label mb-1 mt-3">Status</h6>
            <ul className="list-unstyled user-status">
              <li className="pb-1">
                <div className="form-check form-check-success">
                  <Input
                    type="radio"
                    label="Online"
                    id="user-online"
                    checked={status === 'online'}
                    onChange={() => setStatus('online')}
                  />
                  <Label className="form-check-label" for="user-online">
                    Online
                  </Label>
                </div>
              </li>
              <li className="pb-1">
                <div className="form-check form-check-danger">
                  <Input
                    type="radio"
                    id="user-busy"
                    label="Do Not Disturb"
                    checked={status === 'busy'}
                    onChange={() => setStatus('busy')}
                  />
                  <Label className="form-check-label" for="user-busy">
                    Busy
                  </Label>
                </div>
              </li>
              <li className="pb-1">
                <div className="form-check form-check-warning">
                  <Input
                    type="radio"
                    label="Away"
                    id="user-away"
                    checked={status === 'away'}
                    onChange={() => setStatus('away')}
                  />
                  <Label className="form-check-label" for="user-away">
                    Away
                  </Label>
                </div>
              </li>
              <li className="pb-1">
                <div className="form-check form-check-secondary">
                  <Input
                    type="radio"
                    label="Offline"
                    id="user-offline"
                    checked={status === 'offline'}
                    onChange={() => setStatus('offline')}
                  />
                  <Label className="form-check-label" for="user-offline">
                    Offline
                  </Label>
                </div>
              </li>
            </ul>
            <h6 className="section-label mb-1 mt-2">Settings</h6>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <CheckSquare className="me-75" size="18" />
                  <span className="align-middle">Two-step Verification</span>
                </div>
                <div className="form-switch">
                  <Input type="switch" id="verification" name="verification" defaultChecked />
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <Bell className="me-75" size="18" />
                  <span className="align-middle">Notification</span>
                </div>
                <div className="form-switch">
                  <Input type="switch" id="notifications" name="notifications" />
                </div>
              </li>
              <li className="d-flex align-items-center cursor-pointer mb-1">
                <User className="me-75" size="18" />
                <span className="align-middle">Invite Friends</span>
              </li>
              <li className="d-flex align-items-center cursor-pointer">
                <Trash className="me-75" size="18" />
                <span className="align-middle">Delete Account</span>
              </li>
            </ul>
            <div className="mt-3">
              <Button color="primary">Logout</Button>
            </div>
          </PerfectScrollbar>
        </div>
        <div
          className={classnames('sidebar-content', {
            show: sidebar,
          })}
        >
          <div className="sidebar-close-icon" onClick={handleSidebar}>
            <X size={14} />
          </div>
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              <div className="sidebar-profile-toggle" onClick={handleUserSidebarLeft}>
                {Object.keys(userProfile).length ? (
                  <Avatar
                    className="avatar-border"
                    img={userProfile.avatar}
                    status={status}
                    imgHeight="42"
                    imgWidth="42"
                  />
                ) : null}
              </div>
              <InputGroup className="input-group-merge ms-1 w-100">
                <InputGroupText className="round">
                  <Search className="text-muted" size={14} />
                </InputGroupText>
                <Input
                  defaultValue={query}
                  className="round"
                  placeholder="Search or start a new chat"
                />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar className="chat-user-list-wrapper list-group" options={{ wheelPropagation: false }}>
            {
              fetching && <Spinner className="loading-spinner" />
            }
            <h4 className="chat-list-title">Chats</h4>
            <ul className="chat-users-list chat-list media-list">{renderChats()}</ul>
            {/* <h4 className="chat-list-title">Contacts</h4> */}
            {/* <ul className="chat-users-list contact-list media-list">{renderContacts()}</ul> */}
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  ) : null;
};

export default SidebarLeft;
