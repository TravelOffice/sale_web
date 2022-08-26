import { GroupPermission } from '@domain/entities/RolePermission';

export interface GetAllPermissionsUseCase {
  invoke: () => Promise<Array<GroupPermission>>
}
