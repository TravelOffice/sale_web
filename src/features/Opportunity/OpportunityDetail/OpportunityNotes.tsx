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
import { OpportunityNote, OpportunityNoteSearchParams, OppNoteSortEnum } from '@domain/entities/opportunity/Opportunity';
import '@styles/base/pages/lead-todo.scss';
import Avatar from '@components/Avatar/Avatar';
import i18n from '@config/i18n';

export interface OpportunityNotesProps {
  query: string,
  params: OpportunityNoteSearchParams,
  notes: OpportunityNote[],
  setSort: (sort?: OppNoteSortEnum) => void,
  setQuery: (query: string) => void,
  updateNote: (note: OpportunityNote) => void,
  selectNote: (note: OpportunityNote) => void,
  handleNoteSidebar: () => void,
  handleAddNoteClick: () => void,
  reOrderNotes: (note: OpportunityNote[]) => void,
}

const OpportunityNotes = (props: OpportunityNotesProps) => {
  // ** Props
  const {
    query,
    notes,
    setSort,
    setQuery,
    updateNote,
    selectNote,
    handleNoteSidebar,
    reOrderNotes,
  } = props;

  // ** Function to selectNote on click
  const handleNoteClick = (note: OpportunityNote) => {
    selectNote(note);
    handleNoteSidebar();
  };

  // ** Function to getNotes based on search query
  const handleFilter = (e: any) => {
    setQuery(e.target.value);
  };

  // ** Function to getNotes based on sort
  const handleSort = (e: any, val?: OppNoteSortEnum) => {
    e.preventDefault();
    setSort(val);
  };

  // ** Renders Note priority
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
  const renderAvatar = (note: OpportunityNote) => <Avatar color="light-primary" content={note.creatorName} />;

  const renderNotes = () => (
    <PerfectScrollbar
      className="list-group todo-note-list-wrapper"
      options={{ wheelPropagation: false }}
    >
      {notes.length ? (
        <ReactSortable
          tag="ul"
          list={notes}
          handle=".drag-icon"
          className="todo-note-list media-list"
          setList={(newState) => reOrderNotes(newState)}
        >
          {notes.map((item) => (
            <li
              key={item.id}
              onClick={() => handleNoteClick(item)}
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
                        updateNote({ ...item, isCompleted: e.target.checked });
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
                  {renderAvatar(item)}
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
    <div className="lead-Notes">
      <div className="content-wrapper">
        <div className="todo-app-list">
          <div className="app-fixed-search d-flex align-items-center">
            <div className="d-flex align-content-center justify-content-between w-100">
              <InputGroup className="input-group-merge">
                <InputGroupText>
                  <Search className="text-muted" size={14} />
                </InputGroupText>
                <Input placeholder="Search Note" value={query} onChange={handleFilter} />
              </InputGroup>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle className="hide-arrow me-1" tag="a" href="/" onClick={(e) => e.preventDefault()}>
                <MoreVertical className="text-body" size={16} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, OppNoteSortEnum.TITLE_ASC)}>
                  {i18n.t('OPP.SORT_A_TO_Z')}
                </DropdownItem>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, OppNoteSortEnum.TITLE_DESC)}>
                  {i18n.t('OPP.SORT_Z_TO_A')}
                </DropdownItem>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, OppNoteSortEnum.DUE_DATE)}>
                  {i18n.t('OPP.SORT_DUE_DATE')}
                </DropdownItem>
                <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, undefined)}>
                  {i18n.t('OPP.RESET_SORT')}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          {renderNotes()}
        </div>
      </div>
    </div>
  );
};

export default OpportunityNotes;
