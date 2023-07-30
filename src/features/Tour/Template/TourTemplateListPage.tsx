import React, { useMemo, useState } from 'react';
import {
  ButtonProps, Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import Table from '@components/Table/Table';
import { filterTourTemplates } from '@utils/TourTemplateUtils';
import { TourTemplate } from '@domain/entities/tour/TourTemplate';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import tourTemplateColumns from '@features/Tour/Template/components/TourTemplateColumns';
import { useHistory } from 'react-router-dom';
import { useTourLocations } from '@hooks/tourLocation';
import { findTourLocationNameByCode } from '@utils/TourLocationUtils';
import { useTourTemplates } from '@hooks/tourTemplate';
import TourTemplateExpandableRow from './components/TourTemplateExpandableRow';
import TourTemplateFilter, { TourTemplateFilterParams } from './components/TourTemplateFilter';

export default function TourTemplateListPage() {
  const [filterParams, setFilterParams] = useState<TourTemplateFilterParams>();
  const history = useHistory();
  const {
    data: allTourTemplates, isFetching, isFetched, isError, refetch,
  } = useTourTemplates();
  const { data: tourLocations = [] } = useTourLocations();

  const fetchTourTemplatesState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const tourTemplatesWithLocation = useMemo(() => {
    if (!allTourTemplates) return [];
    return allTourTemplates.map((tourTemplate) => ({
      ...tourTemplate,
      startingLocation: findTourLocationNameByCode(tourLocations, tourTemplate.startingLocation),
      endingLocation: findTourLocationNameByCode(tourLocations, tourTemplate.endingLocation),
    }));
  }, [allTourTemplates, tourLocations]);

  const tourTemplates = useMemo(() => {
    if (!filterParams) return tourTemplatesWithLocation;
    return filterTourTemplates(tourTemplatesWithLocation, filterParams);
  }, [tourTemplatesWithLocation, filterParams]);

  const tourTemplateBtnArr: Array<ButtonProps> = [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => {
        history.push('/apps/tours/template/create');
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
          <TourTemplateFilter onFilter={(params) => setFilterParams(params)} />
        </CardBody>
      </Card>
      <Table<TourTemplate>
        data={tourTemplates}
        fetchDataState={fetchTourTemplatesState}
        columns={tourTemplateColumns}
        searchableColumns={['code', 'name', 'type', 'startingLocation', 'endingLocation', 'durationInDays', 'durationInNights']}
        sortColumnDefault="code"
        onPageChange={() => {
        }}
        onRefresh={refetch}
        expandableRows
        expandableRowsComponent={TourTemplateExpandableRow}
        extraButtons={tourTemplateBtnArr}
      />
    </div>
  );
}
