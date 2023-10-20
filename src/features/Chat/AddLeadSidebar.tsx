import i18n from '@config/i18n';
import React, { useCallback, useEffect } from 'react';
import { CreateLeadFormData, HonorificType, Lead } from '@domain/entities/lead/Lead';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { createLeadSchema, honorificOptions, typeOptions } from '@utils/LeadUtils';
import { useAllSaleOptions } from '@hooks/users';
import { useTourTemplateOptions } from '@hooks/tourTemplate';
import { useTourLocationOptions } from '@hooks/tourLocation';
import { useSourceOptions } from '@hooks/source';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';
import { leadPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import RightSideBar from '@components/RightSideBar/RightSideBar';
import {
  Button, Col, Form as ReactstrapForm, Label, Row, Spinner,
} from 'reactstrap';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemInput from '@components/Form/FormItemInput';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import { Conversation } from '@domain/entities/chat/Conversation';
import { useCurrentUser } from '@hooks/auth';

export interface AddLeadSidebarProps {
  conversation?: Conversation,
  toggleAddLeadSidebarRight: () => void,
  openAddLeadSidebar: boolean,
}

const AddLeadSidebar = (props: AddLeadSidebarProps) => {
  const { toggleAddLeadSidebarRight, openAddLeadSidebar, conversation } = props;
  const currentUser = useCurrentUser();
  if (!currentUser) return null;
  const { username } = currentUser;
  const defaultValues: CreateLeadFormData = {
    name: conversation?.contact?.fullName || '',
    email: '',
    startDate: new Date().toISOString(),
    numberOfChildrenPassengers: 0,
    numberOfAdultPassengers: 0,
    departure: '',
    desiredTour: '',
    assigneeId: username,
    phoneNumber: '',
    tourTemplateId: undefined,
    honorific: HonorificType.MR_YOUNG,
    type: '',
    sourceId: '',
    description: '',
    tourType: '',
    address: '',
    conversationId: conversation?.id,
    sessionId: conversation?.sessionId || '',
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLeadFormData>({ resolver: yupResolver(createLeadSchema), defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [conversation]);

  const saleOptions = useAllSaleOptions();
  const tourTemplateOptions = useTourTemplateOptions();
  const departureOptions = useTourLocationOptions();
  const sourceOptions = useSourceOptions();

  const queryClient = useQueryClient();
  const history = useHistory();
  const { mutate: createLeadMutation, isLoading } = useMutation({
    mutationKey: ['createLead'],
    mutationFn: (formData: CreateLeadFormData) => leadPresenter.addLead(formData),
    onSuccess: (lead: Lead) => {
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('LEAD.ADD_LEAD_SUCCESSFULLY', { leadName: lead.name }),
      });
      queryClient.setQueryData(['leads'], (leads: Lead[] | undefined) => {
        if (!leads) return [lead];
        return leads.concat(lead);
      });
      history.push(`/apps/leads/${lead.code}/edit`);
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
    },
  });

  const onSubmit = useCallback((formData: CreateLeadFormData) => {
    createLeadMutation(formData);
  }, []);

  return (
    <>
      <RightSideBar
        size="lg"
        open={openAddLeadSidebar}
        title={i18n.t('LEAD.ADD_LEAD')}
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={toggleAddLeadSidebarRight}
        onClosed={() => reset({})}
      >
        <ReactstrapForm onSubmit={onSubmit && handleSubmit(onSubmit)}>
          <div className="divider divider-start divider-primary">
            <div className="divider-text text-primary fw-bolder">{i18n.t('LEAD.CUSTOMER_INFORMATION')}</div>
          </div>
          <Row className="mb-1">
            <Label for="name">
              {i18n.t('LEAD.NAME')}
              <span className="text-danger">*</span>
            </Label>
            <Col sm="5">
              <FormItemSelect
                control={control}
                name="honorific"
                errors={errors}
                placeholder={i18n.t('LEAD.HONORIFIC')}
                options={honorificOptions}
              />
            </Col>
            <Col sm="7">
              <FormItemInput
                control={control}
                name="name"
                errors={errors}
                placeholder={i18n.t('LEAD.NAME')}
                inputType="text"
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="phoneNumber">
              {i18n.t('LEAD.PHONE')}
              <span className="text-danger">*</span>
            </Label>
            <Col sm="12">
              <FormItemInput
                control={control}
                name="phoneNumber"
                errors={errors}
                placeholder={i18n.t('LEAD.PHONE')}
                inputType="tel"
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="email">
              {i18n.t('LEAD.EMAIL')}
            </Label>
            <Col sm="12">
              <FormItemInput
                control={control}
                name="email"
                errors={errors}
                placeholder={i18n.t('LEAD.EMAIL')}
                inputType="email"
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="address">
              {i18n.t('LEAD.ADDRESS')}
            </Label>
            <Col sm="12">
              <FormItemInput
                control={control}
                name="address"
                errors={errors}
                placeholder={i18n.t('LEAD.ADDRESS')}
                inputType="text"
              />
            </Col>
          </Row>

          <div className="divider divider-start divider-primary mt-5">
            <div className="divider-text text-primary fw-bolder">{i18n.t('LEAD.DESIRED_TOUR')}</div>
          </div>

          <Row className="mb-1">
            <Label for="tourTemplateId">
              {i18n.t('LEAD.TOUR_TEMPLATE')}
            </Label>
            <Col sm="12">
              <FormItemSelect
                control={control}
                name="tourTemplateId"
                errors={errors}
                placeholder={i18n.t('LEAD.TOUR_TEMPLATE')}
                isClearable
                options={tourTemplateOptions}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="desiredTour">
              {i18n.t('LEAD.DESIRED_TOUR')}
            </Label>
            <Col sm="12">
              <FormItemInput
                control={control}
                name="desiredTour"
                errors={errors}
                placeholder={i18n.t('LEAD.DESIRED_TOUR')}
                inputType="text"
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="startDate">
              {i18n.t('LEAD.START_DATE')}
              <span className="text-danger">*</span>
            </Label>
            <Col sm="12">
              <FormItemDatePicker
                control={control}
                name="startDate"
                errors={errors}
                placeholder={i18n.t('LEAD.START_DATE')}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="departure">
              {i18n.t('LEAD.DEPARTURE')}
              <span className="text-danger">*</span>
            </Label>
            <Col sm="12">
              <FormItemSelect
                control={control}
                name="departure"
                errors={errors}
                placeholder={i18n.t('LEAD.DEPARTURE')}
                options={departureOptions}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="type">
              {i18n.t('LEAD.TYPE')}
              <span className="text-danger">*</span>
            </Label>
            <Col sm="12">
              <FormItemSelect
                control={control}
                name="type"
                errors={errors}
                options={typeOptions}
                placeholder={i18n.t('LEAD.TYPE')}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="numberOfAdultPassengers">
              {i18n.t('LEAD.NUMBER_OF_ADULT_PASSENGERS')}
              <span className="text-danger">*</span>
            </Label>
            <Col sm="12">
              <FormItemInput
                control={control}
                name="numberOfAdultPassengers"
                errors={errors}
                placeholder={i18n.t('LEAD.NUMBER_OF_ADULT_PASSENGERS')}
                inputType="number"
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="numberOfChildrenPassengers">
              {i18n.t('LEAD.NUMBER_OF_CHILDREN_PASSENGERS')}
              <span className="text-danger">*</span>
            </Label>
            <Col sm="12">
              <FormItemInput
                control={control}
                name="numberOfChildrenPassengers"
                errors={errors}
                placeholder={i18n.t('LEAD.NUMBER_OF_CHILDREN_PASSENGERS')}
                inputType="number"
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="sourceId">
              {i18n.t('LEAD.SOURCE')}
              <span className="text-danger">*</span>
            </Label>
            <Col sm="12">
              <FormItemSelect
                control={control}
                name="sourceId"
                errors={errors}
                placeholder={i18n.t('LEAD.SOURCE')}
                options={sourceOptions}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="assigneeId">
              {i18n.t('LEAD.ASSIGNEE')}
            </Label>
            <Col sm="12">
              <FormItemSelect
                control={control}
                name="assigneeId"
                errors={errors}
                isClearable
                placeholder={i18n.t('LEAD.ASSIGNEE')}
                options={saleOptions}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label for="description">
              {i18n.t('LEAD.DESCRIPTION')}
            </Label>
            <Col sm="12">
              <FormItemInput
                control={control}
                name="description"
                errors={errors}
                placeholder={i18n.t('LEAD.DESCRIPTION')}
                inputType="textarea"
              />
            </Col>
          </Row>
          <Button type="submit" className="me-1" color="primary">
            { !isLoading ? i18n.t('COMMON.SUBMIT') : i18n.t('COMMON.LOADING')}
            { isLoading ? (
              <Spinner
                style={{ width: '0.7rem', height: '0.7rem' }}
                type="grow"
                color="light"
              />
            ) : null }
          </Button>
          <Button type="reset" color="secondary" outline onClick={toggleAddLeadSidebarRight}>
            {i18n.t('COMMON.CANCEL')}
          </Button>
        </ReactstrapForm>

      </RightSideBar>
    </>
  );
};

export default AddLeadSidebar;
