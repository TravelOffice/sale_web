import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, Label, Row, Spinner,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import i18n from '@config/i18n';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useMutation, useQueries, useQuery, useQueryClient,
} from '@tanstack/react-query';
import {
  bookingPresenter,
  sourcePresenter,
  tourPresenter,
  tourTemplatePresenter,
  userPresenter,
} from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import { RoleEnum } from '@domain/entities/User';
import { BookingTourType, BookingTourTypeEnum } from '@domain/entities/booking/Booking';
import { generateI18nForBooking, isEditableBooking, updateBookingSchema } from '@utils/BookingUtils';
import BookingService from '@features/Booking/components/tabs/information/BookingService';
import moment from 'moment/moment';
import { generateUserDisplayName } from '@utils/UserUtils';
import PERMISSIONS from '@utils/PermissionUtils';
import { useAccessControl } from '@hooks/auth';

export interface EditBookingTabParams {
  bookingId: string,
}

const tourTypeOptions = Object
  .keys(BookingTourTypeEnum)
  .map((tourType) => (
    { label: generateI18nForBooking(tourType), value: tourType as BookingTourType }
  ));

export default function BookingDetailTab() {
  const { can } = useAccessControl();
  const queryClient = useQueryClient();
  const { bookingId } = useParams<EditBookingTabParams>();
  const {
    data: booking,
    isLoading,
  } = useQuery(['bookings', bookingId], async () => bookingPresenter.getBooking(bookingId));

  /**
   * Fetch related data for booking, such as tour templates, sales, etc
   * @returns {Object} { isLoading: boolean, relatedData: Array }
   */
  const relatedData = useQueries({
    queries: [
      {
        queryKey: ['departure-tours'],
        queryFn: tourPresenter.getAllDepartureTours,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['tour-templates'],
        queryFn: tourTemplatePresenter.getAllTourTemplates,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['sales'],
        queryFn: async () => {
          const allUsers = await userPresenter.getAllUsers();
          return allUsers.filter((user) => user.roles.includes(RoleEnum.SALE));
        },
        refetchOnWindowFocus: false,
      },
      { queryKey: ['sources'], queryFn: sourcePresenter.getAll, refetchOnWindowFocus: false },
    ],
  });

  // Extracting data from related data
  // Also, map data to options for each related select components
  const [
    departureToursData,
    tourTemplateData,
    salesData,
    sourcesData,
  ] = relatedData;
  const departureTourOptions = useMemo(
    () => departureToursData.data?.map((tour) => ({
      label: `${tour.name} (${tour.code})`,
      value: tour.code,
    })),
    [tourTemplateData],
  );
  const tourTemplateOptions = useMemo(
    () => tourTemplateData.data?.map((tourTemplate) => ({
      label: tourTemplate.name,
      value: tourTemplate.code,
    })),
    [tourTemplateData],
  );

  const assigneeOptions = useMemo(() => salesData.data?.map((sale) => ({
    label: generateUserDisplayName(sale),
    value: sale.username,
  })), [salesData]);

  const sourceOptions = useMemo(() => sourcesData.data?.map((source) => ({
    label: source.name,
    value: source.code,
  })), [sourcesData]);

  const isFetchingRelatedData = relatedData.some((query) => query.isLoading);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateBookingFormData>({ resolver: yupResolver(updateBookingSchema) });

  useEffect(() => {
    if (booking) {
      reset(booking);
    }
  }, [booking]);

  const updateBookingMutation = useMutation({
    mutationKey: ['updateBooking'],
    mutationFn: async (
      formData: UpdateBookingFormData,
    ) => bookingPresenter.updateBooking(bookingId, formData),
    onSuccess: (updatedBooking) => {
      queryClient.setQueryData(['bookings', bookingId], {
        ...updatedBooking,
        customer: booking?.customer,
        tourTemplate: tourTemplateData?.data?.find((
          item,
        ) => item.code === updatedBooking.tourTemplateId),
      });
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('BOOKING.EDIT_BOOKING_SUCCESSFULLY', { bookingCode: booking?.code }),
      });
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
    },
  });

  const isProcessing = useMemo(
    () => isLoading || isFetchingRelatedData,
    [isLoading, isFetchingRelatedData],
  );

  const handleOnSubmit = useCallback((formData: UpdateBookingFormData) => {
    updateBookingMutation.mutate(formData);
  }, []);

  const handleCancel = () => {
    reset(booking);
  };

  const isEditable = useMemo(
    () => isEditableBooking(booking?.bookingStatus!),
    [booking],
  );
  return (
    <div className="to-table-container">
      <Row>
        <Col sm={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">{i18n.t('BOOKING.EDIT_BOOKING')}</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(handleOnSubmit)}>
                <div>
                  <div className="divider divider-start divider-primary">
                    <div className="divider-text text-primary fw-bolder">{i18n.t('BOOKING.BOOKING_INFORMATION')}</div>
                  </div>
                  <Row>
                    {
                      booking?.departureTourId ? (
                        <Col lg={4}>
                          <div className="mb-1">
                            <Label className="form-label" for="tourTemplateId">
                              {i18n.t('DEPARTURE_TOUR.DEPARTURE_TOUR')}
                              {' '}
                              <span className="text-danger">{' *'}</span>
                            </Label>
                            <FormItemSelect
                              control={control}
                              name="departureTourId"
                              errors={errors}
                              selectClassName="flex-fill"
                              options={departureTourOptions || []}
                              disabled={!isEditable}
                            />
                          </div>
                        </Col>
                      ) : (
                        <Col lg={4}>
                          <div className="mb-1">
                            <Label className="form-label" for="tourTemplateId">
                              {i18n.t('BOOKING.TOUR_TEMPLATE')}
                              {' '}
                              <span className="text-danger">{' *'}</span>
                            </Label>
                            <FormItemSelect
                              control={control}
                              name="tourTemplateId"
                              errors={errors}
                              selectClassName="flex-fill"
                              options={tourTemplateOptions || []}
                              disabled={!isEditable}
                            />
                          </div>
                        </Col>
                      )
                    }

                    <Col lg={4}>
                      <div className="mb-1">
                        <Label className="form-label" for="tourType">
                          {i18n.t('BOOKING.FORM.TOUR_TYPE')}
                          {' '}
                          <span className="text-danger">{' *'}</span>
                        </Label>
                        <FormItemSelect
                          control={control}
                          name="tourType"
                          errors={errors}
                          selectClassName="flex-fill"
                          options={tourTypeOptions}
                          disabled={!isEditable}
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-1">
                        <Label className="form-label" for="departureDate">
                          {i18n.t('BOOKING.FORM.DEPARTURE_DATE')}
                          {' '}
                          <span className="text-danger">{' *'}</span>
                        </Label>
                        <FormItemDatePicker
                          name="departureDate"
                          control={control}
                          errors={errors}
                          placeholder={i18n.t('BOOKING.DEPARTURE_DATE_PLACEHOLDER')}
                          options={{
                            formatDate: (date) => moment(date).format('DD/MM/YYYY'),
                          }}
                          disabled={!isEditable}
                        />
                        {errors.departureDate
                          && <FormFeedback>{errors.departureDate?.message}</FormFeedback>}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <div className="mb-1">
                        <Label className="form-label" for="sourceId">
                          {i18n.t('BOOKING.FORM.SOURCE')}
                          {' '}
                          <span className="text-danger">{' *'}</span>
                        </Label>
                        {/* TODO: Show source list as Select since source_service is implemented */}
                        <FormItemSelect
                          control={control}
                          name="sourceId"
                          errors={errors}
                          selectClassName="flex-fill"
                          options={sourceOptions || []}
                          disabled={!isEditable}
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-1">
                        <Label className="form-label" for="assigneeId">
                          {i18n.t('BOOKING.ASSIGNEE')}
                          {' '}
                          <span className="text-danger">{' *'}</span>
                        </Label>
                        <FormItemSelect
                          control={control}
                          name="assigneeId"
                          errors={errors}
                          selectClassName="flex-fill"
                          options={assigneeOptions || []}
                          disabled={!isEditable}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="divider divider-start divider-primary">
                  <div className="divider-text text-primary fw-bolder">{i18n.t('BOOKING.SERVICE_LIST')}</div>
                </div>
                <Row>
                  <Col md={2}>
                    <h5 className="text-center">{i18n.t('TOUR_TEMPLATE.SERVICE_NAME')}</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="text-center">{i18n.t('TOUR_TEMPLATE.PRICE')}</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="text-center">{i18n.t('BOOKING.QUANTITY')}</h5>
                  </Col>
                  <Col md={1}>
                    <h5 className="text-center">{i18n.t('BOOKING.TAX')}</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="text-center">{i18n.t('BOOKING.BEFORE_TAX')}</h5>
                  </Col>
                  <Col md={2}>
                    <h5 className="text-center">{i18n.t('BOOKING.AFTER_TAX')}</h5>
                  </Col>
                </Row>

                <BookingService
                  control={control}
                  errors={errors}
                  isEditable={isEditable}
                />
                {
                  can(PERMISSIONS.update_booking)
                  && isEditable ? (
                    <div className="d-flex justify-content-end">
                      <Button type="reset" color="danger" className="me-1" outline onClick={handleCancel}>
                        {i18n.t('COMMON.CANCEL')}
                      </Button>
                      <Button type="submit" className="me-1" color="primary">
                        {!isProcessing ? i18n.t('BOOKING.EDIT_BOOKING') : i18n.t('COMMON.LOADING')}
                        {isProcessing ? (
                          <Spinner
                            style={{ width: '0.7rem', height: '0.7rem' }}
                            type="grow"
                            color="light"
                          />
                        ) : null}
                      </Button>
                    </div>
                    ) : <></>
                }
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
