import i18n from '@config/i18n';
import { Customer } from '@domain/entities/Customer';
import { CustomerFilterParams } from '@features/Customer/components/CustomerFilter';

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
 * Generates an internationalized translation for customer-related content based on the specified type.
 *
 * @param type - The type parameter used to determine the translation key.
 * @returns The internationalized translation string.
 */
export function generateI18nForCustomer(type: string) {
  const key = `CUSTOMER.${type}`;
  return i18n.t(key);
}

/**
 * Generates an editable URL for the specified customer.
 *
 * @param customer - The customer object for which to generate the URL.
 * @returns The editable URL for the customer.
 */
export function generateEditableUrlForCustomer(customer: Customer) {
  return `/apps/customers/${customer.code}/edit`;
}
