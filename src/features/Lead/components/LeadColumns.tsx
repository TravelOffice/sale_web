import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Lead, LeadStatus } from '@domain/entities/lead/Lead';
import { Link } from 'react-router-dom';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { Archive, MoreVertical, Trash2 } from 'react-feather';
import moment from 'moment';
import { generateEditableUrlForLead, generateI18nForLead } from '@utils/LeadUtils';
import { formatPhoneNumber } from '@utils/Utils';

const leadStatusColors: Record<LeadStatus, string> = {
  NEW: 'light-primary',
  PROCESSING: 'light-warning',
  CLOSED: 'light-success',
  CANCEL: 'light-danger',
};

function renderTour(lead: Lead) {
  if (lead.tourTemplateId) {
    return (
      <Link to={`/apps/tour-template/${lead.tourTemplateId}`} className="user_name text-truncate text-body">
        <span className="text-primary">{lead.tourTemplateName}</span>
      </Link>
    );
  }
  if (lead.desiredTour) {
    return (<span>{lead.desiredTour}</span>);
  }
  return <></>;
}

const leadColumns: TableColumn<Lead>[] = [
  {
    name: i18n.t('LEAD.CODE'),
    width: '80px',
    cell: (lead: Lead) => (
      <Link to={generateEditableUrlForLead(lead)} className="user_name text-truncate text-body">
        <span className="fw-bolder">{lead.code}</span>
      </Link>
    ),
  },
  {
    name: i18n.t('LEAD.NAME'),
    minWidth: '150px',
    maxWidth: '180px',
    cell: (lead: Lead) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="fw-bolder text-primary">
            <small
              className="text-truncate text-muted"
            >
              {lead.honorific ? generateI18nForLead(lead.honorific) : ''}
            </small>
            {lead.name}
          </span>
          <span>{formatPhoneNumber(lead.phoneNumber)}</span>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('COMMON.STATUS'),
    width: '150px',
    cell: (lead: Lead) => (
      <Badge className="text-capitalize" color={leadStatusColors[lead.leadStatus]} pill>
        {generateI18nForLead(lead.leadStatus)}
      </Badge>
    ),
  },
  {
    name: i18n.t('LEAD.DESIRED_TOUR'),
    minWidth: '150px',
    cell: (lead: Lead) => (
      <div className="my-1">
        <strong>{i18n.t('LEAD.DESIRED_TOUR')}</strong>
        {': '}
        {renderTour(lead)}
        <br />
        <strong>{i18n.t('LEAD.DEPARTURE')}</strong>
        {': '}
        {lead.departure}
        <br />
        <strong>{i18n.t('LEAD.START_DATE')}</strong>
        {': '}
        {moment(lead.startDate).format('DD/MM/YYYY')}
        <br />
        <strong>{i18n.t('LEAD.NUMBER_OF_PASSENGERS')}</strong>
        {': '}
        {lead.numberOfAdultPassengers}
        {' '}
        {i18n.t('LEAD.ADULT')}
        {' '}
        -
        {' '}
        {lead.numberOfChildrenPassengers}
        {' '}
        {i18n.t('LEAD.CHILDREN')}
      </div>
    ),
  },
  {
    name: i18n.t('LEAD.ASSIGNEE'),
    cell: (lead: Lead) => (
      <div className="my-1">
        <span>
          <strong>{i18n.t('LEAD.ASSIGNEE')}</strong>
          {': '}
          {
            lead.assigneeId ? (
              <Link to={`/apps/users/${lead.assigneeId}`} className="user_name text-truncate text-body">
                <span className="fw-bolder text-primary">{lead.assigneeName}</span>
              </Link>
            ) : (
              i18n.t('LEAD.UNKNOWN_ASSIGNEE')
            )
          }
        </span>
        <br />
        <span>
          <strong>{i18n.t('LEAD.CREATOR')}</strong>
          {': '}
          <Link to={`/apps/users/${lead.creatorId}`} className="user_name text-truncate text-body">
            <span className="fw-bolder text-primary">{lead.creatorName}</span>
          </Link>
        </span>
        <br />
        <span>
          <strong>{i18n.t('COMMON.CREATED_AT')}</strong>
          {': '}
          {moment(lead.createdAt).format('hh:mm:ss DD/MM/YYYY')}
        </span>
      </div>
    ),
  },
  {
    name: i18n.t('COMMON.NOTE'),
    maxWidth: '200px',
    selector: (lead) => lead.description || i18n.t('LEAD.NO_NOTE').toString(),
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    maxWidth: '120px',
    cell: (lead: Lead) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem tag={Link} className="w-100" to={generateEditableUrlForLead(lead)}>
              <Archive size={14} className="me-50" />
              <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">{i18n.t('COMMON.DELETE')}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];

export default leadColumns;
