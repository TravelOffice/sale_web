import i18n from '@config/i18n';

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
