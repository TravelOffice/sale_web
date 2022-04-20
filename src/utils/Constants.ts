// eslint-disable-next-line import/prefer-default-export
export enum ErrorMessage {
  SELECT_FIELD_INVALID_MESSAGE = 'Field is invalid',
  COUNTRY_INVALID_MESSAGE = 'Country is invalid',
  PHONE_INVALID_MESSAGE = 'Phone number format is invalid.',
  NATIONALITY_INVALID_MESSAGE = 'Nationality format is invalid.',
  SEX_INVALID_MESSAGE = 'Sex format is invalid.',
  MARITAL_INVALID_MESSAGE = 'Marital status is invalid',
  LEAD_STATUS_INVALID_MESSAGE = 'Lead status is invalid',
  LEAD_SOURCE_INVALID_MESSAGE = 'Lead source is invalid',
}

export const PHONE_NUMBER_VALIDATION_REGEX = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;

export const BIRTHDAYFORMAT = 'YYYY-MM-DD';

export enum Languages {
  VIETNAMESE = 'Việt Nam',
  ENGLISH = 'English',
}
