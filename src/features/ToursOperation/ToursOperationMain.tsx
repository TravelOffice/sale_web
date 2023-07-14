// ** React Imports
import i18n from '@config/i18n';
import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
} from 'reactstrap';
import DepartureTourListPage from '@features/ToursOperation/DepartureTour/DepartureTourListPage';

const ToursOperationMain = () => {
  const [depToursTypeSelected, setDepToursTypeSelected] = useState<number>(1);

  return (
    <>
      <div>
        <ButtonGroup className="mb-1">
          <Button outline color="primary" onClick={() => setDepToursTypeSelected(1)} active={depToursTypeSelected === 1}>
            {i18n.t('TOURS_OPERATION.NAV.ALL')}
          </Button>
          <Button outline color="primary" onClick={() => setDepToursTypeSelected(2)} active={depToursTypeSelected === 2}>
            {i18n.t('TOURS_OPERATION.NAV.MY')}
          </Button>
        </ButtonGroup>
      </div>
      <DepartureTourListPage />
    </>
  );
};

export default ToursOperationMain;
