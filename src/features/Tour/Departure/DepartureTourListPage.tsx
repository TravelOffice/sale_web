import React, { useMemo, useState } from 'react';
import {
  ButtonProps, Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import Table from '@components/Table/Table';
import { filterDepartureTours } from '@utils/DepartureTourUtils';
import { DepartureTour } from '@domain/entities/tour/DepartureTour';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import departureTourColumns from '@features/Tour/Departure/components/DepartureTourColumns';
import { useHistory } from 'react-router-dom';
import { useTourLocations } from '@hooks/tourLocation';
import { findTourLocationNameByCode } from '@utils/TourLocationUtils';
import { useDepartureTours } from '@hooks/tourDeparture';
import DepartureTourExpandableRow from './components/DepartureTourExpandableRow';
import DepartureTourFilter, { DepartureTourFilterParams } from './components/DepartureTourFilter';

export default function DepartureTourListPage() {
  const [filterParams, setFilterParams] = useState<DepartureTourFilterParams>();
  const history = useHistory();
  const {
    data: allDepartureTours, isFetching, isFetched, isError, refetch,
  } = useDepartureTours();
  const { data: tourLocations = [] } = useTourLocations();

  const fetchDepartureToursState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const departureToursWithLocation = useMemo(() => {
    if (!allDepartureTours) return [];
    return allDepartureTours.map((departureTour) => ({
      ...departureTour,
      startingLocation: findTourLocationNameByCode(tourLocations, departureTour.startingLocation),
      endingLocation: findTourLocationNameByCode(tourLocations, departureTour.endingLocation),
    }));
  }, [allDepartureTours, tourLocations]);

  const departureTours = useMemo(() => {
    if (!filterParams) return departureToursWithLocation;
    return filterDepartureTours(departureToursWithLocation, filterParams);
  }, [departureToursWithLocation, filterParams]);

  const departureTourBtnArr: Array<ButtonProps> = [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => {
        history.push('/apps/tours/departure/create');
      },
    },
  ];

  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody>
          <DepartureTourFilter
            onFilter={(params) => setFilterParams(params)}
            departureTours={departureToursWithLocation}
          />
        </CardBody>
      </Card>
      <Table<DepartureTour>
        data={departureTours}
        fetchDataState={fetchDepartureToursState}
        columns={departureTourColumns}
        searchableColumns={['code', 'name', 'type', 'startingLocation', 'endingLocation', 'durationInDays', 'durationInNights']}
        sortColumnDefault="createdAt"
        onPageChange={() => {
        }}
        onRefresh={refetch}
        expandableRows
        expandableRowsComponent={DepartureTourExpandableRow}
        extraButtons={departureTourBtnArr}
      />
    </div>
  );
}
