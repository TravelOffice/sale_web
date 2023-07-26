import React, { useCallback, useMemo } from 'react';
import {
  Button, Form,
  Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps, Row,
} from 'reactstrap';
import FormItemSelect from '@components/Form/FormItemSelect';
import { useForm } from 'react-hook-form';
import FormItemInput from '@components/Form/FormItemInput';
import {
  CreateTourPlanActivityFormData,
  TourPlan,
  tourPlanActivityTypes,
} from '@domain/entities/tour/TourPlan';
import { correctDateTimeOfTourPlan, generateDayOptions, generateI18nForTourOperation } from '@utils/TousOperationUtils';
import i18n from '@config/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import moment from 'moment';
import { useEstimationOptions } from '@hooks/tourDeparture';
import toasty from '@components/Toasty/Toasty';
import { DepartureTour } from '@domain/entities/tour';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface CreateTourPlanActivityModalProps extends ModalProps {
  tourId: string,
  tour: DepartureTour,
  tourPlan: TourPlan,
  toggle: () => void,
}

const activityOptions = tourPlanActivityTypes.map((activityType) => ({
  label: generateI18nForTourOperation(activityType),
  value: activityType,
}));

const defaultValues: Partial<CreateTourPlanActivityFormData> = {
  startTime: moment().startOf('D').toDate().getTime(),
  endTime: moment().startOf('D').toDate().getTime(),
};

const schema = yup.object().shape({
  day: yup.string().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.DAY') })),
  activityType: yup.string().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.ACTIVITY') }))
    .oneOf(tourPlanActivityTypes, i18n.t('MESSAGE.FIELD_ONE_OF', { field: i18n.t('TOURS_OPERATION.ACTIVITY'), options: tourPlanActivityTypes.map((type) => generateI18nForTourOperation(type)) })),
  startTime: yup.number().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.START_TIME') })),
  endTime: yup.number().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.END_TIME') })),
  description: yup.string().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.DESCRIPTION') })),
  estimationId: yup.number().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('TOURS_OPERATION.TOUR_ESTIMATION') })),
});

export default function CreateTourPlanActivityModal(props: CreateTourPlanActivityModalProps) {
  const {
    tourId, tourPlan, tour, toggle, ...modalProps
  } = props;

  const queryClient = useQueryClient();
  const estimationOptions = useEstimationOptions(tourId);
  const dayOptions = useMemo(() => generateDayOptions(tour), [tour]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTourPlanActivityFormData>({ defaultValues, resolver: yupResolver(schema) });

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: CreateTourPlanActivityFormData) => {
      const { day, startTime, endTime } = formData;
      const dayIndex = parseInt(day.split('_')[1], 10) - 1;
      const date = moment(tour.startDate).add(dayIndex, 'd');
      const { startDate, endDate } = correctDateTimeOfTourPlan(date, startTime, endTime);
      return tourPresenter.addTourPlanActivity(tourId, tourPlan, {
        ...formData,
        startTime: startDate,
        endTime: endDate,
      });
    },
    onSuccess: (newTourPlan) => {
      toggle();
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

  const onSubmit = useCallback((formData: CreateTourPlanActivityFormData) => {
    mutate(formData);
  }, []);

  return (
    <Modal {...modalProps} toggle={toggle} onClosed={() => reset(defaultValues)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>{i18n.t('TOURS_OPERATION.ADD_ACTIVITY')}</ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Label>
              {i18n.t('TOURS_OPERATION.DAY')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <FormItemSelect options={dayOptions} control={control} name="day" errors={errors} />
          </div>
          <div className="mb-1">
            <Label>
              {i18n.t('TOURS_OPERATION.ACTIVITY')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <FormItemSelect options={activityOptions} control={control} name="activityType" errors={errors} />
          </div>
          <div className="mb-1">
            <Label>
              {i18n.t('TOURS_OPERATION.TOUR_ESTIMATION')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <FormItemSelect options={estimationOptions} control={control} name="estimationId" errors={errors} />
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
            {i18n.t('COMMON.CREATE')}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
