// ** React Imports
import React from 'react';

// ** Third Party Components
// ** Reactstrap Imports
import CardMarketplaceLeads from '@features/Dashboard/ManagerDashboard/components/CardMarketplaceLeads';
import CardMarketplaceTours from '@features/Dashboard/ManagerDashboard/components/CardMarketplaceTours';
import CardMarketplaceOverview from './CardMarketplaceOverview';

const CardMarketplace = () => (
  <>
    <CardMarketplaceOverview />
    <CardMarketplaceLeads />
    <CardMarketplaceTours />
  </>
);
export default CardMarketplace;
