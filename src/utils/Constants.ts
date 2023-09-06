import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';

export const DEFAULT_PAGE_SIZE = 5;

export const PHONE_NUMBER_VALIDATION_REGEX = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;

export const BIRTHDAY_FORMAT = 'YYYY-MM-DD';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const FLATPICKR_DATE_FORMAT = 'd-m-Y';

export enum Languages {
  VIETNAMESE = 'Việt Nam',
  ENGLISH = 'English',
}

export const NOTIFICATION_KEY_IN_LOCAL_STORAGE = 'notifications';

export const FACEBOOK = 'Facebook';

export const ZALO = 'Zalo';

export const TELEGRAM = 'Telegram';

export const ID_TOKEN = 'id_token';

export const EVENT = 'event';

export const EVENT_CHANGE_PASSWORD = 'change-password-success';

export const platformTitleDefinitions: { [key in ChatPlatform]: string } = {
  facebook: FACEBOOK,
  zalo: ZALO,
  telegram: TELEGRAM,
};

export const SUPPORTED_AUDIO_EXTENSIONS = ['.aac'];

export const LEAD_INDEX = 'LEAD';

export const TOUR_TEMPLATE_INDEX = 'TOUR_TEMPLATE';
