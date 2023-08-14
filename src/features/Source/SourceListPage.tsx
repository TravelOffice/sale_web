import React, { useMemo, useState } from 'react';
import {
  Button,
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import SourceFilter, { SourceFilterParams } from '@features/Source/components/SourceFilter';
import { useSources } from '@hooks/source';
import { Plus } from 'react-feather';
import AddSourceModal from '@features/Source/AddSourceModal';
import { Source } from '@domain/entities/source/Source';
import UpdateSourceModal from '@features/Source/UpdateSourceModal';
import SourceTable from '@features/Source/components/SourceTable';

export default function SourceListPage() {
  const [filterParams, setFilterParams] = useState<Partial<SourceFilterParams>>();
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState<Source | undefined>();

  const { data: allSources = [], isLoading = [] } = useSources();
  const filteredSources = useMemo(() => allSources.filter((source) => {
    if (!filterParams) return true;
    if (filterParams.code && !source.code.includes(filterParams.code)) return false;
    return !(
      filterParams.name
      && !source.name.toLowerCase().includes(filterParams.name.toLowerCase())
    );
  }), [allSources, filterParams]);

  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody>
          <SourceFilter onFilter={(params) => setFilterParams(params)} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('SOURCE.LIST')}</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-end mb-1">
            <Button type="button" color="primary" onClick={() => setShowAddSourceModal(!showAddSourceModal)}>
              <Plus size={16} />
              {' '}
              {i18n.t('COMMON.ADD')}
            </Button>
          </div>
          <SourceTable
            sources={filteredSources}
            isLoading={!!isLoading}
            onEditSource={setSelectedSource}
          />
        </CardBody>
      </Card>
      <AddSourceModal
        className="modal-dialog-centered"
        toggle={() => setShowAddSourceModal(!showAddSourceModal)}
        isOpen={showAddSourceModal}
      />
      <UpdateSourceModal
        className="modal-dialog-centered"
        source={selectedSource}
        toggle={() => setSelectedSource(undefined)}
        isOpen={!!selectedSource}
      />
    </div>
  );
}
