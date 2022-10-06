import { mailRepository, s3Repository } from '@adapter/repositories';
import { SendMailUseCase } from '@domain/useCases/interfaces/mail/SendMailUseCase';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';

export default class SendMailUseCaseImpl implements SendMailUseCase {
    invoke = async (formData: SendMailFormData) => {
      const s3ObjectKey = await s3Repository.uploadHtmlContentViaPresignedURL(formData.htmlContent);
      const request = { ...formData, htmlContent: s3ObjectKey };
      return mailRepository.sendMail(request);
    }
}
