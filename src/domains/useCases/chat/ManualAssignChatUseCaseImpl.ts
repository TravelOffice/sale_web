import { Conversation } from '@domain/entities/chat/Conversation';
import { chatRepository } from '@adapter/repositories';
import { ManualAssignChatUseCase } from '@domain/useCases/interfaces/chat/ManualAssignChatUseCase';

export default class ManualAssignChatUseCaseImpl implements ManualAssignChatUseCase {
    invoke = async (conversation: Conversation, assignee: string) => {
      const { chatPlatform, id: conversationId, pageId } = conversation;

      await chatRepository.manualAssignChat({
        chatPlatform,
        pageId,
        conversationId,
        assignee,
      });
    };
}
