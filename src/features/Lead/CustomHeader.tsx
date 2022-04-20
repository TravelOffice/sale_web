import i18n from '@config/i18n';
import React, { ChangeEvent } from 'react';
import { RefreshCw } from 'react-feather';
// ** Reactstrap Imports
import {
  Button, Col, Input, Row,
} from 'reactstrap';

import { leadActions } from '@redux/slices/leadSlice';
import { useDispatch } from 'react-redux';

const { initAddLeadForm } = leadActions;

export interface CustomHeaderProps {
  toggleSidebar: () => void,
  handlePerPage: (e: ChangeEvent<HTMLInputElement>) => void,
  handleFilter: (e: string) => void,
  handleRefresh: () => void,
  searchTerm: string,
  rowsPerPage: number,
  loading: boolean,
}

export default function CustomHeader(props: CustomHeaderProps) {
  const {
    handleFilter, handlePerPage, rowsPerPage, searchTerm, loading, toggleSidebar, handleRefresh,
  } = props;

  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(initAddLeadForm());
    toggleSidebar();
  };
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">
              {i18n.t('COMMON.SHOW')}
            </label>
            <Input
              className="mx-50 per-page-input"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <Button className="btn-icon" outline color="primary" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={loading ? 'spin-animated' : ''} size={16} />
          </Button>
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder={i18n.t('COMMON.SEARCH')}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <Button className="add-new-user" color="primary" onClick={handleToggleSidebar}>
              {i18n.t('COMMON.ADD')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
