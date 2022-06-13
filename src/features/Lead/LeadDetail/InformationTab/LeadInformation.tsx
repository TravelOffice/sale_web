// ** React Imports
import Avatar from '@components/Avatar/Avatar';
import i18n from '@config/i18n';
import { Lead } from '@domain/entities/Lead';
import LeadSidebar from '@features/Lead/LeadSidebar';
import { leadActions } from '@redux/slices/leadSlice';
import { RootState } from '@redux/store';
import { getAddress } from '@utils/LeadUtils';
import React from 'react';
import {
  Briefcase, Mail, MapPin, Phone, Target,
} from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
// ** Reactstrap Imports
import {
  Badge,
  Button,
  Card,
  CardBody,
} from 'reactstrap';

interface LeadInformationProps {
  // eslint-disable-next-line react/require-default-props
  lead?: Lead,
}

const statusColors = {
  NEW: 'light-info',
  QUALIFYING: 'light-warning',
  QUALIFIED: 'light-success',
  TAKING_CARE: 'light-primary',
};

const LeadInformation = (props: LeadInformationProps) => {
  const { lead } = props;
  const dispatch = useDispatch();
  const openSidebar = useSelector((state: RootState) => state.lead.openSidebar);
  const { setOpenLeadSidebar: setOpenSidebarAction } = leadActions;
  // ** Function to toggle sidebar
  const setOpenSidebar = (open: boolean) => dispatch(setOpenSidebarAction(open));
  const toggleLeadSidebar = () => setOpenSidebar(!openSidebar);

  // ** render lead img
  const renderUserImg = () => (
    <Avatar
      color="light-primary"
      className="rounded mt-3 mb-2"
      content={lead?.name}
      contentStyles={{
        borderRadius: 0,
        fontSize: '48px',
        width: '100%',
        height: '100%',
      }}
      style={{
        height: '110px',
        width: '110px',
      }}
    />
  );

  return (
    <>
      <Card>
        { lead && (
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{`(${i18n.t(`LEAD.${lead.vocative}`)}) ${lead.name}`}</h4>
                  <Badge color={statusColors[lead.status]} className="text-capitalize">
                    {`${i18n.t(`LEAD.${lead.status}`)}`}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Target className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">###</h4>
                {/* TODO: This field will be implemented later */}
                <small>Total Opportunity</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">###</h4>
                {/* TODO: This field will be implemented later */}
                <small>Total Booking</small>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-info" className="rounded">
                <Mail />
              </Badge>
              <div className="ms-75">
                <h6>{lead.email}</h6>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-info" className="rounded">
                <Phone />
              </Badge>
              <div className="ms-75">
                <h6>{lead.primaryPhoneNumber}</h6>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-info" className="rounded">
                <MapPin />
              </Badge>
              <div className="ms-75">
                <h6>{getAddress(lead)}</h6>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">
            {i18n.t('COMMON.INFORMATION')}
            {' '}
            Lead
          </h4>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25">
                  {i18n.t('LEAD.CONTACT')}
                  {': '}
                </span>
                <span>
                  {lead.otherPhoneNumbers?.join(', ')}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">
                  {i18n.t('LEAD.BIRTHDAY')}
                  {': '}
                </span>
                <span>{lead.birthday}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">
                  {i18n.t('LEAD.SEX')}
                  {': '}
                </span>
                <span>{`${i18n.t(`LEAD.${lead.sex}`)}`}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">
                  {i18n.t('LEAD.SOURCE')}
                  {': '}
                </span>
                <span>{`${i18n.t(`LEAD.${lead.source}`)}`}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">
                  {i18n.t('LEAD.MARITAL')}
                  {': '}
                </span>
                <span>{`${i18n.t(`LEAD.${lead.maritalStatus}`)}`}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">
                  {i18n.t('LEAD.TAGS')}
                  {': '}
                </span>
                <span>
                  {lead.tags?.map((value) => (
                    <Badge key={value} color="light-info">
                      {`#${value} `}
                    </Badge>
                  ))}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">
                  {i18n.t('LEAD.NATIONALITY')}
                  {': '}
                </span>
                <span>{lead.nationality}</span>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setOpenSidebar(true)}>
              {i18n.t('COMMON.EDIT')}
            </Button>
          </div>
        </CardBody>
        )}
      </Card>
      <LeadSidebar
        open={openSidebar}
        setOpenSidebar={setOpenSidebar}
        toggleSidebar={toggleLeadSidebar}
        lead={lead}
        onClosed={() => setOpenSidebar(false)}
      />
    </>
  );
};

export default LeadInformation;
