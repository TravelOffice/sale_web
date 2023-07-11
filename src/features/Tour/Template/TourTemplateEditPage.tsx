// ** React Imports
import React, { useEffect, useMemo, useState } from 'react';
// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CommonInformation from '@features/Tour/Template/components/CommonInformation';
import PoliciesAndRegulations from '@features/Tour/Template/components/PoliciesAndRegulations';
import toasty from '@components/Toasty/Toasty';
import { useParams } from 'react-router-dom';
import { validateTourSchema } from '@features/Tour/validateSchemas/validateSchema';

export interface TourTemplateEditPageParams {
  tourTemplateId: string,
}

const TourTemplateEditPage = () => {
  const queryClient = useQueryClient();
  // Fetch tour template data
  const { tourTemplateId } = useParams<TourTemplateEditPageParams>();
  const { data: tourTemplate } = useQuery(
    ['tourTemplate', tourTemplateId],
    async () => tourTemplatePresenter.getTourTemplate(tourTemplateId),
  );

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
    resolver: yupResolver(validateTourSchema),
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

  useEffect(() => {
    if (tourTemplate) reset(tourTemplate);
  }, [tourTemplate]);

  const stringToEditorState = (value?: string) => {
    // Convert the HTML string to Draft.js content
    const contentBlock = htmlToDraft(value || '').contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlock);
    return EditorState.createWithContent(contentState);
  };

  const updateTourTemplateMutation = useMutation({
    mutationKey: ['updateTourTemplate'],
    mutationFn: async (
      formData: TourTemplate,
    ) => tourTemplatePresenter.updateTourTemplate(tourTemplateId, formData),
    onSuccess: (updatedTourTemplate) => {
      queryClient.setQueryData(['tourTemplate', tourTemplateId], updatedTourTemplate);
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('TOUR_TEMPLATE.EDIT_TOUR_TEMPLATE_SUCCESSFULLY', { tourTemplateName: updatedTourTemplate.name }),
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

  const onSubmit = (data: TourTemplate) => {
    const dataToUpdate = data;
    if (data.otherPrice && data.otherPrice.length === 0) {
      delete dataToUpdate.otherPrice;
    }
    updateTourTemplateMutation.mutate(dataToUpdate);
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
        <CardTitle tag="h4">{i18n.t('TOUR_TEMPLATE.EDIT_TOUR_TEMPLATE')}</CardTitle>
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
              { !updateTourTemplateMutation.isLoading ? i18n.t('COMMON.UPDATE') : i18n.t('COMMON.LOADING')}
              { updateTourTemplateMutation.isLoading ? (
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

export default TourTemplateEditPage;
