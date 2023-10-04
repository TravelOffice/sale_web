// ** React Imports
import React, { useMemo } from 'react';

// ** Third Party Components
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import i18n from 'i18next';
import Table from '@components/Table/Table';
import { useQueries } from '@tanstack/react-query';
import { tourPresenter, userPresenter } from '@adapter/presenters';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { ExtendedDepartureTour } from '@domain/entities/tour';
import { canUserBeOperator, filterDepartureTours, toSearchableContent } from '@utils/TousOperationUtils';
import {
  fromIdToTourLocationName,
  TourDepartureExpandableRowComponent,
} from '@features/ToursOperation/DepartureTour/DepartureTourListPage';
import TourColumns from './TourColumns';

const CardMarketplaceTours = () => {
  const relatedData = useQueries({
    queries: [
      {
        queryKey: ['departureTours'],
        queryFn: tourPresenter.getAllDepartureTours,
      },
      {
        queryKey: ['toursLocation'],
        queryFn: tourPresenter.getAllToursLocation,
      },
      // * Force getting all operator users to use in tour table
      {
        queryKey: ['operators'],
        queryFn: async () => {
          const users = await userPresenter.getAllUsers();
          return users.filter((user) => canUserBeOperator(user));
        },
      },
    ],
  });

  // Extracting data from related data
  // Also, map data to options for each related select components
  const [
    departureToursRs,
    tourLocationsRs,
  ] = relatedData;

  const {
    data: departureTours,
    isFetching,
    isFetched,
    isError,
  } = departureToursRs;
  const { data: tourLocations } = tourLocationsRs;

  const fetchBookingsDataState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const filteredDepartureTours = useMemo(() => {
    if (!departureTours) return [];
    const extendedDepTours = departureTours.map((depTour) => ({
      ...depTour,
      startingLocationName: fromIdToTourLocationName(depTour.startingLocation, tourLocations || []),
      endingLocationName: fromIdToTourLocationName(depTour.endingLocation, tourLocations || []),
    }));

    return filterDepartureTours(extendedDepTours, {});
  }, [departureTours, tourLocations]);

  const rangeFilter = [
    i18n.t('DASHBOARD.LAST_7_DAYS_RANGE'),
    i18n.t('DASHBOARD.LAST_MONTH_RANGE'),
    i18n.t('DASHBOARD.LAST_YEAR_RANGE'),
  ];

  return (
    <>
      <Card>
        <CardHeader className="align-items-end">
          <CardTitle tag="h4">{i18n.t('DASHBOARD.LIST_OF_TOURS_CAN_BE_SOLD_ON_TRAVEL_CONNECT')}</CardTitle>
          <UncontrolledDropdown className="chart-dropdown">
            <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
              {i18n.t('DASHBOARD.LAST_7_DAYS_RANGE')}
            </DropdownToggle>
            <DropdownMenu end>
              {rangeFilter.map((item) => (
                <DropdownItem className="w-100" key={item}>
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <CardBody>
          <Table<ExtendedDepartureTour>
            selectableRows={false}
            columns={TourColumns}
            fetchDataState={fetchBookingsDataState}
            searchableColumns={[]}
            sortColumnDefault="code"
            onPageChange={() => { }}
            onRefresh={() => { }}
            data={filteredDepartureTours || []}
            expandableRows
            expandableRowsComponent={TourDepartureExpandableRowComponent}
            customSearchHandler={(departureTour: ExtendedDepartureTour, searchTerm: string) => {
              const searchableContent = toSearchableContent(departureTour);
              return searchableContent.includes(searchTerm.toLowerCase());
            }}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default CardMarketplaceTours;
