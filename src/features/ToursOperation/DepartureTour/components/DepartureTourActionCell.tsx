import React, { useState } from 'react';
import { tourPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { ExtendedDepartureTour } from '@domain/entities/tour';
import { useAccessControl, useCurrentUser } from '@hooks/auth';
import { useMutation } from '@tanstack/react-query';
import { generateEditableUrlForTour, generateOperationUrlForTour } from '@utils/TousOperationUtils';
import { ChevronDown, ChevronRight, Eye } from 'react-feather';
import { useHistory } from 'react-router-dom';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner,
} from 'reactstrap';
import PERMISSIONS from '@utils/PermissionUtils';

export interface DepartureTourActionCellProps {
  departureTour: ExtendedDepartureTour
}
export default function DepartureTourActionCell(props: DepartureTourActionCellProps) {
  const { departureTour } = props;
  const [confirmModal, setConfirmModal] = useState(false);
  // Hooks
  const { can } = useAccessControl();
  const currentUser = useCurrentUser();
  const history = useHistory();
  // User should not be empty
  if (!currentUser) return null;
  const { username } = currentUser;
  const { assigneeId: operator } = departureTour;
  // Actions
  const toggleConfirmModal = () => setConfirmModal(!confirmModal);
  const { mutate: takeCareTourMutate, isLoading } = useMutation({
    mutationFn: async () => tourPresenter.takeCareTour(departureTour.code),
    onSuccess: () => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('TOUR_TEMPLATE.CREATE_TOUR_TEMPLATE_SUCCESSFULLY'),
      });
    },
    onError: (error: Error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: error.message,
      });
    },
    onSettled: toggleConfirmModal,
  });
  const canOperate = operator && operator === username;
  const canAssignOperator = !operator && can(PERMISSIONS.self_assign_tour_operator);
  return (
    <div>
      {
        // Only departure tour belong to current user can be operated
        canOperate && (
          <Button
            outline
            size="sm"
            color="warning"
            onClick={() => {
              // Go to operation page
              history.push(generateOperationUrlForTour(departureTour));
            }}
          >
            <ChevronRight size={14} />
            <span className="ms-25">{i18n.t('TOURS_OPERATION.OPERATE')}</span>
          </Button>
        )
      }
      {
        // Only departure tour without operator can be taken care
        canAssignOperator && (
          <Button
            outline
            size="sm"
            color="secondary"
            onClick={() => {
              setConfirmModal(!confirmModal);
            }}
          >
            <ChevronDown size={14} />
            <span className="ms-25">{i18n.t('TOURS_OPERATION.SELF_RECEIVE_OPERATE')}</span>
          </Button>
        )
      }
      {
        !canOperate && !canAssignOperator && (
          <Button
            outline
            size="sm"
            color="secondary"
            onClick={() => {
              // Go to operation page
              history.push(generateEditableUrlForTour(departureTour));
            }}
          >
            <Eye size={14} />
            <span className="ms-25">{i18n.t('TOURS_OPERATION.VIEW_ONLY')}</span>
          </Button>
        )
      }
      <Modal
        isOpen={confirmModal}
        toggle={toggleConfirmModal}
        className="modal-dialog-centered"
        modalClassName="modal-primary"
        key="confirm-receive-modal"
      >
        <ModalHeader toggle={toggleConfirmModal}>{i18n.t('TOURS_OPERATION.CONFIRM_SELF_RECEIVE_TOUR')}</ModalHeader>
        <ModalBody>
          {i18n.t('TOURS_OPERATION.CONFIRM_SELF_RECEIVE_TOUR_DESCRIPTION')}
        </ModalBody>
        <ModalFooter>
          <Button outline color="danger" onClick={toggleConfirmModal}>
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <Button disabled={isLoading} color="primary" onClick={() => takeCareTourMutate()}>
            {isLoading ? (<Spinner size="sm" type="grow" color="light" />) : null}
            {!isLoading ? i18n.t('COMMON.CONFIRM') : i18n.t('COMMON.LOADING')}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
