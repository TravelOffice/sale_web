import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = gql`
  mutation SendMessage($chatPlatform: String!, $conversationId: String!, $customerId: String!, $recipient: String!, $sender: String!, $messageData: AWSJSON!) {
    sendMessage(chatPlatform: $chatPlatform, conversationId: $conversationId, customerId: $customerId, recipient: $recipient, sender: $sender, messageData: $messageData) {
      message
    }
  }
`;
