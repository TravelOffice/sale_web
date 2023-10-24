import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import i18n from '@config/i18n';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemInput from '@components/Form/FormItemInput';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { Trans } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LeadStatus, UpdateLeadFormData } from '@domain/entities/lead/Lead';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { leadPresenter, sourcePresenter, tourLocationPresenter } from '@adapter/presenters';
import { useAllSaleOptions } from '@hooks/users';
import {
  generateI18nForLead,
  honorificOptions,
  leadStatusColors,
  typeOptions,
  updateLeadSchema,
} from '@utils/LeadUtils';
import toasty from '@components/Toasty/Toasty';
import Skeleton from 'react-loading-skeleton';
import { numberArrayOf } from '@utils/ArrayUtils';
import { useTourTemplateOptions } from '@hooks/tourTemplate';
import { useTourLocationOptions } from '@hooks/tourLocation';
import { useSourceOptions } from '@hooks/source';
import CancelLeadModal from '@features/Lead/components/CancelLeadModal';
import { CreateSourceFormData, Source } from '@domain/entities/source/Source';
import FormItemCreatableSelect from '@components/Form/FormItemCreatableSelect';
import { CreateTourLocationFormData, TourLocation } from '@domain/entities/tour';

export interface EditLeadPageParams {
  leadId: string,
}

function renderSkeleton() {
  return (
    <>
      {
        numberArrayOf(10).map((key) => (
          <Row className="mb-1" key={key}>
            <Col sm="3">
              <Skeleton height={36} />
            </Col>
            <Col sm="9">
              <Skeleton height={36} />
            </Col>
          </Row>
        ))
      }
    </>
  );
}

