// ** React Imports
import React, { useEffect, useMemo, useState } from 'react';
// ** Third Party Components
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import i18n from '@config/i18n';
// ** Reactstrap Imports
import {
  Button, Card, CardBody, CardHeader, CardTitle, Form, Spinner,
} from 'reactstrap';

import { UpdateDepartureTourFormData } from '@domain/entities/tour';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/input-number/input-number.scss';
import '@styles/react/libs/editor/editor.scss';
import { tourPresenter } from '@adapter/presenters';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toasty from '@components/Toasty/Toasty';
import { useParams } from 'react-router-dom';
import { validateTourSchema } from '@features/Tour/validateSchemas/validateSchema';
import TourType from '@domain/entities/tour/TourType';
import PoliciesAndRegulations from '@features/Tour/components/PoliciesAndRegulations';
import { EditorState } from 'draft-js';
import { stringToEditorState } from '@utils/EditorUtils';
import CommonInformation from '@features/Tour/Departure/components/CommonInformation';
import Services from '@features/Tour/Departure/components/Services';

export interface DepartureTourEditPageParams {
  tourId: string,
}

const DepartureTourEditPage = () => {
  const queryClient = useQueryClient();
  // Fetch tour template data
  const { tourId } = useParams<DepartureTourEditPageParams>();
  // Fetch location data
  const { data: toursLocationData } = useQuery(['toursLocation'], async () => tourPresenter.getAllToursLocation());
  const toursLocation = useMemo(() => toursLocationData || [], [toursLocationData]);

  const { data: tourTemplatesData = [] } = useQuery(['toursTemplate'], async () => tourPresenter.getAllToursTemplate());
  const tourTemplates = useMemo(() => tourTemplatesData || [], [tourTemplatesData]);

  const { data: departureTour } = useQuery(
    ['departureTour', tourId],
    async () => tourPresenter.getDepartureTour(tourId),
  );

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

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateDepartureTourFormData>({
    resolver: yupResolver(validateTourSchema),
    defaultValues: {
      name: '',
      type: TourType.INBOUND,
      visitorCount: 0,
      startingLocation: '',
      endingLocation: '',
      durationInDays: 0,
      durationInNights: 0,
      services: [],
      policiesAndRegulations: {},
    },
  });

  useEffect(() => {
    if (departureTour) {
      // eslint-disable-next-line no-unused-vars
      const { code, ...rest } = departureTour;
      reset(rest);
      const {
        policiesAndRegulations,
        tourPlan: departureTourPlan,
      } = departureTour;
      const {
        inclusionAndExclusion: departureTourInclusionAndExclusion,
        cancellationTerms: departureTourCancellationTerms,
        policyConditionsAndExtraFee: departureTourPolicyConditionsAndExtraFee,
      } = policiesAndRegulations;

      if (departureTourInclusionAndExclusion) {
        setInclusionAndExclusion(stringToEditorState(departureTourInclusionAndExclusion));
      }

      if (departureTourCancellationTerms) {
        setCancellationTerms(stringToEditorState(departureTourCancellationTerms));
      }

      if (departureTourPolicyConditionsAndExtraFee) {
        setPolicyConditionsAndExtraFee(
          stringToEditorState(departureTourPolicyConditionsAndExtraFee),
        );
      }

      if (tourPlan) {
        setTourPlan(stringToEditorState(departureTourPlan));
      }
    }
  }, [departureTour]);

  const updateDepartureTourMutation = useMutation({
    mutationKey: ['updateDepartureTour'],
    mutationFn: async (
      formData: UpdateDepartureTourFormData,
    ) => tourPresenter.updateDepartureTour(tourId, formData),
    onSuccess: (updatedDepartureTour) => {
      queryClient.setQueryData(['departureTour', tourId], updatedDepartureTour);
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('DEPARTURE_TOUR.EDIT_DEPARTURE_TOUR_SUCCESSFULLY', { departureTourName: updatedDepartureTour.name }),
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

  const onSubmit = (data: UpdateDepartureTourFormData) => {
    updateDepartureTourMutation.mutate(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{i18n.t('DEPARTURE_TOUR.EDIT')}</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Common Information */}
          <CommonInformation
            control={control}
            errors={errors}
            toursLocation={toursLocation}
            toursTemplate={tourTemplates}
            isUpdate
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
            tourPlan={tourPlan}
            setTourPlan={setTourPlan}
          />
          <div className="d-flex justify-content-end">
            <Button type="reset" color="danger" className="me-1" outline onClick={handleReset}>
              {i18n.t('COMMON.CANCEL')}
            </Button>
            <Button type="submit" className="me-1" color="primary">
              {!updateDepartureTourMutation.isLoading ? i18n.t('COMMON.UPDATE') : i18n.t('COMMON.LOADING')}
              {updateDepartureTourMutation.isLoading ? (
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

export default DepartureTourEditPage;
