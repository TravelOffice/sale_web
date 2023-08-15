import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner,
} from 'reactstrap';
import React from 'react';
import i18n from '@config/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import { useParams } from 'react-router-dom';
import { Estimation } from '@domain/entities/tour/Estimation';
import { DailyKey, TourPlan, UpdateTourPlanActivityFormData } from '@domain/entities/tour/TourPlan';

interface EstimationConfirmDeleteModalProps {
  openConfirmDeleteEstimationModal: boolean,
  toggleConfirmDeleteEstimationModal: () => void,
  selectedEstimation: Estimation,
  tourPlanDay?: string,
  currentTourPlan?: TourPlan,
  activityId?: string,
}

export interface EstimationConfirmDeleteModalParams {
  tourId: string
}

const EstimationConfirmDeleteModal = (props: EstimationConfirmDeleteModalProps) => {
  const { tourId } = useParams<EstimationConfirmDeleteModalParams>();
  const queryClient = useQueryClient();

  const {
    openConfirmDeleteEstimationModal,
    toggleConfirmDeleteEstimationModal,
    selectedEstimation,
    tourPlanDay,
    currentTourPlan,
    activityId,
  } = props;

  const { mutate: deleteEstimationMutate, isLoading } = useMutation({
    mutationKey: ['deleteEstimation'],
    mutationFn: async () => tourPresenter.deleteEstimation(tourId, selectedEstimation.code),
    onSuccess: () => {
      // If delete estimation from tour plan page then remove estimationId in activity
      if (tourPlanDay && currentTourPlan && activityId) {
        const activity = currentTourPlan[tourPlanDay as DailyKey].find(
          (item) => item.id === activityId,
        );
        // Deep copy activity of currentTourPlan
        const updatedActivity = JSON.parse(JSON.stringify(
          activity,
        ));
        const indexToRemove = updatedActivity.estimationId.indexOf(selectedEstimation.code);

        if (indexToRemove !== -1) {
          updatedActivity.estimationId.splice(indexToRemove, 1);
        }
        updatedActivity.day = tourPlanDay;
        tourPresenter.updateTourPlanActivity(
          tourId,
          currentTourPlan,
          updatedActivity as UpdateTourPlanActivityFormData,
        );
      }
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('TOURS_OPERATION.ESTIMATION.DELETE_ESTIMATION_SUCCESSFULLY'),
      });
      queryClient.setQueryData(['estimations', tourId],
        (allEstimations: Estimation[] | undefined) => allEstimations?.filter(
          (estimation) => estimation.code !== selectedEstimation.code,
        ));
      toggleConfirmDeleteEstimationModal();
    },
    onError: (error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
  });

  return (
    <div className="demo-inline-spacing">
      <div>
        <Modal
          isOpen={openConfirmDeleteEstimationModal}
          toggle={toggleConfirmDeleteEstimationModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={toggleConfirmDeleteEstimationModal} modalClassName="modal-danger">
            {i18n.t('TOURS_OPERATION.ESTIMATION.DELETE_ESTIMATION')}
          </ModalHeader>
          <ModalBody>
            {i18n.t('TOURS_OPERATION.ESTIMATION.CONFIRM_DELETE_ESTIMATION')}
          </ModalBody>
          <ModalFooter>
            <div className="d-flex justify-content-end">
              <Button color="secondary" className="me-1" outline onClick={toggleConfirmDeleteEstimationModal}>
                {i18n.t('COMMON.CANCEL')}
              </Button>
              <Button
                type="submit"
                className="me-1"
                color="danger"
                onClick={() => deleteEstimationMutate()}
              >
                {!isLoading ? i18n.t('COMMON.SUBMIT') : i18n.t('COMMON.LOADING')}
                {isLoading ? (
                  <Spinner
                    style={{ width: '0.7rem', height: '0.7rem' }}
                    type="grow"
                    color="light"
                  />
                ) : null}
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default EstimationConfirmDeleteModal;
