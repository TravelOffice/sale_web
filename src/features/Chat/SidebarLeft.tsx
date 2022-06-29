import React, { useState } from 'react';
import Avatar from '@components/Avatar/Avatar';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Bell, Search, X } from 'react-feather';
import {
  InputGroup, InputGroupText, Input, Label,
} from 'reactstrap';
import { RootState } from '@redux/store';
import { Conversation } from '@domain/entities/Conversation';
import { UserStatus } from '@domain/entities/User';
import i18n from '@config/i18n';
import ConversationList from '@features/Chat/components/ConversationList';
import { ConversationSection } from '@features/Chat/ConversationSection';

export interface SidebarLeftProps {
  sidebar: boolean,
  handleSidebar: () => void,
  userSidebarLeft: boolean,
  handleUserSidebarLeft: () => void,
  conversationSections: ConversationSection[],
  selectedConversation?: Conversation,
  onConversationSelected: (conversation: Conversation) => void,
}

const SidebarLeft = (props: SidebarLeftProps) => {
  const {
    sidebar, handleSidebar, userSidebarLeft, handleUserSidebarLeft,
    selectedConversation, onConversationSelected, conversationSections,
  } = props;
  const authState = useSelector((state: RootState) => state.auth);
  const userProfile = authState.currentUser;

  // ** State
  const [query, setQuery] = useState('');
  const [about, setAbout] = useState('');
  const [status, setStatus] = useState<UserStatus>('online');

  // ** Handles User Chat Click
  const handleConversationSelected = (item: Conversation) => {
    onConversationSelected?.(item);
    if (sidebar) {
      handleSidebar();
    }
  };

  const renderAboutCount = () => {
    if (userProfile && userProfile.about && userProfile.about.length && about.length === 0) {
      return userProfile.about.length;
    }
    return about.length;
  };

  return (
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
              <Avatar className="box-shadow-1 avatar-border" img={userProfile?.avatar} size="xl" />
              <h4 className="chat-user-name">{userProfile?.username}</h4>
              <span className="user-post">{userProfile?.role}</span>
            </div>
          </header>
          <PerfectScrollbar className="profile-sidebar-area" options={{ wheelPropagation: false }}>
            <h6 className="section-label mb-1">{i18n.t('CHAT_USER_SETTING.ABOUT')}</h6>
            <div className="about-user">
              <Input
                rows="5"
                type="textarea"
                defaultValue={userProfile?.about}
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
            <h6 className="section-label mb-1 mt-3">{i18n.t('CHAT_USER_SETTING.STATUS_TITLE')}</h6>
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
                    {i18n.t('CHAT_USER_SETTING.STATUS_ONLINE')}
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
                    {i18n.t('CHAT_USER_SETTING.STATUS_BUSY')}
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
                    {i18n.t('CHAT_USER_SETTING.STATUS_AWAY')}
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
                    {i18n.t('CHAT_USER_SETTING.STATUS_OFFLINE')}
                  </Label>
                </div>
              </li>
            </ul>
            <h6 className="section-label mb-1 mt-2">{i18n.t('CHAT_USER_SETTING.SETTINGS_TITLE')}</h6>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <Bell className="me-75" size="18" />
                  <span className="align-middle">{i18n.t('CHAT_USER_SETTING.NOTIFICATION_TITLE')}</span>
                </div>
                <div className="form-switch">
                  <Input type="switch" id="notifications" name="notifications" />
                </div>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
        <div className={classnames('sidebar-content', { show: sidebar })}>
          <div className="sidebar-close-icon" onClick={handleSidebar}>
            <X size={14} />
          </div>
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              <div className="sidebar-profile-toggle" onClick={handleUserSidebarLeft}>
                {userProfile && Object.keys(userProfile).length ? (
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
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={i18n.t('CHAT.SEARCH_INPUT_PLACE_HOLDER')}
                />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar className="chat-user-list-wrapper list-group" options={{ wheelPropagation: false }}>
            {
              conversationSections.map((section) => (
                !section.error && (
                  <ConversationList
                    title={section.title}
                    conversations={section.conversations}
                    fetching={section.fetching}
                    selectedConversation={selectedConversation}
                    onConversationSelected={handleConversationSelected}
                    query={query}
                  />
                )
              ))
            }
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
