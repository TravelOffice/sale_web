import React, { ReactNode, useState } from 'react';
import { Bookmark, Info, Link2 } from 'react-feather';
import {
  Col, Row, TabContent, TabPane,
} from 'reactstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';
import '@styles/react/apps/app-todo.scss';
import OpportunityInformationTabContent from '@features/Opportunity/OpportunityDetail/OpportunityInformationTabContent';
import OpportunityDetailTabs from './OpportunityDetailTabs';

export interface OpportunityTab {
  id: string,
  title: string,
  icon: ReactNode,
  pane: ReactNode,
}

const tabs : OpportunityTab[] = [
  {
    id: 'information',
    icon: <Info size={16} className="me-50" />,
    title: 'Information',
    pane: <OpportunityInformationTabContent />,
  },
  {
    id: 'booking',
    icon: <Bookmark size={16} className="me-50" />,
    title: 'Booking',
    pane: <div>Coming soon</div>,
  },
  {
    id: 'notes',
    icon: <Link2 size={16} className="me-50" />,
    title: 'Notes',
    pane: <div>Coming soon</div>,
  },
];

export default function OpportunityDetail() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <>
      <Row>
        <Col xs={12} className="d-flex flex-column">
          <OpportunityDetailTabs tabs={tabs} activeTab={activeTab} toggleTab={setActiveTab} />
          <TabContent className="h-100 content-area-wrapper" activeTab={activeTab}>
            {
              tabs.map((tab) => (
                <TabPane className="h-100 w-100" key={tab.id} tabId={tab.id}>
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
