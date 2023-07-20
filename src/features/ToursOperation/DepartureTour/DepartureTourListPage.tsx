import { tourPresenter, userPresenter } from '@adapter/presenters';
import Table from '@components/Table/Table';
import i18n from '@config/i18n';
import { ExtendedDepartureTour, TourLocation } from '@domain/entities/tour';
import departureTourColumns from '@features/ToursOperation/DepartureTour/components/DepartureTourColumns';
import DepartureTourFilter, { DepartureTourFilterParams } from '@features/ToursOperation/DepartureTour/components/DepartureTourFilter';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { useQueries } from '@tanstack/react-query';
import { canUserBeOperator, filterDepartureTours, toSearchableContent } from '@utils/TousOperationUtils';
import React, { useMemo, useState } from 'react';
import { ExpanderComponentProps } from 'react-data-table-component';
import { Info, User } from 'react-feather';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  ButtonProps,
  Col, Row,
} from 'reactstrap';

// Expandable component UI that show detailed data of each departure tour
type InternalComponentProps = ExpanderComponentProps<ExtendedDepartureTour>;
const TourDepartureExpandableRowComponent: React.FC<InternalComponentProps> = (
  { data }: InternalComponentProps,
) => {
  console.log(data);
  // TODO: Implement this component later when the feature is ready
  return (
    <div className="container py-xxl-1">
      <Row>
        <Col xl="6">
          <User size={14} />
          {' '}
          <strong>{i18n.t('TOURS_OPERATION.PASSENGERS')}</strong>
          <ul>
            <li>{`${5} - ${i18n.t('LEAD.ADULT')} `}</li>
            <li>{`${1} - ${i18n.t('LEAD.CHILDREN')} `}</li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

/**
 * Convert location id to location name
 * @param id Location id
 * @param tourLocations Locations fetched from server
 * @returns Location name
 */
const fromIdToTourLocationName = (id: string, tourLocations: TourLocation[]) => {
  const tourLocation = tourLocations.find((location) => location.code === id);
  return tourLocation?.name || '';
};

export default function DepartureTourListPage() {
  const [filterParams, setFilterParams] = useState<DepartureTourFilterParams>();
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

    if (!filterParams) return extendedDepTours;
    return filterDepartureTours(extendedDepTours, filterParams);
  }, [departureTours, tourLocations, filterParams]);

  const history = useHistory();
  const additionalActionButtons: Array<ButtonProps> = useMemo(() => [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => { history.push('/apps/bookings/create'); },
    },
  ], []);

  return (
    <>
      {
        isFetching && (
          <Alert color="warning">
            <div className="d-flex align-items-center alert-body">
              <Info size={14} />
              <span className="ms-1">
                {i18n.t('TOURS_OPERATION.LOADING_NOTIFICATION')}
              </span>
            </div>
          </Alert>
        )
      }
      <DepartureTourFilter onFilter={(params) => setFilterParams(params)} />
      <Table<ExtendedDepartureTour>
        selectableRows={false}
        columns={departureTourColumns}
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
        extraButtons={additionalActionButtons}
      />
    </>
  );
}
