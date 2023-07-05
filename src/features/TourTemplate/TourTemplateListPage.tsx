import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tourTemplatePresenter } from '@adapter/presenters';
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import TourTemplateFilter, { TourTemplateFilterParams } from '@features/TourTemplate/components/TourTemplateFilter';
import { filterTourTemplates } from '@utils/TourTemplateUtils';
import tourTemplateColumns from '@features/TourTemplate/components/TourTemplateColumns';

export default function TourTemplateListPage() {
  const [filterParams, setFilterParams] = useState<TourTemplateFilterParams>();
  const { data: allTourTemplates, isFetching } = useQuery(
    ['tour-templates'], async () => tourTemplatePresenter.getAllTourTemplates(),
  );

  const tourTemplates = useMemo(() => {
    if (!allTourTemplates) return [];
    if (!filterParams) return allTourTemplates;
    return filterTourTemplates(allTourTemplates, filterParams);
  }, [allTourTemplates, filterParams]);

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
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('TOUR_TEMPLATE.LIST')}</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="react-dataTable">
            <DataTable
              noHeader
              selectableRows={false}
              striped
              dense
              responsive
              progressPending={isFetching}
              paginationServer
              className="react-dataTable"
              columns={tourTemplateColumns}
              sortIcon={<ChevronDown />}
              customStyles={{
                cells: {
                  style: {
                    height: 'auto !important',
                    fontSize: '1rem',
                    lineHeight: '1.6rem',
                  },
                },
              }}
              data={tourTemplates}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
