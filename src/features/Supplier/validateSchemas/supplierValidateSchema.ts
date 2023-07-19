import * as yup from 'yup';
import i18n from '@config/i18n';

export const validateQuoteSchema = yup.object().shape({
  link: yup.string().url(i18n.t('SUPPLIER.REQUIRED_QUOTE_LINK', { field: i18n.t('SUPPLIER.QUOTE_LINK') })),
  year: yup
    .number()
    .integer()
    .min(1900, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('SUPPLIER.QUOTE_YEAR'), value: 1900 }))
    .max(2100, i18n.t('MESSAGE.MAX_VALUE_MESSAGE', { field: i18n.t('SUPPLIER.QUOTE_YEAR'), value: 2100 })),
  price: yup
    .number()
    .integer(),
});

export const validatePaymentInfoSchema = yup.object().shape({
  bankName: yup.string(),
  bankBranch: yup.string(),
  accountName: yup.string(),
  accountNumber: yup.string()
    .matches(/^[0-9]+$/g, i18n.t('SUPPLIER.REQUIRED_BANK_ACCOUNT_NUMBER', { field: i18n.t('SUPPLIER.BANK_ACCOUNT_NUMBER') })),
});

export const validateContactSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(i18n.t('SUPPLIER.REQUIRED_CONTACT_EMAIL', { field: i18n.t('SUPPLIER.CONTACT_EMAIL') })),
  phoneNumber: yup.string()
    .matches(/^[0-9]{10}$/g, i18n.t('SUPPLIER.REQUIRED_CONTACT_PHONE_NUMBER', { field: i18n.t('SUPPLIER.CONTACT_PHONE_NUMBER') })),
});

export const supplierValidateSchema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('SUPPLIER.NAME') })),
  brandName: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('SUPPLIER.BRAND_NAME') })),
  establishmentYear: yup.number().integer().optional(),
  capacity: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('SUPPLIER.CAPACITY') }))
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('SUPPLIER.CAPACITY'), value: 1 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('SUPPLIER.CAPACITY') })),
  city: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('SUPPLIER.CITY') })),
  district: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('SUPPLIER.DISTRICT') })),
  address: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('SUPPLIER.ADDRESS') })),
  quotes: yup.array().of(validateQuoteSchema).optional(),
  paymentInfo: yup.array().of(validatePaymentInfoSchema).optional(),
  contacts: yup.array().of(validateContactSchema).optional(),
});
