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
