import React, { ReactNode, useState } from 'react';
import LeadDetailTabs from '@features/Lead/LeadDetail/LeadDetailTabs';
import {
  Briefcase, Target, User,
} from 'react-feather';
import {
  Col, Row, TabContent, TabPane,
} from 'reactstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';
import '@styles/react/apps/app-todo.scss';
import InformationTabContent from '@features/Lead/LeadDetail/InformationTab/InformationTabContent';
import OpportunitiesTable from '@features/Opportunity/OpportunitiesTable';
import i18n from '@config/i18n';

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
    title: i18n.t('COMMON.INFORMATION'),
    pane: <InformationTabContent />,
  },
  {
    id: 'opportunity',
    icon: <Target size={16} className="me-50" />,
    title: 'Opportunity',
    pane: <OpportunitiesTable />,
  },
  {
    id: 'booking',
    icon: <Briefcase size={16} className="me-50" />,
    title: 'Booking',
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
