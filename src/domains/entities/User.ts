export enum UserStatusEnum {
  online = 'online',
  offline = 'offline',
  busy = 'busy',
  away = 'away',
  inactive = 'inactive',
}

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
  OPERATOR = 'OPERATOR',
  OPERATOR_MANAGER = 'OPERATOR_MANAGER',
}

export enum SexEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export type SexType = keyof typeof SexEnum;
export type RoleType = keyof typeof RoleEnum;
export type UserStatusType = keyof typeof UserStatusEnum;

export const userSexes: SexType[] = Object.keys(SexEnum) as Array<SexType>;
export const roleTypes: RoleType[] = Object.keys(RoleEnum) as Array<RoleType>;
export const userStatusTypes: UserStatusType[] = Object.keys(
  UserStatusEnum,
) as Array<UserStatusType>;

export interface UserStatusOption {
  label: string,
  value: string,
  number: number
}

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
  searchToken: string,
  settings?: {
    language?: LanguagesType,
    theme?: ThemesType
  },
  createdAt?: number,
  updatedAt?: number,
  status?: UserStatusType,
  about?: string,
  permissions?: string[],
}

export interface FetchAllUsersResponse {
  users?: User[],
}
