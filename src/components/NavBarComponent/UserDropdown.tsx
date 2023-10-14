import Avatar from '@components/Avatar/Avatar';
import i18n from '@config/i18n';
import { User, UserStatusEnum } from '@domain/entities/User';
import { RootState } from '@redux/store';
import Images from '@themes/Images';
import React from 'react';
import {
  Mail, MessageSquare, Power, Settings, Share2,
} from 'react-feather';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { generateUserDisplayName } from '@utils/UserUtils';
import { getMarketplacePage } from '@utils/EnvUtils';

const UserDropdown = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  // ** Renders Avatar
  const renderAvatar = (user: User) => {
    if (user.avatar) {
      return (
        <Avatar
          img={user.avatar || Images.defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status={currentUser?.status || UserStatusEnum.online}
        />
      );
    }

    return <Avatar color="light-primary" content={user.username} />;
  };
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{generateUserDisplayName(currentUser)}</span>
          <span className="user-status">{currentUser?.username}</span>
        </div>
        {currentUser && renderAvatar(currentUser)}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/apps/chat">
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">{i18n.t('COMMON.CHAT')}</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/email">
          <Mail size={14} className="me-75" />
          <span className="align-middle">{i18n.t('COMMON.EMAIL')}</span>
        </DropdownItem>
        <DropdownItem tag={Link} onClick={() => window.open(getMarketplacePage())}>
          <Share2 size={14} className="me-75" />
          <span className="align-middle">{i18n.t('COMMON.MARKETPLACE')}</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/apps/account-settings">
          <Settings size={14} className="me-75" />
          <span className="align-middle">{i18n.t('COMMON.SETTING')}</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/sign-out">
          <Power size={14} className="me-75" />
          <span className="align-middle">{i18n.t('COMMON.LOGOUT')}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
