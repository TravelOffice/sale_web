import i18n from '@config/i18n';
import {
  Customer, CustomerLevel, MaritalStatus, SexType,
} from '@domain/entities/customer/Customer';
import { CustomerFilterParams } from '@features/Customer/components/CustomerFilter';
import * as yup from 'yup';

/**
 * Checks if the assignee matches the specified criteria in the given customer.
 *
 * @param customer - The customer object to check.
 * @param assignee - The assignee criteria to match against. (optional)
 * @returns A boolean indicating whether the assignee matches the criteria.
 */
export function checkAssignee(customer: Customer, assignee?: string) {
  if (!assignee) return true;
  const { assigneeId, assigneeName } = customer;
  if (!assigneeId) return false;
  return assigneeId.toLowerCase().includes(assignee.toLowerCase())
    || assigneeName?.toLowerCase().includes(assignee.toLowerCase());
}

/**
 * Checks if the creator matches the specified criteria in the given customer.
 *
 * @param customer - The customer object to check.
 * @param creator - The creator criteria to match against. (optional)
 * @returns A boolean indicating whether the creator matches the criteria.
 */
export function checkCreator(customer: Customer, creator?: string) {
  if (!creator) return true;
  const { creatorId, creatorName } = customer;
  if (!creatorId) return false;
  return creatorId.toLowerCase().includes(creator.toLowerCase())
    || creatorName?.toLowerCase().includes(creator.toLowerCase());
}

/**
 * Filters an array of customers based on the provided filter parameters.
 *
 * @param allCustomers - An array of customers to filter.
 * @param params - The filter parameters used to determine which customers to include.
 * @returns An array of filtered customers.
 */
export function filterCustomers(allCustomers: Customer[], params: CustomerFilterParams) {
  return allCustomers.filter((customer) => {
    const {
      code,
      name,
      assignee,
      creator,
      phoneNumber,
      level,
    } = params;
    if (code && !customer.code.includes(code)) return false;
    if (name && !customer.name.toLowerCase().includes(name.toLowerCase())) return false;
    if (!checkAssignee(customer, assignee)) return false;
    if (!checkCreator(customer, creator)) return false;
    if (phoneNumber && !customer.primaryPhoneNumber.includes(phoneNumber)) return false;
    return !(level && customer.level !== level);
  });
}

/**
 * Generates an internationalized translation for customer-related content
 * based on the specified type.
 *
 * @param type - The type parameter used to determine the translation key.
 * @returns The internationalized translation string.
 */
export function generateI18nForCustomer(type?: string) {
  if (type) {
    const key = `CUSTOMER.${type}`;
    return i18n.t(key);
  }
  return '';
}

/**
 * Generates an editable URL for the specified customer.
 *
 * @param customer - The customer object for which to generate the URL.
 * @returns The editable URL for the customer.
 */
export function generateEditableUrlForCustomer(customer: Customer) {
  return `/apps/customer/${customer.code}/edit`;
}

/**
 * Validation schema for creating a customer.
 */
export const createCustomerSchema = yup.object().shape({
  email: yup.string()
    .email(i18n.t('MESSAGE.EMAIL_INVALID_MESSAGE')),
  primaryPhoneNumber: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('CUSTOMER.PHONE') })),
  name: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.NAME') })),
  address: yup.string(),
  sex: yup.string(),
  honorific: yup.string(),
  level: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('CUSTOMER.LEVEL') })),
  socialLink: yup.string(),
});

/**
 * Validation schema for updating a customer.
 */
export const updateCustomerSchema = yup.object().shape({
  email: yup.string()
    .email(i18n.t('MESSAGE.EMAIL_INVALID_MESSAGE')),
  primaryPhoneNumber: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('CUSTOMER.PHONE') })),
  name: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.NAME') })),
  address: yup.string(),
  sex: yup.string(),
  honorific: yup.string(),
  level: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('CUSTOMER.LEVEL') })),
  socialLink: yup.string(),
  birthday: yup.date(),
  source: yup.string(),
  maritalStatus: yup.string(),
  interest: yup.string(),
  group: yup.string(),
  genitive: yup.string(),
  taxCode: yup.string(),
  assigneeId: yup.string(),
});

/**
 * An array of sex options for leads.
 */
export const sexOptions = [
  { label: generateI18nForCustomer(SexType.MALE), value: SexType.MALE },
  { label: generateI18nForCustomer(SexType.FEMALE), value: SexType.FEMALE },
  { label: generateI18nForCustomer(SexType.OTHER), value: SexType.OTHER },
];

/**
 * An array of customer level options for leads.
 */
export const customerLevelOptions = [
  { label: generateI18nForCustomer(CustomerLevel.STANDARD), value: CustomerLevel.STANDARD },
  { label: generateI18nForCustomer(CustomerLevel.VIP), value: CustomerLevel.VIP },
  { label: generateI18nForCustomer(CustomerLevel.VVIP), value: CustomerLevel.VVIP },
];

/**
 * An array of marital status options for leads.
 */
// TODO: Fetch sources from remote server
export const maritalStatusOptions = [
  { label: generateI18nForCustomer(MaritalStatus.SINGLE), value: MaritalStatus.SINGLE },
  { label: generateI18nForCustomer(MaritalStatus.MARRIED), value: MaritalStatus.MARRIED },
];
