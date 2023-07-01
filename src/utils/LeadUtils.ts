import { Lead } from '@domain/entities/Lead';
import { LeadFilterParams } from '@features/Lead/components/LeadFilter';
import i18n from '@config/i18n';

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
    if (!checkAssignee(lead, assignee)) return false;
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
