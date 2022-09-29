export const getFileSizeText = (fileSize: number) => {
  if (fileSize < 1024) {
    return `${fileSize} B`;
  }

  if (fileSize < 1024 * 1024) {
    return `${Math.round(10 * (fileSize / 1024)) / 10} KB`;
  }

  return `${Math.round(10 * (fileSize / 1024 / 1024)) / 10} MB`;
};

export const getFileSizeAsText = (file: File | null): string => {
  if (!file) return '';
  const sizeInByte = file.size;
  return getFileSizeText(sizeInByte);
};

export const getFileExtension = (file: File | null): string => {
  if (!file) return '';
  const { length, [length - 1]: fileExt } = file?.name.split('.');

  return fileExt.toUpperCase();
};
