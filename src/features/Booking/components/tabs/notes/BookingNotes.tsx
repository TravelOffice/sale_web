import React, { useMemo, useState } from 'react';
import {
  Button, Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import { useBookingNotes } from '@hooks/booking';
import { useParams } from 'react-router-dom';
import { EditBookingTabParams } from '@features/Booking/components/tabs/information/BookingDetailTab';
import moment from 'moment';
import { Note } from '@domain/entities/note/Note';
import BookingNoteGroup from '@features/Booking/components/tabs/notes/BookingNoteGroup';
import CreateBookingNoteModal from '@features/Booking/components/tabs/notes/CreateBookingNoteModal';
import i18n from '@config/i18n';
import { Plus } from 'react-feather';
import PERMISSIONS from '@utils/PermissionUtils';
import { useAccessControl } from '@hooks/auth';

type NoteGroup = {
  title: string,
  notes: Note[],
};

export default function BookingNotes() {
  const { can } = useAccessControl();
  const { bookingId } = useParams<EditBookingTabParams>();
  const { data: notes } = useBookingNotes(bookingId);
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);

  // Group notes by date
  const noteGroups: NoteGroup[] = useMemo(() => {
    if (!notes) return [];
    const groups = new Map<string, Note[]>();
    notes.forEach((note) => {
      const group = moment(note.createdAt).format('DD/MM/YYYY');
      const noteGroup = groups.get(group);
      if (noteGroup) {
        noteGroup.push(note);
      } else {
        groups.set(group, [note]);
      }
    });
    return Array.from(groups, ([name, value]) => ({ title: name, notes: value }));
  }, [notes]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('BOOKING.NOTES')}</CardTitle>
        </CardHeader>
        <CardBody>
          {
            noteGroups.map((group) => (
              <BookingNoteGroup
                key={group.title}
                title={group.title}
                notes={group.notes}
              />
            ))
          }
          {
            can(PERMISSIONS.update_booking) ? (
              <div className="d-flex flex-row mt-1">
                <Button color="primary" onClick={() => setShowCreateNoteModal(true)}>
                  <Plus size={16} />
                  {' '}
                  {i18n.t('BOOKING.ADD_NOTE')}
                </Button>
              </div>
            ) : <></>
          }
        </CardBody>
      </Card>
      <CreateBookingNoteModal
        className="modal-dialog-centered"
        isOpen={showCreateNoteModal}
        toggle={() => setShowCreateNoteModal(!showCreateNoteModal)}
        bookingId={bookingId}
      />
    </>
  );
}
