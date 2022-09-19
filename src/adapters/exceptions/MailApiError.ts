import i18n from 'i18next';
import { AxiosRequestConfig } from 'axios';

export default class MailApiError extends Error {
  constructor(code: string, message: string, request: AxiosRequestConfig) {
    super(message);
    this.message = this.codeToMessage(code, message, request);
  }

  private codeToMessage = (code: string, message: string, request: AxiosRequestConfig) => {
    const requestPayload = JSON.parse(request.data);
    switch (code) {
      case 'ERROR_VALIDATOR': return i18n.t('MAIL.ERROR_VALIDATOR');
      case 'ERROR_DUPLICATED_MAIL_ACCOUNT': return i18n.t('MAIL.ERROR_DUPLICATED_MAIL_ACCOUNT', { mailAddress: requestPayload.mailAddress });
      case 'ERROR_CONNECT_TO_INBOUND_SERVER': return i18n.t('MAIL.ERROR_CONNECT_TO_INBOUND_SERVER', { inboundHost: requestPayload.inboundHost });
      case 'ERROR_LOGIN_TO_INBOUND_SERVER': return i18n.t('MAIL.ERROR_LOGIN_TO_INBOUND_SERVER', { inboundHost: requestPayload.inboundHost });
      case 'ERROR_CONNECT_TO_OUTBOUND_SERVER': return i18n.t('MAIL.ERROR_CONNECT_TO_OUTBOUND_SERVER', { outboundHost: requestPayload.outboundHost });
      case 'ERROR_LOGIN_TO_OUTBOUND_SERVER': return i18n.t('MAIL.ERROR_LOGIN_TO_OUTBOUND_SERVER', { outboundHost: requestPayload.outboundHost });
      case 'ERROR_EMAIL_ADDRESS_IS_INVALID': return i18n.t('MAIL.ERROR_EMAIL_ADDRESS_IS_INVALID', { mailAddress: requestPayload.mailAddress });
      case 'ERROR_UNKNOWN': return i18n.t('MAIL.ERROR_UNKNOWN');
      default: return message;
    }
  }
}
