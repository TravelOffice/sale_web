// ** React Imports
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';

// ** Third Party Components
import {
  Copy, Edit, Info, RefreshCw, Trash,
} from 'react-feather';
import { Controller, useForm } from 'react-hook-form';

// ** Custom Components
import Images from '@themes/Images';
import i18n from '@config/i18n';
import AvatarGroup, { UserAvatarItem } from '@components/Avatar/Avatar-Group';
import { GroupPermission, Role } from '@domain/entities/RolePermission';
import { User } from '@domain/entities/User';
import { RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { rolePermissionActions } from '@redux/slices/rolePermissionSlice';
import { useAccessControl } from '@hooks/auth';
import PERMISSIONS from '@utils/PermissionUtils';
import { generateUserDisplayName } from '@utils/UserUtils';
import { useMutation } from '@tanstack/react-query';
import { rolePermissionPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';

interface RoleData {
  name: string,
  totalUsers: number,
  groupUsers: Array<UserAvatarItem>,
  permissions: Array<string>,
  isDefault?: boolean,
}

interface RoleFormData {
  roleName: string,
  permissions: Array<string>,
}

interface RoleCardProps {
  users: Array<User>,
  permissions: Array<GroupPermission>,
  roles: Array<Role>
}

const RoleCards = (props: RoleCardProps) => {
  const { users, permissions, roles } = props;
  // ** States
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.rolePermission.createOrUpdateRoleLoading);
  const openModal = useSelector((state: RootState) => state.rolePermission.openModal);
  const [allPermissions, setAllPermissions] = useState<Array<string>>([]);
  const [modalType, setModalType] = useState(i18n.t('ROLE-PERMISSION.ADD_NEW_ROLE'));
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [checkedPermissions, setCheckedPermissions] = useState<Array<string>>([]);
  const [roleDatas, setRoleDatas] = useState<Array<RoleData>>([]);
  const [selectedRole, setSelectedRole] = useState<RoleData>();
  const setShowModal = useCallback((status: boolean) => {
    dispatch(rolePermissionActions.setOpenModal(status));
  }, []);
  const { can } = useAccessControl();

  useEffect(() => {
    const data: RoleData[] = roles.map((role) => {
      const usersHaveRole = users.filter((user) => user.roles.includes(role.name));
      const groupUsers: UserAvatarItem[] = usersHaveRole.map((user) => {
        const fullName = generateUserDisplayName(user);
        return {
          key: user.username,
          title: fullName,
          size: 'sm',
          img: user.avatar,
          content: fullName,
        };
      });
      const listPermissionsName = role.permissions.map((permission) => permission.name);
      return {
        name: role.name,
        groupUsers,
        totalUsers: usersHaveRole.length,
        permissions: listPermissionsName,
        isDefault: role.isDefault,
      };
    });
    setRoleDatas(data);
  }, [users, roles]);

  useEffect(() => {
    const listPermissions = permissions.map(
      (groupPermission) => groupPermission.permissions.map(
        (permission) => permission.name,
      ),
    ).flat();
    setAllPermissions(listPermissions);
  }, [permissions]);

  // ** Hooks
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleFormData>({ defaultValues: { roleName: '' } });

  const onSubmit = (formData: RoleFormData) => {
    if (formData.roleName && formData.roleName.length && checkedPermissions.length) {
      if (selectedRole) {
        dispatch(rolePermissionActions.updateRole({
          name: selectedRole.name,
          permissions: checkedPermissions,
        }));
      } else {
        dispatch(rolePermissionActions.addRole({
          name: formData.roleName,
          permissions: checkedPermissions,
        }));
      }
    } else {
      setError('roleName', {
        type: 'manual',
      });
    }
  };

  const onReset = () => {
    setShowModal(false);
    reset({ roleName: '', permissions: [] });
  };

  const handleCheckedAllPermissions = (checked: boolean) => {
    if (checked) {
      setCheckedPermissions([...allPermissions]);
    } else {
      setCheckedPermissions([]);
    }
  };

  const handleChangePermission = (permissionName: string, checked: boolean) => {
    const newPermissions: string[] = [...checkedPermissions];
    if (checked) {
      newPermissions.push(permissionName);
    } else {
      const index = newPermissions.indexOf(permissionName);
      if (index > -1) {
        newPermissions.splice(index, 1);
      }
    }
    setCheckedPermissions(newPermissions);
  };

  const handleModalClosed = () => {
    setModalType(i18n.t('ROLE-PERMISSION.ADD_NEW_ROLE'));
    setCheckedPermissions([]);
    setSelectedRole(undefined);
    reset({ roleName: '' });
  };

  const handleEditRole = (data: RoleData) => {
    setModalType(i18n.t('ROLE-PERMISSION.EDIT_ROLE'));
    setCheckedPermissions(data.permissions);
    setSelectedRole(data);
    reset({ roleName: data.name });
  };

  const handleCopyRole = (data: RoleData) => {
    setModalType(i18n.t('ROLE-PERMISSION.CLONE_ROLE'));
    setCheckedPermissions(data.permissions);
    setSelectedRole(undefined);
    reset({ roleName: '' });
  };

  const handleAddRole = () => {
    setModalType(i18n.t('ROLE-PERMISSION.ADD_NEW_ROLE'));
    setCheckedPermissions([]);
    setSelectedRole(undefined);
    reset({ roleName: '' });
  };

  const { mutate: deleteRoleMutate, isLoading: isDeleteLoading } = useMutation({
    mutationKey: ['deleteRole'],
    mutationFn: async (
      roleName: string,
    ) => rolePermissionPresenter.deleteRole(roleName),
    onSuccess: () => {
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('ROLE-PERMISSION.DELETE_ROLE_SUCCESSFULLY', { roleName: selectedRole?.name }),
      });
      dispatch(rolePermissionActions.getAllRoles());
      setOpenConfirmDeleteModal(false);
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
      setOpenConfirmDeleteModal(false);
    },
  });

  const handleDeleteRole = () => {
    if (selectedRole) {
      deleteRoleMutate(selectedRole.name);
    }
  };

  return (
    <>
      <Row>
        {roleDatas.map((item) => (
          <Col key={item.name} xl={4} md={6}>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <span>{i18n.t('ROLE-PERMISSION.TOTAL_USER', { totalUsers: item.totalUsers })}</span>
                  <AvatarGroup data={item.groupUsers} />
                </div>
                <div className="d-flex justify-content-between align-items-end mt-1 pt-25">
                  <div className="role-heading">
                    <h4 className="fw-bolder">{item.name}</h4>
                    <small className="fw-bolder">
                      {item.isDefault ? i18n.t('ROLE-PERMISSION.DEFAULT_ROLE') : i18n.t('ROLE-PERMISSION.CUSTOM_ROLE')}
                    </small>
                  </div>
                  <div>
                    {!item.isDefault && (
                      <>
                        {
                          can(PERMISSIONS.update_role) && (
                            <Link
                              to="/"
                              className="text-body me-1"
                              title={i18n.t('ROLE-PERMISSION.EDIT_ROLE')}
                              onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                                handleEditRole(item);
                              }}
                            >
                              <Edit className="font-medium-5" />
                            </Link>
                          )
                        }
                        {
                          item.totalUsers === 0 && can(PERMISSIONS.delete_roles)
                          && (
                            <Link
                              to="/"
                              className="text-body me-1"
                              title={i18n.t('ROLE-PERMISSION.DELETE_ROLE')}
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedRole(item);
                                setOpenConfirmDeleteModal(true);
                              }}
                            >
                              <Trash className="font-medium-5" />
                            </Link>
                          )
                        }
                      </>
                    )}
                    {
                      can(PERMISSIONS.create_role) && (
                        <Link
                          to="/"
                          className="text-body"
                          title={i18n.t('ROLE-PERMISSION.CLONE_ROLE')}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            handleCopyRole(item);
                          }}
                        >
                          <Copy className="font-medium-5" />
                        </Link>
                      )
                    }
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
        {
          can(PERMISSIONS.create_role) && (
            <Col xl={4} md={6}>
              <Card>
                <Row>
                  <Col sm={5}>
                    <div className="d-flex align-items-end justify-content-center h-100">
                      <img className="img-fluid mt-2" src={Images.faq} alt="Not authorized page" width={85} />
                    </div>
                  </Col>
                  <Col sm={7}>
                    <CardBody className="text-sm-end text-center ps-sm-0">
                      <Button
                        color="primary"
                        className="text-nowrap mb-1"
                        onClick={() => {
                          setModalType(i18n.t('ROLE-PERMISSION.ADD_NEW_ROLE'));
                          setShowModal(true);
                          handleAddRole();
                        }}
                      >
                        {i18n.t('ROLE-PERMISSION.ADD_NEW_ROLE')}
                      </Button>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>
          )
        }
      </Row>
      <Modal
        isOpen={openModal}
        onClosed={handleModalClosed}
        toggle={() => setShowModal(!openModal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShowModal(!openModal)} />
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-1">
            <h2>
              {modalType}
            </h2>
          </div>
          <Row tag="form" onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              <Label className="form-label" for="roleName">
                {i18n.t('ROLE-PERMISSION.ROLE_NAME')}
              </Label>
              <Controller
                name="roleName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="roleName"
                    placeholder={i18n.t('ROLE-PERMISSION.INPUT_ROLE_NAME')}
                    invalid={errors.roleName && true}
                    disabled={!!selectedRole}
                  />
                )}
              />
              {errors.roleName && <FormFeedback>{i18n.t('MESSAGE.ROLE_INVALID_MESSAGE')}</FormFeedback>}
            </Col>
            <Col xs={12}>
              <h4 className="mt-2 pt-50">{i18n.t('ROLE-PERMISSION.ROLE_PERMISSIONS')}</h4>
              <Table className="table-flush-spacing" responsive>
                <tbody>
                  <tr>
                    <td className="text-nowrap fw-bolder">
                      <span className="me-50">{i18n.t('ROLE-PERMISSION.ADMINISTRATOR_ACCESS')}</span>
                      <Info size={14} id="info-tooltip" />
                      <UncontrolledTooltip placement="top" target="info-tooltip">
                        {i18n.t('COMMON.SELECT_ALL')}
                      </UncontrolledTooltip>
                    </td>
                    <td>
                      <div className="form-check">
                        <Input
                          type="checkbox"
                          id="select-all"
                          onChange={(e) => {
                            handleCheckedAllPermissions(e.target.checked);
                          }}
                        />
                        <Label className="form-check-label" for="select-all">
                          {i18n.t('COMMON.SELECT_ALL')}
                        </Label>
                      </div>
                    </td>
                  </tr>
                  {permissions.map((groupPermission) => (
                    <tr key={groupPermission.name}>
                      <td className="text-nowrap fw-bolder">{groupPermission.name}</td>
                      <td>
                        {groupPermission.permissions.map((permission) => (
                          <div key={permission.name} className="d-flex">
                            <div className="form-check me-3 me-lg-5 mb-1">
                              <Label className="form-check-label" for={permission.name}>
                                {permission.title}
                              </Label>
                              <Input
                                type="checkbox"
                                id={permission.name}
                                checked={
                                checkedPermissions.includes(permission.name)
                              }
                                onChange={(e) => {
                                  handleChangePermission(e.target.id, e.target.checked);
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col className="text-center mt-2" xs={12}>
              <Button type="submit" color="primary" className="me-1">
                {loading
                  ? <RefreshCw className={loading ? 'spin-animated' : ''} size={16} />
                  : i18n.t('COMMON.SUBMIT')}
              </Button>
              <Button type="reset" outline onClick={onReset}>
                {i18n.t('COMMON.DISCARD')}
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={openConfirmDeleteModal}
        toggle={() => setOpenConfirmDeleteModal(!openConfirmDeleteModal)}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader className="bg-transparent" toggle={() => setOpenConfirmDeleteModal(!openConfirmDeleteModal)} />
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-1">
            <h2>
              {i18n.t('ROLE-PERMISSION.DELETE_ROLE')}
            </h2>
          </div>
          {i18n.t('ROLE-PERMISSION.DELETE_ROLE_CONFIRMATION_MSG', { roleName: selectedRole?.name })}
          <Row>
            <Col className="text-center mt-2" xs={12}>
              <Button type="submit" color="primary" className="me-1" onClick={handleDeleteRole}>
                {isDeleteLoading ? <RefreshCw className={isDeleteLoading ? 'spin-animated' : ''} size={16} />
                  : i18n.t('COMMON.SUBMIT')}
              </Button>
              <Button type="reset" outline onClick={() => setOpenConfirmDeleteModal(false)}>
                {i18n.t('COMMON.DISCARD')}
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RoleCards;
