export type UserStatus = 'online' | 'offline' | 'busy' | 'away';

export enum ThemesType {
  DARK = 'dark',
  LIGHT = 'light',
}
export enum LanguagesType {
  ENGLISH = 'en',
  VIETNAMESE = 'vi',
}
export enum RolesType {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export default interface User {
  username: string,
  firstName?: string,
  lastName?: string,
  name?: string,
  email: string,
  tenant: string,
  role: RolesType,
  address?: string,
  avatar?: string,
  phoneNumber: string,
  settings: {
    language?: LanguagesType,
    theme?: ThemesType
  },
  createdAt: number,
  updatedAt: number,
  status: UserStatus,
  about?: string,
}
