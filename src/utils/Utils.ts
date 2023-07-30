// ** React Select Theme Colors
// eslint-disable-next-line import/prefer-default-export
export const selectThemeColors = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed', // for input hover border-color
  },
});

export const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US').format(amount);

export const formatPhoneNumber = (phoneStr: string) => phoneStr.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

export const groupBy = (
  arr: any[],
  fn: (item: any) => any,
) => arr.reduce<Record<string, any[]>>((prev, curr) => {
  const groupKey = fn(curr);
  const group = prev[groupKey] || [];
  group.push(curr);
  return { ...prev, [groupKey]: group };
}, {});
