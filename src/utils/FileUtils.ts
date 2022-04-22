export const getFileSizeAsText = (file: File | null): string => {
  if (!file) return '';
  const sizeInByte = file.size;
  if (sizeInByte < 1024) {
    return `${sizeInByte} B`;
  }

  if (sizeInByte < 1024 * 1024) {
    return `${Math.round(10 * (sizeInByte / 1024)) / 10} KB`;
  }

  return `${Math.round(10 * (sizeInByte / 1024 / 1024)) / 10} MB`;
};

export const getFileExtension = (file: File | null): string => {
  if (!file) return '';
  const { length, [length - 1]: fileExt } = file?.name.split('.');

  return fileExt.toUpperCase();
};
