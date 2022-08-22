import { rolePermissionRepository } from '@adapter/repositories';
import { GroupPermission } from '@domain/entities/RolePermission';
import { GetAllPermissionsUseCase } from '../interfaces/rolePermission/GetAllPermissionsUseCase';

export default class GetAllPermissionsUseCaseImpl implements GetAllPermissionsUseCase {
  invoke = async (
  ): Promise<Array<GroupPermission>> => rolePermissionRepository.getAllPermissions();
}
