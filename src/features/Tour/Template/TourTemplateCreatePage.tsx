// ** React Imports
import React, { useCallback, useState } from 'react';
// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import i18n from '@config/i18n';
// ** Reactstrap Imports
import {
  Button, Card, CardBody, CardHeader, CardTitle, Form, Spinner,
} from 'reactstrap';
import { CreateTourTemplateFormData } from '@domain/entities/tour';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/input-number/input-number.scss';
import '@styles/react/libs/editor/editor.scss';
import { tourTemplatePresenter } from '@adapter/presenters';
import { useMutation } from '@tanstack/react-query';
import CommonInformation from '@features/Tour/Template/components/CommonInformation';
import toasty from '@components/Toasty/Toasty';
import TourType from '@domain/entities/tour/TourType';
import { useTourLocations } from '@hooks/tourLocation';
import { validateTourSchema } from '@features/Tour/validateSchemas/validateSchema';
import PoliciesAndRegulations from '@features/Tour/components/PoliciesAndRegulations';
import { EditorState } from 'draft-js';
import Services from '@features/Tour/Template/components/Services';

const TourTemplateCreatePage = () => {
  // Fetch location data
  const { data: tourLocations = [] } = useTourLocations();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateTourTemplateFormData>({
    resolver: yupResolver(validateTourSchema),
    defaultValues: {
      name: '',
      type: TourType.INBOUND,
      visitorCount: 0,
      startingLocation: '',
      endingLocation: '',
      durationInDays: 0,
      durationInNights: 0,
      services: [
        {
          name: i18n.t('TOUR_TEMPLATE.ADULT_PRICE'),
          price: 0,
        },
        {
          name: i18n.t('TOUR_TEMPLATE.CHILD_UNDER_5_PRICE'),
          price: 0,
        },
        {
          name: i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE'),
          price: 0,
        },
        {
          name: i18n.t('TOUR_TEMPLATE.CHILD_8_11_PRICE'),
          price: 0,
        },
      ],
      policiesAndRegulations: {},
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (
      formData: CreateTourTemplateFormData,
    ) => tourTemplatePresenter.addTourTemplate(formData),
    onSuccess: () => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('TOUR_TEMPLATE.CREATE_TOUR_TEMPLATE_SUCCESSFULLY'),
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

  const onSubmit = useCallback((data: CreateTourTemplateFormData) => {
    mutate(data);
  }, []);

  const handleReset = () => {
    reset();
  };

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
            toursLocation={tourLocations}
          />
          <Services control={control} errors={errors} />
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
            <Button type="reset" color="danger" className="me-1" outline onClick={handleReset}>
              {i18n.t('COMMON.CANCEL')}
            </Button>
            <Button type="submit" className="me-1" color="primary" disabled={isLoading}>
              {!isLoading ? i18n.t('TOUR_TEMPLATE.CREATE_TOUR_TEMPLATE') : i18n.t('COMMON.LOADING')}
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

export default TourTemplateCreatePage;
