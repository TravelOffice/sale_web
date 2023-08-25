import React, { useMemo, useState } from 'react';
import i18n from '@config/i18n';
import { Badge, Spinner } from 'reactstrap';
import {
  Check, Edit2, User as UserIcon, UserX, X,
} from 'react-feather';
import { CSSObjectWithLabel } from 'react-select/dist/declarations/src/types';
import Select, { Props } from 'react-select';
import { ExtendedDepartureTour } from '@domain/entities/tour';
import { useAccessControl } from '@hooks/auth';
import PERMISSIONS from '@utils/PermissionUtils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RoleEnum, User } from '@domain/entities/User';
import { tourPresenter, userPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import { canUserBeOperator } from '@utils/TousOperationUtils';
import { generateUserDisplayName } from '@utils/UserUtils';

// Custom styles for assignee select
const customStyles = {
  control: (base: CSSObjectWithLabel, _props: Props) => ({
    ...base,
    minWidth: 160,
  }),
};

export interface DepartureTourActionCellProps {
  departureTour: ExtendedDepartureTour
}

export default function DepartureTourOperatorCell({ departureTour }: DepartureTourActionCellProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newOperator, setNewOperator] = useState<string>();
  const queryClient = useQueryClient();
  const { can } = useAccessControl();
  const { data: operatorUsers } = useQuery(
    {
      queryKey: ['operators'],
      // TODO: Change to 'operators' when the feature is ready
      queryFn: async () => {
        const allUsers = await userPresenter.getAllUsers();
        return allUsers.filter((user) => canUserBeOperator(user));
      },
      initialData: () => {
        // ⬇️ look up the list cache for the item
        const allUsers = queryClient.getQueryData(['users']) as User[] | undefined;
        return allUsers?.filter((user) => user.roles.includes(RoleEnum.SALE));
      },
    },
  );
  const { assigneeId: operator } = departureTour;
  const operatorUser = operatorUsers?.find((user) => user.username === (newOperator ?? operator));

  const assigneeOptions = useMemo(() => operatorUsers?.map((sale) => ({
    label: generateUserDisplayName(sale),
    value: sale.username,
  })), [operatorUsers]);
  const defaultSelectValue = useMemo(
    () => assigneeOptions?.find((option) => option.value === operator),
    [assigneeOptions, operator],
  );

  const { mutate, isLoading: isAssigningOperator } = useMutation({
    mutationFn: async () => {
      if (newOperator) {
        return tourPresenter.assignTourOperator(departureTour.code, newOperator);
      }
      return departureTour;
    },
    onMutate: () => setIsEditing(false),
    onSuccess: () => {
      // Show success toast
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('TOURS_OPERATION.ASSIGN_OPERATOR_SUCCESSFULLY'),
      });
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        title: i18n.t('COMMON.ERROR'),
        message: error.message,
      });
    },
  });

  return (
    <div>
      <div className="d-flex align-items-center">
        {/* View only part, showing operator name */}
        {
          !isEditing && (
            <>
              {
                operatorUser && (
                  <>
                    <Badge className="text-capitalize" color="light-primary">
                      <UserIcon size={14} />
                      {' '}
                      {generateUserDisplayName(operatorUser)}
                    </Badge>
                  </>
                )
              }
              {
                !operatorUser && (
                  <>
                    <Badge className="text-capitalize" color="light-secondary">
                      <UserX size={14} />
                      {' '}
                      {i18n.t('TOURS_OPERATION.OPERATOR_NOT_ASSIGNED')}
                    </Badge>
                  </>
                )
              }
            </>
          )
        }
        {/* Editing part, operator administrator can assign tour to an operator */}
        {/* Add block check can(PERMISSIONS.assign_tour_operator) later */}
        {
          can(PERMISSIONS.assign_tour_operator) && (
            <>
              {
                isEditing && (
                  // TODO: Select dropdown is clipped when rendering inside the table,
                  // need to fix this issue later
                  <div style={{ marginRight: 4 }}>
                    <Select
                      styles={customStyles}
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={defaultSelectValue}
                      name="operator-chooser"
                      options={assigneeOptions}
                      onChange={(newValue, _) => setNewOperator(newValue?.value)}
                      menuPortalTarget={document.body}
                    />
                  </div>
                )
              }
              {
                isEditing ? (
                  <>
                    <X
                      style={{ marginRight: 4 }}
                      className="cursor-pointer text-danger"
                      size={20}
                      onClick={() => setIsEditing(!isEditing)}
                    />
                    <Check className="cursor-pointer text-success" size={20} onClick={() => mutate()} />
                  </>
                ) : (
                  <Edit2
                    style={{ marginLeft: 4 }}
                    className="cursor-pointer"
                    size={16}
                    onClick={() => setIsEditing(!isEditing)}
                  />
                )
              }
              {
                isAssigningOperator && <Spinner style={{ marginLeft: 4 }} size="sm" color="primary" />
              }
            </>
          )
        }
      </div>
    </div>
  );
}
