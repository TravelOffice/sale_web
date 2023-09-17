import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from 'reactstrap';
import i18n from '@config/i18n';
import { AddingQuoteFormData, Quote } from '@domain/entities/supplier';
import FormItemFileInput from '@components/Form/FormItemFileInput';
import { useMutation } from '@tanstack/react-query';
import toasty from '@components/Toasty/Toasty';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import FormItemInput from '@components/Form/FormItemInput';
import { Edit, File, Trash } from 'react-feather';
import { formatVND } from '@utils/CommonUtils';
import { uploadSupplierQuoteAttachmentUseCase } from '@domain/useCases';

export interface SupplierQuoteProps {
  quotes: Quote[],
  handleChangeQuotes: (quotes: Array<Quote>) => void
}

const schema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('SUPPLIER.QUOTE_NAME') })),
  unit: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('SUPPLIER.QUOTE_UNIT') })),
  price: yup.number().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('SUPPLIER.QUOTE_PRICE') }))
    .moreThan(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('SUPPLIER.QUOTE_PRICE'), value: 0 })),
});

const initialFormData: any = {
  name: '',
};

export default function SupplierQuote({
  quotes,
  handleChangeQuotes,
}: SupplierQuoteProps) {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editQuoteIndex, setEditQuoteIndex] = useState(-1);
  const [action, setAction] = useState('');

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<AddingQuoteFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialFormData,
  });

  const { mutate: uploadFileMutate, isLoading } = useMutation({
    mutationFn: async (
      formData: AddingQuoteFormData,
    ) => uploadSupplierQuoteAttachmentUseCase.invoke(formData.attachment[0], formData.link),
    onSuccess: (presignedUrl, variables: AddingQuoteFormData) => {
      // eslint-disable-next-line no-unused-vars
      const { attachment, ...newQuote } = variables;
      if (isEdit) {
        const newQuotes = [...quotes];
        newQuotes[editQuoteIndex] = { ...newQuote, link: presignedUrl };
        handleChangeQuotes(newQuotes);
        setOpenModal(false);
      } else {
        handleChangeQuotes([...quotes, { ...newQuote, link: presignedUrl }]);
        setOpenModal(false);
      }
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
    },
  });

  const onSubmit = () => {
    const data: AddingQuoteFormData = getValues();
    if (data.attachment && data.attachment.length > 0) {
      uploadFileMutate(data);
      reset({});
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const { attachment, ...newQuote } = data;
    if (isEdit) {
      const newQuotes = [...quotes];
      newQuotes[editQuoteIndex] = newQuote;
      handleChangeQuotes(newQuotes);
      reset({});
      setOpenModal(false);
      return;
    }

    handleChangeQuotes([...quotes, newQuote]);
    reset({});
    setOpenModal(false);
  };

  return (
    <div className="mt-2 mb-4">
      <div className="divider divider-start divider-primary">
        <div className="divider-text text-primary fw-bolder">
          {i18n.t('SUPPLIER.QUOTE_LIST')}
        </div>
      </div>
      <table className="table table-bordered table-sm mb-2">
        <thead>
          <tr>
            <th scope="col" className="text-center">{i18n.t('COMMON.INDEX')}</th>
            <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_NAME')}</th>
            <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_UNIT')}</th>
            <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_PRICE')}</th>
            <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_ATTACHED_FILE')}</th>
            <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_NOTE')}</th>
            <th scope="col" className="text-center">{i18n.t('SUPPLIER.QUOTE_ACTION')}</th>
          </tr>
        </thead>
        <tbody className="table-hover table-striped">
          {quotes.map((quote, index) => (
            <tr key={index.toString()}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">
                {quote?.name}
              </td>
              <td className="text-center">
                {quote?.unit}
              </td>
              <td className="text-center">
                {formatVND(quote?.price)}
              </td>
              <td className="text-center">
                {quote?.link ? (
                  <a href={quote.link} target="_blank" rel="noreferrer">
                    <File size={20} />
                  </a>
                ) : (
                  <>
                    {i18n.t('SUPPLIER.NO_QUOTE_ATTACHED_FILE')}
                  </>
                )}
              </td>
              <td className="text-center">
                {quote?.description}
              </td>
              <td className="text-center">
                <Button
                  type="button"
                  color="primary"
                  size="sm"
                  onClick={() => {
                    setIsEdit(true);
                    setOpenModal(true);
                    setAction(i18n.t('SUPPLIER.EDIT_QUOTE'));
                    setEditQuoteIndex(index);
                    reset(quote);
                  }}
                >
                  <Edit size={16} />
                </Button>
                {' '}
                <Button
                  type="button"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    const newQuotes = [...quotes];
                    newQuotes.splice(index, 1);
                    handleChangeQuotes(newQuotes);
                  }}
                >
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        type="button"
        color="primary"
        size="sm"
        outline
        onClick={() => {
          reset({});
          setAction(i18n.t('SUPPLIER.ADD_QUOTE'));
          setOpenModal(true);
        }}
      >
        {i18n.t('SUPPLIER.ADD_QUOTE')}
      </Button>

      <Modal
        isOpen={openModal}
        toggle={() => {
          setOpenModal(!openModal);
          reset({});
        }}
        className="modal-dialog-centered"
      >
        <Form>
          <ModalHeader toggle={() => {
            setOpenModal(!openModal);
            reset({});
          }}
          >
            {action}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <Label className="form-label" for="name">
                    {i18n.t('SUPPLIER.QUOTE_NAME')}
                    {' '}
                    <span className="text-danger">{' *'}</span>
                  </Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="name" invalid={!!errors.name} />
                    )}
                  />
                  {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-2">
                  <Label className="form-label" for="unit">
                    {i18n.t('SUPPLIER.QUOTE_UNIT')}
                    {' '}
                    <span className="text-danger">{' *'}</span>
                  </Label>
                  <Controller
                    name="unit"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="unit" invalid={!!errors.unit} />
                    )}
                  />
                  {errors.unit && <FormFeedback>{errors.unit.message}</FormFeedback>}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <Label className="form-label" for="price">
                    {i18n.t('SUPPLIER.QUOTE_PRICE')}
                    {' '}
                    <span className="text-danger">{' *'}</span>
                  </Label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="number" id="price" invalid={!!errors.price} />
                    )}
                  />
                  {errors.price && <FormFeedback>{errors.price.message}</FormFeedback>}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-2">
                  <Label className="form-label" for="year">
                    {i18n.t('SUPPLIER.QUOTE_YEAR')}
                  </Label>
                  <Controller
                    name="year"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="year" invalid={!!errors.year} />
                    )}
                  />
                  {errors.year && <FormFeedback>{errors.year.message}</FormFeedback>}
                </div>
              </Col>
            </Row>
            <div className="mb-2">
              <Label className="form-label" for="description">
                {i18n.t('SUPPLIER.QUOTE_NOTE')}
              </Label>
              <FormItemInput
                inputType="textarea"
                control={control}
                errors={errors}
                name="description"
              />
            </div>
            <div className="mb-2">
              <Label className="form-label" for="attachment">
                {i18n.t('SUPPLIER.QUOTE_ATTACHED_FILE')}
              </Label>
              <FormItemFileInput
                control={control}
                errors={errors}
                name="attachment"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="d-flex justify-content-end">
              <Button
                type="reset"
                color="danger"
                className="me-1"
                outline
                onClick={() => {
                  setOpenModal(false);
                  reset({});
                }}
              >
                {i18n.t('COMMON.CANCEL')}
              </Button>
              <Button
                type="submit"
                className="me-1"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                {!isLoading ? action : i18n.t('COMMON.LOADING')}
                {isLoading ? (
                  <Spinner
                    style={{ width: '0.7rem', height: '0.7rem' }}
                    type="grow"
                    color="light"
                  />
                ) : null}
              </Button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
