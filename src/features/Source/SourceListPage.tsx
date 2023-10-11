import React, { useMemo, useState } from 'react';
import {
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
import SourceFilter, { SourceFilterParams } from '@features/Source/components/SourceFilter';
import { useSources } from '@hooks/source';
import { Edit, MoreVertical } from 'react-feather';
import AddSourceModal from '@features/Source/AddSourceModal';
import { Source } from '@domain/entities/source/Source';
import UpdateSourceModal from '@features/Source/UpdateSourceModal';
import { TableColumn } from 'react-data-table-component';
import Table from '@components/Table/Table';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import moment from 'moment';

export default function SourceListPage() {
  const [filterParams, setFilterParams] = useState<Partial<SourceFilterParams>>();
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState<Source | undefined>();

  const sourceTableColumns: TableColumn<Source>[] = [
    {
      name: i18n.t('SOURCE.CODE'),
      sortable: true,
      sortField: 'code',
      cell: (source: Source) => source.code,
    },
    {
      name: i18n.t('SOURCE.NAME'),
      sortable: true,
      sortField: 'name',
      cell: (source: Source) => source.name,
    },
    {
      name: i18n.t('SOURCE.CREATED_AT'),
      cell: (source: Source) => moment(source.createdAt).format('hh:mm DD/MM/YYYY'),
    },
    {
      name: i18n.t('SOURCE.UPDATED_AT'),
      cell: (source: Source) => moment(source.updatedAt).format('hh:mm DD/MM/YYYY'),
    },
    {
      name: i18n.t('COMMON.ACTIONS'),
      cell: (source: Source) => (
        <>
          <UncontrolledButtonDropdown>
            <DropdownToggle className="icon-btn hide-arrow" color="transparent" size="sm" caret>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="div" onClick={() => setSelectedSource(source)}>
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

  const {
    data: allSources = [], refetch, isFetching, isFetched, isError = [],
  } = useSources();
  const fetchSourcesDataState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const filteredSources = useMemo(() => allSources.filter((source) => {
    if (!filterParams) return true;
    if (filterParams.code && !source.code.includes(filterParams.code)) return false;
    return !(
      filterParams.name
      && !source.name.toLowerCase().includes(filterParams.name.toLowerCase())
    );
  }), [allSources, filterParams]);

  const additionalActionButtons: Array<ButtonProps> = useMemo(() => [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => {
        setShowAddSourceModal(!showAddSourceModal);
      },
    },
  ], []);

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
          <Table<Source>
            selectableRows={false}
            columns={sourceTableColumns}
            fetchDataState={fetchSourcesDataState}
            searchableColumns={[]}
            sortColumnDefault="code"
            onRefresh={refetch}
            data={filteredSources || []}
            extraButtons={additionalActionButtons}
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
