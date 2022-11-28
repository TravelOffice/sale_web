import { MessageProps } from '@features/Chat/components/MessageProps';
import { ZaloMessage } from '@domain/entities/chat/zalo/ZaloMessage';

export type ZaloMessageProps = MessageProps<ZaloMessage>;
