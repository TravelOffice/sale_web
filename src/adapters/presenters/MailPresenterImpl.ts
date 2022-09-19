import { MailPresenter } from '@adapter/presenters/interfaces/MailPresenter';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { linkMailUseCase } from '@domain/useCases';

export default class MailPresenterImpl implements MailPresenter {
  linkMail = async (formData: LinkEmailFormData) => linkMailUseCase.invoke(formData)
}
