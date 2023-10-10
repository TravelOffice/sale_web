// ** Third Party Components
import { Calendar } from 'react-feather';

// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import React, { useState } from 'react';
import i18n from 'i18next';
import Flatpickr from 'react-flatpickr';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import { FavouriteLocation, MetricNameEnum } from '@domain/entities/statistic/TravelStatistic';
import { useQuery } from '@tanstack/react-query';
import { travelStatisticPresenter } from '@adapter/presenters';

const CardTopFavoriteLocation = () => {
  const defaultEndTime = Date.now();
  const defaultStartTime = defaultEndTime - 7 * 24 * 60 * 60 * 1000;
  const [selectedStartTime, setSelectedStartTime] = useState<number>(defaultStartTime);
  const [selectedEndTime, setSelectedEndTime] = useState<number>(defaultEndTime);
  const {
    data: topFavoriteLocations,
    refetch,
  } = useQuery(
    [MetricNameEnum.TOP_FAVOURITE_LOCATION],
    async () => travelStatisticPresenter.getTravelStatistic(
      MetricNameEnum.TOP_FAVOURITE_LOCATION,
      selectedStartTime.toString(),
      selectedEndTime.toString(),
    ),
  );

  const renderStates = () => (topFavoriteLocations as FavouriteLocation[]).map((location) => (
    <li className="mb-1" style={{ listStyleType: 'none' }} key={location.locationId}>
      <h6 className="mb-0">{location.locationName}</h6>
      <small>
        {location.numberOfLead}
        {' '}
        {i18n.t('DASHBOARD.NUMBER_OF_LEADS_ARE_INTERESTED_IN_THIS_LOCATION')}
      </small>
    </li>
  ));

  return (
    <Card className="card-browser-states">
      <CardHeader>
        <div>
          <CardTitle tag="h4">{i18n.t('DASHBOARD.TOP_FAVORITE_LOCATIONS')}</CardTitle>
        </div>
        <div className="d-flex align-items-center">
          <Calendar size={17} />
          <Flatpickr
            className="form-control flat-picker bg-transparent border-0 shadow-none"
            options={{
              mode: 'range',
              // eslint-disable-next-line no-mixed-operators
              defaultDate: [defaultStartTime, defaultEndTime],
              locale: Vietnamese,
              dateFormat: 'd-m-Y',
            }}
            onChange={(selectedDates) => {
              setSelectedStartTime(selectedDates[0].getTime());
              setSelectedEndTime(selectedDates[1].getTime());
              refetch();
            }}
          />
        </div>
      </CardHeader>
      <CardBody>
        {
          Array.isArray(topFavoriteLocations) && topFavoriteLocations.length > 0 ? renderStates() : i18n.t('COMMON.THERE_ARE_NO_DATA_TO_DISPLAY')
        }
      </CardBody>
    </Card>
  );
};

export default CardTopFavoriteLocation;
