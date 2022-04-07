import { Lead } from '@domain/entities/Lead';
import React from 'react';
import { ExpanderComponentProps } from 'react-data-table-component';

// ** Expandable table component
const LeadExpandable = (props: ExpanderComponentProps<Lead>) => {
  const {
    data: lead,
  } = props;
  return (
    <div className="expandable-content p-2">
      <p>
        <span className="fw-bold">City:</span>
        {' '}
        {lead.nationality}
      </p>
      <p>
        <span className="fw-bold">Experience:</span>
        {' '}
        {lead.birthday}
      </p>
      <p className="m-0">
        <span className="fw-bold">Post:</span>
        {' '}
        {lead.vocative}
      </p>
    </div>
  );
};

export default LeadExpandable;
