import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const allMessages = gql`
  query GetMessages($customerId: String!) {
    allMessages(customerId: $customerId) {
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
