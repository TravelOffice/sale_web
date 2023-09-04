import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Lead } from '@domain/entities/lead/Lead';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { generateEditableUrlForLead, generateI18nForLead, leadStatusColors } from '@utils/LeadUtils';
import LeadItemActions from '@features/Lead/components/LeadItemActions';
import { ArrowUpRight } from 'react-feather';

function renderTour(lead: Lead) {
  if (lead.tourTemplateId) {
    return (
      <Link to={`/apps/tours/template/${lead.tourTemplateId}/edit`} className="user_name text-body">
        <span className="text-primary fw-bolder">{lead.tourTemplateName}</span>
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
    minWidth: '100px',
    cell: (lead: Lead) => (
      <Link to={generateEditableUrlForLead(lead)} className="user_name text-truncate text-body">
        <span className="fw-bolder">{lead.code}</span>
        <ArrowUpRight size={16} />
      </Link>
    ),
  },
  {
    name: i18n.t('LEAD.NAME'),
    minWidth: '150px',
    cell: (lead: Lead) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="fw-bolder text-primary">
            <small
              className="text-truncate text-muted"
            >
              {lead.honorific ? generateI18nForLead(lead.honorific) : ''}
            </small>
            {' '}
            {lead.name}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('COMMON.STATUS'),
    minWidth: '150px',
    cell: (lead: Lead) => (
      <Badge className="text-capitalize" color={leadStatusColors[lead.leadStatus]} pill>
        {generateI18nForLead(lead.leadStatus)}
      </Badge>
    ),
  },
  {
    name: i18n.t('LEAD.PHONE'),
    minWidth: '150px',
    cell: (lead: Lead) => lead.phoneNumber,
  },
  {
    name: i18n.t('LEAD.DESIRED_TOUR'),
    minWidth: '250px',
    cell: (lead: Lead) => renderTour(lead),
  },
  {
    name: i18n.t('LEAD.ASSIGNEE'),
    minWidth: '150px',
    cell: (lead: Lead) => (lead.assigneeId ? (
      <Link to={`/apps/user/view/${lead.assigneeId}`} className="user_name text-truncate text-body">
        <span className="fw-bolder text-primary">{lead.assigneeName}</span>
      </Link>
    ) : (
      i18n.t('LEAD.UNKNOWN_ASSIGNEE')
    )),
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    minWidth: '150px',
    cell: (lead: Lead) => <LeadItemActions lead={lead} />,
  },
];

export default leadColumns;
