import { MessageProps } from '@features/Chat/components/MessageProps';
import { TelegramMessage } from '@domain/entities/chat/telegram';

export type TelegramMessageProps = MessageProps<TelegramMessage>;
