import i18n from '@config/i18n';
import moment from 'moment/moment';

// ** Checks if the passed date is today
export const isToday = (date: Date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};
// ** Returns short month of passed date
export const formatDateToMonthShort = (value: Date, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting : any = { month: 'short', day: 'numeric' };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' };
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

/**
 * Calculate the difference between two dates and return as i18n text
 * @param from From date
 * @param to To date
 * @returns Difference between two dates as i18n text
 */
export const timeDiffAsI18nText = (from: Date, to: Date) => {
  const diff = Math.abs(from.getTime() - to.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;

  return i18n.t('BOOKING.MINUTES_FROM_CREATED_AT', { days, hours, minutes });
};

/**
 * Checks if a given date falls within a specified date range.
 *
 * @param itemDate - The date to check if it falls within the range.
 * @param range - The date range specified as an array of two Date objects [startDate, endDate].
 * @returns True if the itemDate is within the specified range, false otherwise.
 */
export const isDateInRange = (itemDate: string | number | undefined, range: Date[]): boolean => {
  // If the itemDate is not provided, it cannot be within the range, so return false.
  if (!itemDate) return false;

  // Convert the start and end date of the range to moment instances for comparison.
  const startDate = moment(range[0]);
  const endDate = moment(range[1]);

  // Convert the itemDate to a moment instance and set the time to the start of the day.
  const actualDate = moment(itemDate).startOf('day');

  // Use moment's isBetween method to check if the actualDate falls within the range.
  // The 'day' argument specifies that the comparison should be done at a day granularity,
  // and '[]' includes both start and end dates in the comparison.
  return actualDate.isBetween(startDate, endDate, 'day', '[]');
};

/**
 * Format date to string with format 'dd/mm/yyyy'
 *
 * @param date - The date to format.
 * @returns Formatted date string.
 */
export const formatVietnameseDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
