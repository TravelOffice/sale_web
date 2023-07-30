import React from 'react';
import { ExpanderComponentProps } from 'react-data-table-component/dist/src/DataTable/types';
import { Col, Row } from 'reactstrap';
import i18n from '@config/i18n';
import { Lead, LeadStatus } from '@domain/entities/lead/Lead';
import moment from 'moment';

function renderNote(lead: Lead) {
  const { description, leadStatus, cancelledReason } = lead;
  if (leadStatus !== LeadStatus.CANCEL) {
    return <p>{lead.description || i18n.t('LEAD.NO_NOTE').toString()}</p>;
  }
  return (
    <div>
      {description}
      <p>
        <span className="text-body fw-bolder">
          {i18n.t('LEAD.CANCELLED_REASON')}
          {': '}
        </span>
        {cancelledReason}
      </p>
    </div>
  );
}

const LeadExpandableRow: React.FC<ExpanderComponentProps<Lead>> = (
  { data: lead }:ExpanderComponentProps<Lead>,
) => (
  <div className="container py-xxl-1">
    <Row>
      <Col md={6}>
        <table className="table">
          <tbody className="table-hover table-striped">
            <tr>
              <td colSpan={2}><b>{i18n.t('LEAD.LEAD_INFO')}</b></td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.NAME')}</td>
              <td>{lead.name}</td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.PHONE')}</td>
              <td>{lead.phoneNumber}</td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.EMAIL')}</td>
              <td>{lead.email}</td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.ADDRESS')}</td>
              <td>{lead.address}</td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.SOURCE')}</td>
              <td>{lead.sourceName}</td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.ASSIGNEE')}</td>
              <td>{lead.assigneeId ? lead.assigneeName : i18n.t('LEAD.UNKNOWN_ASSIGNEE')}</td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.CREATOR')}</td>
              <td>{lead.creatorName}</td>
            </tr>
            <tr>
              <td>{i18n.t('COMMON.CREATED_AT')}</td>
              <td>{moment(lead.createdAt).format('DD/MM/YYYY')}</td>
            </tr>
            <tr>
              <td>{i18n.t('COMMON.NOTE')}</td>
              <td>{renderNote(lead)}</td>
            </tr>
          </tbody>
        </table>
      </Col>
      <Col md={6}>
        <table className="table">
          <tbody className="table-hover table-striped">
            <tr>
              <td colSpan={2}><b>{i18n.t('LEAD.DESIRED_TOUR')}</b></td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.DEPARTURE')}</td>
              <td>{lead.departureName}</td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.START_DATE')}</td>
              <td>{moment(lead.startDate).format('DD/MM/YYYY')}</td>
            </tr>
            <tr>
              <td>{i18n.t('LEAD.NUMBER_OF_PASSENGERS')}</td>
              <td>
                {`${i18n.t('LEAD.ADULT')}: ${lead.numberOfAdultPassengers}`}
                <br />
                {`${i18n.t('LEAD.CHILDREN')}: ${lead.numberOfChildrenPassengers}`}
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  </div>
);

export default LeadExpandableRow;
