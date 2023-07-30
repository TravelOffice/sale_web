import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { ToursOperationDetailParams } from '@features/ToursOperation/ToursOperationDetail';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import Table from '@components/Table/Table';
import { Col, Row } from 'reactstrap';
import { Booking } from '@domain/entities/booking/Booking';
import customerPaneColumns from '@features/ToursOperation/components/CustomerPaneColumns';
import { ExpanderComponentProps } from 'react-data-table-component';
import i18n from '@config/i18n';
import BookingNoteGroup from '@features/Booking/components/tabs/notes/BookingNoteGroup';
import { Note } from '@domain/entities/note/Note';
import moment from 'moment/moment';
import { CustomerWithBookingData } from '@domain/entities/customer/Customer';

const CustomerPaneExpandableRowComponent:
React.FC<ExpanderComponentProps<CustomerWithBookingData>> = (
  { data }: ExpanderComponentProps<CustomerWithBookingData>,
) => {
  const { notes } = data;
  if (!notes) return <></>;

  const groups = new Map<string, Note[]>();
  notes.forEach((note) => {
    const group = moment(note.createdAt).format('DD/MM/YYYY');
    const noteGroup = groups.get(group);
    if (noteGroup) {
      noteGroup.push(note);
    } else {
      groups.set(group, [note]);
    }
  });
  const noteGroups = Array.from(groups, ([name, value]) => ({ title: name, notes: value }));

  return (
    <div className="container py-xxl-1">
      <Row>
        <Col xl="6">
          <strong>{i18n.t('BOOKING.NOTES')}</strong>
          {noteGroups.map((group) => (
            <BookingNoteGroup
              key={group.title}
              title={group.title}
              notes={group.notes}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default function ToursOperationCustomerListPane() {
  const { tourId } = useParams<ToursOperationDetailParams>();
  const {
    data: bookings,
    isFetching,
    isFetched,
    isError,
  } = useQuery(['bookingsWithCustomer'], async () => tourPresenter.getBookingsByDepartureTour(tourId));

  const fetchBookingsDataState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const customers: CustomerWithBookingData[] = useMemo(() => {
    if (!bookings) return [];
    return bookings.map((booking: Booking) => ({
      ...booking.customer,
      assigneeName: booking.assigneeName,
      notes: booking.notes,
      services: booking.services,
    }) as CustomerWithBookingData);
  }, [bookings]);

  return (
    <>
      <Table<CustomerWithBookingData>
        selectableRows={false}
        columns={customerPaneColumns}
        fetchDataState={fetchBookingsDataState}
        searchableColumns={['name', 'primaryPhoneNumber', 'assigneeName']}
        sortColumnDefault="createdAt"
        data={customers}
        expandableRows
        expandableRowsComponent={CustomerPaneExpandableRowComponent}
      />
    </>
  );
}
