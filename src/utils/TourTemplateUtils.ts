import { TourTemplate } from '@domain/entities/TourTemplate';
import { TourTemplateFilterParams } from '@features/TourTemplate/components/TourTemplateFilter';
import i18n from 'i18next';
/**
 * Generates an internationalized translation for tour-template-related content
 * based on the specified type.
 *
 * @param type - The type parameter used to determine the translation key.
 * @returns The internationalized translation string.
 */
export function generateI18nForTourTemplate(type: string) {
  const key = `TOUR_TEMPLATE.${type}`;
  return i18n.t(key);
}

/**
 * Filters an array of tour templates based on the provided filter parameters.
 *
 * @param allTourTemplates - An array of tour templates to filter.
 * @param params - The filter parameters used to determine which tour templates to include.
 * @returns An array of filtered tour templates.
 */
export function filterTourTemplates(
  allTourTemplates: TourTemplate[],
  params: TourTemplateFilterParams,
) {
  const {
    name, type, startingLocation, endingLocation, durationInDays, durationInNights, creator,
  } = params;

  return allTourTemplates.filter(
    (item: TourTemplate) => {
      if (name && !item.name.toLowerCase().includes(name.toLowerCase())) return false;
      if (type && !item.type.includes(type)) return false;
      if (startingLocation
          && !item.startingLocation.toLowerCase().includes(startingLocation.toLowerCase())) {
        return false;
      }
      if (endingLocation
          && !item.endingLocation.toLowerCase().includes(endingLocation.toLowerCase())) {
        return false;
      }
      if (durationInDays && durationInDays !== item.durationInDays) return false;
      if (durationInNights && durationInNights !== item.durationInNights) return false;
      if (creator && !item.creator.includes(creator.toLowerCase())) return false;
      return true;
    },
  );
}

/**
 * Generates an editable URL for the specified tour template.
 *
 * @param tourTemplate - The tour template object for which to generate the URL.
 * @returns The editable URL for the tour template.
 */
export function generateEditableUrlForTourTemplate(tourTemplate: TourTemplate) {
  return `/apps/tour-template/${tourTemplate.code}/edit`;
}
