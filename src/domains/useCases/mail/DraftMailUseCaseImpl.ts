import { mailRepository, s3Repository } from '@adapter/repositories';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { DraftMailUseCase } from '@domain/useCases/interfaces/mail/DraftMailUseCase';

export default class DraftailUseCaseImpl implements DraftMailUseCase {
  invoke = async (formData: SendMailFormData) => {
    const s3ObjectKey = await s3Repository.uploadHtmlContentViaPresignedURL(formData.htmlContent);
    const request = { ...formData, htmlContent: s3ObjectKey };
    return mailRepository.draftMail(request);
  }
}
