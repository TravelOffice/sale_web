// ** React Imports
import React, { useState, Fragment } from 'react';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import { X, Trash } from 'react-feather';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';

// ** Reactstrap Imports
import {
  Modal,
  ModalBody,
  Button,
  Form,
  Input,
  Label,
  FormFeedback,
} from 'reactstrap';

// ** Utils
import {
  selectThemeColors,
} from '@utils/Utils';

// ** Styles Imports
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import { Task } from '@domain/entities/Lead';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DATE_FORMAT } from '@utils/Constants';
import i18n from '@config/i18n';
import classnames from 'classnames';

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedTask: Task | undefined,
  handleTaskSidebar: () => void,
  deleteTask: (task: Task) => void,
}

interface TaskSidebarProps {
  open: boolean,
  selectedTask: Task | undefined,
  handleTaskSidebar: () => void,
  updateTask: (task: Task) => void,
  selectTask: (task?: Task) => void,
  addTask: (task: Task) => void,
  deleteTask: (task: Task) => void,
}

interface PriorityOption {
  label: string,
  value: string,
}

type OmitFields = 'creatorId' | 'creatorName';

export type TaskFormData = Omit < Task, OmitFields>;

// ** Modal Header
const ModalHeader = (props: ModalHeaderProps) => {
  // ** Props
  const {
    children,
    selectedTask = undefined,
    handleTaskSidebar,
    deleteTask,
  } = props;

  // ** Function to delete task
  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteTask(selectedTask);
      handleTaskSidebar();
    }
  };

  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="todo-item-action d-flex align-items-center">
        {selectedTask ? (
          <Trash className="cursor-pointer mt-25" size={16} onClick={() => handleDeleteTask()} />
        ) : null}
        <X className="fw-normal mt-25" size={16} onClick={handleTaskSidebar} />
      </div>
    </div>
  );
};

