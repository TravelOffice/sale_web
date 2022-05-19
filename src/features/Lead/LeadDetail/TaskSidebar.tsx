// ** React Imports
import React, { useState, Fragment } from 'react';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import { X, Trash } from 'react-feather';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';

// ** Reactstrap Imports
import {
  Modal, ModalBody, Button, Form, Input, Label, FormFeedback,
} from 'reactstrap';

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils/Utils';

// ** Styles Imports
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import { Task } from '@domain/entities/Lead';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import moment from 'moment';

// ** Function to capitalize the first letter of string
// const capitalize = (words: string) => words.charAt(0).toUpperCase() + words.slice(1);

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  handleTaskSidebar: () => {},
  // setDeleted: () => {},
  // deleted: boolean,
  // deleteTask: () => {},
}

interface TaskSidebarProps {
  open: boolean,
  handleTaskSidebar: () => {},
  updateTask: (task: Task) => {},
  selectTask: (task: Task) => {},
  addTask: (task: Task) => {},
  deleteTask: (task: Task) => {},
}

// ** Modal Header
const ModalHeader = (props: ModalHeaderProps) => {
  // ** Props
  const {
    children,
    handleTaskSidebar,
    // setDeleted,
    // deleted,
    // deleteTask,
  } = props;

  const selectedTask = useSelector((state: RootState) => state.lead.selectedTask);

  // ** Function to delete task
  const handleDeleteTask = () => {
    // setDeleted(!deleted);
    // dispatch(deleteTask(store.selectedTask.id));
    handleTaskSidebar();
  };

  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="todo-item-action d-flex align-items-center">
        {!isObjEmpty(selectedTask) ? (
          <Trash className="cursor-pointer mt-25" size={16} onClick={() => handleDeleteTask()} />
        ) : null}
        <X className="fw-normal mt-25" size={16} onClick={handleTaskSidebar} />
      </div>
    </div>
  );
};

const TaskSidebar = (props: TaskSidebarProps) => {
  // ** Props
  const {
    open,
    handleTaskSidebar,
    // updateTask,
    // addTask,
    // selectTask,
    // deleteTask,
  } = props;

  const selectedTask = useSelector((state: RootState) => state.lead.selectedTask);

  // ** States
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState('');
  const [completed, setCompleted] = useState(false);
  // const [deleted, setDeleted] = useState(false);
  const [dueDate, setDueDate] = useState('');

  console.log(desc);

  const {
    control,
    // setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title: '' },
  });

  // ** Tag Select Options
  // const tagOptions = [
  //   { value: 'team', label: 'Team' },
  //   { value: 'low', label: 'Low' },
  //   { value: 'medium', label: 'Medium' },
  //   { value: 'high', label: 'High' },
  //   { value: 'update', label: 'Update' },
  // ];

  // ** Returns sidebar title
  const handleSidebarTitle = () => {
    if (!isObjEmpty(selectedTask)) {
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
      setCompleted(selectedTask.isCompleted);
      setDueDate(selectedTask.dueDate);
      setDesc(selectedTask.description);

      // if (selectedTask.tags.length) {
      //   const tags = [];
      //   selectedTask.tags.map((tag) => {
      //     tags.push({ value: tag, label: capitalize(tag) });
      //   });
      //   setTags(tags);
      // }
    }
  };

  // ** Function to run when sidebar closes
  const handleSidebarClosed = () => {
    setTags([]);
    setDesc('');
    setValue('title', '');
    setCompleted(false);
    setDueDate(moment().format('Y-m-d'));
    // dispatch(selectTask({}));
  };

  // ** Function to reset fileds
  const handleResetFields = () => {
    if (selectedTask) {
      const descValue = selectedTask.description;

      setValue('title', selectedTask.title);
      setDesc(descValue);
      setCompleted(selectedTask.isCompleted);
      // setDeleted(selectedTask.isDeleted);
      setDueDate(selectedTask.dueDate);
      // if (selectedTask.tags.length) {
      //   const tags = [];
      //   selectedTask.tags.map((tag) => {
      //     tags.push({ value: tag, label: capitalize(tag) });
      //   });
      //   setTags(tags);
      // }
    }
  };

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (selectedTask) {
      return (
        <>
          <Button color="primary" className="update-btn update-todo-item me-1">
            Update
          </Button>
          <Button color="secondary" onClick={handleResetFields} outline>
            Reset
          </Button>
        </>
      );
    }
    return (
      <>
        <Button color="primary" className="add-todo-item me-1">
          Add
        </Button>
        <Button color="secondary" onClick={handleTaskSidebar} outline>
          Cancel
        </Button>
      </>
    );
  };

  const onSubmit = () => {
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
          // deleted={deleted}
          // deleteTask={deleteTask}
          // setDeleted={setDeleted}
          handleTaskSidebar={handleTaskSidebar}
        >
          {handleSidebarTitle()}
        </ModalHeader>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <div className="mb-1">
            <Label className="form-label" for="task-title">
              Title
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
            {errors.title && <FormFeedback>Please enter a valid task title</FormFeedback>}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="due-date">
              Due Date
            </Label>
            <Flatpickr
              id="due-date"
              name="due-date"
              className="form-control"
              onChange={(date) => setDueDate(moment(date[0]).format('Y-m-d'))}
              value={dueDate}
              options={{ dateFormat: 'Y-m-d' }}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="task-tags">
              Tags
            </Label>
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              // options={tagOptions}
              theme={selectThemeColors}
              value={tags}
              onChange={(data) => {
                setTags(data !== null ? [...data] : []);
              }}
            />
          </div>
          <div className="mb-1">
            <Label for="task-desc" className="form-label">
              Description
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="description"
                  placeholder="Description"
                  className="new-todo-item-title"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
          </div>
          <div>{renderFooterButtons()}</div>
        </ModalBody>
      </Form>
    </Modal>
  );
};

export default TaskSidebar;
