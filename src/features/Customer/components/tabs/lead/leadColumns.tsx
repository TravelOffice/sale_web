import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Lead, LeadStatus } from '@domain/entities/lead/Lead';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import moment from 'moment';
import { generateEditableUrlForLead, generateI18nForLead } from '@utils/LeadUtils';

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

const LeadColumns: TableColumn<Lead>[] = [
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
    name: i18n.t('COMMON.STATUS'),
    maxWidth: '150px',
    cell: (lead: Lead) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <Badge className="text-capitalize" color={leadStatusColors[lead.leadStatus]} pill>
            {generateI18nForLead(lead.leadStatus)}
          </Badge>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('LEAD.DESIRED_TOUR'),
    minWidth: '350px',
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
        <br />
        <strong>{i18n.t('LEAD.SOURCE')}</strong>
        {': '}
        {lead.sourceName}
        <br />
      </div>
    ),
  },
];

export default LeadColumns;
