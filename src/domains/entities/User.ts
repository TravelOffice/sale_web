export type UserStatusType = 'online' | 'offline' | 'busy' | 'away' | 'inactive';

export enum ThemesType {
  DARK = 'dark',
  LIGHT = 'light',
}
export enum LanguagesType {
  ENGLISH = 'en',
  VIETNAMESE = 'vi',
}
export enum RoleEnum {
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  SALE = 'SALE',
}

export enum SexEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export type SexType = keyof typeof SexEnum;
export type RoleType = keyof typeof RoleEnum;

export const userSexes: SexType[] = Object.keys(SexEnum) as Array<SexType>;
export const roleTypes: RoleType[] = Object.keys(RoleEnum) as Array<RoleType>;

export interface User {
  username: string,
  firstName?: string,
  lastName?: string,
  email: string,
  fullName?: string,
  roles: Array<string>,
  address?: string,
  avatar?: string,
  birthday?: string,
  sex: SexType,
  phoneNumber: string,
  settings?: {
    language?: LanguagesType,
    theme?: ThemesType
  },
  createdAt?: number,
  updatedAt?: number,
  status?: UserStatusType,
  about?: string,
}

export interface FetchAllUsersResponse {
  users?: User[],
}
