// ** React Imports
import React, { ReactNode, useState } from 'react';
import {
  Button, Card, CardBody, CardHeader, TabContent, TabPane,
} from 'reactstrap';
import i18n from '@config/i18n';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { generateI18nForTourOperation } from '@utils/TousOperationUtils';
import { useAccessControl } from '@hooks/auth';
import { RequirePermissions } from '@domain/entities/RequirePermissions';
import ToursOperationDetailTabs from '@features/ToursOperation/components/ToursOperationDetailTabs';
import { List } from 'react-feather';
import CommingSoon from '@components/CommingSoon/CommingSoon';
import ToursOperationGeneralPane from '@features/ToursOperation/components/ToursOperationGeneralPane';
import EstimationListPage from '@features/ToursOperation/Estimation/EstimationListPage';
import ToursOperationCustomerListPane from '@features/ToursOperation/components/ToursOperationCustomerListPane';
import ToursOperationBookingPane from './components/ToursOperationBookingPane';

export interface ToursOperationDetailParams {
  tourId: string,
}

export interface Tab {
  id: string,
  title: string,
  icon: ReactNode,
  pane: ReactNode,
  requiredPermissions?: RequirePermissions,
}

const tabs: Tab[] = [
  {
    id: 'tourGeneral',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_GENERAL'),
    pane: <ToursOperationGeneralPane />,
  },
  {
    id: 'bookingList',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_BOOKING_LIST'),
    pane: <ToursOperationBookingPane />,
  },
  {
    id: 'customerList',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_CUSTOMER_LIST'),
    pane: <ToursOperationCustomerListPane />,
  },
  {
    id: 'tourEstimation',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_ESTIMATION'),
    pane: <EstimationListPage />,
  },
  {
    id: 'tourReport',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_REPORT'),
    pane: <CommingSoon />,
  },
  {
    id: 'tourPlan',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_PLAN'),
    pane: <CommingSoon />,
  },
];

const ToursOperationDetail = () => {
  const { tourId } = useParams<ToursOperationDetailParams>();
  const { data: departureTour } = useQuery(
    ['departureTours', tourId],
    async () => tourPresenter.getDepartureTour(tourId),
  );

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { canAccess } = useAccessControl();
  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <span>
            {`${i18n.t('TOURS_OPERATION.TOUR_CODE')}: ${tourId}`}
            {' | '}
            {`${i18n.t('TOURS_OPERATION.TOUR_CREATED_BY')}: ${departureTour ? departureTour.creatorName : ''}`}
            {' | '}
            {`${i18n.t('TOURS_OPERATION.TOUR_OPERATED_BY')}: ${departureTour ? departureTour.creatorName : ''}`}
          </span>
          <span className="align-middle ms-25">
            {`${i18n.t('TOURS_OPERATION.TOUR_OPERATION_CURRENT_STATUS')} : ${departureTour ? generateI18nForTourOperation(departureTour.operationStatus) : ''}`}
          </span>
        </CardHeader>
        <CardBody>
          <Button color="primary" outline>
            {i18n.t('TOURS_OPERATION.SEND_EMAIL_TO_TOUR_GROUP')}
          </Button>
          {' '}
          <Button color="primary" outline>
            {i18n.t('TOURS_OPERATION.PRINT_TOUR_PLAN')}
          </Button>
          {' '}
          <Button color="primary" outline>
            {i18n.t('TOURS_OPERATION.PRINT_TOUR_VISITORS_LIST')}
          </Button>
          {' '}
          <Button color="primary" outline>
            {i18n.t('TOURS_OPERATION.PRINT_TOUR_REPORT')}
          </Button>
          {' '}
          <Button color="primary" outline>
            {i18n.t('TOURS_OPERATION.PRINT_TOUR_ESTIMATION')}
          </Button>
          {' '}
          <Button color="primary" outline>
            {i18n.t('TOURS_OPERATION.EXPORT_EXCEL_PASSENGERS')}
          </Button>
          {' '}
          <Button color="primary" outline>
            {i18n.t('TOURS_OPERATION.PRINT_INSURANCE')}
          </Button>
        </CardBody>
      </Card>
      <ToursOperationDetailTabs
        tabs={tabs}
        activeTab={activeTab}
        toggleTab={setActiveTab}
      />
      <TabContent activeTab={activeTab}>
        {
          tabs.map((tab) => (
            <TabPane key={tab.id} tabId={tab.id}>
              {canAccess(tab.requiredPermissions || []) && tab.pane}
            </TabPane>
          ))
        }
      </TabContent>
    </div>
  );
};

export default ToursOperationDetail;
