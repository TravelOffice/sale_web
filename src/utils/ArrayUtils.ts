const removeElement = <T>(elements: T[], comparator: (el: T) => boolean): T[] => {
  if (elements.length === 0) return elements;
  return elements.filter((el: T) => comparator(el));
};

export default removeElement;
