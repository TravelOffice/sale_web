import React from 'react';
import { Source } from '@domain/entities/source/Source';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown,
} from 'reactstrap';
import { Edit, MoreVertical } from 'react-feather';
import i18n from '@config/i18n';
import moment from 'moment';

export interface SourceTableRowProps {
  source: Source,
  onEdit: (source: Source) => void,
}

export default function SourceTableRow(props: SourceTableRowProps) {
  const { source, onEdit } = props;

  return (
    <tr>
      <td className="fw-bolder">{source.code}</td>
      <td>{source.name}</td>
      <td>{moment(source.createdAt).format('hh:mm DD/MM/YYYY')}</td>
      <td>{moment(source.updatedAt).format('hh:mm DD/MM/YYYY')}</td>
      <td>
        <UncontrolledButtonDropdown>
          <DropdownToggle className="icon-btn hide-arrow" color="transparent" size="sm" caret>
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag="div" onClick={() => onEdit(source)}>
              <Edit className="me-50" size={15} />
              {' '}
              <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </td>
    </tr>
  );
}
