// ** React Imports
import React, { useMemo } from 'react';
// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
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
  bookingPresenter, sourcePresenter, tourTemplatePresenter, userPresenter,
} from '@adapter/presenters';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import toasty from '@components/Toasty/Toasty';
import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';
import { HonorificType } from '@domain/entities/customer/Customer';
import { BookingTourType, BookingTourTypeEnum, tourTypes } from '@domain/entities/booking/Booking';
import { Link, useHistory } from 'react-router-dom';
import FormItemSelect from '@components/Form/FormItemSelect';
import { generateI18nForLead } from '@utils/LeadUtils';
import { RoleEnum, User } from '@domain/entities/User';
import moment from 'moment';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import { TourTemplate } from '@domain/entities/tour';
import { Service } from '@domain/entities/booking/Service';
import AddingBookingService from './components/AddingBookingService';

const honorificOptions = Object
  .keys(HonorificType)
  .map((honorific) => (
    { label: generateI18nForLead(honorific), value: honorific as HonorificType }
  ));

const tourTypeOptions = Object
  .keys(BookingTourTypeEnum)
  .map((tourType) => (
    { label: i18n.t(`BOOKING.${tourType}`), value: tourType as BookingTourType }
  ));

const customerSchema = yup.object().shape({
  email: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.EMAIL') })),
  primaryPhoneNumber: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.PHONE') })),
  honorific: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.HONORIFIC') })),
  name: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.FULL_NAME') })),
  address: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.ADDRESS') })),
});

const schema = yup.object().shape({
  customer: customerSchema,
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
  sourceId: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.SOURCE') })),
});

const initialFormData: AddBookingFormData = {
  // Customer information, new customer will be created in database if not existed
  customer: {
    email: '',
    primaryPhoneNumber: '',
    honorific: HonorificType.MR_YOUNG,
    name: '',
    address: '',
  },
  // Reference to TourTemplate model, each TourTemplate is identified by pk+sk pair
  tourTemplateId: '',
  // One kind of ['shared', 'group', 'solo']
  tourType: BookingTourTypeEnum.SOLO,
  // Expected begin date of trip
  departureDate: moment().valueOf(),
  // Reference to Sale model, each Sale is identified by pk+sk pair
  assigneeId: '',
  // Reference to Source model
  // For example, source can be Facebook, CallCenter, Social, etc
  sourceId: '',
  // Reference to Service model
  services: [],
};

const BookingCreatePage = () => {
  const history = useHistory();
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
        // Data from `users` query can be got from User list page before
        // So, we can get data from query cache to avoid fetching data from server again
        initialData: () => {
          const allUsers = queryClient.getQueryData(['users']) as User[] | undefined;
          return allUsers?.filter((user) => user.roles.includes(RoleEnum.SALE));
        },
      },
      { queryKey: ['sources'], queryFn: sourcePresenter.getAll },
    ],
  });

  // Extracting data from related data
  // Also, map data to options for each related select components
  const [
    tourTemplateData,
    salesData,
    sourcesData,
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

  const sourceOptions = useMemo(() => sourcesData.data?.map((source) => ({
    label: source.name,
    value: source.code,
  })), [sourcesData]);

  // Fetching related data flag
  // Submit button will be disabled if fetching related data
  const isFetchingRelatedData = relatedData.some((query) => query.isLoading);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<AddBookingFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialFormData,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: bookingPresenter.createBooking,
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
  const onSubmit = (data: AddBookingFormData) => mutate(data);

  //* Cancel button click handler
  const handleCancel = () => {
    history.goBack();
  };

  const handleTourTemplateChange = (tourTemplateId: string) => {
    const selectedTourTemplate = tourTemplateData.data?.find(
      (tourTemplate) => tourTemplate.code === tourTemplateId,
    ) as TourTemplate;

    // Init booking services from services of tour template
    const services = selectedTourTemplate.services.map((service) => ({
      serviceName: service.name,
      quantity: 1,
      price: service.price,
      tax: 0,
    }) as Service);

    // Add services to booking
    reset({
      ...getValues(),
      services,
    });
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
          <span>{i18n.t('BOOKING.CREATE')}</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('BOOKING.CREATE_BOOKING')}</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
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
                    <Controller
                      name="customer.email"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="customer.email" invalid={!!errors.customer?.email} />
                      )}
                    />
                    {errors.customer?.email
                      && <FormFeedback>{errors.customer?.email.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="mb-1">
                    <Label className="form-label" for="customer.primaryPhoneNumber">
                      {i18n.t('BOOKING.FORM.PHONE')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <Controller
                      name="customer.primaryPhoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="customer.primaryPhoneNumber" invalid={!!errors.customer?.primaryPhoneNumber} />
                      )}
                    />
                    {errors.customer?.primaryPhoneNumber
                      && <FormFeedback>{errors.customer?.primaryPhoneNumber.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <div className="mb-1">
                    <Label className="form-label" for="customer.honorific">
                      {i18n.t('BOOKING.FORM.HONORIFIC')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemSelect
                      control={control}
                      name="customer.honorific"
                      errors={errors}
                      selectClassName="flex-fill"
                      options={honorificOptions}
                    />
                    {errors.customer?.honorific
                      && <FormFeedback>{errors.customer?.honorific.message}</FormFeedback>}
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="mb-1">
                    <Label className="form-label" for="customer.name">
                      {i18n.t('BOOKING.FORM.FULL_NAME')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <Controller
                      name="customer.name"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="customer.name" invalid={!!errors.customer?.name} />
                      )}
                    />
                    {errors.customer?.name
                      && <FormFeedback>{errors.customer?.name.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="mb-1">
                    <Label className="form-label" for="customer.address">
                      {i18n.t('BOOKING.FORM.ADDRESS')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <Controller
                      name="customer.address"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="customer.address" invalid={!!errors.customer?.address} />
                      )}
                    />
                    {errors.customer?.address
                      && <FormFeedback>{errors.customer?.address.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
              {/* Booking information section */}
              <div className="divider divider-start divider-primary">
                <div className="divider-text text-primary fw-bolder">{i18n.t('BOOKING.BOOKING_INFORMATION')}</div>
              </div>
              <Row>
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
                      onSelected={(tourTemplateId) => handleTourTemplateChange(tourTemplateId)}
                    />
                  </div>
                </Col>
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
                    />
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
                    />
                    {errors.departureDate
                      && <FormFeedback>{errors.departureDate?.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
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
              <Row>
                <Col>
                  <AddingBookingService
                    control={control}
                    errors={errors}
                    isEditable
                  />
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

export default BookingCreatePage;
