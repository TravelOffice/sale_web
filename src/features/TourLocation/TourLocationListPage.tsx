import React, { useMemo, useState } from 'react';
import {
  Button, Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Plus } from 'react-feather';
import TourLocationFilter, { TourLocationFilterParams } from '@features/TourLocation/components/TourLocationFilter';
import { useTourLocations } from '@hooks/tourLocation';
import TourLocationTable from '@features/TourLocation/components/TourLocationTable';
import { TourLocation } from '@domain/entities/tour/TourLocation';
import AddTourLocationModal from '@features/TourLocation/AddTourLocationModal';
import UpdateTourLocationModal from '@features/TourLocation/UpdateTourLocationModal';

export default function TourLocationListPage() {
  const [filterParams, setFilterParams] = useState<Partial<TourLocationFilterParams>>();
  const [selectedTourLocation, setSelectedTourLocation] = useState<TourLocation>();
  const [showAddTourLocationModal, setShowAddTourLocationModal] = useState(false);
  const { data: tourLocations = [], isLoading } = useTourLocations();

  const filteredTourLocations = useMemo(() => tourLocations.filter((tourLocation) => {
    if (!filterParams) return true;
    if (filterParams.code && !tourLocation.code.includes(filterParams.code)) return false;
    return !(
      filterParams.name
      && !tourLocation.name.toLowerCase().includes(filterParams.name.toLowerCase())
    );
  }), [tourLocations, filterParams]);

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
          <div className="d-flex justify-content-end mb-1">
            <Button type="button" color="primary" onClick={() => setShowAddTourLocationModal(!showAddTourLocationModal)}>
              <Plus size={16} />
              {' '}
              {i18n.t('COMMON.ADD')}
            </Button>
          </div>
          <TourLocationTable
            tourLocations={filteredTourLocations}
            isLoading={isLoading}
            onEditTourLocation={setSelectedTourLocation}
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
