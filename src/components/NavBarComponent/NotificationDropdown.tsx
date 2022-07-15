import React, { MouseEventHandler, useCallback, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Bell } from 'react-feather';
import {
  Badge, DropdownMenu, DropdownItem, DropdownToggle, Dropdown,
} from 'reactstrap';
import { useNotifications, useUnreadNotificationCount } from '@hooks/notification';
import { Notification } from '@domain/entities/Notification';
import NewConversationNotification from '@components/NavBarComponent/NewConversationNotification';
import { useDispatch } from 'react-redux';
import { notificationActions } from '@redux/slices/notificationSlice';
import { useTranslation } from 'react-i18next';

function renderNotification(notification: Notification, unread: boolean) {
  if (notification.type === 'newConversation') {
    return (
      <NewConversationNotification
        key={notification.createdAt}
        notification={notification}
        unread={unread}
      />
    );
  }
  return <></>;
}

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const notifications = useNotifications();
  const unreadCount = useUnreadNotificationCount();
  const dispatch = useDispatch();
  const toggle: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    dispatch(notificationActions.markAllRead());
  }, [isOpen]);

  // TODO: Clear notifications
  const onClearNotifications = useCallback(() => {
    // Clear notifications
  }, []);

  return (
    <Dropdown tag="li" className="dropdown-notification nav-item me-25" isOpen={isOpen} toggle={toggle}>
      <DropdownToggle tag="a" className="nav-link" href="/">
        <Bell size={21} />
        {
          unreadCount > 0 && (
            <Badge pill color="danger" className="badge-up" onClick={onClearNotifications}>
              {unreadCount}
            </Badge>
          )
        }
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex" tag="div" header>
            <h4 className="notification-title mb-0 me-auto">{t('NOTIFICATION.NOTIFICATIONS')}</h4>
            <Badge tag="a" color="light-danger" pill>
              {t('COMMON.CLEAR')}
            </Badge>
          </DropdownItem>
        </li>
        <PerfectScrollbar
          component="li"
          className="media-list scrollable-container"
          options={{ wheelPropagation: false }}
        >
          {
            notifications.map((
              notification, index,
            ) => renderNotification(notification, index <= unreadCount))
          }
        </PerfectScrollbar>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;
