// ** React Imports
import React, { useState } from 'react';
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
import { CreateDepartureTourFormData } from '@domain/entities/tour';
import TourType from '@domain/entities/tour/TourType';
import TourStatus from '@domain/entities/tour/TourStatus';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/input-number/input-number.scss';
import '@styles/react/libs/editor/editor.scss';
import { tourPresenter } from '@adapter/presenters';
import { useMutation, useQuery } from '@tanstack/react-query';
import CommonInformation from '@features/Tour/Departure/components/CommonInformation';
import PoliciesAndRegulations from '@features/Tour/components/PoliciesAndRegulations';
import Services from '@features/Tour/Departure/components/Services';
import toasty from '@components/Toasty/Toasty';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { useHistory } from 'react-router-dom';

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
  services: yup.array().of(
    yup.object().shape({
      name: yup.string()
        .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.SERVICE_NAME') })),
      price: yup.number()
        .integer()
        .moreThan(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE'), value: 0 }))
        .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('DEPARTURE_TOUR.SERVICE_PRICE') })),
    }),
  ),
});

const DepartureTourCreatePage = () => {
  const history = useHistory();
  // Fetch tour template and location data
  const { data: tourTemplates = [] } = useQuery(['toursTemplate'], async () => tourPresenter.getAllToursTemplate());
  const { data: tourLocations = [] } = useQuery(['toursLocation'], async () => tourPresenter.getAllToursLocation());

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

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateDepartureTourFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tourTemplateCode: undefined,
      name: '',
      type: TourType.INBOUND,
      visitorCount: 0,
      startingLocation: '',
      endingLocation: '',
      durationInDays: 0,
      durationInNights: 0,
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
    const tourTemplateData = tourTemplates.find((tour) => tour.code === tourTemplateCode);
    if (tourTemplateData) {
      const { code, ...tourTemplate } = tourTemplateData;
      const initDataByTemplate = {
        ...tourTemplate,
        tourTemplate: tourTemplate?.name || '',
        tourTemplateCode: code,
        status: TourStatus.ONSALE,
        startDate: '',
        isOpen: true,
        operationStatus: TourOperationStatus.WAITING_FOR_OPERATION,
      } as CreateDepartureTourFormData;
      Object.keys(initDataByTemplate).forEach((key) => {
        setValue(
          key as keyof CreateDepartureTourFormData,
          initDataByTemplate[key as keyof CreateDepartureTourFormData],
        );
      });

      // Set other value
      setValue('services', tourTemplate?.services || []);
      setInclusionAndExclusion(stringToEditorState(
        initDataByTemplate.policiesAndRegulations.inclusionAndExclusion,
      ));
      setCancellationTerms(stringToEditorState(
        initDataByTemplate.policiesAndRegulations.cancellationTerms,
      ));
      setPolicyConditionsAndExtraFee(stringToEditorState(
        initDataByTemplate.policiesAndRegulations.policyConditionsAndExtraFee,
      ));
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: tourPresenter.createDepartureTour,
    onSuccess: () => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('DEPARTURE_TOUR.CREATE_DEPARTURE_TOUR_SUCCESSFULLY'),
      });
    },
    onError: (error: Error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: error.message,
      });
    },
  });

  const onSubmit = (data: CreateDepartureTourFormData) => {
    const dataToAdd = {
      ...data,
      status: data.isOpen ? TourStatus.ONSALE : TourStatus.CLOSED,
    };
    mutate(dataToAdd);
  };

  const goBack = () => {
    history.goBack();
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
            toursLocation={tourLocations}
            toursTemplate={tourTemplates}
            onToursTemplateChange={handleToursTemplateChange}
          />
          {/* Additional Services */}
          <Services
            control={control}
            errors={errors}
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
          />
          <div className="d-flex justify-content-end">
            <Button type="reset" color="danger" className="me-1" outline onClick={goBack}>
              {i18n.t('COMMON.BACK')}
            </Button>
            <Button type="submit" className="me-1" color="primary" disabled={isLoading}>
              {!isLoading ? i18n.t('DEPARTURE_TOUR.CREATE') : i18n.t('COMMON.LOADING')}
              {isLoading ? (
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

export default DepartureTourCreatePage;
