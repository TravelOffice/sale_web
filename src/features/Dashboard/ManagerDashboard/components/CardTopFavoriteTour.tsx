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
import { useQuery } from '@tanstack/react-query';
import { travelStatisticPresenter } from '@adapter/presenters';
import { FavouriteTour, MetricNameEnum } from '@domain/entities/statistic/TravelStatistic';
import { Link } from 'react-router-dom';

const CardTopFavoriteTour = () => {
  const defaultEndTime = Date.now();
  const defaultStartTime = defaultEndTime - 7 * 24 * 60 * 60 * 1000;
  const [selectedStartTime, setSelectedStartTime] = useState<number>(defaultStartTime);
  const [selectedEndTime, setSelectedEndTime] = useState<number>(defaultEndTime);
  const {
    data: topFavoriteTours,
    refetch,
  } = useQuery(
    [MetricNameEnum.TOP_FAVOURITE_TOUR],
    async () => travelStatisticPresenter.getTravelStatistic(
      MetricNameEnum.TOP_FAVOURITE_TOUR,
      selectedStartTime.toString(),
      selectedEndTime.toString(),
    ),
  );

  const renderStates = () => (topFavoriteTours as FavouriteTour[]).map((tour) => (
    <li className="mb-1" style={{ listStyleType: 'none' }} key={tour.tourTemplateId}>
      <Link to={`/apps/tours/template/${tour.tourTemplateId}/edit`} className="user_name text-body">
        <span className="text-primary fw-bolder">{tour.tourTemplateName}</span>
      </Link>
      <br />
      <small>
        {tour.numberOfBooking}
        {' '}
        {i18n.t('DASHBOARD.BOOKINGS_WERE_CREATED_FROM_THIS_TEMPLATE')}
      </small>
    </li>
  ));

  return (
    <Card className="card-browser-states">
      <CardHeader>
        <div>
          <CardTitle tag="h4">{i18n.t('DASHBOARD.TOP_TOURS_OF_INTEREST')}</CardTitle>
        </div>
        <div className="d-flex align-items-center mt-md-0 mt-1">
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
          Array.isArray(topFavoriteTours) && topFavoriteTours.length > 0 ? renderStates() : i18n.t('COMMON.THERE_ARE_NO_DATA_TO_DISPLAY')
        }
      </CardBody>
    </Card>
  );
};

export default CardTopFavoriteTour;
