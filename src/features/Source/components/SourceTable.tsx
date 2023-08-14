import React from 'react';
import { Source } from '@domain/entities/source/Source';
import i18n from '@config/i18n';
import SourceTableRow from '@features/Source/components/SourceTableRow';
import { Table } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';

export interface SourceTableProps {
  sources: Source[],
  isLoading: boolean,
  onEditSource: (source: Source) => void,
}

function SourceTableSkeleton() {
  return (
    <Skeleton count={5} />
  );
}

export default function SourceTable(props: SourceTableProps) {
  const { sources, isLoading, onEditSource } = props;

  if (isLoading) return <SourceTableSkeleton />;
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th style={{ width: 100 }}>{i18n.t('SOURCE.CODE')}</th>
            <th>{i18n.t('SOURCE.NAME')}</th>
            <th className="w-25">{i18n.t('SOURCE.CREATED_AT')}</th>
            <th className="w-25">{i18n.t('SOURCE.UPDATED_AT')}</th>
            <th style={{ width: 150 }}>{i18n.t('COMMON.ACTIONS')}</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <SourceTableRow
              key={source.code}
              source={source}
              onEdit={() => onEditSource(source)}
            />
          ))}
        </tbody>
      </Table>
      {sources.length === 0 && (
        <div className="d-flex align-items-center justify-content-center py-3">
          {i18n.t('COMMON.NO_DATA')}
        </div>
      )}
    </>
  );
}
