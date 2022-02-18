import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = gql`
  mutation SendMessage($customerId: String!, $recipient: String!, $sender: String!, $messageData: AWSJSON!) {
    sendMessage(customerId: $customerId, recipient: $recipient, sender: $sender, messageData: $messageData) {
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
