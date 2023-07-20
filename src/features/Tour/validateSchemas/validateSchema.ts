import * as yup from 'yup';
import i18n from '@config/i18n';

export const validateOtherPriceSchema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.SERVICE_NAME') })),
  price: yup
    .number()
    .integer()
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE') })),
});

export const validateTourSchema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.NAME') })),
  type: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.TYPE') })),
  visitorCount: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.VISITOR_COUNT') }))
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.VISITOR_COUNT'), value: 1 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.VISITOR_COUNT') })),
  startingLocation: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.STARTING_LOCATION') })),
  endingLocation: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.ENDING_LOCATION') })),
  durationInDays: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS') }))
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS'), value: 1 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS') })),
  durationInNights: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS') }))
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS') })),
  services: yup.array().of(
    yup.object().shape({
      name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.SERVICE_NAME') })),
      price: yup.number().moreThan(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE'), value: 0 })),
    }),
  ),
});
