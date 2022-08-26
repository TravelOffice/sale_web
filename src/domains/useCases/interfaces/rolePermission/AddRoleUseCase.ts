import { Role, RoleCreateUpdatePayload } from '@domain/entities/RolePermission';

export interface AddRoleUseCase {
  invoke: (role: RoleCreateUpdatePayload) => Promise<Role>
}
