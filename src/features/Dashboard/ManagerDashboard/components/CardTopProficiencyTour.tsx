// ** Third Party Components
import { Calendar } from 'react-feather';

// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import Flatpickr from 'react-flatpickr';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import { useQuery } from '@tanstack/react-query';
import { travelStatisticPresenter } from '@adapter/presenters';
import { MetricNameEnum, ProficiencyTour } from '@domain/entities/statistic/TravelStatistic';
import { formatVND } from '@utils/CommonUtils';

const CardTopFavoriteTour = () => {
  const defaultEndTime = Date.now();
  const defaultStartTime = defaultEndTime - 7 * 24 * 60 * 60 * 1000;
  const [selectedStartTime, setSelectedStartTime] = useState<number>(defaultStartTime);
  const [selectedEndTime, setSelectedEndTime] = useState<number>(defaultEndTime);
  const {
    data: topProficiencyTours,
    refetch,
  } = useQuery(
    [MetricNameEnum.TOP_PROFICIENCY_TOUR],
    async () => travelStatisticPresenter.getTravelStatistic(
      MetricNameEnum.TOP_PROFICIENCY_TOUR,
      selectedStartTime.toString(),
      selectedEndTime.toString(),
    ),
  );

  useEffect(() => {
    refetch();
  }, [selectedStartTime, selectedEndTime]);

  const renderStates = () => (topProficiencyTours as ProficiencyTour[]).map((tour) => (
    <li className="mb-1" style={{ listStyleType: 'none' }} key={tour.departureTourId}>
      <h6 className="mb-0">{tour.departureTourName}</h6>
      <small>
        {`${i18n.t('DASHBOARD.REVENUE')}: ${formatVND(tour.revenue)}`}
      </small>
      <br />
      <small>
        {`${i18n.t('DASHBOARD.COST')}: ${formatVND(tour.cost)}`}
      </small>
      <br />
      {tour.proficiency && (
        <small>
          {`${i18n.t('DASHBOARD.PROFICIENCY')}: ${formatVND(tour.proficiency)}`}
        </small>
      )}
    </li>
  ));

  return (
    <Card className="card-browser-states">
      <CardHeader>
        <div>
          <CardTitle tag="h4">{i18n.t('DASHBOARD.TOP_PROFICIENCY_TOURS')}</CardTitle>
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
              if (selectedDates[0] && selectedDates[1]) {
                setSelectedStartTime(selectedDates[0].getTime());
                setSelectedEndTime(selectedDates[1].getTime());
              }
            }}
          />
        </div>
      </CardHeader>
      <CardBody>
        {
          Array.isArray(topProficiencyTours) && topProficiencyTours.length > 0 ? renderStates() : i18n.t('COMMON.THERE_ARE_NO_DATA_TO_DISPLAY')
        }
      </CardBody>
    </Card>
  );
};

export default CardTopFavoriteTour;
