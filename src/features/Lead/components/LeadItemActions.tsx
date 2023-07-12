import React from 'react';
import { Lead } from '@domain/entities/lead/Lead';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import {
  Archive, ArrowUpRight, MoreVertical, Plus, Trash2,
} from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import { generateEditableUrlForLead } from '@utils/LeadUtils';
import i18n from '@config/i18n';
import { useMutation } from '@tanstack/react-query';
import { leadPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import { useCurrentUser } from '@hooks/auth';
import { generateCreateBookingFromLeadUrl } from '@utils/BookingUtils';

export interface LeadItemActionsProps {
  lead: Lead,
}

export default function LeadItemActions(props: LeadItemActionsProps) {
  const { lead } = props;
  const currentUser = useCurrentUser();
  const history = useHistory();
  const takeLeadMutation = useMutation({
    mutationKey: ['takeLead', lead.code],
    mutationFn: async () => leadPresenter.takeLead(lead.code, currentUser!.username),
    onSuccess: () => {
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('LEAD.TAKING_LEAD_SUCCESSFULLY', { leadName: lead.name }),
      });
      history.push(`/apps/leads/${lead.code}/edit`);
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        title: i18n.t('COMMON.ERROR'),
        message: error.message,
      });
    },
  });
  return (
    <div className="column-action">
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu container="body">
          {
            !lead.assigneeId && (
              <DropdownItem tag="div" onClick={() => takeLeadMutation.mutate()}>
                <ArrowUpRight size={14} className="me-50" />
                <span>{i18n.t('LEAD.TAKE_CARE')}</span>
              </DropdownItem>
            )
          }
          <DropdownItem tag={Link} className="w-100" to={generateCreateBookingFromLeadUrl(lead.code)}>
            <Plus size={14} className="me-50" />
            <span className="align-middle">{i18n.t('BOOKING.CREATE_BOOKING_FROM_LEAD')}</span>
          </DropdownItem>
          <DropdownItem tag={Link} className="w-100" to={generateEditableUrlForLead(lead)}>
            <Archive size={14} className="me-50" />
            <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
          </DropdownItem>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Trash2 size={14} className="me-50" />
            <span className="align-middle">{i18n.t('COMMON.DELETE')}</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}
