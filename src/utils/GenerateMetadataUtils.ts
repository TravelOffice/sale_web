/**
 * generate metadata string for messages
 * @param conversationId string
 * @param timestamp Date
 * @returns metadata string
 */
// eslint-disable-next-line import/prefer-default-export
export const generateMetadata = (conversationId: string, timestamp: Date): string => `${conversationId}-${timestamp.valueOf()}`;
