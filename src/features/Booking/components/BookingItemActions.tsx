import React, { useState } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { Check, CreditCard, X } from 'react-feather';
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
      <div className="d-flex gap-1">
        <div>
          <Button className="btn-icon" outline color="success" id="confirmBooking" onClick={() => toggleConfirmFormModal()}>
            <Check size={14} />
          </Button>
          <UncontrolledTooltip placement="bottom" target="confirmBooking">
            {i18n.t('BOOKING.CONFIRM_BOOKING')}
          </UncontrolledTooltip>
        </div>
        <div>
          <Button className="btn-icon" outline color="info" id="waitingPayment" onClick={() => togglePaymentPendingFormModal()}>
            <CreditCard size={14} />
          </Button>
          <UncontrolledTooltip placement="bottom" target="waitingPayment">
            {i18n.t('BOOKING.PAYMENT_PENDING')}
          </UncontrolledTooltip>
        </div>
        <div>
          <Button className="btn-icon" outline color="danger" id="cancelBooking" onClick={() => toggleCancelFormModal()}>
            <X size={14} />
          </Button>
          <UncontrolledTooltip placement="bottom" target="cancelBooking">
            {i18n.t('BOOKING.CANCEL_BOOKING')}
          </UncontrolledTooltip>
        </div>
      </div>
    </div>
  );
}
