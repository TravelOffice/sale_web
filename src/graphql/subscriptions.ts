import gql from 'graphql-tag';

export const onNewMessage = gql`
  subscription OnNewMessage {
    onNewMessageReceived {
      data {
        chatPlatform
        customerId
        messageData
        recipient
        sender
        timestamp
        id
      }
      message
    }
  }
`;

/**
 * New notification subscription
 * This subscription will be used when client want to listen events from backend, such as:
 * - New assigned conversation,
 *    conversations list should be reloaded
 *    and user should be notified to response to end user on time
 * - Order events such as created, canceled and so on
 * - Historical events such as sale creating lead / opportunity / quote,
 *    end-user updating payment and so on
 * ...
 * Following attributes will be notified via AppSync:
 * - type: Notification type
 * - data: Data
 * - tenant: Tenant id
 * - username: Username (Org user)
 * - timestamp: Notification send time
 */
export const onNewNotification = gql`
  subscription OnNewNotification {
    onNewNotificationReceived {
      data
      tenant
      timestamp
      type
      username
    }
  }
`;
