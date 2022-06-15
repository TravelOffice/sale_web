import React, { ReactNode, useState } from 'react';
import { Bookmark, FileText, Info } from 'react-feather';
import {
  Col, Row, TabContent, TabPane,
} from 'reactstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';
import '@styles/react/apps/app-todo.scss';
import OpportunityInformationTabContent from '@features/Opportunity/OpportunityDetail/OpportunityInformationTabContent';
import i18n from '@config/i18n';
import QuotesTabContent from '@features/Opportunity/QuotesList/QuotesTabContent';
import OpportunityDetailTabs from './OpportunityDetailTabs';

export interface OpportunityTab {
  id: string,
  title: string,
  icon: ReactNode,
  pane: ReactNode,
}

export default function OpportunityDetail() {
  const tabs : OpportunityTab[] = [
    {
      id: 'information',
      icon: <Info size={16} className="me-50" />,
      title: i18n.t('OPP.INFORMATION_TAB_TITLE'),
      pane: <OpportunityInformationTabContent />,
    },
    {
      id: 'quotes',
      icon: <FileText size={16} className="me-50" />,
      title: i18n.t('OPP.QUOTES_TAB_TITLE'),
      pane: <QuotesTabContent />,
    },
    {
      id: 'booking',
      icon: <Bookmark size={16} className="me-50" />,
      title: i18n.t('OPP.BOOKING_TAB_TITLE'),
      pane: <div>Coming soon</div>,
    },
  ];
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
