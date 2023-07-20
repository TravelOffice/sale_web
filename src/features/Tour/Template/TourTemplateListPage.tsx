import React, { useMemo, useState } from 'react';
import {
  ButtonProps, Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import Table from '@components/Table/Table';
import { filterTourTemplates } from '@utils/TourTemplateUtils';
import { TourTemplate } from '@domain/entities/tour/TourTemplate';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { ExpanderComponentProps } from 'react-data-table-component/dist/src/DataTable/types';
import { formatVND } from '@utils/CommonUtils';
import moment from 'moment/moment';
import tourTemplateColumns from '@features/Tour/Template/components/TourTemplateColumns';
import { useHistory } from 'react-router-dom';
import { useTourLocations } from '@hooks/tourLocation';
import { findTourLocationNameByCode } from '@utils/TourLocationUtils';
import { useTourTemplates } from '@hooks/tourTemplate';
import TourTemplateFilter, { TourTemplateFilterParams } from './components/TourTemplateFilter';

const TourTemplateExpandableRow: React.FC<ExpanderComponentProps<TourTemplate>> = (
  { data }: ExpanderComponentProps<TourTemplate>,
) => (
  <div className="container py-xxl-1">
    <Row>
      <Col md={6}>
        <strong>{i18n.t('TOUR_TEMPLATE.PRICE')}</strong>
        <ul>
          {
            data.services.map((service) => (
              <li>
                {service.name}
                :
                {' '}
                {formatVND(service.price)}
              </li>
            ))
          }
        </ul>
        <br />
        <strong>{i18n.t('TOUR_TEMPLATE.CREATOR')}</strong>
        <ul>
          <li>{`${i18n.t('TOUR_TEMPLATE.CREATOR')}: ${data.creator}`}</li>
          <li>{`${i18n.t('COMMON.CREATED_AT')}: ${moment(data.createdAt).format('DD/MM/YYYY')}`}</li>
        </ul>
      </Col>
      <Col md={6}>
        <strong>{i18n.t('TOUR_TEMPLATE.POLICIES_AND_REGULATIONS')}</strong>
        <ul>
          <li>{`${i18n.t('TOUR_TEMPLATE.INCLUSION_AND_EXCLUSION')}: ${data.policiesAndRegulations.inclusionAndExclusion || ''}`}</li>
          <li>{`${i18n.t('TOUR_TEMPLATE.POLICY_CONDITIONS_AND_EXTRA_FEE')}: ${data.policiesAndRegulations.policyConditionsAndExtraFee || ''}`}</li>
          <li>{`${i18n.t('TOUR_TEMPLATE.CANCELLATION_TERMS')}: ${data.policiesAndRegulations.cancellationTerms || ''}`}</li>
        </ul>
      </Col>
    </Row>
  </div>
);

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
        history.push('/apps/tour-templates/create');
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
