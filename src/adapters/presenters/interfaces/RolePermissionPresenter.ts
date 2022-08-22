import { GroupPermission, Role, RoleCreateUpdatePayload } from '@domain/entities/RolePermission';

export interface RolePermissionPresenter {
  getAllRoles: () => Promise<Array<Role>>;
  getAllPermissions: () => Promise<Array<GroupPermission>>;
  addRole: (role: RoleCreateUpdatePayload) => Promise<Role>;
  updateRole: (role: RoleCreateUpdatePayload) => Promise<Role>;
}
