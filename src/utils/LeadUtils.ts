import { HonorificType, Lead, LeadStatus } from '@domain/entities/lead/Lead';
import { LeadFilterParams } from '@features/Lead/components/LeadFilter';
import i18n from '@config/i18n';
import * as yup from 'yup';

/**
 * Checks if the assignee matches the specified criteria in the given lead.
 *
 * @param lead - The lead object to check.
 * @param assignee - The assignee criteria to match against. (optional)
 * @returns A boolean indicating whether the assignee matches the criteria.
 */
export function checkAssignee(lead: Lead, assignee?: string) {
  if (!assignee) return true;
  const { assigneeId, assigneeName } = lead;
  if (!assigneeId) return false;
  return assigneeId.toLowerCase().includes(assignee.toLowerCase())
    || assigneeName?.toLowerCase().includes(assignee.toLowerCase());
}

/**
 * Filters an array of leads based on the provided filter parameters.
 *
 * @param allLeads - An array of leads to filter.
 * @param params - The filter parameters used to determine which leads to include.
 * @returns An array of filtered leads.
 */
export function filterLeads(allLeads: Lead[], params: LeadFilterParams) {
  return allLeads.filter((lead) => {
    const {
      name,
      assignee,
      status,
      creator,
      phoneNumber,
    } = params;
    if (name && !lead.name.toLowerCase().includes(name.toLowerCase())) return false;
    if (phoneNumber && !lead.phoneNumber.includes(phoneNumber)) return false;
    if (status && lead.leadStatus !== status) return false;
    if (assignee && lead.assigneeId !== assignee) return false;
    return !(creator && !lead.creatorId.includes(creator) && !lead.creatorName.includes(creator));
  });
}

/**
 * Generates an internationalized translation for lead-related content based on the specified type.
 *
 * @param type - The type parameter used to determine the translation key.
 * @returns The internationalized translation string.
 */
export function generateI18nForLead(type: string) {
  const key = `LEAD.${type}`;
  return i18n.t(key);
}

/**
 * Generates an editable URL for the specified lead.
 *
 * @param lead - The lead object for which to generate the URL.
 * @returns The editable URL for the lead.
 */
export function generateEditableUrlForLead(lead: Lead) {
  return `/apps/lead/${lead.code}/edit`;
}

/**
 * Counts lead data based on the provided array of leads.
 *
 * @param allLeads - An array of leads to count.
 * @returns An object containing counts for different lead statuses.
 */
export function countLeadData(allLeads: Lead[]) {
  return {
    total: allLeads.length,
    countNew: allLeads.filter((lead) => lead.leadStatus === LeadStatus.NEW).length,
    countProcessing: allLeads.filter((lead) => lead.leadStatus === LeadStatus.PROCESSING).length,
    countClosed: allLeads.filter((lead) => lead.leadStatus === LeadStatus.CLOSED).length,
    countCancelled: allLeads.filter((lead) => lead.leadStatus === LeadStatus.CANCEL).length,
  };
}

/**
 * An array of honorific options for leads.
 */
export const honorificOptions = [
  { label: generateI18nForLead(HonorificType.MR_OLD), value: HonorificType.MR_OLD },
  { label: generateI18nForLead(HonorificType.MRS_OLD), value: HonorificType.MRS_OLD },
  { label: generateI18nForLead(HonorificType.MR_YOUNG), value: HonorificType.MR_YOUNG },
  { label: generateI18nForLead(HonorificType.MRS_YOUNG), value: HonorificType.MRS_YOUNG },
];

/**
 * An array of source options for leads.
 */
// TODO: Fetch sources from remote server
export const sourceOptions = [
  { label: 'Zalo', value: 'zalo' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Campaign', value: 'campaign' },
];

/**
 * An array of type options for leads.
 */
// TODO: Fetch types from remote server
export const typeOptions = [
  { label: i18n.t('LEAD.INLAND'), value: 'inland' },
  { label: i18n.t('LEAD.INBOUND'), value: 'inbound' },
  { label: i18n.t('LEAD.OUTBOUND'), value: 'outbound' },
];

/**
 * Validation schema for creating a lead.
 */
export const createLeadSchema = yup.object().shape({
  email: yup.string()
    .email(i18n.t('MESSAGE.EMAIL_INVALID_MESSAGE')),
  name: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.NAME') })),
  phoneNumber: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.PHONE') })),
  address: yup.string(),
  honorific: yup.string(),
  tourTemplateId: yup.string(),
  desiredTour: yup.string(),
  description: yup.string(),
  assigneeId: yup.string(),
  sourceId: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.SOURCE') })),
  numberOfAdultPassengers: yup.number().integer()
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('LEAD.NUMBER_OF_ADULT_PASSENGERS'), value: 0 }))
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.NUMBER_OF_ADULT_PASSENGERS') })),
  numberOfChildrenPassengers: yup.number().integer()
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('LEAD.NUMBER_OF_CHILDREN_PASSENGERS'), value: 0 }))
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.NUMBER_OF_CHILDREN_PASSENGERS') })),
  departure: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.DEPARTURE') })),
  startDate: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.START_DATE') })),
  type: yup.string()
    .required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.TYPE') })),
  tourType: yup.string(),
});

/**
 * Validation schema for updating a lead.
 */
export const updateLeadSchema = createLeadSchema;
