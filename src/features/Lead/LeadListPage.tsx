import React, { useMemo } from 'react';
import LeadStats from '@features/Lead/components/LeadStats';
import { useQuery } from '@tanstack/react-query';
import { leadPresenter } from '@adapter/presenters';
import { LeadStatus } from '@domain/entities/Lead';

export default function LeadListPage() {
  const { data } = useQuery(['leads'], async () => leadPresenter.getAllLeads());
  const leads = useMemo(() => data || [], [data]);
  return (
    <div className="to-table-container">
      <LeadStats
        total={leads.length}
        countNew={leads.filter((lead) => lead.leadStatus === LeadStatus.NEW).length}
        countProcessing={leads.filter((lead) => lead.leadStatus === LeadStatus.PROCESSING).length}
        countClosed={leads.filter((lead) => lead.leadStatus === LeadStatus.CLOSED).length}
        countCancelled={leads.filter((lead) => lead.leadStatus === LeadStatus.CANCEL).length}
      />
    </div>
  );
}
