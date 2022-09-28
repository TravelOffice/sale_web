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
  query GetUserProfile($pageId: String!, $pageUserId: String!, $chatPlatform: String!, $chatId: String) {
    userProfile(pageId: $pageId, pageUserId: $pageUserId, chatPlatform: $chatPlatform, chatId: $chatId) {
      message
      data
    }
  }
`;

// Admin queries
export const adminAllFbConversations = gql`
  query AdminGetFbConversations($fbPageId: String!) {
    adminAllFbConversations(pageId: $fbPageId) {
      data
      message
    }
  }
`;

export const adminAllZaloConversations = gql`
  query AdminGetZaloConversations($zaloPageId: String!) {
    adminAllZaloConversations(pageId: $zaloPageId) {
      data
      message
    }
  }
`;

export const adminAllTelegramConversations = gql`
  query AdminGetTelegramConversations($telegramBotId: String!) {
    adminAllTelegramConversations(pageId: $telegramBotId) {
      data
      message
    }
  }
`;

export const telegramFileInfo = gql`
  query GetTelegramFileInfo($fileId: String!, $telegramConversationId: String!, $telegramPageId: String!) {
    getTelegramFileInfo(conversationId: $telegramConversationId, fileId: $fileId, pageId: $telegramPageId) {
      message
      data
    }
  }
`;

export const syncEmail = gql`
query SyncEmail($email: String!, $mailbox: String!) {
  syncEmail(email: $email, mailbox: $mailbox) {
    message
  }
}
`;