export default function EditLeadPage() {
  const [showCancelLeadDialog, setShowCancelLeadDialog] = useState(false);
  const queryClient = useQueryClient();
  const { leadId } = useParams<EditLeadPageParams>();
  const { data: lead, isLoading } = useQuery(['leads', leadId], async () => leadPresenter.getLead(leadId));
  const saleOptions = useAllSaleOptions();
  const tourTemplateOptions = useTourTemplateOptions();
  const departureOptions = useTourLocationOptions();
  const sourceOptions = useSourceOptions();

  // if the lead is not loaded, then it is not editable
  // if the lead is loaded, then it is editable if the lead status is not CANCEL or CLOSED
  const editable = useMemo(() => {
    if (!lead) return false;
    const { leadStatus } = lead;
    return leadStatus !== LeadStatus.CANCEL && leadStatus !== LeadStatus.CLOSED;
  }, [lead]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<UpdateLeadFormData>({ resolver: yupResolver(updateLeadSchema) });

  useEffect(() => {
    if (lead) reset(lead);
  }, [lead]);

  const updateLeadMutation = useMutation({
    mutationKey: ['updateLead'],
    mutationFn: async (formData: UpdateLeadFormData) => leadPresenter.updateLead(leadId, formData),
    onSuccess: (newLead) => {
      queryClient.setQueryData(['lead', leadId], newLead);
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('LEAD.EDIT_LEAD_SUCCESSFULLY', { leadName: newLead.name }),
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

  const { mutateAsync: createSourceMutate, isLoading: isCreateSourceLoading } = useMutation({
    mutationFn: (formData: CreateSourceFormData) => sourcePresenter.create(formData),
    onSuccess: (newSource) => {
      reset({
        ...getValues(),
        sourceId: newSource.code,
      });
      queryClient.setQueryData(['sources'], (sources: Source[] | undefined) => {
        if (!sources) return [];
        return sources.concat(newSource);
      });
    },
  });

  const {
    mutateAsync: createTourLocationMutate,
    isLoading: isCreateLocationLoading,
  } = useMutation({
    mutationFn: (formData: CreateTourLocationFormData) => tourLocationPresenter.create(formData),
    onSuccess: (newTourLocation) => {
      reset({
        ...getValues(),
        departure: newTourLocation.code,
      });
      queryClient.setQueryData(['tourLocations'], (currentTourLocations: TourLocation[] | undefined) => {
        if (!currentTourLocations) return [];
        return currentTourLocations.concat(newTourLocation);
      });
    },
  });

  const handleOnSubmit = useCallback((formData: UpdateLeadFormData) => {
    updateLeadMutation.mutate(formData);
  }, []);
  return (
    <div className="to-table-container">
      <Breadcrumb className="ms-1 mb-1">
        <BreadcrumbItem>
          <Link to="/">{i18n.t('COMMON.HOME')}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/apps/leads/list">Lead</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span>{i18n.t('LEAD.EDIT_LEAD')}</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Row>
          <Col sm={8}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  {i18n.t('LEAD.EDIT_LEAD')}
                  {' '}
                  {
                    !!lead && (
                      <Badge className="text-capitalize" color={leadStatusColors[lead.leadStatus]} pill>
                        {generateI18nForLead(lead.leadStatus)}
                      </Badge>
                    )
                  }
                </CardTitle>
              </CardHeader>
              <CardBody>
                {
                  isLoading ? (
                    renderSkeleton()
                  ) : (
                    <>
                      <div className="divider divider-start divider-primary">
                        <div className="divider-text text-primary fw-bolder">{i18n.t('LEAD.CUSTOMER_INFORMATION')}</div>
                      </div>
                      <Row className="mb-1">
                        <Label sm="3" for="name">
                          {i18n.t('LEAD.NAME')}
                          <span className="text-danger">*</span>
                        </Label>
                        <Col sm="3">
                          <FormItemSelect
                            control={control}
                            name="honorific"
                            errors={errors}
                            placeholder={i18n.t('LEAD.HONORIFIC')}
                            disabled={!editable}
                            options={honorificOptions}
                          />
                        </Col>
                        <Col sm="6">
                          <FormItemInput
                            control={control}
                            name="name"
                            errors={errors}
                            placeholder={i18n.t('LEAD.NAME')}
                            disabled={!editable}
                            inputType="text"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="phoneNumber">
                          {i18n.t('LEAD.PHONE')}
                          <span className="text-danger">*</span>
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="phoneNumber"
                            errors={errors}
                            placeholder={i18n.t('LEAD.PHONE')}
                            disabled={!editable}
                            inputType="tel"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="email">
                          {i18n.t('LEAD.EMAIL')}
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="email"
                            errors={errors}
                            placeholder={i18n.t('LEAD.EMAIL')}
                            disabled={!editable}
                            inputType="email"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="address">
                          {i18n.t('LEAD.ADDRESS')}
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="address"
                            errors={errors}
                            placeholder={i18n.t('LEAD.ADDRESS')}
                            disabled={!editable}
                            inputType="text"
                          />
                        </Col>
                      </Row>

                      <div className="divider divider-start divider-primary mt-5">
                        <div className="divider-text text-primary fw-bolder">{i18n.t('LEAD.DESIRED_TOUR')}</div>
                      </div>

                      <Row className="mb-1">
                        <Label sm="3" for="tourTemplateId">
                          {i18n.t('LEAD.TOUR_TEMPLATE')}
                        </Label>
                        <Col sm="9">
                          <FormItemSelect
                            control={control}
                            name="tourTemplateId"
                            errors={errors}
                            placeholder={i18n.t('LEAD.TOUR_TEMPLATE')}
                            isClearable
                            disabled={!editable}
                            options={tourTemplateOptions}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="desiredTour">
                          {i18n.t('LEAD.DESIRED_TOUR')}
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="desiredTour"
                            errors={errors}
                            placeholder={i18n.t('LEAD.DESIRED_TOUR')}
                            disabled={!editable}
                            inputType="text"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="startDate">
                          {i18n.t('LEAD.START_DATE')}
                          <span className="text-danger">*</span>
                        </Label>
                        <Col sm="9">
                          <FormItemDatePicker
                            control={control}
                            name="startDate"
                            errors={errors}
                            disabled={!editable}
                            placeholder={i18n.t('LEAD.START_DATE')}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="departure">
                          {i18n.t('LEAD.DEPARTURE')}
                          <span className="text-danger">*</span>
                        </Label>
                        <Col sm="9">
                          <FormItemCreatableSelect
                            name="departure"
                            options={departureOptions}
                            control={control}
                            errors={errors}
                            isLoading={isCreateLocationLoading}
                            isDisabled={isCreateLocationLoading}
                            onCreateOption={(inputValue) => createTourLocationMutate({
                              name: inputValue,
                              status: 'ENABLE',
                            })}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="type">
                          {i18n.t('LEAD.TYPE')}
                          <span className="text-danger">*</span>
                        </Label>
                        <Col sm="9">
                          <FormItemSelect
                            control={control}
                            name="type"
                            errors={errors}
                            options={typeOptions}
                            disabled={!editable}
                            placeholder={i18n.t('LEAD.TYPE')}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="numberOfAdultPassengers">
                          {i18n.t('LEAD.NUMBER_OF_ADULT_PASSENGERS')}
                          <span className="text-danger">*</span>
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="numberOfAdultPassengers"
                            errors={errors}
                            placeholder={i18n.t('LEAD.NUMBER_OF_ADULT_PASSENGERS')}
                            disabled={!editable}
                            inputType="number"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="numberOfChildrenPassengers">
                          {i18n.t('LEAD.NUMBER_OF_CHILDREN_PASSENGERS')}
                          <span className="text-danger">*</span>
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="numberOfChildrenPassengers"
                            errors={errors}
                            placeholder={i18n.t('LEAD.NUMBER_OF_CHILDREN_PASSENGERS')}
                            disabled={!editable}
                            inputType="number"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="sourceId">
                          {i18n.t('LEAD.SOURCE')}
                          <span className="text-danger">*</span>
                        </Label>
                        <Col sm="9">
                          <FormItemCreatableSelect
                            name="sourceId"
                            options={
                              sourceOptions
                            }
                            control={control}
                            errors={errors}
                            isLoading={isCreateSourceLoading}
                            isDisabled={isCreateSourceLoading}
                            onCreateOption={(inputValue) => createSourceMutate({
                              name: inputValue,
                            })}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="assigneeId">
                          {i18n.t('LEAD.ASSIGNEE')}
                        </Label>
                        <Col sm="9">
                          <FormItemSelect
                            control={control}
                            name="assigneeId"
                            errors={errors}
                            placeholder={i18n.t('LEAD.ASSIGNEE')}
                            disabled={!editable}
                            options={saleOptions}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="creator">
                          {i18n.t('LEAD.CREATOR')}
                        </Label>
                        <Col sm="9">
                          <Input id="creator" disabled value={lead?.creatorName} />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="cancelledReason">
                          {i18n.t('LEAD.CANCELLED_REASON')}
                        </Label>
                        <Col sm="9">
                          <Input id="cancelledReason" type="textarea" disabled value={lead?.cancelledReason} />
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Label sm="3" for="description">
                          {i18n.t('LEAD.DESCRIPTION')}
                        </Label>
                        <Col sm="9">
                          <FormItemInput
                            control={control}
                            name="description"
                            errors={errors}
                            placeholder={i18n.t('LEAD.DESCRIPTION')}
                            disabled={!editable}
                            inputType="textarea"
                          />
                        </Col>
                      </Row>

                      {
                        editable && (
                          <Row>
                            <Col className="d-flex" md={{ size: 9, offset: 3 }}>
                              <LoadingButton
                                loading={updateLeadMutation.isLoading}
                                className="me-1"
                                color="primary"
                                type="submit"
                                disabled={updateLeadMutation.isLoading}
                              >
                                {i18n.t('COMMON.SAVE_CHANGES')}
                              </LoadingButton>
                              <Button
                                className="me-1"
                                color="danger"
                                onClick={() => setShowCancelLeadDialog(true)}
                              >
                                {i18n.t('LEAD.CANCEL_LEAD')}
                              </Button>
                            </Col>
                          </Row>
                        )
                      }
                    </>
                  )
                }
              </CardBody>
            </Card>
          </Col>

          <Col sm={4}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{i18n.t('COMMON.GUIDE')}</CardTitle>
              </CardHeader>
              <CardBody>
                <Trans
                  i18nKey="LEAD.GUIDE_CREATE_LEAD"
                  components={{ strong: <strong className="text-danger" /> }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
      <CancelLeadModal
        leadId={leadId}
        lead={lead}
        toggle={() => setShowCancelLeadDialog(!showCancelLeadDialog)}
        isOpen={showCancelLeadDialog}
        className="modal-dialog-centered"
        modalClassName="danger"
      />
    </div>
  );
}
