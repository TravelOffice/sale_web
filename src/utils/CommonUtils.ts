// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj: Object) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num: number) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num);

export const handleFilterColumns = (
  row: any, columns: { key: string, value: string }[],
): boolean => columns.every(
  (column: { value: any; key: string }) => {
    if (!column.value) {
      return true;
    }
    return row[column.key] === column.value;
  },
);

export const handleSearchColumns = (
  row: any, searchTerm: string, columns: string[],
): boolean => {
  if (!searchTerm) {
    return true;
  }
  return columns.some((column: string) => row[column].includes(searchTerm));
};

/**
 * Truncate given string with ellipsis
 * @param str the given string which needs to be truncate
 * @param maxLength maximum length of string (included ellipsis)
 */
export const truncateStringWithEllipsis = (str: string, maxLength: number) => {
  // Skip truncating if the given string is not enough length
  if (str.length <= maxLength || maxLength <= 3) {
    return str;
  }
  // Replace 3 last characters by ellipsis (3 dots)
  return `${str.substring(0, maxLength - 3)}...`;
};

/**
 * Utility function to capitalize first letter of the given string
 * @param str string after capitalizing the first letter
 */
export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// ** Converts HTML to string
export const htmlToString = (html: string) => (html || '').replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tag
  .replaceAll('\n', ' ').replaceAll('\r\n', ' '); // Remove break line
