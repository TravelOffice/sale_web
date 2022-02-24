import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const onNewMessage = gql`
  subscription OnNewMessage {
    onNewMessage {
      message
      data {
        customerId
        id
        messageData
        recipient
        sender
        timestamp
      }
    }
  }
`;
