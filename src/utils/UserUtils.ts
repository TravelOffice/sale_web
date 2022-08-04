// eslint-disable-next-line import/prefer-default-export
export function userHasPermission(userPermissions: string[], permission: string) {
  return userPermissions.includes(permission);
}
