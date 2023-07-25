import React, { useState } from 'react';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { MoreVertical, Plus } from 'react-feather';
import i18n from '@config/i18n';
import { Booking } from '@domain/entities/booking/Booking';
import ConfirmBookingModal from '@features/Booking/components/ConfirmBookingModal';
import PaymentPendingModal from '@features/Booking/components/PaymentPendingModal';
import CancelBookingModal from '@features/Booking/components/CancelBookingModal';

export interface BookingItemActionsProps {
  booking: Booking,
}

export default function BookingItemActions(props: BookingItemActionsProps) {
  const { booking } = props;
  const [cancelFormModal, setCancelFormModal] = useState(false);
  const [confirmFormModal, setConfirmFormModal] = useState(false);
  const [paymentPendingFormModal, setPaymentPendingFormModal] = useState(false);
  const toggleCancelFormModal = () => {
    setCancelFormModal(!cancelFormModal);
  };

  const toggleConfirmFormModal = () => {
    setConfirmFormModal(!confirmFormModal);
  };

  const togglePaymentPendingFormModal = () => {
    setPaymentPendingFormModal(!paymentPendingFormModal);
  };
  return (
    <div className="d-flex">
      <ConfirmBookingModal
        confirmFormModal={confirmFormModal}
        toggleConfirmFormModal={toggleConfirmFormModal}
        booking={booking}
      />
      <PaymentPendingModal
        paymentPendingFormModal={paymentPendingFormModal}
        togglePaymentPendingFormModal={togglePaymentPendingFormModal}
      />
      <CancelBookingModal
        cancelFormModal={cancelFormModal}
        toggleCancelFormModal={toggleCancelFormModal}
      />
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={18} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu container="body">
          <DropdownItem tag="div" onClick={() => toggleConfirmFormModal()}>
            <Plus size={14} className="me-50" />
            <span className="align-middle">{i18n.t('BOOKING.CONFIRM_BOOKING')}</span>
          </DropdownItem>
          <DropdownItem tag="div" onClick={() => togglePaymentPendingFormModal()}>
            <Plus size={14} className="me-50" />
            <span className="align-middle">{i18n.t('BOOKING.PAYMENT_PENDING')}</span>
          </DropdownItem>
          <DropdownItem tag="div" onClick={() => toggleCancelFormModal()}>
            <Plus size={14} className="me-50" />
            <span className="align-middle">{i18n.t('BOOKING.CANCEL_BOOKING')}</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}
