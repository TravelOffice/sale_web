// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj: any) => Object.keys(obj).length === 0;

// ** Function to capitalize the first letter of string
export const capitalize = (words: string) => words.charAt(0).toUpperCase() + words.slice(1);

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