const LeadTaskSidebar = (props: TaskSidebarProps) => {
  // ** Props
  const {
    open,
    selectedTask,
    handleTaskSidebar,
    updateTask,
    addTask,
    selectTask,
    deleteTask,
  } = props;

  //  Yup schema for validate create/update lead task
  const TaskSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    dueDate: yup.date().required(),
    priority: yup.object().shape({
      value: yup.string().required(),
    }).required(),
  });

  // ** Tag Select Options
  const priorityOptions: PriorityOption[] = [
    { value: 'low', label: i18n.t('COMMON.SEVERITY_LOW') },
    { value: 'medium', label: i18n.t('COMMON.SEVERITY_MEDIUM') },
    { value: 'high', label: i18n.t('COMMON.SEVERITY_HIGH') },
  ];

  // ** States
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(moment().format(DATE_FORMAT));

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      dueDate: moment().format(DATE_FORMAT),
      description: '',
      priority: priorityOptions[0],
    },
    resolver: yupResolver(TaskSchema),
  });

  // ** Returns sidebar title
  const handleSidebarTitle = () => {
    if (selectedTask) {
      return (
        <Button
          outline
          size="sm"
          onClick={() => setCompleted(!completed)}
          color={completed === true ? 'success' : 'secondary'}
        >
          {completed === true ? i18n.t('LEAD.COMPLETE') : i18n.t('LEAD.MARK_COMPLETE')}
        </Button>
      );
    }
    return i18n.t('LEAD.ADD_TASK');
  };

  // ** Function to run when sidebar opens
  const handleSidebarOpened = () => {
    if (selectedTask) {
      setValue('title', selectedTask.title);
      setValue('description', selectedTask.description);
      setValue('priority', priorityOptions.find(
        (priority) => priority.value === selectedTask.priority,
      ) as PriorityOption);
      setCompleted(selectedTask.isCompleted);
      setDueDate(selectedTask.dueDate);
    }
  };

  // ** Function to run when sidebar closes
  const handleSidebarClosed = () => {
    setValue('title', '');
    setValue('description', '');
    setValue('priority', priorityOptions[0]);
    setCompleted(false);
    setDueDate(moment().format(DATE_FORMAT));
    selectTask(undefined);
    clearErrors();
  };

  // ** Function to reset fields
  const handleResetFields = () => {
    if (selectedTask) {
      setValue('title', selectedTask.title);
      setCompleted(selectedTask.isCompleted);
      setDueDate(selectedTask.dueDate);
      handleTaskSidebar();
    }
  };

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (selectedTask) {
      return (
        <>
          <Button color="primary" className="update-btn update-fields-todo-item me-1">
            {i18n.t('COMMON.UPDATE')}
          </Button>
          <Button color="secondary" onClick={handleResetFields} outline>
            {i18n.t('COMMON.CANCEL')}
          </Button>
        </>
      );
    }
    return (
      <>
        <Button color="primary" className="add-todo-item me-1">
          {i18n.t('COMMON.ADD')}
        </Button>
        <Button color="secondary" onClick={handleTaskSidebar} outline>
          {i18n.t('COMMON.CANCEL')}
        </Button>
      </>
    );
  };

  const onSubmit = (data: TaskFormData) => {
    const state: Task = {
      id: new Date().getTime(),
      dueDate,
      title: data.title,
      priority: data.priority.value,
      description: data.description,
      isCompleted: completed,
      creatorID: undefined,
      creatorName: undefined,
    };

    if (!selectedTask) {
      addTask(state);
    } else {
      updateTask({
        ...state,
        id: selectedTask.id,
        creatorId: selectedTask.creatorId,
        creatorName: selectedTask.creatorName,
      });
    }
    handleTaskSidebar();
  };
  return (
    <Modal
      isOpen={open}
      toggle={handleTaskSidebar}
      className="sidebar-lg"
      contentClassName="p-0"
      onOpened={handleSidebarOpened}
      onClosed={handleSidebarClosed}
      modalClassName="modal-slide-in sidebar-todo-modal"
    >
      <Form id="form-modal-todo" className="todo-modal" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader
          selectedTask={selectedTask}
          deleteTask={deleteTask}
          handleTaskSidebar={handleTaskSidebar}
        >
          {handleSidebarTitle()}
        </ModalHeader>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <div className="mb-1">
            <Label className="form-label" for="task-title">
              {i18n.t('COMMON.TITLE')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="task-title"
                  placeholder={i18n.t('COMMON.TITLE')}
                  className="new-todo-item-title"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && <FormFeedback>{i18n.t('LEAD.FIELD_IS_INVALID', { field: i18n.t('COMMON.TITLE') })}</FormFeedback>}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="dueDate">
              {i18n.t('LEAD.DUE_DATE')}
            </Label>
            <Flatpickr
              id="dueDate"
              name="dueDate"
              className="form-control"
              onChange={(date) => setDueDate(moment(date[0]).format(DATE_FORMAT))}
              value={dueDate}
            />
            {errors.dueDate && <FormFeedback>{i18n.t('LEAD.FIELD_IS_INVALID', { field: i18n.t('LEAD.DUE_DATE') })}</FormFeedback>}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="priority">
              Priority
            </Label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  className={classnames('react-select', { 'is-invalid': errors.priority })}
                  classNamePrefix="select"
                  isClearable={false}
                  options={priorityOptions}
                  getOptionLabel={(option) => {
                    const tag = priorityOptions.find((e) => e.value === option.value);
                    return tag?.label || '';
                  }}
                  theme={selectThemeColors}
                  {...field}
                />
              )}
            />
          </div>
          <div className="mb-1">
            <Label for="task-desc" className="form-label">
              {i18n.t('LEAD.DESCRIPTION')}
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  id="description"
                  type="textarea"
                  placeholder="Description"
                  className="new-todo-item-title"
                  invalid={errors.description && true}
                  {...field}
                />
              )}
            />
            {errors.description
            && <FormFeedback>{i18n.t('LEAD.FIELD_IS_INVALID', { field: i18n.t('LEAD.DESCRIPTION') })}</FormFeedback>}
          </div>
          <div>{renderFooterButtons()}</div>
        </ModalBody>
      </Form>
    </Modal>
  );
};

export default LeadTaskSidebar;
