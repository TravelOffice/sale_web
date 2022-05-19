// ** React Imports
import React, { Link } from 'react-router-dom';
// ** Third Party Components
import classnames from 'classnames';
import { ReactSortable } from 'react-sortablejs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Menu, MoreVertical, Search } from 'react-feather';

// ** Reactstrap Imports
import {
  Input,
  Badge,
  InputGroup,
  InputGroupText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Task, TaskSearchParams } from '@domain/entities/Lead';
import '@styles/react/apps/app-todo.scss';
import '@styles/base/pages/lead-todo.scss';

export interface TasksProps {
  query: string,
  params: TaskSearchParams,
  tasks: Task[],
  setSort: (sort: string) => void,
  setQuery: (query: string) => void,
  updateTask: (task: Task) => {},
  selectTask: (task: Task) => void,
  handleTaskSidebar: () => void,
}

const Tasks = (props: TasksProps) => {
  const dispatch = useDispatch();
  // ** Props
  const {
    query,
    params,
    tasks,
    setSort,
    setQuery,
    updateTask,
    selectTask,
    handleTaskSidebar,
  } = props;

  // ** Function to selectTask on click
  const handleTaskClick = (task: Task) => {
    dispatch(selectTask(task));
    handleTaskSidebar();
  };

  // ** Function to getTasks based on search query
  const handleFilter = (e: any) => {
    console.log(e, params);
    setQuery(e.target.value);
    // dispatch(getTasks(params));
  };

  // ** Function to getTasks based on sort
  const handleSort = (e: any, val: string) => {
    e.preventDefault();
    setSort(val);
    // dispatch(getTasks({ ...params }));
  };

  // ** Renders task tags
  const renderTags = (arr: string[]) => {
    const badgeColor:{ [key: string]: string } = {
      team: 'light-primary',
      low: 'light-success',
      medium: 'light-warning',
      high: 'light-danger',
      update: 'light-info',
    };

    return arr.map((item) => (
      <Badge className="text-capitalize" key={item} color={badgeColor[item]} pill>
        {item}
      </Badge>
    ));
  };

  const renderTasks = () => (
    <PerfectScrollbar
      className="list-group todo-task-list-wrapper"
      options={{ wheelPropagation: false }}
    >
      {tasks.length ? (
        <ReactSortable
          tag="ul"
          list={tasks}
          handle=".drag-icon"
          className="todo-task-list media-list"
          setList={() => {}}
        >
          {tasks.map((item) => (
            <li
              key={item.id}
              onClick={() => handleTaskClick(item)}
              className={classnames('todo-item', {
                completed: item.isCompleted,
              })}
            >
              <div className="todo-title-wrapper w-100">
                <div className="todo-title-area">
                  <MoreVertical size={16} className="drag-icon" />
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      id={item.title}
                      checked={item.isCompleted}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();
                        dispatch(updateTask({ ...item, isCompleted: e.target.checked }));
                      }}
                    />
                  </div>
                  <span className="todo-title">{item.title}</span>
                </div>
                <div className="todo-item-action mt-lg-0 mt-50">
                  {item.tags.length ? <div className="badge-wrapper me-1">{renderTags(item.tags)}</div> : null}
                  {item.dueDate ? (
                    <small className="text-nowrap text-muted me-1">
                      {new Date(item.dueDate).toLocaleString('default', { month: 'short' })}
                      {' '}
                      {new Date(item.dueDate).getDate().toString().padStart(2, '0')}
                    </small>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ReactSortable>
      ) : (
        <div className="no-results show">
          <h5>No Items Found</h5>
        </div>
      )}
    </PerfectScrollbar>
  );

  return (
    <div className="lead-tasks">
      <div className="content-wrapper">
        <div className="todo-app-list">
          <div className="app-fixed-search d-flex align-items-center">
            <div className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1">
              <Menu size={21} />
            </div>
            <div className="d-flex align-content-center justify-content-between w-100">
              <InputGroup className="input-group-merge">
                <InputGroupText>
                  <Search className="text-muted" size={14} />
                </InputGroupText>
                <Input placeholder="Search task" value={query} onChange={handleFilter} />
              </InputGroup>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle className="hide-arrow me-1" tag="a" href="/" onClick={(e) => e.preventDefault()}>
                <MoreVertical className="text-body" size={16} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'title-asc')}>
                  Sort A-Z
                </DropdownItem>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'title-desc')}>
                  Sort Z-A
                </DropdownItem>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'due-date')}>
                  Sort Due Date
                </DropdownItem>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, '')}>
                  Reset Sort
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          {renderTasks()}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
