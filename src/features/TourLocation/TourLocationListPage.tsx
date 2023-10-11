import React, { useMemo, useState } from 'react';
import {
  Badge,
  ButtonProps,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Edit, MoreVertical } from 'react-feather';
import TourLocationFilter, { TourLocationFilterParams } from '@features/TourLocation/components/TourLocationFilter';
import { useTourLocations } from '@hooks/tourLocation';
import { TourLocation } from '@domain/entities/tour/TourLocation';
import AddTourLocationModal from '@features/TourLocation/AddTourLocationModal';
import UpdateTourLocationModal from '@features/TourLocation/UpdateTourLocationModal';
import Table from '@components/Table/Table';
import { TableColumn } from 'react-data-table-component';
import { HandleDataState } from '@redux/slices/others/HandleDataState';

export default function TourLocationListPage() {
  const [filterParams, setFilterParams] = useState<Partial<TourLocationFilterParams>>();
  const [selectedTourLocation, setSelectedTourLocation] = useState<TourLocation>();
  const [showAddTourLocationModal, setShowAddTourLocationModal] = useState(false);
  const {
    data: tourLocations = [], refetch, isFetched, isFetching, isError,
  } = useTourLocations();

  const fetchSourcesDataState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const filteredTourLocations = useMemo(() => tourLocations.filter((tourLocation) => {
    if (!filterParams) return true;
    if (filterParams.code && !tourLocation.code.includes(filterParams.code)) return false;
    return !(
      filterParams.name
      && !tourLocation.name.toLowerCase().includes(filterParams.name.toLowerCase())
    );
  }), [tourLocations, filterParams]);

  const additionalActionButtons: Array<ButtonProps> = useMemo(() => [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => {
        setShowAddTourLocationModal(!showAddTourLocationModal);
      },
    },
  ], []);

  const locationTableColumns: TableColumn<TourLocation>[] = [
    {
      name: i18n.t('TOUR_LOCATION.CODE'),
      sortable: true,
      sortField: 'code',
      cell: (location: TourLocation) => location.code,
    },
    {
      name: i18n.t('TOUR_LOCATION.NAME'),
      sortable: true,
      sortField: 'name',
      cell: (location: TourLocation) => location.name,
    },
    {
      name: i18n.t('TOUR_LOCATION.STATUS'),
      cell: (location: TourLocation) => (
        <Badge color={location.status === 'ENABLE' ? 'light-success' : 'light-danger'} pill>
          {i18n.t(`TOUR_LOCATION.${location.status}`)}
        </Badge>
      ),
    },
    {
      name: i18n.t('COMMON.ACTIONS'),
      cell: (location: TourLocation) => (
        <>
          <UncontrolledButtonDropdown>
            <DropdownToggle className="icon-btn hide-arrow" color="transparent" size="sm" caret>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="div" onClick={() => setSelectedTourLocation(location)}>
                <Edit className="me-50" size={15} />
                {' '}
                <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </>
      ),
    },
  ];

  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody>
          <TourLocationFilter onFilter={(params) => setFilterParams(params)} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('TOUR_LOCATION.LIST')}</CardTitle>
        </CardHeader>
        <CardBody>
          <Table<TourLocation>
            selectableRows={false}
            columns={locationTableColumns}
            fetchDataState={fetchSourcesDataState}
            searchableColumns={[]}
            sortColumnDefault="code"
            onRefresh={refetch}
            data={filteredTourLocations || []}
            extraButtons={additionalActionButtons}
          />
        </CardBody>
      </Card>
      <AddTourLocationModal
        className="modal-dialog-centered"
        toggle={() => setShowAddTourLocationModal(!showAddTourLocationModal)}
        isOpen={showAddTourLocationModal}
      />
      <UpdateTourLocationModal
        className="modal-dialog-centered"
        toggle={() => setSelectedTourLocation(undefined)}
        tourLocation={selectedTourLocation}
        isOpen={!!selectedTourLocation}
      />
    </div>
  );
}
