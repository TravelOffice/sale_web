// ** React Imports
import React, { MouseEventHandler, useEffect, useState } from 'react';

// ** Third Party Components
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { leadActions } from '@redux/slices/leadSlice';

// ** Reactstrap Imports
import {
  Row, Col, Card, Button,
  CardBody, CardTitle,
  CardHeader, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter, Spinner,
} from 'reactstrap';
import { RootState } from '@redux/store';
import {
  Lead, Task,
  TaskSearchParams, TaskSortEnum,
} from '@domain/entities/Lead';
import i18n from '@config/i18n';
import { PlusSquare } from 'react-feather';
import { leadPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import LeadTasks from './LeadTasks';
import LeadTaskSidebar from './LeadTaskSidebar';
import LeadInformation from './LeadInformation';

interface ParamTypes {
  leadId: string
}

const {
  getLead,
  selectLead,
  unSelectLead,
} = leadActions;

const filterTaskByParams = (tasks: Task[], params: TaskSearchParams) => {
  let tasksFilter: Task[] = [...tasks];

  // Filter by query
  if (params.query && params.query.length) {
    tasksFilter = tasksFilter.filter(
      (task: Task) => {
        const regex = new RegExp(params.query, 'gi');
        return regex.test(task.title);
      },
    );
  }

  // Sort the task
  switch (params.sortBy) {
    case TaskSortEnum.TITLE_ASC:
      tasksFilter = tasksFilter.sort(
        (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
      break;
    case TaskSortEnum.TITLE_DESC:
      tasksFilter = tasksFilter.sort(
        (a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
      );
      break;
    case TaskSortEnum.DUE_DATE:
      tasksFilter = tasksFilter.sort(
        (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate),
      );
      break;
    default:
      break;
  }
  return tasksFilter;
};

const InformationTabContent = () => {
  // ** States
  const [tasksFiltered, setTasksFiltered] = useState<Task[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [taskSearchParams, setTaskSearchParams] = useState<TaskSearchParams>({ query: '' });
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);
  const [openDiscardWarning, setOpenDiscardWarning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [areTasksChanged, setTasksChanged] = useState(false);

  // ** Hooks
  const { leadId } = useParams<ParamTypes>();
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(unSelectLead());
    setTasks([]);
  }, []);

  // ** Get lead on mount
  useEffect(() => {
    dispatch(getLead(leadId));
  }, [leadId]);

  const lead = useSelector((state: RootState) => state.lead.selectedLead);

  // Set task in first load
  useEffect(() => {
    if (!tasks.length) {
      const tasksWithId: Task[] = lead?.tasks ? lead.tasks.map((task, index) => ({
        ...task,
        id: index,
      })) : [];
      setTasks(tasksWithId);
    }
  }, [lead]);

  // Update the filtered task when tasks or search param updated
  useEffect(() => {
    const tasksFilter: Task[] = filterTaskByParams(tasks, taskSearchParams);
    setTasksFiltered(tasksFilter);
  }, [tasks, taskSearchParams]);

  // ** Function to handle Task sidebar
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

  // ** Functions To Handle Add Task Click
  const handleAddClick = () => {
    handleTaskSidebar();
  };

  const handleSelectTask = (task?: Task) => {
    setSelectedTask(task);
  };

  const handleSetSort = (sortType?: TaskSortEnum) => {
    setTaskSearchParams({
      ...taskSearchParams,
      sortBy: sortType,
    });
  };

  const handleSetQuery = (queryString: string) => {
    setTaskSearchParams({
      ...taskSearchParams,
      query: queryString,
    });
  };

  const handleAddTask = (task: Task) => {
    const newTasks = [...tasks];
    newTasks.push(task);
    setTasks(newTasks);
    setTasksChanged(true);
  };

  const handleUpdateTask = (updateTask: Task) => {
    const newTasks: Task[] = tasks.map((task: Task) => {
      if (task.id === updateTask.id) {
        return updateTask;
      }
      return task;
    });
    setTasks(newTasks);
    setTasksChanged(true);
  };

  const handleDeleteTask = (deleteTask: Task) => {
    const newTasks = tasks.filter((task: Task) => task.id !== deleteTask.id);
    setTasks(newTasks);
  };

  const handleReOrderTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const handleSaveAllTasks = async () => {
    const newTasks = tasks.map((task) => {
      const {
        // eslint-disable-next-line no-unused-vars
        id, selected, chosen, filtered, ...newTask
      } = task;
      return newTask;
    });
    if (lead) {
      const newLead: Lead = { ...lead, tasks: newTasks };
      try {
        setSubmitting(true);
        await leadPresenter.updateLead(newLead);
        dispatch(selectLead(newLead));
        toasty.show({
          title: i18n.t('COMMON.SUCCESS'),
          type: 'success',
          message: i18n.t('LEAD.UPDATE_TASKS_SUCCESSFULLY'),
        });
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

  // Toggle discard warning dialog
  const toggleDiscardWarningDialog = () => {
    setOpenDiscardWarning(!openDiscardWarning);
  };

  // Dispatch action to delete opportunity from server
  const handleDiscardTasks: MouseEventHandler = (e) => {
    e.preventDefault();
    toggleDiscardWarningDialog();
  };

  const onDiscardTasks = () => {
    toggleDiscardWarningDialog();
    const tasksWithId: Task[] = lead?.tasks ? lead.tasks.map((task, index) => ({
      ...task,
      id: index,
    })) : [];
    setTasks(tasksWithId);
    setTasksChanged(false);
  };

  return (
    <>
      <Row className="h-100">
        <Col xl="4" sm="12">
          <LeadInformation lead={lead} />
        </Col>
        <Col xl="8" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4">{i18n.t('COMMON.TASK')}</CardTitle>
              <CardTitle tag="h4">
                <PlusSquare className="cursor-pointer" size={16} onClick={handleAddClick} />
              </CardTitle>
            </CardHeader>
            <CardBody className="py-2 my-25">
              {tasksFiltered && (
                <LeadTasks
                  tasks={tasksFiltered}
                  query={taskSearchParams.query}
                  params={taskSearchParams}
                  setSort={handleSetSort}
                  setQuery={handleSetQuery}
                  updateTask={handleUpdateTask}
                  selectTask={handleSelectTask}
                  handleTaskSidebar={handleTaskSidebar}
                  reOrderTasks={handleReOrderTasks}
                />
              )}
              <LeadTaskSidebar
                selectedTask={selectedTask}
                addTask={handleAddTask}
                open={openTaskSidebar}
                updateTask={handleUpdateTask}
                selectTask={handleSelectTask}
                deleteTask={handleDeleteTask}
                handleTaskSidebar={handleTaskSidebar}
              />
            </CardBody>
            { areTasksChanged && (
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
                    <Button color="secondary" outline active={openDiscardWarning} onClick={handleDiscardTasks}>
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
                        {i18n.t('LEAD.DISCARD_TASK_WARNING_TITLE')}
                      </ModalHeader>
                      <ModalBody>
                        {i18n.t('LEAD.DISCARD_TASK_WARNING_MESSAGE')}
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
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InformationTabContent;
