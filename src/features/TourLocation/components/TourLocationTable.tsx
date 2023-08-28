import React from 'react';
import { TourLocation } from '@domain/entities/tour';
import { Table } from 'reactstrap';
import i18n from '@config/i18n';
import TourLocationTableRow from '@features/TourLocation/components/TourLocationTableRow';
import Skeleton from 'react-loading-skeleton';

export interface TourLocationTableProps {
  tourLocations: TourLocation[],
  isLoading: boolean,
  onEditTourLocation: (tourLocation: TourLocation) => void,
}

function TourLocationTableSkeleton() {
  return (
    <Skeleton count={5} className="skeleton-custom-style" />
  );
}

export default function TourLocationTable(props: TourLocationTableProps) {
  const { tourLocations, isLoading, onEditTourLocation } = props;
  if (isLoading) return <TourLocationTableSkeleton />;
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th style={{ width: 100 }}>{i18n.t('TOUR_LOCATION.CODE')}</th>
            <th>{i18n.t('TOUR_LOCATION.NAME')}</th>
            <th className="w-25">{i18n.t('TOUR_LOCATION.STATUS')}</th>
            <th style={{ width: 150 }}>{i18n.t('COMMON.ACTIONS')}</th>
          </tr>
        </thead>
        <tbody>
          {tourLocations.map((tourLocation) => (
            <TourLocationTableRow
              key={tourLocation.code}
              tourLocation={tourLocation}
              onEdit={() => onEditTourLocation(tourLocation)}
            />
          ))}
        </tbody>
      </Table>
      {tourLocations.length === 0 && (
        <div className="py-3 d-flex align-items-center justify-content-center">
          {i18n.t('COMMON.NO_DATA')}
        </div>
      )}
    </>
  );
}
