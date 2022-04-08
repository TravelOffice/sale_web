import React, { ChangeEventHandler } from 'react';
import {
  Share, Printer, FileText, Grid, Copy, File,
} from 'react-feather';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Input,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import { leadActions } from '@redux/slices/leadSlice';
import { useDispatch, useSelector } from 'react-redux';

const { initAddLeadForm } = leadActions;

export interface CustomHeaderProps {
  toggleSidebar: () => void,
  handlePerPage: (e: any) => void,
  handleFilter: (e: string) => void,
  searchTerm: string,
  rowsPerPage: number,
}

export default function CustomHeader(props: CustomHeaderProps) {
  const {
    handleFilter, handlePerPage, rowsPerPage, searchTerm, toggleSidebar,
  } = props;

  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(initAddLeadForm());
    toggleSidebar();
  };
  // ** Converts table to CSV
  // function convertArrayOfObjectsToCSV(array) {
  //   let result

  //   // const columnDelimiter = ','
  //   // const lineDelimiter = '\n'
  //   // const keys = Object.keys(store.data[0])

  //   // result = ''
  //   // result += keys.join(columnDelimiter)
  //   // result += lineDelimiter

  //   // array.forEach(item => {
  //   //   let ctr = 0
  //   //   keys.forEach(key => {
  //   //     if (ctr > 0) result += columnDelimiter

  //   //     result += item[key]

  //   //     ctr++
  //   //   })
  //   //   result += lineDelimiter
  //   // })

  //   return result
  // }

  // ** Downloads CSV
  function downloadCSV(array: any) {
    // const link = document.createElement('a')
    // let csv = convertArrayOfObjectsToCSV(array)
    // if (csv === null) return

    // const filename = 'export.csv'

    // if (!csv.match(/^data:text\/csv/i)) {
    //   csv = `data:text/csv;charset=utf-8,${csv}`
    // }

    // link.setAttribute('href', encodeURI(csv))
    // link.setAttribute('download', filename)
    // link.click()
  }
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">
              Show
            </label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <Printer className="font-small-4 me-50" />
                  <span className="align-middle">Print</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  {/* <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}> */}
                  <FileText className="font-small-4 me-50" />
                  <span className="align-middle">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid className="font-small-4 me-50" />
                  <span className="align-middle">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File className="font-small-4 me-50" />
                  <span className="align-middle">PDF</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy className="font-small-4 me-50" />
                  <span className="align-middle">Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className="add-new-user" color="primary" onClick={handleToggleSidebar}>
              Add New Lead
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
