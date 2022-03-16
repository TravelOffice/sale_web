import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
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
