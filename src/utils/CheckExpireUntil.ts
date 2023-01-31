/**
 * Check expire token
 * @param token the given string which needs to be check
 * @return boolean
 */
// eslint-disable-next-line import/prefer-default-export
export const isTokenExpired = (token : string | null) => {
  if (!token) {
    return true;
  }
  const splitedToken = token.split('.')[1];
  const decodedJson = Buffer.from(splitedToken, 'base64').toString();
  const decoded: any = JSON.parse(decodedJson);
  const { exp } = decoded;
  const expired = (exp < (new Date().getTime() + 1) / 1000);
  return expired;
};
