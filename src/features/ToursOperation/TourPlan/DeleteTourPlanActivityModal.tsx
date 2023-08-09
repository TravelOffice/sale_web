import React from 'react';
import {
  Button,
  Modal, ModalBody, ModalFooter, ModalHeader, ModalProps,
} from 'reactstrap';
import i18n from '@config/i18n';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { DailyKey, TourPlan } from '@domain/entities/tour/TourPlan';
import toasty from '@components/Toasty/Toasty';

export interface DeleteTourPlanActivityModalProps extends ModalProps {
  toggle: () => void,
  tourId: string,
  tourPlan: TourPlan,
  day?: DailyKey,
  activityId: string,
  onActivityDeleted: () => void,
}

export default function DeleteTourPlanActivityModal(props: DeleteTourPlanActivityModalProps) {
  const {
    toggle, tourId, tourPlan,
    day, activityId,
    onActivityDeleted,
    ...modalProps
  } = props;
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => tourPresenter.deleteTourPlanActivity(tourId, tourPlan, day!, activityId),
    onSuccess: (newTourPlan) => {
      onActivityDeleted();
      queryClient.setQueryData(['tour-plan', tourId], newTourPlan);
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
    <Modal {...modalProps} modalClassName="modal-danger">
      <ModalHeader toggle={toggle}>{i18n.t('TOURS_OPERATION.EDIT_ACTIVITY')}</ModalHeader>
      <ModalBody>
        {i18n.t('TOURS_OPERATION.DELETE_ACTIVITY_CONFIRM_MESSAGE')}
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          outline
          disabled={isLoading}
          onClick={toggle}
        >
          {i18n.t('COMMON.CANCEL')}
        </Button>
        <LoadingButton
          color="danger"
          loading={isLoading}
          disabled={isLoading}
          onClick={() => mutate()}
        >
          {i18n.t('COMMON.DELETE')}
        </LoadingButton>
      </ModalFooter>
    </Modal>
  );
}
