import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = gql`
  mutation SendMessage($chatPlatform: String!, $customerId: String!, $recipient: String!, $sender: String!, $messageData: AWSJSON!) {
    sendMessage(chatPlatform: $chatPlatform, customerId: $customerId, recipient: $recipient, sender: $sender, messageData: $messageData) {
      data {
        chatPlatform
        customerId
        id
        messageData
        recipient
        sender
        timestamp
      }
      message
    }
  }
`;
