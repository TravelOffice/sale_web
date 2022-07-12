import { userRepository } from '@adapter/repositories';
import { GetLinkedPagesUseCase } from '../interfaces/pageConnection/GetLinkedPagesUseCase';

export default class GetLinkedPagesUseCaseImpl implements GetLinkedPagesUseCase {
  invoke = async (refresh: boolean) => userRepository.getLinkedPages(refresh);
}
