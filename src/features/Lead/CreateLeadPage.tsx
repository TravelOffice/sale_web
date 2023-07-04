import React, { useCallback } from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Form, Row, Label, Col,
  Breadcrumb, BreadcrumbItem,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Link, useHistory } from 'react-router-dom';
import { createLeadSchema, generateI18nForLead } from '@utils/LeadUtils';
import { CreateLeadFormData, HonorificType, Lead } from '@domain/entities/lead/Lead';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leadPresenter } from '@adapter/presenters';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormItemSelect from '@components/Form/FormItemSelect';
import FormItemInput from '@components/Form/FormItemInput';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import toasty from '@components/Toasty/Toasty';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { Trans } from 'react-i18next';
import { useAllSaleOptions } from '@hooks/users';

const honorificOptions = [
  { label: generateI18nForLead(HonorificType.MR_OLD), value: HonorificType.MR_OLD },
  { label: generateI18nForLead(HonorificType.MRS_OLD), value: HonorificType.MRS_OLD },
  { label: generateI18nForLead(HonorificType.MR_YOUNG), value: HonorificType.MR_YOUNG },
  { label: generateI18nForLead(HonorificType.MRS_YOUNG), value: HonorificType.MRS_YOUNG },
];

// TODO: Fetch sources from remote server
const sourceOptions = [
  { label: 'Zalo', value: 'zalo' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Campaign', value: 'campaign' },
];

// TODO: Fetch types from remote server
const typeOptions = [
  { label: i18n.t('LEAD.INLAND'), value: 'inland' },
  { label: i18n.t('LEAD.INBOUND'), value: 'inbound' },
  { label: i18n.t('LEAD.OUTBOUND'), value: 'outbound' },
];

const defaultValues: CreateLeadFormData = {
  name: '',
  email: '',
  startDate: new Date().toISOString(),
  numberOfChildrenPassengers: 0,
  numberOfAdultPassengers: 0,
  departure: '',
  desiredTour: '',
  assigneeId: undefined,
  phoneNumber: '',
  tourTemplateId: undefined,
  honorific: undefined,
  type: '',
  sourceId: '',
  description: '',
  tourType: '',
  address: '',
};

export default function CreateLeadPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLeadFormData>({ resolver: yupResolver(createLeadSchema), defaultValues });

  const saleOptions = useAllSaleOptions();

  const queryClient = useQueryClient();
  const history = useHistory();
  const createLeadMutation = useMutation({
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
      history.push(`/apps/lead/${lead.code}/edit`);
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
    },
  });

  const handleOnSubmit = useCallback((formData: CreateLeadFormData) => {
    createLeadMutation.mutate(formData);
  }, []);

  return (
    <div className="to-table-container">
      <Breadcrumb className="ms-1 mb-1">
        <BreadcrumbItem>
          <Link to="/">{i18n.t('COMMON.HOME')}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/apps/lead/list">Lead</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span>{i18n.t('LEAD.ADD_LEAD')}</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Row>
          <Col sm={8}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{i18n.t('LEAD.ADD_LEAD')}</CardTitle>
              </CardHeader>
              <CardBody>
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
                      options={honorificOptions}
                    />
                  </Col>
                  <Col sm="6">
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
                      inputType="text"
                    />
                  </Col>
                </Row>

                <div className="divider divider-start divider-primary mt-5">
                  <div className="divider-text text-primary fw-bolder">{i18n.t('LEAD.DESIRED_TOUR')}</div>
                </div>

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
                    <FormItemInput
                      control={control}
                      name="departure"
                      errors={errors}
                      placeholder={i18n.t('LEAD.DEPARTURE')}
                      inputType="text"
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
                  <Label sm="3" for="assigneeId">
                    {i18n.t('LEAD.ASSIGNEE')}
                  </Label>
                  <Col sm="9">
                    <FormItemSelect
                      control={control}
                      name="assigneeId"
                      errors={errors}
                      placeholder={i18n.t('LEAD.ASSIGNEE')}
                      options={saleOptions}
                    />
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
                      inputType="textarea"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="d-flex" md={{ size: 9, offset: 3 }}>
                    <LoadingButton
                      loading={createLeadMutation.isLoading}
                      className="me-1"
                      color="primary"
                      type="submit"
                      disabled={createLeadMutation.isLoading}
                    >
                      {i18n.t('COMMON.SUBMIT')}
                    </LoadingButton>
                  </Col>
                </Row>

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
    </div>
  );
}
