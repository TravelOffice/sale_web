export enum HttpVerb {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  ALL = 'ALL',
}

export interface PermissionStatement {
  path: string,
  action?: HttpVerb,
}

export interface Permission {
  name: string,
  title: string,
  statements: Array<PermissionStatement>,
}

export interface GroupPermission {
  name: string,
  permissions: Array<Permission>
}

export interface Role {
  name: string,
  permissions: Array<Permission>,
  isDefault?: boolean,
}

export interface RoleCreateUpdatePayload {
  name: string,
  permissions: Array<string>,
}

export interface FetchAllRolesResponse {
  roles?: Array<Role>,
}

export interface FetchAllPermissionsResponse {
  permissions?: Array<GroupPermission>,
}

export interface RoleOption {
  label: string,
  value: string,
  number: number,
}
