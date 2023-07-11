import {
  Button, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps,
} from 'reactstrap';
import { Lead, LeadStatus } from '@domain/entities/lead/Lead';
import i18n from '@config/i18n';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leadPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import { useForm } from 'react-hook-form';
import FormItemInput from '@components/Form/FormItemInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CancelLeadFormData } from '@domain/entities/lead/CancelLeadFormData';

export interface CancelLeadModalProps extends ModalProps {
  leadId: string,
  lead?: Lead,
  toggle: () => void,
}

const schema = yup.object().shape({
  cancelledReason: yup.string().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('LEAD.CANCELLED_REASON') })),
});

export default function CancelLeadModal(props: CancelLeadModalProps) {
  const {
    lead, leadId, toggle, ...modelProps
  } = props;

  const {
    control, handleSubmit, formState: { errors },
  } = useForm<CancelLeadFormData>({ defaultValues: { cancelledReason: '' }, resolver: yupResolver(schema) });
  const queryClient = useQueryClient();

  const cancelLeadMutation = useMutation({
    mutationFn: (formData: CancelLeadFormData) => leadPresenter.cancelLead(leadId, formData),
    onSuccess: () => {
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('LEAD.CANCEL_LEAD_SUCCESSFULLY', { leadName: lead?.name }),
      });
      queryClient.setQueryData(['leads', leadId], (input) => ({
        ...input as Lead,
        leadStatus: LeadStatus.CANCEL,
      }));
      toggle();
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
    },
  });

  const onSubmit = useCallback((formData: CancelLeadFormData) => {
    cancelLeadMutation.mutate(formData);
  }, []);

  return (
    <Modal toggle={toggle} {...modelProps}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>
          {i18n.t('LEAD.CANCEL_LEAD')}
        </ModalHeader>
        <ModalBody>
          <Label for="cancelledReason">
            {i18n.t('LEAD.CANCELLED_REASON')}
            <span className="text-danger">*</span>
          </Label>
          <FormItemInput
            control={control}
            name="cancelledReason"
            errors={errors}
            inputType="textarea"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggle} disabled={cancelLeadMutation.isLoading}>
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <LoadingButton
            loading={cancelLeadMutation.isLoading}
            disabled={cancelLeadMutation.isLoading}
            color="danger"
            type="submit"
          >
            {i18n.t('COMMON.ACCEPT')}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
