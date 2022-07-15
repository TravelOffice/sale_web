import i18n from '@config/i18n';
import { Contact } from '@domain/entities/Contact';
import { Conversation } from '@domain/entities/chat/Conversation';
import classnames from 'classnames';
import {
  Clock,
  Image,
  Mail,
  PhoneCall,
  Star,
  Tag,
  X,
} from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React from 'react';
import CustomerAvatar from '@components/Avatar/CustomerAvatar';

export interface UserProfileSidebarProps {
  conversation?: Conversation,
  contact?: Contact,
  handleUserSidebarRight: () => void,
  userSidebarRight: boolean,
}

const UserProfileSidebar = (props: UserProfileSidebarProps) => {
  const { conversation, handleUserSidebarRight, userSidebarRight } = props;
  const contact = conversation?.contact;

  return (
    <div className={classnames('user-profile-sidebar', { show: userSidebarRight })}>
      <header className="user-profile-header">
        <span className="close-icon" onClick={handleUserSidebarRight}>
          <X size={14} />
        </span>
        <div className="header-profile-sidebar">
          <CustomerAvatar
            conversation={conversation}
            className="box-shadow-1 avatar-border"
            height={70}
            width={70}
          />
          <h4 className="chat-user-name">{contact?.fullName}</h4>
        </div>
      </header>
      <PerfectScrollbar className="user-profile-sidebar-area" options={{ wheelPropagation: false }}>
        <h6 className="section-label mb-1">{i18n.t('CHAT_USER_PROFILE.ABOUT')}</h6>
        <p>{contact?.about}</p>
        <div className="personal-info">
          <h6 className="section-label mb-1 mt-3">{i18n.t('CHAT_USER_PROFILE.PERSONAL_INFORMATION')}</h6>
          <ul className="list-unstyled">
            <li className="mb-1">
              <Mail className="me-75" size={17} />
              <span className="align-middle">email@email.com</span>
            </li>
            <li className="mb-1">
              <PhoneCall className="me-50" size={17} />
              <span className="align-middle"> +1(123) 456 - 7890</span>
            </li>
            <li>
              <Clock className="me-50" size={17} />
              <span className="align-middle"> Mon - Fri 10AM - 8PM</span>
            </li>
          </ul>
        </div>
        <div className="more-options">
          <h6 className="section-label mb-1 mt-3">{i18n.t('CHAT_USER_PROFILE.OPTIONS')}</h6>
          <ul className="list-unstyled">
            <li className="cursor-pointer mb-1">
              <Tag className="me-50" size={17} />
              <span className="align-middle">{i18n.t('CHAT_USER_PROFILE.ADD_TAG')}</span>
            </li>
            <li className="cursor-pointer mb-1">
              <Star className="me-50" size={17} />
              <span className="align-middle">{i18n.t('CHAT_USER_PROFILE.IMPORTANT_CONTACT')}</span>
            </li>
            <li className="cursor-pointer mb-1">
              <Image className="me-50" size={17} />
              <span className="align-middle">{i18n.t('CHAT_USER_PROFILE.SHARED_ATTACHMENTS')}</span>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default UserProfileSidebar;
