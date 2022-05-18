import { chatRepository } from '@adapter/repositories';
import { SubscribeNewMessageUseCase } from '../interfaces/chat/SubscribeNewMessageUseCase';

export default class SubscribeNewMessageUseCaseImpl implements SubscribeNewMessageUseCase {
  invoke = () => chatRepository.subscribeToNewMessage();
}
