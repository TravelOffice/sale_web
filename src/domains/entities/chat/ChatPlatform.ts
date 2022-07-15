export const chatPlatforms = ['facebook', 'zalo', 'telegram'] as const;
export type ChatPlatform = typeof chatPlatforms[number];
