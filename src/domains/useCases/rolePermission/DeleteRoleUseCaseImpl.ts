import { rolePermissionRepository } from '@adapter/repositories';
import { Role } from '@domain/entities/RolePermission';
import { DeleteRoleUseCase } from '@domain/useCases/interfaces/rolePermission/DeleteRoleUseCase';

export default class DeleteRoleUseCaseImpl implements DeleteRoleUseCase {
  invoke = async (
    roleName: string,
  ): Promise<Role> => rolePermissionRepository.deleteRole(roleName);
}
