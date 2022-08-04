import React, { useCallback, useMemo } from 'react';
import SidebarForm, { FormSchema } from '@components/SidebarForm/SidebarForm';
import {
  User,
  userSexes,
  UserStatusEnum,
} from '@domain/entities/User';
import i18n from '@config/i18n';
import * as yup from 'yup';
import { BIRTHDAY_FORMAT } from '@utils/Constants';
import { UnpackNestedValue } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@redux/slices/userSlice';
import { RootState } from '@redux/store';
import moment from 'moment';
import { RoleOption } from '@domain/entities/RolePermission';

type OmitFields = 'createdAt' | 'updatedAt' | 'settings' | 'avatar' | 'status' | 'fullName' | 'about' | 'tenant' | 'rolesStr' | 'permissions';
type UserFormData = Omit<User, OmitFields>;

const defaultValues: UserFormData = {
  username: '',
  email: '',
  birthday: moment().format(BIRTHDAY_FORMAT),
  roles: [],
  sex: 'MALE',
  phoneNumber: '',
};

export interface UserSidebarProps {
  setOpenSidebar: (status: boolean) => void,
  toggleSidebar: () => void,
  open: boolean,
  user?: User,
  onClosed: () => void,
  roleOptions: Array<RoleOption>
}

function useSchema(user: User | undefined, roleOptions: Array<RoleOption>) {
  const schema: FormSchema<UserFormData> = useMemo(() => ({
    username: {
      type: 'text',
      label: i18n.t('USER.NAME'),
      required: true,
      disabled: !!user,
      validator: yup.string().required(i18n.t('MESSAGE.NAME_REQUIRE_MESSAGE')),
    },
    firstName: {
      type: 'text',
      label: i18n.t('USER.FIRSTNAME'),
      required: true,
      validator: yup.string().required(i18n.t('MESSAGE.FIRST_NAME_REQUIRE_MESSAGE')),
    },
    lastName: {
      type: 'text',
      label: i18n.t('USER.LASTNAME'),
      required: true,
      validator: yup.string().required(i18n.t('MESSAGE.LAST_NAME_REQUIRE_MESSAGE')),
    },
    phoneNumber: {
      type: 'tel',
      label: i18n.t('USER.PHONE'),
      required: true,
      validator: yup.string().required(i18n.t('MESSAGE.PHONE_REQUIRE_MESSAGE')),
    },
    email: {
      type: 'email',
      label: 'Email',
      required: true,
      validator: yup.string().required(i18n.t('MESSAGE.EMAIL_REQUIRE_MESSAGE')).email(i18n.t('MESSAGE.EMAIL_INVALID_MESSAGE')),
    },
    birthday: {
      type: 'date',
      label: i18n.t('USER.BIRTHDAY'),
      required: false,
      validator: yup.date(),
    },
    address: {
      type: 'text',
      label: i18n.t('USER.ADDRESS'),
      required: false,
    },
    sex: {
      type: 'select',
      label: i18n.t('USER.SEX'),
      required: true,
      options: userSexes.map((option) => ({
        label: i18n.t(`USER.${option}`),
        value: option,
      })),
      validator: yup.string().oneOf(userSexes, i18n.t('MESSAGE.SEX_INVALID_MESSAGE')),
    },
    roles: {
      type: 'select',
      label: i18n.t('USER.ROLE'),
      required: true,
      options: roleOptions.map((option) => ({
        label: option.label,
        value: [option.value],
      })),
      validator: yup.array().min(1, i18n.t('MESSAGE.ROLE_REQUIRE_MESSAGE')),
      isMulti: true,
    },
  }), [user]);
  return schema;
}

export default function UserSidebar(props: UserSidebarProps) {
  const {
    open, toggleSidebar, user, onClosed, roleOptions,
  } = props;
  const userFormData = useMemo(() => {
    if (user) {
      return {
        ...user,
      };
    }
    return defaultValues;
  }, [user]);

  const dispatch = useDispatch();
  const schema = useSchema(user, roleOptions);
  const loading = useSelector((state: RootState) => state.user.createOrUpdateUserLoading);
  const onSubmit = useCallback((formData: UnpackNestedValue<UserFormData>) => {
    if (user) {
      // Edit user
      dispatch(userActions.updateUser({
        username: user.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        sex: formData.sex,
        firstName: formData.firstName,
        lastName: formData.lastName,
        roles: formData.roles.flat(),
        birthday: moment(formData.birthday).format(BIRTHDAY_FORMAT),
      }));
    } else {
      // Create user
      dispatch(userActions.addUser({
        ...formData,
        status: UserStatusEnum.offline,
        roles: formData.roles.flat(),
        birthday: moment(formData.birthday).format(BIRTHDAY_FORMAT),
      }));
    }
  }, [user]);
  return (
    <SidebarForm<UserFormData>
      schema={schema}
      defaultValues={userFormData}
      title={user ? i18n.t('USER.EDIT_USER') : i18n.t('USER.ADD_USER')}
      open={open}
      size="lg"
      onSubmit={onSubmit}
      toggleSidebar={toggleSidebar}
      submitting={loading}
      onClosed={onClosed}
    />
  );
}
