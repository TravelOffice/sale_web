// ** React Imports
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import CustomHeader from '@components/Table/Header';
// ** Store & Actions
import { HandleDataState } from '@redux/slices/others/HandleDataState';
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import React, {
  ChangeEvent, useEffect, useMemo, useState,
} from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import ReactPaginate from 'react-paginate';
// ** Reactstrap Imports
import {
  Card,
} from 'reactstrap';
import { handleFilterColumns, handleSearchColumns } from '@utils/CommonUtils';
import { DEFAULT_PAGE_SIZE } from '@utils/Constants';

export interface TableProps<T> {
  data: T[],
  fetchDataState: HandleDataState,
  fetchDataError?: string,
  columns: TableColumn<T>[],
  searchableColumns: string[],
  sortColumnDefault: string,
  filterColumns: { key: string, value: string }[],
  toggleAddDataSidebar: () => void,
  onRowClicked?: (row: T) => void,
  onPageChange?: (pageNumber: number) => void,
  onRefresh?: () => void,
}

type SortDirection = 'asc' | 'desc';

function Table<T>(props: TableProps<T>) {
  const {
    data,
    fetchDataState,
    fetchDataError,
    columns,
    sortColumnDefault,
    searchableColumns,
    filterColumns,
    toggleAddDataSidebar,
    onRowClicked,
    onRefresh,
  } = props;

  // ** States
  const [sort, setSort] = useState<SortDirection>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(sortColumnDefault);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    if (fetchDataState === 'error') {
      toasty.show({ title: i18n.t('COMMON.ERROR'), type: 'error', message: `${fetchDataError}` });
    }
  }, [fetchDataState]);

  // ** Function in get data on page change
  const handlePagination = (selectedPage: number) => {
    setCurrentPage(selectedPage + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    //  The base of the number is decimal
    const radix: number = 10;
    const value = parseInt(e.currentTarget.value, radix);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val: string) => {
    setSearchTerm(val);
  };

  // ** Function to re-fetching data
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
    setCurrentPage(1);
  };

  const handleSort = (column: any, sortDirection: SortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  // ** Table data to render
  const { dataCurrentPage, totalRows } = useMemo(() => {
    let filteredData = [...data];
    filteredData = filteredData.filter(
      (item: any) => handleFilterColumns(item, filterColumns)
      && handleSearchColumns(item, searchTerm, searchableColumns),
    );
    // Sort data by columns
    filteredData = filteredData.sort(
      (a: any, b: any) => (a[sortColumn] > b[sortColumn] ? 1 : -1) * (sort === 'asc' ? 1 : -1),
    );
    const total = filteredData.length;
    // Get leads of current page
    filteredData = filteredData.slice((currentPage - 1) * rowsPerPage, rowsPerPage * currentPage);
    return { dataCurrentPage: filteredData, totalRows: total };
  }, [data, filterColumns, searchTerm, sortColumn, sort, rowsPerPage, currentPage]);

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(totalRows / rowsPerPage);
    return (
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage > 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page.selected)}
        pageClassName="page-item"
        nextLinkClassName="page-link"
        nextClassName="page-item next"
        previousClassName="page-item prev"
        previousLinkClassName="page-link"
        pageLinkClassName="page-link"
        containerClassName="pagination react-paginate justify-content-end my-2 pe-1"
      />
    );
  };

  return (
    <Card className="overflow-hidden">
      <div className="react-dataTable">
        <DataTable
          noHeader
          selectableRows
          subHeader
          sortServer
          pagination
          responsive
          paginationServer
          columns={columns}
          onSort={handleSort}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          onRowClicked={onRowClicked}
          data={dataCurrentPage}
          subHeaderComponent={(
            <CustomHeader
              searchTerm={searchTerm}
              rowsPerPage={rowsPerPage}
              loading={fetchDataState === 'loading'}
              handleFilter={handleFilter}
              handlePerPage={handlePerPage}
              onToggleSidebar={toggleAddDataSidebar}
              handleRefresh={handleRefresh}
            />
          )}
        />
      </div>
    </Card>
  );
}

export default Table;
