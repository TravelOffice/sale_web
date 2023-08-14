import React, { useCallback, useEffect } from 'react';
import { Source, UpdateSourceFormData } from '@domain/entities/source/Source';
import {
  Button,
  Form,
  Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps,
} from 'reactstrap';
import FormItemInput from '@components/Form/FormItemInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import i18n from '@config/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sourcePresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import LoadingButton from '@components/LoadingButton/LoadingButton';

export interface UpdateSourceModalProps extends ModalProps {
  source: Source | undefined,
  toggle: () => void,
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function UpdateSourceModal(props: UpdateSourceModalProps) {
  const { toggle, source, ...modalProps } = props;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateSourceFormData>({ resolver: yupResolver(schema) });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (source) {
      reset(source);
    }
  }, [source]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: UpdateSourceFormData) => sourcePresenter.update(source?.code!, formData),
    onSuccess: (newSource) => {
      toggle();
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('SOURCE.UPDATE_SOURCE_SUCCESSFULLY'),
      });
      queryClient.setQueryData(['sources'], (sources: Source[] | undefined) => {
        const oldSource = sources?.find((s) => s.code === source?.code);
        if (!oldSource) return sources;
        return sources?.map((s) => {
          if (s.code === oldSource.code) {
            return {
              ...s,
              ...newSource,
            };
          }
          return s;
        });
      });
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        title: i18n.t('COMMON.ERROR'),
        message: error.message,
      });
    },
  });

  const onSubmit = useCallback((formData: UpdateSourceFormData) => {
    mutate(formData);
  }, []);

  return (
    <Modal {...modalProps} toggle={toggle}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>{i18n.t('SOURCE.UPDATE')}</ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Label>{i18n.t('SOURCE.NAME')}</Label>
            <FormItemInput
              control={control}
              name="name"
              errors={errors}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline disabled={isLoading} onClick={toggle}>
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <LoadingButton loading={isLoading} color="primary" type="submit" disabled={isLoading}>
            {i18n.t('COMMON.SAVE_CHANGES')}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
