import gql from 'graphql-tag';

export const allConversations = gql`
  query GetConversations($fbPageId: String!, $zaloPageId: String!) {
    allFbConversations(pageId: $fbPageId) {
      data
      message
    }
    allZaloConversations(pageId: $zaloPageId) {
      data
      message
    }
  }
`;

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

export const allFbMessages = gql`
  query GetFbMessages($conversationId: String!, $fbPageId: String!, $after: String) {
    allFbMessages(conversationId: $conversationId, pageId: $fbPageId, after: $after) {
      data
      message
    }
  }
`;

export const allZaloMessages = gql`
  query GetZaloMessages($zaloPageId: String!, $userId: String!) {
    allZaloMessages(pageId: $zaloPageId, userId: $userId) {
      message
      data
    }
  }
`;
