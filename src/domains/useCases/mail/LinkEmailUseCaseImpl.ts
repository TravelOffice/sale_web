import { LinkEmailUseCase } from '@domain/useCases/interfaces/mail/LinkEmailUseCase';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { mailRepository } from '@adapter/repositories';

export default class LinkEmailUseCaseImpl implements LinkEmailUseCase {
  invoke = async (formData: LinkEmailFormData) => mailRepository.link(formData);
}
