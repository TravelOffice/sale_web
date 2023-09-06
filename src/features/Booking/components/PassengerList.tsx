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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Passenger } from '@domain/entities/booking/Passenger';
import FormItemFileInput from '@components/Form/FormItemFileInput';
import { useMutation } from '@tanstack/react-query';
import toasty from '@components/Toasty/Toasty';
import { s3Repository } from '@adapter/repositories';
import { Edit, File, Trash } from 'react-feather';
import moment from 'moment/moment';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';

const schema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.PASSENGER.NAME') })),
  birthday: yup.date().optional(),
  phoneNumber: yup.string().matches(/^\d{10}$/gm, i18n.t('BOOKING.PASSENGER.VALIDATE_PHONE_NUMBER')).optional(),
  email: yup.string().email(i18n.t('BOOKING.PASSENGER.VALIDATE_EMAIL')).optional(),
  address: yup.string().optional(),
});

const initialFormData: any = {
  name: '',
};

export interface AddingPassengerProps {
  passengers: Passenger[],
  handleAddPassengers: (passengers: Array<Passenger>) => void
}

export default function PassengerList({ handleAddPassengers, passengers }: AddingPassengerProps) {
  const [openAddPassengerFormModal, setOpenAddPassengerFormModal] = useState(false);
  const [action, setAction] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editPassengerIndex, setEditPassengerIndex] = useState(-1);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Passenger>({
    resolver: yupResolver(schema),
    defaultValues: initialFormData,
  });

  const { mutate: uploadFileMutate, isLoading } = useMutation({
    mutationFn: async (
      formData: Passenger,
    ) => s3Repository.uploadPassengerAttachedDocViaPresignedURL(formData.attachment[0]),
    onSuccess: (presignedUrl, variables: Passenger) => {
      if (isEdit) {
        const newPassengers = [...passengers];
        let attachedDoc: Array<string> = [];
        if (variables.attachedDoc) {
          attachedDoc = variables.attachedDoc.concat(presignedUrl.cdn);
        } else {
          attachedDoc = [presignedUrl.cdn];
        }
        newPassengers[editPassengerIndex] = { ...variables, attachedDoc };
        handleAddPassengers(newPassengers);
        setIsEdit(false);
      } else {
        handleAddPassengers([...passengers, { ...variables, attachedDoc: [presignedUrl.cdn] }]);
      }
      reset({});
      setOpenAddPassengerFormModal(false);
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
    },
  });

  const onSubmit = (data: Passenger) => {
    if (data.attachment.length > 0) {
      uploadFileMutate(data);
      return;
    }
    if (isEdit) {
      const newPassengers = [...passengers];
      newPassengers[editPassengerIndex] = data;
      handleAddPassengers(newPassengers);
      setIsEdit(false);
    } else {
      handleAddPassengers([...passengers, data]);
    }
    reset({});
    setOpenAddPassengerFormModal(false);
  };

  return (
    <>
      <table className="table table-bordered table-sm mb-2">
        <thead>
          <tr>
            <th scope="col" className="text-center">{i18n.t('COMMON.INDEX')}</th>
            <th scope="col" className="text-center">{i18n.t('BOOKING.PASSENGER.NAME')}</th>
            <th scope="col" className="text-center">{i18n.t('BOOKING.PASSENGER.PHONE_NUMBER')}</th>
            <th scope="col" className="text-center">{i18n.t('BOOKING.PASSENGER.ATTACHED_DOCUMENT')}</th>
            <th scope="col" className="text-center">{i18n.t('BOOKING.PASSENGER.ACTIONS')}</th>
          </tr>
        </thead>
        <tbody className="table-hover table-striped">
          {passengers.map((passenger, index) => (
            <tr key={index.toString()}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">
                {passenger?.name}
              </td>
              <td className="text-center">
                {passenger?.phoneNumber}
              </td>
              <td className="text-center">
                {passenger?.attachedDoc ? (
                  passenger?.attachedDoc.map((item: string) => (
                    <a key={item} href={item} target="_blank" rel="noreferrer">
                      <File size={30} />
                    </a>
                  ))
                ) : (
                  <>
                    {i18n.t('BOOKING.PASSENGER.NO_ATTACHED_DOCUMENT')}
                  </>
                )}
              </td>
              <td className="text-center">
                <Button
                  type="button"
                  color="primary"
                  onClick={() => {
                    setIsEdit(true);
                    setOpenAddPassengerFormModal(true);
                    setAction(i18n.t('BOOKING.PASSENGER.EDIT_PASSENGER'));
                    setEditPassengerIndex(index);
                    reset(passenger);
                  }}
                >
                  <Edit size={16} />
                </Button>
                {' '}
                <Button
                  type="button"
                  color="danger"
                  onClick={() => {
                    const newPassengers = [...passengers];
                    newPassengers.splice(index, 1);
                    handleAddPassengers(newPassengers);
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
        onClick={() => {
          reset({});
          setAction(i18n.t('BOOKING.PASSENGER.ADD_PASSENGER'));
          setOpenAddPassengerFormModal(true);
        }}
      >
        {i18n.t('BOOKING.PASSENGER.ADD_PASSENGER')}
      </Button>
      <Modal
        isOpen={openAddPassengerFormModal}
        toggle={() => {
          setOpenAddPassengerFormModal(!openAddPassengerFormModal);
          reset({});
        }}
        className="modal-dialog-centered"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={() => {
            setOpenAddPassengerFormModal(!openAddPassengerFormModal);
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
                    {i18n.t('BOOKING.PASSENGER.NAME')}
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
                  {errors.name
                      && <FormFeedback>{errors.name.message}</FormFeedback>}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-2">
                  <Label className="form-label" for="birthday">
                    {i18n.t('BOOKING.PASSENGER.BIRTHDAY')}
                  </Label>
                  <FormItemDatePicker
                    name="birthday"
                    control={control}
                    errors={errors}
                    options={{
                      formatDate: (date) => moment(date).format('DD/MM/YYYY'),
                    }}
                  />
                  {errors.birthday
                      && <FormFeedback>{errors.birthday.message}</FormFeedback>}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <Label className="form-label" for="phoneNumber">
                    {i18n.t('BOOKING.PASSENGER.PHONE_NUMBER')}
                    {' '}
                  </Label>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="phoneNumber" invalid={!!errors.phoneNumber} />
                    )}
                  />
                  {errors.phoneNumber
                      && <FormFeedback>{errors.phoneNumber.message}</FormFeedback>}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-2">
                  <Label className="form-label" for="email">
                    {i18n.t('BOOKING.PASSENGER.EMAIL')}
                    {' '}
                  </Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="email" invalid={!!errors.email} />
                    )}
                  />
                  {errors.email
                      && <FormFeedback>{errors.email.message}</FormFeedback>}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="mb-2">
                  <Label className="form-label" for="address">
                    {i18n.t('BOOKING.PASSENGER.ADDRESS')}
                    {' '}
                  </Label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="address" invalid={!!errors.address} />
                    )}
                  />
                  {errors.address
                      && <FormFeedback>{errors.address.message}</FormFeedback>}
                </div>
              </Col>
            </Row>
            <div className="mb-2">
              <Label className="form-label" for="attachment">
                {i18n.t('BOOKING.PASSENGER.ATTACHED_DOCUMENT')}
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
                  setOpenAddPassengerFormModal(false);
                  reset({});
                }}
              >
                {i18n.t('COMMON.CANCEL')}
              </Button>
              <Button
                type="submit"
                className="me-1"
                color="primary"
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
    </>
  );
}
