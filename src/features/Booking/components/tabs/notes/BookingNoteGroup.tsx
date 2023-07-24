import React from 'react';
import { Note } from '@domain/entities/note/Note';
import { ListGroup, ListGroupItem } from 'reactstrap';
import BookingNoteItem from '@features/Booking/components/tabs/notes/BookingNoteItem';

export interface BookingNoteGroupProps {
  title: string,
  notes: Note[],
}

export default function BookingNoteGroup(props: BookingNoteGroupProps) {
  const { title, notes } = props;

  return (
    <ListGroup className="mb-2">
      <ListGroupItem color="primary" className="fw-bolder">
        {title}
      </ListGroupItem>
      {
        notes.map((note) => (
          <BookingNoteItem key={note.id} note={note} />
        ))
      }
    </ListGroup>
  );
}
