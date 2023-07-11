import { Button } from 'reactstrap';
import { Plus, RefreshCw } from 'react-feather';
import i18n from '@config/i18n';
import { Link } from 'react-router-dom';
import React from 'react';

export interface LeadDataTableHeaderProps {
  loading: boolean,
  onRefresh: () => void,
}

export default function LeadDataTableHeader(props: LeadDataTableHeaderProps) {
  const { loading, onRefresh } = props;
  return (
    <div>
      <Button className="btn-icon me-1" outline color="primary" onClick={onRefresh} disabled={loading}>
        <RefreshCw className={loading ? 'spin-animated' : ''} size={16} />
      </Button>
      <Link to="/apps/leads/create">
        <Button color="primary">
          <Plus size={14} />
          <span className="align-middle ms-25">{i18n.t('COMMON.ADD')}</span>
        </Button>
      </Link>
    </div>
  );
}
