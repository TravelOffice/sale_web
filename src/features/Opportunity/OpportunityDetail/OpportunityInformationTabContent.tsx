import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { opportunityActions } from '@redux/slices/opportunitySlice';
import {
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
import { RootState } from '@redux/store';
import {
  opportunityPotentials,
  opportunitySources,
  opportunityStatuses,
  OpportunityTask,
  OpportunityTaskSearchParams,
} from '@domain/entities/opportunity/Opportunity';
import { Calendar, Plus, User } from 'react-feather';
import i18n from '@config/i18n';
import Select from 'react-select';
import { selectThemeColors } from '@utils/Utils';
import classnames from 'classnames';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import moment from 'moment';
import { DATE_FORMAT, FLATPICKR_DATE_FORMAT } from '@utils/Constants';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import Skeleton from 'react-loading-skeleton';
import OpportunityTasks from './OpportunityTasks';
import 'react-loading-skeleton/dist/skeleton.css';

interface ParamTypes {
  leadId: string,
  oppId: string,
}

const {
  // getOpportunity,
  getAllTasks,
  selectTask,
  updateTask,
  onGoToOpportunityDetail,
} = opportunityActions;

const opportunityFormSchema = yup.object().shape({
  name: yup.string().required(),
  estimatedConfirmDate: yup.string().required(),
  source: yup.string().required().oneOf(opportunitySources),
  potential: yup.string().required().oneOf(opportunityPotentials),
  status: yup.string().required().oneOf(opportunityStatuses),
});

const OpportunityInformationTabContent = () => {
  // ** Hooks
  const { leadId, oppId } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(opportunityFormSchema),
  });

  // ** States
  const [sort, setSort] = useState('');
  const [query, setQuery] = useState('');
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);

  // ** Selectors
  const opportunity = useSelector((state: RootState) => state.opportunity.selectedOpportunity);
  const tasks = useSelector((state: RootState) => state.opportunity.allTasks);
  const isUpdating = useSelector((
    state: RootState,
  ) => state.opportunity.createOrUpdateOpportunityLoading);
  const isFetching = useSelector((
    state: RootState,
  ) => state.opportunity.getOpportunityLoading);

  // ** URL Params
  const params: OpportunityTaskSearchParams = {
    oppId: oppId || '',
    query: query || '',
    sortBy: sort || '',
  };

  const fp = useRef(null);

  useEffect(() => {
    // Prevent refreshing browser or opening opp detail directly
    // Opportunity need to be fetched and set as selected opportunity in opp state
    if (!opportunity) {
      dispatch(onGoToOpportunityDetail([leadId, oppId]));
    }
  }, [opportunity]);

  const defaultFormData = useMemo(() => {
    if (opportunity) {
      return {
        ...opportunity,
        closedLostReason: opportunity?.closedLostReason || '',
        description: opportunity?.description || '',
      };
    }
    return undefined;
  }, [opportunity]);

  useEffect(() => {
    if (defaultFormData) {
      reset(defaultFormData);
    }
  }, [defaultFormData]);

  // ** Get opportunity on mount
  useEffect(() => {
    // dispatch(selectOpportunity(id));
    params.sortBy = sort;
    params.query = query;
    dispatch(getAllTasks(params));
  }, [leadId, query, sort]);

  const onSubmit = useCallback((formData) => {
    // Submit form to update the opportunity
    const updatedOpportunity = {
      ...opportunity,
      ...formData,
      estimatedConfirmDate: moment(formData.estimatedConfirmDate).format(DATE_FORMAT),
    };
    dispatch(opportunityActions.updateOpportunity(updatedOpportunity));
  }, [opportunity]);

  // ** Function to handle Task sidebar
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

  // ** Functions To Handle Add Task Click
  const handleAddClick = () => {
    handleTaskSidebar();
    // setMainSidebar();
  };

  const handleSelectTask = (task: OpportunityTask) => {
    dispatch(selectTask(task));
  };

  const handleSetSort = (sortType: string) => {
    setSort(sortType);
  };

  const handleSetQuery = (queryString: string) => {
    setQuery(queryString);
  };

  const renderEmptyTasksContent = () => (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{i18n.t('TASK.TASKS_EMPTY_TITLE')}</h2>
          <p className="mb-2">{i18n.t('TASK.TASKS_EMPTY_SUB_TITLE')}</p>
          <Button onClick={handleAddClick} color="primary" className="btn-sm-block mb-2">
            {i18n.t('TASK.ADD_NEW_TASK')}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderDetailedInformationHeader = () => (
    <>
      {/* Link to lead */}
      <Link
        to={`/apps/lead/${opportunity?.leadId}`}
        className="text-truncate text-body"
        style={{ marginTop: '0.5rem' }}
      >
        <div className="d-flex flex-row">
          <User size={16} className="me-1" />
          <span>
            {i18n.t('OPP.OWNED_BY_LEAD')}
            {' '}
            <span className="pl-1 fw-bolder">
              {opportunity?.leadName}
            </span>
          </span>
        </div>
      </Link>
      {/* Created at */}
      <div className="d-flex flex-row">
        <Calendar size={16} className="me-1" />
        <span>
          {i18n.t('OPP.CREATED_AT_INFORMATION', { createdAt: moment(opportunity?.createdAt).format(DATE_FORMAT) })}
        </span>
      </div>
    </>
  );

  const renderDetailedInformationForm = () => (
    <>
      <Form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* Input for Opp name */}
          <Col sm="12" className="mb-1">
            <Label className="form-label" for="name">
              {i18n.t('OPP.NAME')}
              <span className="text-danger">{' *'}</span>
            </Label>
            <Controller
              name="name"
              control={control}
              defaultValue={opportunity?.name}
              render={({ field }) => (
                <Input id="name" placeholder={i18n.t('OPP.NAME')} invalid={errors.name && true} {...field} />
              )}
            />
            {
              errors.name
              && <FormFeedback>{i18n.t('OPP.VALIDATOR_NAME_ERROR_TEXT')}</FormFeedback>
            }
          </Col>
          {/* Text area for Opp description */}
          <Col sm="12" className="mb-1">
            <Label className="form-label" for="description">
              {i18n.t('OPP.DESCRIPTION')}
            </Label>
            <Controller
              name="description"
              control={control}
              defaultValue={opportunity?.description}
              render={({ field }) => (
                <Input id="description" placeholder={i18n.t('OPP.DESCRIPTION')} type="textarea" {...field} />
              )}
            />
          </Col>
          {/* Select dropdown for Opp potential */}
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="potential">
              {i18n.t('OPP.POTENTIAL')}
              <span className="text-danger">{' *'}</span>
            </Label>
            <Controller
              name="potential"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => {
                type TType = typeof value;
                type Option = { label: string, value: TType };
                const options = opportunityPotentials.map((potential) => ({
                  label: i18n.t(`OPP.${potential}`) || potential,
                  value: potential,
                }));
                // Replace by real value
                const selectValue = options.find(
                  (option) => option.value === value,
                );
                return (
                  <Select<Option>
                    isClearable={false}
                    classNamePrefix="select"
                    options={options}
                    theme={selectThemeColors}
                    className={classnames('react-select', { 'is-invalid': errors.potential && true })}
                    isDisabled={false}
                    value={selectValue}
                    onChange={(option) => onChange(option?.value)}
                    {...rest}
                  />
                );
              }}
            />
            {errors.potential && <FormFeedback>{i18n.t('OPP.VALIDATOR_POTENTIAL_TEXT')}</FormFeedback>}
          </Col>
          {/* Input for Opp estimated revenue */}
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="estimatedRevenue">
              {i18n.t('OPP.ESTIMATED_REVENUE')}
              <span className="text-danger">{' *'}</span>
            </Label>
            <Controller
              name="estimatedRevenue"
              control={control}
              defaultValue={opportunity?.estimatedRevenue}
              render={({ field: { onChange, ...rest } }) => {
                type ValidatorFunction = (values: NumberFormatValues) => boolean;
                const MINIMUM_VALUE = 0;
                const withValueLimit: ValidatorFunction = (
                  { floatValue },
                ) => (floatValue || 0) >= MINIMUM_VALUE;
                return (
                  <NumberFormat
                    id="estimatedRevenue"
                    placeholder={i18n.t('OPP.ESTIMATED_REVENUE')}
                    customInput={Input}
                    thousandSeparator
                    prefix="$"
                    inputMode="numeric"
                    isAllowed={withValueLimit}
                    onValueChange={(values) => {
                      const { floatValue } = values;
                      onChange(floatValue);
                    }}
                    {...rest}
                  />
                );
              }}
            />
            {
              (errors.estimatedRevenue
                && (
                  <FormFeedback>
                    {i18n.t('OPP.VALIDATOR_ESTIMATED_REVENUE_ERROR_TEXT')}
                  </FormFeedback>
                )
              )
            }
          </Col>
          {/* Select dropdown for Opp source */}
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="source">
              {i18n.t('OPP.SOURCE')}
              <span className="text-danger">{' *'}</span>
            </Label>
            <Controller
              name="source"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => {
                type TType = typeof value;
                type Option = { label: string, value: TType };
                const options = opportunitySources.map((source) => ({
                  label: i18n.t(`OPP.${source}`) || source,
                  value: source,
                }));
                // Replace by real value
                const optionValue = options.find(
                  (option) => option.value === value,
                );
                return (
                  <Select<Option>
                    isClearable={false}
                    classNamePrefix="select"
                    options={options}
                    theme={selectThemeColors}
                    className={classnames('react-select', { 'is-invalid': errors.source && true })}
                    isDisabled={false}
                    value={optionValue}
                    onChange={(option) => onChange(option?.value)}
                    {...rest}
                  />
                );
              }}
            />
            {errors.source && <FormFeedback>{i18n.t('OPP.VALIDATOR_SOURCE_TEXT')}</FormFeedback>}
          </Col>
          {/* Select dropdown for Opp status */}
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="status">
              {i18n.t('OPP.STATUS')}
              <span className="text-danger">{' *'}</span>
            </Label>
            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => {
                type TType = typeof value;
                type Option = { label: string, value: TType };
                const options = opportunityStatuses.map((status) => ({
                  label: i18n.t(`OPP.${status}`) || status,
                  value: status,
                }));
                // Replace by real value
                const optionValue = options.find(
                  (option) => option.value === value,
                );
                return (
                  <Select<Option>
                    isClearable={false}
                    classNamePrefix="select"
                    options={options}
                    theme={selectThemeColors}
                    className={classnames('react-select', { 'is-invalid': errors.status && true })}
                    isDisabled={false}
                    value={optionValue}
                    onChange={(option) => onChange(option?.value)}
                    {...rest}
                  />
                );
              }}
            />
            {errors.status && <FormFeedback>{i18n.t('OPP.VALIDATOR_STATUS_TEXT')}</FormFeedback>}
          </Col>
          {/* Text area for Opp lost reason */}
          <Col sm="12" className="mb-1">
            <Label className="form-label" for="closedLostReason">
              {i18n.t('OPP.CLOSED_LOST_REASON')}
            </Label>
            <Controller
              name="closedLostReason"
              control={control}
              defaultValue={opportunity?.closedLostReason}
              render={({ field }) => (
                <Input
                  id="closedLostReason"
                  type="textarea"
                  placeholder={i18n.t('OPP.CLOSED_LOST_REASON')}
                  invalid={errors.closedLostReason && true}
                  {...field}
                />
              )}
            />
            {errors.closedLostReason && <FormFeedback>{i18n.t('OPP.VALIDATOR_CLOSED_LOST_REASON_TEXT')}</FormFeedback>}
          </Col>
          {/* Estimated close date */}
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="estimatedConfirmDate">
              {i18n.t('OPP.ESTIMATED_CONFIRM_DATE')}
              <span className="text-danger">{' *'}</span>
            </Label>
            <Controller
              name="estimatedConfirmDate"
              control={control}
              render={({
                field: {
                  // eslint-disable-next-line no-unused-vars
                  value, onChange, ref, ...rest
                },
              }) => (
                <Flatpickr
                  className={classnames('form-control', { 'is-invalid': errors.estimatedConfirmDate })}
                  id="estimatedConfirmDate"
                  value={value}
                  ref={fp}
                  options={{
                    dateFormat: FLATPICKR_DATE_FORMAT,
                    parseDate: (dateString) => moment(dateString).toDate(),
                  }}
                  defaultValue={flatpickr.formatDate(moment(value).toDate(), FLATPICKR_DATE_FORMAT)}
                  onChange={([selectedDate]) => onChange(selectedDate)}
                  {...rest}
                />
              )}
            />
            {
              (errors.estimatedConfirmDate
                && <FormFeedback>{i18n.t('OPP.VALIDATOR_ESTIMATED_CONFIRM_DATE_ERROR_TEXT')}</FormFeedback>
              )
            }
          </Col>
          {/* Action Buttons */}
          <Col className="mt-2" sm="12">
            <Button type="submit" className="me-1" color="primary">
              { !isUpdating ? i18n.t('COMMON.SAVE_CHANGES') : i18n.t('COMMON.LOADING')}
              {' '}
              { isUpdating && (
                <Spinner
                  style={{ width: '0.7rem', height: '0.7rem' }}
                  type="grow"
                  color="light"
                />
              )}
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              disabled={isUpdating}
              onClick={() => {
                reset(defaultFormData);
              }}
            >
              { i18n.t('COMMON.RESET')}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );

  return (
    <>
      <Row className="h-100">
        <Col xl="6" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <div className="d-flex flex-column align-content-start">
                <CardTitle tag="h4">{i18n.t('OPP.OPPORTUNITY_DETAILS')}</CardTitle>
                {
                  isFetching ? <Skeleton count={2} /> : renderDetailedInformationHeader()
                }
              </div>
            </CardHeader>
            <CardBody>
              {
                isFetching ? (
                  <div className="mt-1">
                    <Skeleton className="mt-1" count={6} height={60} />
                  </div>
                ) : renderDetailedInformationForm()
              }
            </CardBody>
          </Card>
        </Col>
        <Col className="pb-10" xl="6" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4">{i18n.t('TASK.TASKS_LIST')}</CardTitle>
              <CardTitle tag="h4">
                <Plus className="cursor-pointer" size={16} onClick={handleAddClick} />
              </CardTitle>
            </CardHeader>
            <CardBody className="py-2 my-25">
              {tasks.length > 0 ? (
                <OpportunityTasks
                  tasks={tasks}
                  query={query}
                  params={params}
                  setSort={handleSetSort}
                  setQuery={handleSetQuery}
                  updateTask={updateTask}
                  selectTask={handleSelectTask}
                  handleTaskSidebar={handleTaskSidebar}
                  handleAddTaskClick={handleAddClick}
                />
              ) : renderEmptyTasksContent()}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OpportunityInformationTabContent;
