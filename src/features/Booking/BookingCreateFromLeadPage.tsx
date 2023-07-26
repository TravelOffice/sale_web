// ** React Imports
import React, { useEffect, useMemo } from 'react';
// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import i18n from '@config/i18n';
// ** Reactstrap Imports
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/input-number/input-number.scss';
import '@styles/react/libs/editor/editor.scss';
import {
  bookingPresenter, leadPresenter, tourTemplatePresenter, userPresenter,
} from '@adapter/presenters';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import toasty from '@components/Toasty/Toasty';
import { BookingTourType, BookingTourTypeEnum, tourTypes } from '@domain/entities/booking/Booking';
import { Link, useHistory } from 'react-router-dom';
import FormItemSelect from '@components/Form/FormItemSelect';
import { generateI18nForBooking } from '@utils/BookingUtils';
import { RoleEnum, User } from '@domain/entities/User';
import moment from 'moment';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';
import useQueryParams from '@hooks/useQueryParams';

const tourTypeOptions = Object
  .keys(BookingTourTypeEnum)
  .map((tourType) => (
    { label: generateI18nForBooking(tourType), value: tourType as BookingTourType }
  ));

const schema = yup.object().shape({
  departureDate: yup
    .date()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.DEPARTURE_DATE') })),
  tourType: yup
    .string()
    .oneOf(tourTypes)
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.TOUR_TYPE') })),
  tourTemplateId: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.TOUR_TEMPLATE') })),
  assigneeId: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.ASSIGNEE') })),
  leadId: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.SOURCE') })),
});

const initialFormData: AddBookingFromLeadFormData = {
  // Reference to TourTemplate model, each TourTemplate is identified by pk+sk pair
  tourTemplateId: '',
  // One kind of ['shared', 'group', 'solo']
  tourType: BookingTourTypeEnum.SOLO,
  // Expected begin date of trip
  departureDate: moment().format('DD/MM/YYYY'),
  // Reference to Sale model, each Sale is identified by pk+sk pair
  assigneeId: '',
  // Reference to Source model
  // For example, source can be Facebook, CallCenter, Social, etc
  leadId: '',
  services: [],
};

