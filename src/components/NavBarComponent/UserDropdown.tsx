import Avatar from '@components/Avatar/Avatar';
import AdminUser from '@domain/entities/AdminUser';
import { authActions } from '@redux/slices/authSlice';
import Images from '@themes/Images';
import React, { useState } from 'react';
import {
  MessageSquare, Power, Settings, User,
} from 'react-feather';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const [userData] = useState<AdminUser | null>(null);

  // TODO: Get from redux
  // useEffect(() => {
  //   if (isUserLoggedIn() !== null) {
  //     setUserData(JSON.parse(localStorage.getItem('userData')));
  //   }
  // }, []);

  // TODO: Get from redux
  const userAvatar = Images.defaultAvatar;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{(userData && userData.username) || 'John Doe'}</span>
          <span className="user-status">{(userData && userData.role) || 'Admin'}</span>
        </div>
        <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/pages/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/chat">
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chat</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/pages/account-settings">
          <Settings size={14} className="me-75" />
          <span className="align-middle">Setting</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/login" onClick={() => dispatch(authActions.detachSession())}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
