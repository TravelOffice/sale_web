import React, { useCallback, useMemo, useState } from 'react';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { generateI18nForTourOperation, getAllowedOperationStatus } from '@utils/TousOperationUtils';
import {
  Badge, Spinner,
} from 'reactstrap';
import { Check, Edit3, X } from 'react-feather';
import Select from 'react-select';
import { useMutation } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from 'i18next';
import SelectTourOperatorModal from '@features/ToursOperation/components/SelectTourOperatorModal';

export interface TourOperationStatusBadgeProps {
  tourId: string,
  status: TourOperationStatus,
  onStatusChanged: (status: TourOperationStatus) => void,
}

const statusColors: Record<TourOperationStatus, string> = {
  [TourOperationStatus.WAITING_FOR_OPERATION]: 'light-secondary',
  [TourOperationStatus.PROCESSING]: 'light-warning',
  [TourOperationStatus.TRANSFERRED]: 'light-success',
  [TourOperationStatus.COMPLETED]: 'light-primary',
};

export default function TourOperationStatusBadge(props: TourOperationStatusBadgeProps) {
  const { status, tourId, onStatusChanged } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TourOperationStatus>(status);
  const [showModal, setShowModal] = useState(false);

  const allowedStatuses = useMemo(() => getAllowedOperationStatus(status), [status]);
  const editable = useMemo(() => allowedStatuses.length > 0, [allowedStatuses.length]);

  const allowedStatusOptions = useMemo(() => {
    const statuses = [status].concat(allowedStatuses);
    return statuses.map((allowedStatus) => ({
      label: generateI18nForTourOperation(allowedStatus),
      value: allowedStatus,
    }));
  }, [allowedStatuses]);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => tourPresenter.changeOperationStatus(tourId, selectedStatus),
    onSuccess: () => {
      setShowDropdown(false);
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('TOURS_OPERATION.UPDATE_STATUS_SUCCESSFULLY'),
      });
      onStatusChanged(selectedStatus);
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        title: i18n.t('COMMON.ERROR'),
        message: error.message,
      });
    },
  });

  const handleUpdateStatus = useCallback(() => {
    if (selectedStatus === status) {
      // Skip if status is not changed
      setShowDropdown(false);
      return;
    }
    mutate();
  }, [status, selectedStatus, mutate]);

  const onEdit = useCallback(() => {
    if (status === TourOperationStatus.WAITING_FOR_OPERATION) {
      setShowModal(true);
    } else if (editable) {
      setShowDropdown(true);
    }
  }, [editable, status]);

  return (
    <>
      {
        showDropdown ? (
          <>
            <Select
              className="me-1"
              options={allowedStatusOptions}
              value={allowedStatusOptions.find((option) => option.value === selectedStatus)}
              onChange={(newValue) => (newValue ? setSelectedStatus(newValue.value) : null)}
              isDisabled={isLoading}
            />
            {
              isLoading ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <>
                  <X
                    style={{ marginRight: 4 }}
                    className="cursor-pointer text-danger"
                    size={20}
                    onClick={() => setShowDropdown(false)}
                  />
                  <Check className="cursor-pointer text-success" size={20} onClick={handleUpdateStatus} />
                </>
              )
            }
          </>
        ) : (
          <div className="cursor-pointer" onClick={onEdit}>
            <Badge color={statusColors[status]}>
              {generateI18nForTourOperation(status)}
            </Badge>
            {' '}
            {editable && <Edit3 size={16} />}
          </div>
        )
      }
      <SelectTourOperatorModal
        className="modal-dialog-centered"
        tourId={tourId}
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
      />
    </>
  );
}
