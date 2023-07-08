// ** React Imports
import React, { useMemo, useState } from 'react';
// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import i18n from '@config/i18n';
// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  Spinner,
} from 'reactstrap';

import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { TourServicePrice } from '@domain/entities/tour';
import { TourTemplate, TourType } from '@domain/entities/TourTemplate';
import AdditionalServiceItem from '@features/Tour/Template/components/AdditionalServiceItem';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/input-number/input-number.scss';
import '@styles/react/libs/editor/editor.scss';
import PriceInformation from '@features/Tour/Template/components/PriceInformation';
import { tourPresenter, tourTemplatePresenter } from '@adapter/presenters';
import { useMutation, useQuery } from '@tanstack/react-query';
import CommonInformation from '@features/Tour/Template/components/CommonInformation';
import PoliciesAndRegulations from '@features/Tour/Template/components/PoliciesAndRegulations';
import toasty from '@components/Toasty/Toasty';

// otherPrice schema
const otherPriceSchema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.SERVICE_NAME') })),
  price: yup
    .number()
    .integer()
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE') })),
});

const schema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.NAME') })),
  type: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.TYPE') })),
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
  adultPrice: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.ADULT_PRICE') }))
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.ADULT_PRICE'), value: 1 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.ADULT_PRICE') })),
  childUnder5Price: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.CHILD_UNDER_5_PRICE') }))
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.CHILD_UNDER_5_PRICE'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.CHILD_UNDER_5_PRICE') })),
  child5to7Price: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE') }))
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE') })),
  child8to11Price: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.CHILD_8_11_PRICE') }))
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.CHILD_8_11_PRICE'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.CHILD_8_11_PRICE') })),
  otherPrice: yup.array().of(otherPriceSchema).optional(),
});

const TourTemplateCreatePage = () => {
  // Fetch location data
  const { data: toursLocationData } = useQuery(['toursLocation'], async () => tourPresenter.getAllToursLocation());
  const toursLocation = useMemo(() => toursLocationData || [], [toursLocationData]);

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
  const [otherPrices, setOtherPrices] = useState<TourServicePrice[]>([]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TourTemplate>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      type: TourType.INBOUND,
      visitorCount: 0,
      startingLocation: '',
      endingLocation: '',
      durationInDays: 0,
      durationInNights: 0,
      adultPrice: 0,
      childUnder5Price: 0,
      child5to7Price: 0,
      child8to11Price: 0,
      otherPrice: [],
      policiesAndRegulations: {},
    },
  });

  const stringToEditorState = (value?: string) => {
    // Convert the HTML string to Draft.js content
    const contentBlock = htmlToDraft(value || '').contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlock);
    return EditorState.createWithContent(contentState);
  };

  const {
    isSuccess, isLoading, isError, error, mutate,
  } = useMutation(tourTemplatePresenter.addTourTemplate);

  useMemo(() => {
    if (isError) {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    }
    if (isSuccess) {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('TOUR_TEMPLATE.CREATE_TOUR_TEMPLATE_SUCCESSFULLY'),
      });
    }
  }, [isSuccess, isError, error]);
  const onSubmit = (data: TourTemplate) => {
    const dataToAdd = data;
    if (data.otherPrice && data.otherPrice.length === 0) {
      delete dataToAdd.otherPrice;
    }
    mutate(dataToAdd);
  };

  const handleReset = () => {
    setInclusionAndExclusion(stringToEditorState(''));
    setCancellationTerms(stringToEditorState(''));
    setPolicyConditionsAndExtraFee(stringToEditorState(''));
    setTourPlan(stringToEditorState(''));
    setOtherPrices([]);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('TOUR_TEMPLATE.CREATE_TOUR_TEMPLATE')}</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Common Information */}
          <CommonInformation
            control={control}
            errors={errors}
            toursLocation={toursLocation}
          />
          {/* Price Information */}
          <PriceInformation
            control={control}
            errors={errors}
          />
          {/* Additional Services */}
          <AdditionalServiceItem
            services={otherPrices}
            control={control}
            errors={errors}
            setServices={setOtherPrices}
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
              { !isLoading ? i18n.t('TOUR_TEMPLATE.CREATE_TOUR_TEMPLATE') : i18n.t('COMMON.LOADING')}
              { isLoading ? (
                <Spinner
                  style={{ width: '0.7rem', height: '0.7rem' }}
                  type="grow"
                  color="light"
                />
              ) : null }
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default TourTemplateCreatePage;
