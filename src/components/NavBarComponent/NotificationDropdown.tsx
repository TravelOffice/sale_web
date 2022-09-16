import NewMessageNotification from '@components/NavBarComponent/NotificationComponent/NewMessageNotification';
import { ChatPlatform } from '@domain/entities/ChatPlatform';
import { NotificationData } from '@domain/entities/notification/Notification';
import { useNotifications, useUnreadNotificationCount } from '@hooks/notification';
import { notificationActions } from '@redux/slices/notificationSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { History } from 'history';
import React, { MouseEventHandler, useCallback, useState } from 'react';
import { Bell, Trash } from 'react-feather';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import NewConversationNotification from './NotificationComponent/NewConversationNotification';

function renderNotifications(
  notifications: NotificationData[],
  history: History,
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch,
) {
  /**
     * Handle on click for each notification type
     * 1. Go to specific page to show the expected data or task
     * 2. Mark notification as read
     * 3. Toggle notifications dropdown
     */
  const handleOnClickNotification = (chatPlatform: ChatPlatform, conversationId: string) => {
    // Go to chat
    // Other notification type will be handled case by case in the feature
    history.push({
      pathname: '/apps/chat',
      search: `?chatPlatform=${chatPlatform}&conversationId=${conversationId}`,
    });

    // Mark clicked notification as read
    dispatch(notificationActions.markRead(conversationId));

    // Close dropdown
    setIsDropdownOpen(false);
  };
  return notifications.map((notification) => {
    switch (notification.type) {
      case 'newChatMessage': {
        const { chatPlatform, id } = notification.data;
        return (
          <NewMessageNotification
            key={notification.createdAt}
            notification={notification}
            onClickHandled={() => handleOnClickNotification(chatPlatform, id)}
          />
        );
      }

      case 'newConversation': {
        const { chatPlatform, conversationId } = notification.data;
        return (
          <NewConversationNotification
            key={notification.createdAt}
            notification={notification}
            onClickHandled={() => handleOnClickNotification(chatPlatform, conversationId)}
          />
        );
      }
      default:
        return <></>;
    }
  });
}

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const notifications = useNotifications();
  const unreadCount = useUnreadNotificationCount();
  const history = useHistory();
  const dispatch = useDispatch();

  // Toggle notifications list
  const toggle: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }, [isOpen]);

  // Mark all notifications as read
  const onMarkAllAsRead = useCallback(() => {
    dispatch(notificationActions.markAllRead());
  }, []);

  // Clear all notification from session storage
  const onClearNotifications = useCallback(() => {
    dispatch(notificationActions.clearNotifications());
  }, []);

  return (
    <Dropdown tag="li" className="dropdown-notification nav-item me-25" isOpen={isOpen} toggle={toggle}>
      <DropdownToggle tag="a" className="nav-link" href="/">
        <Bell size={21} />
        {
          unreadCount > 0 && (
            <Badge pill color="danger" className="badge-up">
              {unreadCount}
            </Badge>
          )
        }
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex" tag="div" header>
            <h4 className="notification-title mb-0 me-auto">{t('NOTIFICATION.NOTIFICATIONS')}</h4>
            <Badge tag="a" color="light-primary" pill>
              {t('NOTIFICATION.NEW_NOTIFICATIONS_NUMBER', { unreadCount })}
            </Badge>
            <Badge tag="a" color="light-danger" pill onClick={onClearNotifications}>
              <Trash />
              {' '}
              {t('COMMON.CLEAR')}
            </Badge>
          </DropdownItem>
        </li>
        {
          notifications.length > 0
            ? (
              <PerfectScrollbar
                component="li"
                className="media-list scrollable-container"
                options={{ wheelPropagation: false }}
              >
                {
                  // Unread notification will be pushed at the top
                  renderNotifications(notifications, history, setIsOpen, dispatch)
                }
              </PerfectScrollbar>
            )
            : (
              <div className="d-flex my-1 justify-content-center">
                <Bell size={20} className="pr-1" />
                <h5>{t('NOTIFICATION.EMPTY_NOTIFICATIONS')}</h5>
              </div>
            )
        }
        <li className="dropdown-menu-footer">
          <Button color="primary" onClick={onMarkAllAsRead} block>
            {t('NOTIFICATION.MARK_ALL_AS_READ')}
          </Button>
        </li>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;
