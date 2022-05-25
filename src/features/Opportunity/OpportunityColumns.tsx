// ** Custom Components
import Avatar, { AvatarColor } from '@components/Avatar/Avatar';
// ** i18n import
import i18n from '@config/i18n';
import { Opportunity } from '@domain/entities/opportunity/Opportunity';
// ** Store & Actions
import { opportunityActions } from '@redux/slices/opportunitySlice';
import React, { MouseEventHandler, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
// ** Icons Imports
import {
  Archive, ChevronsUp, ChevronUp, FileText, MoreVertical, Trash2,
} from 'react-feather';
import { useDispatch } from 'react-redux';
// ** React Imports
import { Link, useHistory } from 'react-router-dom';
// ** Reactstrap Imports
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledDropdown,
} from 'reactstrap';

// ** Renders Client Columns
const statusObj : { [key: string] : AvatarColor } = {
  INITIALIZED: 'light-info',
  ADVISORY: 'light-primary',
  PRICE_QUOTE: 'light-success',
  CLOSED_WON: 'light-success',
  CLOSED_LOST: 'light-danger',
};

const severityObj: { [key: string] : JSX.Element | null } = {
  HIGH: <ChevronsUp />,
  MEDIUM: <ChevronUp />,
  LOW: <></>,
};

const renderOpportunity = (opportunity: Opportunity) => {
  const color : AvatarColor = statusObj[opportunity.status];
  return <Avatar color={color || 'primary'} className="me-1" content={opportunity.name} />;
};

// eslint-disable-next-line import/prefer-default-export
export const opportunityColumns : TableColumn<Opportunity>[] = [
  {
    name: i18n.t('OPP.NAME'),
    sortable: true,
    minWidth: '250px',
    sortField: 'name',
    cell: (opp: Opportunity) => {
      const dispatch = useDispatch();
      const history = useHistory();
      return (
        <div className="d-flex justify-content-left align-items-center">
          {renderOpportunity(opp)}
          <div className="d-flex flex-column">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                dispatch(opportunityActions.selectOpportunity(opp));
                history.push(`/apps/lead/${opp.leadId}/opp/${opp.id}`);
              }}
              className="user_name text-truncate text-body"
            >
              <span className="fw-bolder">{opp.name}</span>
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    name: i18n.t('OPP.CUSTOMER'),
    minWidth: '150px',
    sortable: true,
    sortField: 'customerName',
    cell: (opp: Opportunity) => <span className="text-capitalize">{opp.leadName}</span>,
  },
  {
    name: i18n.t('OPP.SOURCE'),
    minWidth: '150px',
    sortable: true,
    sortField: 'source',
    cell: (opp: Opportunity) => <span className="text-capitalize">{i18n.t(`OPP.${opp.source}`)}</span>,
  },
  {
    name: i18n.t('OPP.POTENTIAL_RATE'),
    minWidth: '150px',
    sortable: true,
    sortField: 'potential',
    cell: (opp: Opportunity) => (
      <>
        {severityObj[opp.potential]}
        <span className="text-capitalize">{i18n.t(`COMMON.SEVERITY_${opp.potential}`)}</span>
      </>
    ),
  },
  {
    name: i18n.t('COMMON.STATUS'),
    minWidth: '150px',
    sortable: true,
    sortField: 'status',
    cell: (opp: Opportunity) => (
      <Badge className="text-capitalize" color={statusObj[opp.status]} pill>
        {i18n.t(`OPP.${opp.status}`)}
      </Badge>
    ),
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    minWidth: '50px',
    cell: (opp: Opportunity) => {
      const dispatch = useDispatch();
      const history = useHistory();

      const [openDeletionWarning, setOpenDeletionWarning] = useState(false);

      // Select opportunity row
      const selectRow: MouseEventHandler = (e) => {
        e.preventDefault();
        dispatch(opportunityActions.selectOpportunity(opp));
      };

      // Toggle deletion warning dialog
      const toggleDeletionWarningDialog = () => {
        setOpenDeletionWarning(!openDeletionWarning);
      };

      // Dispatch action to delete opportunity from server
      const handleDeleteOpportunities: MouseEventHandler = (e) => {
        e.preventDefault();
        toggleDeletionWarningDialog();
      };

      const onDeleteOpportunity = () => {
        toggleDeletionWarningDialog();
        dispatch(opportunityActions.deleteOpportunity(opp));
      };

      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu container="body">
              <DropdownItem
                tag="a"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(opportunityActions.selectOpportunity(opp));
                  history.push(`/apps/lead/${opp.leadId}/opp/${opp.id}`);
                }}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">{i18n.t('COMMON.DETAILS')}</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={selectRow}>
                <Archive size={14} className="me-50" />
                <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={handleDeleteOpportunities}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">{i18n.t('COMMON.DELETE')}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Modal
            isOpen={openDeletionWarning}
            toggle={toggleDeletionWarningDialog}
            className="modal-dialog-centered"
            modalClassName="modal-warning"
          >
            <ModalHeader toggle={toggleDeletionWarningDialog}>{i18n.t('OPP.OPP_DELETION_WARNING_TITLE', { opportunityName: opp.name })}</ModalHeader>
            <ModalBody>
              {i18n.t('OPP.DELETION_WARNING_MESSAGE')}
            </ModalBody>
            <ModalFooter>
              <Button outline color="secondary" onClick={() => setOpenDeletionWarning(!openDeletionWarning)}>
                {i18n.t('COMMON.CANCEL')}
              </Button>
              <Button color="warning" onClick={onDeleteOpportunity}>
                {i18n.t('COMMON.YES')}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    },
  },
];
