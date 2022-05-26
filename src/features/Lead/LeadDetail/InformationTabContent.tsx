// ** React Imports
import React, { Fragment, useEffect, useState } from 'react';

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { leadActions } from '@redux/slices/leadSlice';

// ** Reactstrap Imports
import {
  Row, Col, Form, Card,
  Input, Label, Button,
  CardBody, CardTitle,
  CardHeader, FormFeedback,
} from 'reactstrap';
import { RootState } from '@redux/store';
import { Task, TaskSearchParams } from '@domain/entities/Lead';
import { Plus } from 'react-feather';
import LeadTasks from './LeadTasks';
import LeadTaskSidebar from './LeadTaskSidebar';

// ** Utils
// import { selectThemeColors } from '@utils/Utils';

// ** Demo Components
// import DeleteAccount from './DeleteAccount'

interface ParamTypes {
  id: string
}

const {
  // getLead,
  getAllTasks,
  selectTask,
  updateTask,
  addTask,
  deleteTask,
} = leadActions;

const InformationTabContent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // ** States
  const [sort, setSort] = useState('');
  const [query, setQuery] = useState('');

  // ** Hooks
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();

  // ** URL Params
  const params: TaskSearchParams = {
    leadId: id || '',
    query: query || '',
    sortBy: sort || '',
  };

  // ** Get lead on mount
  useEffect(() => {
    // dispatch(getLead(id));
    params.sortBy = sort;
    params.query = query;
    dispatch(getAllTasks(params));
  }, [id, query, sort]);

  // const lead = useSelector((state: RootState) => state.lead.selectedLead);
  // console.log(lead);
  const tasks = useSelector((state: RootState) => state.lead.allTasks);

  const onSubmit = () => {};

  // ** States
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);

  // ** Function to handle Task sidebar
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

  // ** Functions To Handle Add Task Click
  const handleAddClick = () => {
    console.log('handleAddClick');
    handleTaskSidebar();
  };

  const handleSelectTask = (task: Task | undefined) => {
    dispatch(selectTask(task));
  };

  const handleSetSort = (sortType: string) => {
    setSort(sortType);
  };

  const handleSetQuery = (queryString: string) => {
    setQuery(queryString);
  };

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task));
  };

  const handleUpdateTask = (task: Task) => {
    dispatch(updateTask(task));
  };

  const handleDeleteTask = (task: Task) => {
    dispatch(deleteTask(task));
  };

  return (
    <>
      <Row className="h-100">
        <Col xl="6" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4">Profile Details</CardTitle>
            </CardHeader>
            <CardBody className="py-2 my-25">
              <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="firstName">
                      First Name
                    </Label>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Input id="firstName" placeholder="John" invalid={errors.firstName && true} {...field} />
                      )}
                    />
                    {
                  errors
                  && errors.firstName
                  && <FormFeedback>Please enter a valid First Name</FormFeedback>
                }
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="lastName">
                      Last Name
                    </Label>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input id="lastName" placeholder="Doe" invalid={errors.lastName && true} {...field} />
                      )}
                    />
                    {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="emailInput">
                      E-mail
                    </Label>
                    <Input id="emailInput" type="email" name="email" placeholder="Email" />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="company">
                      Company
                    </Label>
                    <Input id="company" name="company" placeholder="Company Name" />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="address">
                      Address
                    </Label>
                    <Input id="address" name="address" placeholder="12, Business Park" />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="accountState">
                      State
                    </Label>
                    <Input id="accountState" name="state" placeholder="California" />
                  </Col>
                  <Col className="mt-2" sm="12">
                    <Button type="submit" className="me-1" color="primary">
                      Save changes
                    </Button>
                    <Button color="secondary" outline>
                      Discard
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col className="pb-10" xl="6" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4">List Task</CardTitle>
              <CardTitle tag="h4">
                <Plus className="cursor-pointer" size={16} onClick={handleAddClick} />
              </CardTitle>

            </CardHeader>
            <CardBody className="py-2 my-25">
              {tasks ? (
                <LeadTasks
                  tasks={tasks}
                  query={query}
                  params={params}
                  setSort={handleSetSort}
                  setQuery={handleSetQuery}
                  updateTask={handleUpdateTask}
                  selectTask={handleSelectTask}
                  handleTaskSidebar={handleTaskSidebar}
                />
              ) : null}
              <LeadTaskSidebar
                addTask={handleAddTask}
                open={openTaskSidebar}
                updateTask={handleUpdateTask}
                selectTask={handleSelectTask}
                deleteTask={handleDeleteTask}
                handleTaskSidebar={handleTaskSidebar}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* <DeleteAccount /> */}
    </>
  );
};

export default InformationTabContent;
