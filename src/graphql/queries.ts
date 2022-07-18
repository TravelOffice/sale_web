import gql from 'graphql-tag';

export const allFbConversations = gql`
  query GetFbConversations($fbPageId: String!) {
    allFbConversations(pageId: $fbPageId) {
      data
      message
    }
  }
`;

export const allZaloConversations = gql`
  query GetZaloConversations($zaloPageId: String!) {
    allZaloConversations(pageId: $zaloPageId) {
      data
      message
    }
  }
`;

export const allTelegramConversations = gql`
  query GetTelegramConversations($telegramBotId: String!) {
    allTelegramConversations(pageId: $telegramBotId) {
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

export const allTelegramMessages = gql`
  query GetTelegramMessages($botId: String!, $conversationId: String!, $nextToken: String) {
    allTelegramMessages(pageId: $botId, conversationId: $conversationId, nextToken: $nextToken) {
      message
      data
    }
  }
`;

export const userProfile = gql`
  query GetUserProfile($pageId: String!, $pageUserId: String!, $platform: String!) {
    userProfile(pageId: $pageId, pageUserId: $pageUserId, platform: $platform) {
      message
      data
    }
  }
`;
