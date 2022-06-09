import React, {
  MouseEventHandler,
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from 'reactstrap';
import toasty from '@components/Toasty/Toasty';
import Skeleton from 'react-loading-skeleton';
import { Calendar, Plus, User } from 'react-feather';
import Select from 'react-select';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import classnames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import moment from 'moment';

import i18n from '@config/i18n';
import { opportunityActions } from '@redux/slices/opportunitySlice';
import { RootState } from '@redux/store';
import { opportunityPresenter } from '@adapter/presenters';
import {
  Opportunity,
  opportunityPotentials,
  opportunitySources,
  opportunityStatuses,
  OpportunityNoteSearchParams,
  OpportunityTask,
  OppTaskSortEnum,
  OppNoteSortEnum,
  OpportunityTaskSearchParams,
  OpportunityNote,
} from '@domain/entities/opportunity/Opportunity';
import { selectThemeColors } from '@utils/Utils';
import { DATE_FORMAT, FLATPICKR_DATE_FORMAT } from '@utils/Constants';
import OpportunityTasks from './OpportunityTasks';
import OpportunityNotes from './OpportunityNotes';
import OpportunityTaskSidebar from './OpportunityTaskSidebar';
import OpportunityNoteSidebar from './OpportunityNoteSidebar';

import 'react-loading-skeleton/dist/skeleton.css';

interface ParamTypes {
  leadId: string,
  oppId: string,
}

const {
// getOpportunity,  //selectNote,  //getAllNotes,
  // getOpportunity,
  // getAllTasks,
  // selectTask,
  // updateTask,
  selectOpportunity,
  unSelectOpportunity,
} = opportunityActions;

const filterTaskByParams = (tasks: OpportunityTask[], params: OpportunityTaskSearchParams) => {
  let tasksFilter: OpportunityTask[] = [...tasks];

  // Filter by query
  if (params.query && params.query.length) {
    tasksFilter = tasksFilter.filter(
      (task: OpportunityTask) => {
        const regex = new RegExp(params.query, 'gi');
        return regex.test(task.title);
      },
    );
  }

  // Sort the task
  switch (params.sortBy) {
    case OppTaskSortEnum.TITLE_ASC:
      tasksFilter = tasksFilter.sort(
        (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
      break;
    case OppTaskSortEnum.TITLE_DESC:
      tasksFilter = tasksFilter.sort(
        (a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
      );
      break;
    case OppTaskSortEnum.DUE_DATE:
      tasksFilter = tasksFilter.sort(
        (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate),
      );
      break;
    default:
      break;
  }
  return tasksFilter;
};

const filterNoteByParams = (notes: OpportunityNote[], params: OpportunityNoteSearchParams) => {
  let notesFilter: OpportunityNote[] = [...notes];

  // Filter by query
  if (params.query && params.query.length) {
    notesFilter = notesFilter.filter(
      (note: OpportunityTask) => {
        const regex = new RegExp(params.query, 'gi');
        return regex.test(note.title);
      },
    );
  }

  // Sort the note
  switch (params.sortBy) {
    case OppNoteSortEnum.TITLE_ASC:
      notesFilter = notesFilter.sort(
        (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
      break;
    case OppNoteSortEnum.TITLE_DESC:
      notesFilter = notesFilter.sort(
        (a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
      );
      break;
    case OppNoteSortEnum.DUE_DATE:
      notesFilter = notesFilter.sort(
        (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate),
      );
      break;
    default:
      break;
  }
  return notesFilter;
};

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
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);
  const [openNoteSidebar, setOpenNoteSidebar] = useState(false);
  const [selectedTask, setSelectedTask] = useState<OpportunityTask | undefined>();
  const [selectedNote, setSelectedNote] = useState<OpportunityTask | undefined>();
  const [taskSearchParams, setTaskSearchParams] = useState<OpportunityTaskSearchParams>({ query: '' });
  const [noteSearchParams, setNoteSearchParams] = useState<OpportunityNoteSearchParams>({ query: '' });
  const [areTasksChanged, setTasksChanged] = useState(false);
  const [areNotesChanged, setNotesChanged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tasks, setTasks] = useState<OpportunityTask[]>([]);
  const [notes, setNotes] = useState<OpportunityNote[]>([]);
  const [tasksFiltered, setTasksFiltered] = useState<OpportunityTask[]>([]);
  const [notesFiltered, setNotesFiltered] = useState<OpportunityTask[]>([]);
  const [openDiscardWarning, setOpenDiscardWarning] = useState(false);

  // ** Selectors
  const opportunity = useSelector((
    state: RootState,
  ) => state.opportunity.selectedOpportunity);

  const isUpdating = useSelector((
    state: RootState,
  ) => state.opportunity.createOrUpdateOpportunityLoading);
  const isFetching = useSelector((
    state: RootState,
  ) => state.opportunity.getOpportunityLoading);

  //
  const fp = useRef(null);

  // Set task in first load
  useEffect(() => {
    if (!tasks.length) {
      const tasksWithId: OpportunityTask[] = opportunity?.tasks
        ? opportunity.tasks.map((task, index) => ({
          ...task,
          id: index,
        }))
        : [];
      setTasks(tasksWithId);
    }
  }, [opportunity]);

  useEffect(() => {
    // Prevent refreshing browser or opening opp detail directly
    // Opportunity need to be fetched and set as selected opportunity in opp state
    if (!opportunity) {
      dispatch(selectOpportunity([leadId, oppId]));
    }
  }, [opportunity]);

  useEffect(() => () => {
    dispatch(unSelectOpportunity());
    setTasks([]);
  }, []);

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
  // useEffect(() => {
  //   // dispatch(selectOpportunity(id));
  //   params.sortBy = sort;
  //   params.query = query;
  //   dispatch(getAllTasks(params));
  // }, [leadId, query, sort]);

  // Update the filtered task when tasks or search param updated
  useEffect(() => {
    const tasksFilter: OpportunityTask[] = filterTaskByParams(tasks, taskSearchParams);
    setTasksFiltered(tasksFilter);
  }, [tasks, taskSearchParams]);

    // Update the filtered note when tasks or search param updated
    useEffect(() => {
      const notesFilter: OpportunityTask[] = filterNoteByParams(notes, noteSearchParams);
      setNotesFiltered(notesFilter);
    }, [notes, noteSearchParams]);

  const onSubmit = useCallback((formData) => {
    // Submit form to update the opportunity
    const updatedOpportunity = {
      ...opportunity,
      ...formData,
      estimatedConfirmDate: moment(formData.estimatedConfirmDate).format(DATE_FORMAT),
    };
    dispatch(opportunityActions.updateOpportunity(updatedOpportunity));
  }, [opportunity]);
// ** Function to handle save new change to BE and store
  const handleSaveAllTasks = async () => {
    const newTasks = tasks.map((task) => {
      const {
        // eslint-disable-next-line no-unused-vars
        id, ...newTask
      } = task;
      return newTask;
    });
    if (opportunity) {
      const newOpp: Opportunity = { ...opportunity, tasks: newTasks as OpportunityTask[] };
      try {
        setSubmitting(true);
        await opportunityPresenter.updateOpportunity(newOpp);
        dispatch(selectOpportunity(newOpp));
        toasty.show({
          title: i18n.t('COMMON.SUCCESS'),
          type: 'success',
          message: i18n.t('OPP.UPDATE_TASKS_SUCCESSFULLY'),
        });
        setTasksChanged(false);
      } catch (e: any) {
        toasty.show({
          title: i18n.t('COMMON.ERROR'),
          type: 'error',
          message: `${e.message}`,
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

// ** Function to handle save new change to BE and store
  const handleSaveAllNotes = async () => {
    const newNotes = notes.map((note) => {
      const {
        // eslint-disable-next-line no-unused-vars
        id, ...newNote
      } = note;
      return newNote;
    });
    if (opportunity) {
      const newOpp: Opportunity = { ...opportunity, tasks: newNotes as OpportunityNote[] };
      try {
        setSubmitting(true);
        await opportunityPresenter.updateOpportunity(newOpp);
        dispatch(selectOpportunity(newOpp));
        toasty.show({
          title: i18n.t('COMMON.SUCCESS'),
          type: 'success',
          message: i18n.t('OPP.UPDATE_TASKS_SUCCESSFULLY'),
        });
        setNotesChanged(false);
      } catch (e: any) {
        toasty.show({
          title: i18n.t('COMMON.ERROR'),
          type: 'error',
          message: `${e.message}`,
        });
      } finally {
        setSubmitting(false);
      }
    }
  };


  // ** Toggle discard warning dialog
  const toggleDiscardWarningDialog = () => {
    setOpenDiscardWarning(!openDiscardWarning);
  };

  // ** Dispatch action to delete opportunity from server
  const handleDiscardTasks: MouseEventHandler = (e) => {
    e.preventDefault();
    toggleDiscardWarningDialog();
  };

  // ** Dispatch action to delete opportunity from server
  const handleDiscardNotes: MouseEventHandler = (e) => {
    e.preventDefault();
    toggleDiscardWarningDialog();
  };

  // ** Function to handle discard the change of task list
  const onDiscardTasks = () => {
    toggleDiscardWarningDialog();
    const tasksWithId: OpportunityTask[] = opportunity?.tasks
      ? opportunity.tasks.map((task, index) => ({
        ...task,
        id: index,
      }))
      : [];
    setTasks(tasksWithId);
    setTasksChanged(false);
  };

  // ** Function to handle discard the change of note list
  const onDiscardNotes = () => {
    toggleDiscardWarningDialog();
    const notesWithId: OpportunityNote[] = opportunity?.notes
      ? opportunity.notes.map((note, index) => ({
        ...note,
        id: index,
      }))
      : [];
    setNotes(notesWithId);
    setNotesChanged(false);
  };

  // ** Function to handle Task sidebar
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

  // ** Function to handle Note sidebar
  const handleNoteSidebar = () => setOpenNoteSidebar(!openNoteSidebar);

  // ** Function To Handle Add Task Click
  const handleAddTaskClick = () => {
    handleTaskSidebar();
  };

  // ** Function To Handle Add Task Click
  const handleAddNoteClick = () => {
    handleNoteSidebar();
  };

  // ** Function to handle adding new task
  const handleAddTask = (task: OpportunityTask) => {
    const newTasks = [...tasks];
    newTasks.push(task);
    setTasks(newTasks);
    setTasksChanged(true);
  };

  // ** Function to handle adding new note
  const handleAddNote = (note: OpportunityNote) => {
    const newNotes = [...notes];
    newNotes.push(note);
    setNotes(newNotes);
    setNotesChanged(true);
  };

  // ** Function to handle task updated
  const handleUpdateTask = (updateTask: OpportunityTask) => {
    const newTasks: OpportunityTask[] = tasks.map((task: OpportunityTask) => {
      if (task.id === updateTask.id) {
        return updateTask;
      }
      return task;
    });
    setTasks(newTasks);
    setTasksChanged(true);
  };

    // ** Function to handle task updated
    const handleUpdateNote = (updateTask: OpportunityTask) => {
      const newTasks: OpportunityTask[] = tasks.map((task: OpportunityTask) => {
        if (task.id === updateTask.id) {
          return updateTask;
        }
        return task;
      });
      setNotes(newTasks);
      setNotesChanged(true);
    };

  // ** Function to handle task deleted
  const handleDeleteTask = (deleteTask: OpportunityTask) => {
    const newTasks = tasks.filter((task: OpportunityTask) => task.id !== deleteTask.id);
    setTasks(newTasks);
    setTasksChanged(true);
  };

  // ** Function to handle note deleted
  const handleDeleteNote = (deleteNote: OpportunityNote) => {
    const newNotes = notes.filter((note: OpportunityTask) => note.id !== deleteNote.id);
    setNotes(newNotes);
    setNotesChanged(true);
  };

  // ** Function to handle select task
  const handleSelectTask = (task?: OpportunityTask) => {
    setSelectedTask(task);
  };

  // ** Function to handle select task
  const handleSelectNote = (note?: OpportunityNote) => {
    setSelectedNote(note);
  };

  // ** Function to handle task sorting
  const handleSetSortTask = (sortType?: OppTaskSortEnum) => {
    setTaskSearchParams({
      ...taskSearchParams,
      sortBy: sortType,
    });
  };

  // ** Function to handle note sorting
  const handleSetSortNote = (sortType?: OppNoteSortEnum) => {
    setNoteSearchParams({
      ...noteSearchParams,
      sortBy: sortType,
    });
  };

  // ** Function to handle task searching
  const handleSetQuery = (queryString: string) => {
    setTaskSearchParams({
      ...taskSearchParams,
      query: queryString,
    });
  };
  // ** Function to handle re-order task list
  const handleReOrderTasks = (newTasks: OpportunityTask[]) => {
    setTasks(newTasks);
  };

  // ** Function to handle re-order task list
  const handleReOrderNotes = (newTasks: OpportunityNote[]) => {
    setNotes(newTasks);
  };

  const renderEmptyTasksContent = () => (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{i18n.t('TASK.TASKS_EMPTY_TITLE')}</h2>
          <p className="mb-2">{i18n.t('TASK.TASKS_EMPTY_SUB_TITLE')}</p>
          <Button onClick={handleAddTaskClick} color="primary" className="btn-sm-block mb-2">
            {i18n.t('TASK.ADD_NEW_TASK')}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderEmptyNotesContent = () => (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{i18n.t('NOTE.NOTES_EMPTY_TITLE')}</h2>
          <p className="mb-2">{i18n.t('NOTE.NOTES_EMPTY_SUB_TITLE')}</p>
          <Button onClick={handleAddNoteClick} color="primary" className="btn-sm-block mb-2">
            {i18n.t('NOTE.ADD_NEW_NOTE')}
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

  const renderChangedConfirmationTasks = () => (
    <CardFooter>
      <Row>
        <Col className="mt-2" sm="12">
          <Button type="submit" className="me-1" color="primary" onClick={handleSaveAllTasks}>
            { !submitting ? i18n.t('COMMON.SAVE_CHANGES') : i18n.t('COMMON.LOADING')}
            {' '}
            { submitting ? (
              <Spinner
                style={{ width: '0.7rem', height: '0.7rem' }}
                type="grow"
                color="light"
              />
            ) : null }
          </Button>
          <Button color="secondary" outline onClick={handleDiscardTasks}>
            {i18n.t('COMMON.DISCARD')}
          </Button>
          <Modal
            isOpen={openDiscardWarning}
            toggle={toggleDiscardWarningDialog}
            className="modal-dialog-centered"
            modalClassName="modal-warning"
          >
            <ModalHeader
              toggle={toggleDiscardWarningDialog}
            >
              {i18n.t('OPP.DISCARD_TASK_WARNING_TITLE')}
            </ModalHeader>
            <ModalBody>
              {i18n.t('OPP.DISCARD_TASK_WARNING_MESSAGE')}
            </ModalBody>
            <ModalFooter>
              <Button outline color="secondary" onClick={() => setOpenDiscardWarning(!openDiscardWarning)}>
                {i18n.t('COMMON.CANCEL')}
              </Button>
              <Button color="warning" onClick={onDiscardTasks}>
                {i18n.t('COMMON.YES')}
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </CardFooter>
  );

  const renderChangedConfirmationNotes = () => (
    <CardFooter>
      <Row>
        <Col className="mt-2" sm="12">
          <Button type="submit" className="me-1" color="primary" onClick={handleSaveAllNotes}>
            { !submitting ? i18n.t('COMMON.SAVE_CHANGES') : i18n.t('COMMON.LOADING')}
            {' '}
            { submitting ? (
              <Spinner
                style={{ width: '0.7rem', height: '0.7rem' }}
                type="grow"
                color="light"
              />
            ) : null }
          </Button>
          <Button color="secondary" outline onClick={handleDiscardNotes}>
            {i18n.t('COMMON.DISCARD')}
          </Button>
          <Modal
            isOpen={openDiscardWarning}
            toggle={toggleDiscardWarningDialog}
            className="modal-dialog-centered"
            modalClassName="modal-warning"
          >
            <ModalHeader
              toggle={toggleDiscardWarningDialog}
            >
              {i18n.t('OPP.DISCARD_NOTE_WARNING_TITLE')}
            </ModalHeader>
            <ModalBody>
              {i18n.t('OPP.DISCARD_NOTE_WARNING_MESSAGE')}
            </ModalBody>
            <ModalFooter>
              <Button outline color="secondary" onClick={() => setOpenDiscardWarning(!openDiscardWarning)}>
                {i18n.t('COMMON.CANCEL')}
              </Button>
              <Button color="warning" onClick={onDiscardNotes}>
                {i18n.t('COMMON.YES')}
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </CardFooter>
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
              <OpportunityTaskSidebar
                open={openTaskSidebar}
                handleTaskSidebar={handleTaskSidebar}
                addTask={handleAddTask}
                selectedTask={selectedTask}
                selectTask={handleSelectTask}
                updateTask={handleUpdateTask}
                deleteTask={handleDeleteTask}
              />
              <OpportunityNoteSidebar
                open={openNoteSidebar}
                handleNoteSidebar={handleNoteSidebar}
                addNote={handleAddNote}
                selectedNote={selectedNote}
                selectNote={handleSelectNote}
                updateNote={handleUpdateNote}
                deleteNote={handleDeleteNote}
              />
            </CardBody>
          </Card>
        </Col>
        <Col className="pb-10" xl="6" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4">{i18n.t('TASK.TASKS_LIST')}</CardTitle>
              <CardTitle tag="h4">
                <Plus className="cursor-pointer" size={16} onClick={handleAddTaskClick} />
              </CardTitle>
            </CardHeader>
            <CardBody className="py-2 my-25">
              {tasks.length > 0 ? (
                <OpportunityTasks
                  tasks={tasksFiltered}
                  query={taskSearchParams.query}
                  params={taskSearchParams}
                  setSort={handleSetSortTask}
                  setQuery={handleSetQuery}
                  updateTask={handleUpdateTask}
                  selectTask={handleSelectTask}
                  handleTaskSidebar={handleTaskSidebar}
                  handleAddTaskClick={handleAddTaskClick}
                  reOrderTasks={handleReOrderTasks}
                />
              ) : renderEmptyTasksContent()}
            </CardBody>
            {areTasksChanged && renderChangedConfirmationTasks()}
          </Card>

          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4">{i18n.t('NOTE.NOTES_LIST')}</CardTitle>
              <CardTitle tag="h4">
                <Plus className="cursor-pointer" size={16} onClick={handleAddNoteClick} />
              </CardTitle>
            </CardHeader>
            <CardBody className="py-2 my-25">
              {notes.length > 0 ? (
                <OpportunityNotes
                  notes={notesFiltered}
                  query={noteSearchParams.query}
                  params={noteSearchParams}
                  setSort={handleSetSortNote}
                  setQuery={handleSetQuery}
                  updateNote={handleUpdateNote}
                  selectNote={handleSelectNote}
                  handleNoteSidebar={handleTaskSidebar}
                  handleAddNoteClick={handleAddNoteClick}
                  reOrderNotes={handleReOrderNotes}
                />
              ) : renderEmptyNotesContent()}
            </CardBody>
            {areNotesChanged && renderChangedConfirmationNotes()}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OpportunityInformationTabContent;
