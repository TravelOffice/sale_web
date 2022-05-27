import React, { ReactNode, useState } from 'react';
import LeadDetailTabs from '@features/Lead/LeadDetail/LeadDetailTabs';
import {
  Bell, Bookmark, Link2, Lock, User,
} from 'react-feather';
import {
  Col, Row, TabContent, TabPane,
} from 'reactstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';
import '@styles/react/apps/app-todo.scss';
import InformationTabContent from '@features/Lead/LeadDetail/InformationTabContent';
import OpportunitiesTable from '@features/Opportunity/OpportunitiesTable';

export interface Tab {
  id: string,
  title: string,
  icon: ReactNode,
  pane: ReactNode,
}

const tabs : Tab[] = [
  {
    id: 'information',
    icon: <User size={16} className="me-50" />,
    title: 'Information',
    pane: <InformationTabContent />,
  },
  {
    id: 'opportunity',
    icon: <Lock size={16} className="me-50" />,
    title: 'Opportunity',
    pane: <OpportunitiesTable />,
  },
  {
    id: 'booking',
    icon: <Bookmark size={16} className="me-50" />,
    title: 'Booking',
    pane: <div>Coming soon</div>,
  },
  {
    id: 'tasks',
    icon: <Bell size={16} className="me-50" />,
    title: 'Tasks',
    pane: <div>Coming soon</div>,
  },
  {
    id: 'notes',
    icon: <Link2 size={16} className="me-50" />,
    title: 'Notes',
    pane: <div>Coming soon</div>,
  },
];

export default function LeadDetail() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <>
      <Row>
        <Col xs={12} className="d-flex flex-column">
          <LeadDetailTabs tabs={tabs} activeTab={activeTab} toggleTab={setActiveTab} />
          <TabContent className="h-100" activeTab={activeTab}>
            {
              tabs.map((tab) => (
                <TabPane className="h-100" key={tab.id} tabId={tab.id}>
                  {tab.pane}
                </TabPane>
              ))
            }
          </TabContent>
        </Col>
      </Row>
    </>
  );
}