const BookingCreateFromLeadPage = () => {
  const history = useHistory();
  const searchParams = useQueryParams();
  const leadId = searchParams.get('leadId');
  const queryClient = useQueryClient();
  /**
   * Fetch related data for booking, such as tour templates, sales, etc
   * @returns {Object} { isLoading: boolean, relatedData: Array }
   */
  const relatedData = useQueries({
    queries: [
      {
        queryKey: ['tour-templates'],
        queryFn: tourTemplatePresenter.getAllTourTemplates,
      },
      {
        queryKey: ['sales'],
        queryFn: async () => {
          const allUsers = await userPresenter.getAllUsers();
          return allUsers.filter((user) => user.roles.includes(RoleEnum.SALE));
        },
        // Data from `users` query can be get from User list page before
        // So, we can get data from query cache to avoid fetching data from server again
        initialData: () => {
          const allUsers = queryClient.getQueryData(['users']) as User[] | undefined;
          return allUsers?.filter((user) => user.roles.includes(RoleEnum.SALE));
        },
      },
      {
        queryKey: ['leads'],
        queryFn: async () => leadPresenter.getAllLeads(),
      },
    ],
  });

  // Extracting data from related data
  // Also, map data to options for each related select components
  const [
    tourTemplateData,
    salesData,
    leadsData,
  ] = relatedData;
  const tourTemplateOptions = useMemo(
    () => tourTemplateData.data?.map((tourTemplate) => ({
      label: tourTemplate.name,
      value: tourTemplate.code,
    })),
    [tourTemplateData],
  );

  const assigneeOptions = useMemo(() => salesData.data?.map((sale) => ({
    label: (sale.firstName && sale.lastName) ? `${sale.firstName} ${sale.lastName}` : `${sale.username}`,
    value: sale.username,
  })), [salesData]);

  const leadOptions = useMemo(() => leadsData.data?.map((lead) => ({
    label: `${lead.name} (${lead.code})`,
    value: lead.code,
  })), [leadsData]);

  const lead = useMemo(
    () => leadsData.data?.find((l) => l.code === leadId),
    [leadsData, leadId],
  );

  // Fetching related data flag
  // Submit button will be disabled if fetching related data
  const isFetchingRelatedData = relatedData.some((query) => query.isLoading);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<AddBookingFromLeadFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialFormData,
  });

  useEffect(() => {
    if (leadId) {
      setValue('leadId', leadId || '');
    }
  }, [leadId]);

  const { isLoading, mutate } = useMutation({
    mutationFn: bookingPresenter.createBookingFromLead,
    onSuccess: () => {
      // Show success toast
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('BOOKING.CREATE_BOOKING_SUCCESSFULLY'),
      });
      // Go back to booking list page
      history.push('/apps/bookings/list');
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        title: i18n.t('COMMON.ERROR'),
        message: error.message,
      });
    },
  });

  const isProcessing = useMemo(
    () => isLoading || isFetchingRelatedData,
    [isLoading, isFetchingRelatedData],
  );

  /**
   * Handle submit form
   * New booking data filled from form will be sent to server
   * @param data Booking data
   */
  const onSubmit = (data: AddBookingFromLeadFormData) => mutate(data);

  //* Cancel button click handler
  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div className="to-table-container">
      <Breadcrumb className="ms-1 mb-1">
        <BreadcrumbItem>
          <Link to="/">{i18n.t('COMMON.HOME')}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/apps/bookings/list">{i18n.t('BOOKING.BOOKING_TITLE')}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span>{i18n.t('BOOKING.CREATE_FROM_LEAD')}</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('BOOKING.CREATE_BOOKING')}</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Row>
                <Col md={6}>
                  <div className="mb-1">
                    <Label className="form-label" for="leadId">
                      {i18n.t('BOOKING.FORM.LEAD')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemSelect
                      control={control}
                      name="leadId"
                      errors={errors}
                      selectClassName="flex-fill"
                      options={leadOptions || []}
                      disabled
                    />
                    {errors.leadId
                      && <FormFeedback>{errors.leadId?.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
              {/* Customer information section */}
              <div className="divider divider-start divider-primary">
                <div className="divider-text text-primary fw-bolder">{i18n.t('BOOKING.CUSTOMER_INFORMATION')}</div>
              </div>
              <Row>
                <Col md={12}>
                  <div className="mb-1">
                    <Label className="form-label" for="customer.email">
                      {i18n.t('BOOKING.FORM.EMAIL')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <Input value={lead?.email} disabled id="customer.email" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="mb-1">
                    <Label className="form-label" for="customer.phone">
                      {i18n.t('BOOKING.FORM.PHONE')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <Input value={lead?.phoneNumber} disabled id="customer.phone" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <div className="mb-1">
                    <Label className="form-label" for="customer.fullName">
                      {i18n.t('BOOKING.FORM.FULL_NAME')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <Input value={lead?.name} disabled id="customer.fullName" />
                  </div>
                </Col>
              </Row>
              {/* Booking information section */}
              <div className="divider divider-start divider-primary">
                <div className="divider-text text-primary fw-bolder">{i18n.t('BOOKING.BOOKING_INFORMATION')}</div>
              </div>
              <Row>
                <Col lg={6}>
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
                    />
                  </div>
                </Col>
                <Col lg={6}>
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
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
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
                    />
                  </div>
                </Col>
                <Col lg={6}>
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
                    />
                    {errors.departureDate
                      && <FormFeedback>{errors.departureDate?.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button type="reset" color="danger" className="me-1" outline onClick={handleCancel}>
                {i18n.t('COMMON.CANCEL')}
              </Button>
              <Button type="submit" className="me-1" color="primary">
                {!isProcessing ? i18n.t('BOOKING.CREATE_BOOKING') : i18n.t('COMMON.LOADING')}
                {isProcessing ? (
                  <Spinner
                    style={{ width: '0.7rem', height: '0.7rem' }}
                    type="grow"
                    color="light"
                  />
                ) : null}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookingCreateFromLeadPage;
