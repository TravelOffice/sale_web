import React, { useCallback, useEffect } from 'react';
import {
  Button, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemInput from '@components/Form/FormItemInput';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { useForm } from 'react-hook-form';
import {
  DailyKey,
  DailyTourPlanItem,
  TourPlan,
  tourPlanActivityTypes,
  UpdateTourPlanActivityFormData,
} from '@domain/entities/tour/TourPlan';
import { correctDateTimeOfTourPlan, generateI18nForTourOperation } from '@utils/TousOperationUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import moment from 'moment/moment';
import { DepartureTour } from '@domain/entities/tour';
import toasty from '@components/Toasty/Toasty';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface EditTourPlanActivityModalProps extends ModalProps {
  tourPlan: TourPlan,
  tourId: string,
  tour: DepartureTour,
  day?: DailyKey,
  selectedActivity?: DailyTourPlanItem,
  toggle: () => void,
  onDeleteClicked: () => void,
}

const activityOptions = tourPlanActivityTypes.map((activityType) => ({
  label: generateI18nForTourOperation(activityType),
  value: activityType,
}));

const schema = yup.object().shape({
  activityType: yup.string().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.ACTIVITY') }))
    .oneOf(tourPlanActivityTypes, i18n.t('MESSAGE.FIELD_ONE_OF', {
      field: i18n.t('TOURS_OPERATION.ACTIVITY'),
      options: tourPlanActivityTypes.map((type) => generateI18nForTourOperation(type)),
    })),
  startTime: yup.number().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.START_TIME') })),
  endTime: yup.number().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.END_TIME') })),
  description: yup.string().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.DESCRIPTION') })),
});

export default function EditTourPlanActivityModal(props: EditTourPlanActivityModalProps) {
  const {
    tour, tourId, tourPlan,
    day, selectedActivity,
    toggle, onDeleteClicked,
    ...modalProps
  } = props;

  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateTourPlanActivityFormData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    reset({
      ...selectedActivity,
      day,
    });
  }, [selectedActivity]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: UpdateTourPlanActivityFormData) => {
      const { startTime, endTime } = formData;
      const dayIndex = parseInt(day!.split('_')[1], 10) - 1;
      const date = moment(tour.startDate).add(dayIndex, 'd');
      const { startDate, endDate } = correctDateTimeOfTourPlan(date, startTime, endTime);
      return tourPresenter.updateTourPlanActivity(tourId, tourPlan || {}, {
        ...formData,
        startTime: startDate,
        endTime: endDate,
      });
    },
    onSuccess: (newTourPlan) => {
      toggle();
      queryClient.setQueryData(['tour-plan', tourId], {
        ...tourPlan,
        ...newTourPlan,
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

  const onSubmit = useCallback((formData: UpdateTourPlanActivityFormData) => {
    mutate(formData);
  }, [tour]);

  return (
    <Modal {...modalProps}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>{i18n.t('TOURS_OPERATION.EDIT_ACTIVITY')}</ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Label>
              {i18n.t('TOURS_OPERATION.ACTIVITY')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <FormItemSelect options={activityOptions} control={control} name="activityType" errors={errors} />
          </div>
          <Row>
            <div className="col-md-6 mb-1">
              <Label>
                {i18n.t('TOURS_OPERATION.START_TIME')}
                {' '}
                <span className="text-danger">*</span>
              </Label>
              <FormItemDatePicker
                control={control}
                name="startTime"
                errors={errors}
                outputType="number"
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'H:i',
                  time_24hr: true,
                }}
              />
            </div>
            <div className="col-md-6 mb-1">
              <Label>
                {i18n.t('TOURS_OPERATION.END_TIME')}
                {' '}
                <span className="text-danger">*</span>
              </Label>
              <FormItemDatePicker
                control={control}
                name="endTime"
                errors={errors}
                outputType="number"
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'H:i',
                  time_24hr: true,
                }}
              />
            </div>
          </Row>
          <div className="mb-1">
            <Label>
              {i18n.t('TOURS_OPERATION.DESCRIPTION')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <FormItemInput control={control} name="description" errors={errors} inputType="textarea" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={onDeleteClicked}>
            {i18n.t('COMMON.DELETE')}
          </Button>
          <Button
            color="secondary"
            outline
            disabled={isLoading}
            onClick={toggle}
          >
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <LoadingButton
            color="primary"
            loading={isLoading}
            disabled={isLoading}
            type="submit"
          >
            {i18n.t('COMMON.SAVE_CHANGES')}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
