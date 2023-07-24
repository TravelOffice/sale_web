import React, { ReactNode } from 'react';
import { Note, NoteType } from '@domain/entities/note/Note';
import {
  Info, Mail, MessageCircle, MessageSquare, PhoneCall,
} from 'react-feather';
import { ListGroupItem } from 'reactstrap';
import moment from 'moment';

export interface BookingNoteItemProps {
  note: Note;
}

const icons: Record<NoteType, ReactNode> = {
  CALL: <PhoneCall size={16} />,
  EMAIL: <Mail size={16} />,
  SMS: <MessageSquare size={16} />,
  ZALO: <MessageCircle size={16} />,
  OTHERS: <Info size={16} />,
};

export default function BookingNoteItem(props: BookingNoteItemProps) {
  const { note } = props;
  return (
    <ListGroupItem className="d-flex align-items-center">
      <span className="me-1 ms-1 me-2">
        {icons[note.type]}
      </span>
      <div className="flex-grow-1">
        <div className="fw-bolder">{note.title}</div>
        <span>{note.description}</span>
      </div>
      <div>
        {moment(note.createdAt).format('HH:mm')}
      </div>
    </ListGroupItem>
  );
}
