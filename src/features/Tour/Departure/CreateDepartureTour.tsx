// ** React Imports
import React, { useMemo, useState } from 'react';
// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import i18n from '@config/i18n';
// ** Reactstrap Imports
import {
  Button, Card, CardBody, CardHeader, CardTitle, Form, Spinner,
} from 'reactstrap';

import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { CreateDepartureTourFormData, TourServicePrice } from '@domain/entities/tour';
import TourType from '@domain/entities/tour/TourType';
import { useDispatch, useSelector } from 'react-redux';
import { tourActions } from '@redux/slices/tourSlice';
import TourStatus from '@domain/entities/tour/TourStatus';
import { RootState } from '@redux/store';
import AdditionalServiceItem from '@features/Tour/Departure/components/AdditionalServiceItem';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/input-number/input-number.scss';
import '@styles/react/libs/editor/editor.scss';
import { tourPresenter } from '@adapter/presenters';
import { useQuery } from '@tanstack/react-query';
import CommonInformation from '@features/Tour/Departure/components/CommonInformation';
import PoliciesAndRegulations from '@features/Tour/Departure/components/PoliciesAndRegulations';

// otherPrice schema
const otherPriceSchema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('DEPARTURE_TOUR.SERVICE_NAME') })),
  price: yup
    .number()
    .integer()
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('DEPARTURE_TOUR.SERVICE_PRICE'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('DEPARTURE_TOUR.SERVICE_PRICE') })),
});

const schema = yup.object().shape({
  tourTemplateCode: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('DEPARTURE_TOUR.TOUR_TEMPLATE') })),
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('DEPARTURE_TOUR.NAME') })),
  startDate: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('DEPARTURE_TOUR.START_DATE') })),
  type: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.TYPE') })),
  category: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.CATEGORY') })),
  visitorCount: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.VISITOR_COUNT') }))
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.VISITOR_COUNT'), value: 1 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.VISITOR_COUNT') })),
  startingLocation: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.STARTING_LOCATION') })),
  endingLocation: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.ENDING_LOCATION') })),
  durationInDays: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS') }))
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS'), value: 1 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS') })),
  durationInNights: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS') }))
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS') })),
  status: yup.string().required('Please select Open status'),
  adultPrice: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.ADULT_PRICE') }))
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.ADULT_PRICE'), value: 1 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.ADULT_PRICE') })),
  otherPrice: yup.array().of(otherPriceSchema).required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('DEPARTURE_TOUR.ADDITIONAL_SERVICES') })),
});

const CreateDepartureTour = () => {
  const dispatch = useDispatch();

  // Fetch tour template and location data
  const { data: toursTemplateData } = useQuery(['toursTemplate'], async () => tourPresenter.getAllToursTemplate());
  const toursTemplate = useMemo(() => toursTemplateData || [], [toursTemplateData]);
  const { data: toursLocationData } = useQuery(['toursLocation'], async () => tourPresenter.getAllToursLocation());
  const toursLocation = useMemo(() => toursLocationData || [], [toursLocationData]);
  const createLoading = useSelector((state: RootState) => state.tour.createDepartureTourLoading);

  // Editor State
  const [
    inclusionAndExclusion,
    setInclusionAndExclusion,
  ] = useState(EditorState.createEmpty());
  const [
    policyConditionsAndExtraFee,
    setPolicyConditionsAndExtraFee,
  ] = useState(EditorState.createEmpty());
  const [
    cancellationTerms,
    setCancellationTerms,
  ] = useState(EditorState.createEmpty());
  const [tourPlan, setTourPlan] = useState(EditorState.createEmpty());

  // Other state
  const [services, serServices] = useState<TourServicePrice[]>([]);

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateDepartureTourFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tourTemplateCode: undefined,
      name: '',
      startDate: new Date().getTime(),
      type: TourType.INBOUND,
      visitorCount: 0,
      startingLocation: '',
      endingLocation: '',
      durationInDays: 0,
      durationInNights: 0,
      status: TourStatus.ONSALE,
      services: [],
      policiesAndRegulations: {},
    },
  });

  const stringToEditorState = (value?: string) => {
    // Convert the HTML string to Draft.js content
    const contentBlock = htmlToDraft(value || '').contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlock);
    return EditorState.createWithContent(contentState);
  };

  const handleToursTemplateChange = (tourTemplateCode: string) => {
    // Set values for all form fields based on the selected toursTemplate data
    const tourTemplate = toursTemplate.find((tour) => tour.code === tourTemplateCode);
    const initDataByTemplate = {
      ...tourTemplate,
      tourTemplate: tourTemplate?.name || '',
    } as CreateDepartureTourFormData;
    Object.keys(initDataByTemplate).forEach((key) => {
      setValue(
        key as keyof CreateDepartureTourFormData,
        initDataByTemplate[key as keyof CreateDepartureTourFormData],
      );
    });

    // Set other value
    serServices(tourTemplate?.services || []);
    setInclusionAndExclusion(stringToEditorState(
      initDataByTemplate.policiesAndRegulations.inclusionAndExclusion,
    ));
    setCancellationTerms(stringToEditorState(
      initDataByTemplate.policiesAndRegulations.cancellationTerms,
    ));
    setPolicyConditionsAndExtraFee(stringToEditorState(
      initDataByTemplate.policiesAndRegulations.policyConditionsAndExtraFee,
    ));
    setTourPlan(stringToEditorState(
      initDataByTemplate.tourPlan,
    ));
  };

  const onSubmit = (data: CreateDepartureTourFormData) => {
    const dataToAdd = {
      ...data,
      status: data.isOpen ? TourStatus.ONSALE : TourStatus.CLOSED,
    };
    dispatch(tourActions.createDepartureTour(dataToAdd));
  };

  const handleReset = () => {
    setInclusionAndExclusion(stringToEditorState(''));
    setCancellationTerms(stringToEditorState(''));
    setPolicyConditionsAndExtraFee(stringToEditorState(''));
    setTourPlan(stringToEditorState(''));
    serServices([]);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('DEPARTURE_TOUR.CREATE')}</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Common Information */}
          <CommonInformation
            control={control}
            errors={errors}
            toursLocation={toursLocation}
            toursTemplate={toursTemplate}
            onToursTemplateChange={handleToursTemplateChange}
          />
          {/* Additional Services */}
          <AdditionalServiceItem
            services={services}
            control={control}
            errors={errors}
            setServices={serServices}
          />
          {/* Policies, Regulations and Tour Plan */}
          <PoliciesAndRegulations
            control={control}
            errors={errors}
            inclusionAndExclusion={inclusionAndExclusion}
            setInclusionAndExclusion={setInclusionAndExclusion}
            policyConditionsAndExtraFee={policyConditionsAndExtraFee}
            setPolicyConditionsAndExtraFee={setPolicyConditionsAndExtraFee}
            cancellationTerms={cancellationTerms}
            setCancellationTerms={setCancellationTerms}
            tourPlan={tourPlan}
            setTourPlan={setTourPlan}
          />
          <div className="d-flex justify-content-end">
            <Button type="reset" color="danger" className="me-1" outline onClick={handleReset}>
              {i18n.t('COMMON.CANCEL')}
            </Button>
            <Button type="submit" className="me-1" color="primary">
              {!createLoading ? i18n.t('DEPARTURE_TOUR.CREATE') : i18n.t('COMMON.LOADING')}
              {createLoading ? (
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
  );
};

export default CreateDepartureTour;
