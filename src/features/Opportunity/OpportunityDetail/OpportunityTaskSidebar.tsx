// ** React Imports
import React, { useState } from 'react';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import { Trash, X } from 'react-feather';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';

// ** Reactstrap Imports
import {
  Button, Form, FormFeedback, Input, Label, Modal, ModalBody,
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils/Utils';

// ** Styles Imports
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import moment from 'moment';
import { OpportunityTask, OpportunityNote, PriorityOption } from '@domain/entities/opportunity/Opportunity';
import i18n from '@config/i18n';
import classNames from 'classnames';
import { DATE_FORMAT } from '@utils/Constants';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// ** Function to capitalize the first letter of string
// const capitalize = (words: string) => words.charAt(0).toUpperCase() + words.slice(1);

interface PriorityOptData {
  label: string,
  value: PriorityOption,
}

type DataForm = {
  title: string,
  dueDate: string,
  description: string,
  priority: PriorityOptData,
};

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedTask: OpportunityTask | undefined,
  handleTaskSidebar: () => void,
  deleteTask: (task: OpportunityTask) => void,
}

interface TaskSidebarProps {
  open: boolean,
  selectedTask: OpportunityTask | undefined,
  handleTaskSidebar: () => void,
  updateTask: (task: OpportunityTask) => void,
  selectTask: (task?: OpportunityTask) => void,
  addTask: (task: OpportunityTask) => void,
  deleteTask: (task: OpportunityTask) => void,
}

interface NoteSidebarProps {
  open: boolean,
  selectedNote: OpportunityNote | undefined,
  handleNoteSidebar: () => void,
  updateNote: (task: OpportunityTask) => void,
  selectNote: (task?: OpportunityTask) => void,
  addNote: (task: OpportunityTask) => void,
  deleteNote: (task: OpportunityTask) => void,
}

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
        <X className="cursor-pointer fw-normal mt-25" size={16} onClick={handleTaskSidebar} />
      </div>
    </div>
  );
};

const OpportunityTaskSidebar = (props: TaskSidebarProps) => {
  // ** Props
  const {
    open,
    handleTaskSidebar,
    updateTask,
    addTask,
    selectTask,
    selectedTask,
    deleteTask,
  } = props;

  // const OpportunityNoteSidebar = (props: NoteSidebarProps) => {
  //   // ** Props
  //   const {
  //     open,
  //     handleNoteSidebar,
  //     updateNote,
  //     addNote,
  //     selectNote,
  //     selectedNote,
  //     deleteNote,
  //   } = props;

  // ** States
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(moment().format(DATE_FORMAT));

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
  const priorityOptions: PriorityOptData[] = [
    { value: PriorityOption.LOW, label: i18n.t('COMMON.SEVERITY_LOW') },
    { value: PriorityOption.MEDIUM, label: i18n.t('COMMON.SEVERITY_MEDIUM') },
    { value: PriorityOption.HIGH, label: i18n.t('COMMON.SEVERITY_HIGH') },
  ];

  // ** Init form controller by react hook form
  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
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
          {completed === true ? 'Completed' : 'Mark Complete'}
        </Button>
      );
    }
    return 'Add Task';
  };

  // ** Function to run when sidebar opens
  const handleSidebarOpened = () => {
    if (selectedTask) {
      setValue('title', selectedTask.title);
      setValue('description', selectedTask.description);
      setValue('priority', priorityOptions.find(
        (priority) => priority.value === selectedTask.priority,
      ) as PriorityOptData);
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

  // ** Function to reset fileds
  // const handleResetFields = () => {
  //   if (selectedTask) {
  //     setValue('title', selectedTask.title);
  //     setCompleted(selectedTask.isCompleted);
  //     setDueDate(selectedTask.dueDate);
  //   }
  // };

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (selectedTask) {
      return (
        <>
          <Button color="primary" className="update-btn update-todo-item me-1">
            {i18n.t('COMMON.UPDATE')}
          </Button>
          <Button color="secondary" onClick={handleTaskSidebar} outline>
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

  // ** Handle form submitting
  const onSubmit = (data: DataForm) => {
    const state: OpportunityTask = {
      id: new Date().getTime(),
      dueDate,
      title: data.title,
      priority: data.priority.value,
      description: data.description,
      isCompleted: completed,
      creatorId: undefined,
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
              {i18n.t('OPP.TITLE')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="task-title"
                  placeholder="Title"
                  className="new-todo-item-title"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && <FormFeedback>{i18n.t('OPP.FIELD_IS_INVALID', { field: i18n.t('OPP.TITLE') })}</FormFeedback>}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="dueDate">
              {i18n.t('OPP.DUE_DATE')}
            </Label>
            <Flatpickr
              id="dueDate"
              name="dueDate"
              className="form-control"
              onChange={(date) => setDueDate(moment(date[0]).format(DATE_FORMAT))}
              value={dueDate}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="priority">
              {i18n.t('OPP.PRIORITY')}
            </Label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  className={classNames('react-select', { 'is-invalid': errors.priority })}
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
              {i18n.t('OPP.DESCRIPTION')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  id="description"
                  placeholder="Description"
                  className="new-todo-item-title"
                  invalid={!!errors.description}
                  {...field}
                />
              )}
            />
            {errors.description && <FormFeedback>{i18n.t('OPP.FIELD_IS_INVALID', { field: i18n.t('OPP.DESCRIPTION') })}</FormFeedback>}
          </div>
          <div>{renderFooterButtons()}</div>
        </ModalBody>
      </Form>
    </Modal>
  );
};

export default OpportunityTaskSidebar;
