// ** React Imports
import i18n from '@config/i18n';
import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
} from 'reactstrap';
import DepartureTourListPage from '@features/ToursOperation/DepartureTour/DepartureTourListPage';

export enum DepToursViewType {
  ALL = 1,
  MY = 2,
}

const ToursOperationMain = () => {
  const [viewType, setViewType] = useState<DepToursViewType>(DepToursViewType.ALL);
  const onChangeViewType = (type: DepToursViewType) => setViewType(type);

  return (
    <>
      <div>
        <ButtonGroup className="mb-1">
          <Button
            outline
            color="primary"
            onClick={() => onChangeViewType(1)}
            active={viewType === 1}
          >
            {i18n.t('TOURS_OPERATION.NAV.ALL')}
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => onChangeViewType(2)}
            active={viewType === 2}
            disabled // TODO: Enable this button when the feature is ready
          >
            {i18n.t('TOURS_OPERATION.NAV.MY')}
          </Button>
        </ButtonGroup>
      </div>
      <DepartureTourListPage />
    </>
  );
};

export default ToursOperationMain;
