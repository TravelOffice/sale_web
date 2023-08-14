import React, { useCallback } from 'react';
import {
  Button,
  Form, Label,
  Modal, ModalBody, ModalFooter, ModalHeader, ModalProps,
} from 'reactstrap';
import i18n from '@config/i18n';
import FormItemInput from '@components/Form/FormItemInput';
import { useForm } from 'react-hook-form';
import { CreateSourceFormData, Source } from '@domain/entities/source/Source';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sourcePresenter } from '@adapter/presenters';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toasty from '@components/Toasty/Toasty';

export interface AddSourceModalProps extends ModalProps {
  toggle: () => void,
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function AddSourceModal(props: AddSourceModalProps) {
  const { toggle, ...modalProps } = props;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSourceFormData>({ resolver: yupResolver(schema) });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: CreateSourceFormData) => sourcePresenter.create(formData),
    onSuccess: (newSource) => {
      toggle();
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('SOURCE.ADD_SOURCE_SUCCESSFULLY', { source: newSource.name }),
      });
      reset({ name: '' });
      queryClient.setQueryData(['sources'], (sources: Source[] | undefined) => {
        if (!sources) return [];
        return sources.concat(newSource);
      });
    },
  });

  const onSubmit = useCallback((data: CreateSourceFormData) => {
    mutate(data);
  }, []);

  return (
    <Modal {...modalProps} toggle={toggle}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>{i18n.t('SOURCE.ADD')}</ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Label>
              {i18n.t('SOURCE.NAME')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <FormItemInput
              control={control}
              name="name"
              errors={errors}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            outline
            disabled={isLoading}
            onClick={toggle}
          >
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <LoadingButton
            color="primary"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            {i18n.t('COMMON.SUBMIT')}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
