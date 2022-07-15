export const removeElement = <T>(elements: T[], comparator: (el: T) => boolean): T[] => {
  if (elements.length === 0) return elements;
  return elements.filter((el: T) => comparator(el));
};

export const removeElementAt = <T>(elements: T[], index: number): T[] => {
  if (index < 0 || index > elements.length) return elements;

  // Remove item at index
  return elements.slice(0, index).concat(elements.slice(index + 1, elements.length));
};

export const addElementToFirst = <T>(elements: T[], element: T) : T[] => [element].concat(elements);
