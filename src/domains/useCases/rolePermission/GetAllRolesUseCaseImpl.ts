import { rolePermissionRepository } from '@adapter/repositories';
import { Role } from '@domain/entities/RolePermission';
import { GetAllRolesUseCase } from '../interfaces/rolePermission/GetAllRolesUseCase';

export default class GetAllRolesUseCaseImpl implements GetAllRolesUseCase {
  invoke = async (): Promise<Array<Role>> => rolePermissionRepository.getAllRoles();
}
