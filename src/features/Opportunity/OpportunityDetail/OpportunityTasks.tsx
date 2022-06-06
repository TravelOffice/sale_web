import React, { Link } from 'react-router-dom';
import classnames from 'classnames';
import { ReactSortable } from 'react-sortablejs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MoreVertical, Search } from 'react-feather';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupText,
  UncontrolledDropdown,
} from 'reactstrap';
import { OpportunityTask, OpportunityTaskSearchParams, OppTaskSortEnum } from '@domain/entities/opportunity/Opportunity';
import '@styles/base/pages/lead-todo.scss';
import Avatar from '@components/Avatar/Avatar';
import i18n from '@config/i18n';

export interface OpportunityTasksProps {
  query: string,
  params: OpportunityTaskSearchParams,
  tasks: OpportunityTask[],
  setSort: (sort?: OppTaskSortEnum) => void,
  setQuery: (query: string) => void,
  updateTask: (task: OpportunityTask) => void,
  selectTask: (task: OpportunityTask) => void,
  handleTaskSidebar: () => void,
  handleAddTaskClick: () => void,
  reOrderTasks: (task: OpportunityTask[]) => void,
}

const OpportunityTasks = (props: OpportunityTasksProps) => {
  // ** Props
  const {
    query,
    tasks,
    setSort,
    setQuery,
    updateTask,
    selectTask,
    handleTaskSidebar,
    reOrderTasks,
  } = props;

  // ** Function to selectTask on click
  const handleTaskClick = (task: OpportunityTask) => {
    selectTask(task);
    handleTaskSidebar();
  };

  // ** Function to getTasks based on search query
  const handleFilter = (e: any) => {
    setQuery(e.target.value);
  };

  // ** Function to getTasks based on sort
  const handleSort = (e: any, val?: OppTaskSortEnum) => {
    e.preventDefault();
    setSort(val);
  };

  // ** Renders task priority
  const renderPriority = (priority: string) => {
    const badgeColor:{ [key: string]: string } = {
      low: 'light-success',
      medium: 'light-warning',
      high: 'light-danger',
      update: 'light-info',
    };

    return (
      <Badge className="text-capitalize" key={priority} color={badgeColor[priority]} pill>
        {i18n.t(`COMMON.SEVERITY_${priority.toUpperCase()}`)}
      </Badge>
    );
  };

  // ** Renders Avatar
  const renderAvatar = (task: OpportunityTask) => <Avatar color="light-primary" content={task.creatorName} />;

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
          setList={(newState) => reOrderTasks(newState)}
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
                        updateTask({ ...item, isCompleted: e.target.checked });
                      }}
                    />
                  </div>
                  <span className="todo-title">{item.title}</span>
                </div>
                <div className="todo-item-action mt-lg-0 mt-50">
                  {item.priority ? <div className="badge-wrapper me-1">{renderPriority(item.priority)}</div> : null}
                  {item.dueDate ? (
                    <small className="text-nowrap text-muted me-1">
                      {new Date(item.dueDate).toLocaleString('default', { month: 'short' })}
                      {' '}
                      {new Date(item.dueDate).getDate().toString().padStart(2, '0')}
                    </small>
                  ) : null}
                  {item.creatorId && renderAvatar(item)}
                </div>
              </div>
            </li>
          ))}
        </ReactSortable>
      ) : (
        <div className="no-results show">
          <h5>{i18n.t('OPP.NO_ITEMS_FOUND_MESSAGE')}</h5>
        </div>
      )}
    </PerfectScrollbar>
  );

  return (
    <div className="lead-tasks">
      <div className="content-wrapper">
        <div className="todo-app-list">
          <div className="app-fixed-search d-flex align-items-center">
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
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, OppTaskSortEnum.TITLE_ASC)}>
                  {i18n.t('OPP.SORT_A_TO_Z')}
                </DropdownItem>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, OppTaskSortEnum.TITLE_DESC)}>
                  {i18n.t('OPP.SORT_Z_TO_A')}
                </DropdownItem>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, OppTaskSortEnum.DUE_DATE)}>
                  {i18n.t('OPP.SORT_DUE_DATE')}
                </DropdownItem>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, undefined)}>
                  {i18n.t('OPP.RESET_SORT')}
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

export default OpportunityTasks;
