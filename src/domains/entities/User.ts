export type UserStatusType = 'online' | 'offline' | 'busy' | 'away' | 'inactive';

export enum ThemesType {
  DARK = 'dark',
  LIGHT = 'light',
}
export enum LanguagesType {
  ENGLISH = 'en',
  VIETNAMESE = 'vi',
}
export enum RolesType {
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface User {
  username: string,
  firstName?: string,
  lastName?: string,
  name?: string,
  email: string,
  tenant: string,
  roles: Array<string>,
  address?: string,
  avatar?: string,
  phoneNumber: string,
  settings: {
    language?: LanguagesType,
    theme?: ThemesType
  },
  createdAt: number,
  updatedAt: number,
  status: UserStatusType,
  about?: string,
}

export interface FetchAllUsersResponse {
  users?: User[],
}
