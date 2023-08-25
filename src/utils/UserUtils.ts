// eslint-disable-next-line import/prefer-default-export
import { User } from '@domain/entities/User';
import i18n from 'i18next';

export function userHasPermission(userPermissions: string[], permission: string) {
  return userPermissions.includes(permission);
}

/**
 * Generates the display name for the specified user.
 *
 * @param user - The user object for which to generate the display name.
 * @returns The generated display name for the user.
 */
export function generateUserDisplayName(user?: User) {
  if (!user) return '';
  if (user.lastName && user.firstName) return `${user.lastName} ${user.firstName}`;
  return user.username;
}

/**
 * Generates the display name option for the specified user, with an additional
 * label if the user is the current user.
 *
 * @param user - The user object for which to generate the display name option.
 * @param currentUser - The current user object.
 \ * @returns The generated display name option for the user.
 */
export function generateUserDisplayNameOption(user: User, currentUser?: User) {
  const displayName = generateUserDisplayName(user);
  if (user.username !== currentUser?.username) {
    return displayName;
  }
  return `${displayName} (${i18n.t('COMMON.ME')})`;
}

/**
 * Generates an internationalized translation for user-related content
 * based on the specified type.
 *
 * @param type
 * @param type - The type parameter used to determine the translation key.
 * @returns The internationalized translation string.
 */
export function generateI18nForUser(type: string) {
  const key = `USER.${type}`;
  return i18n.t(key).toUpperCase();
}
