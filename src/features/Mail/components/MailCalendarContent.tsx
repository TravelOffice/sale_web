import React, { useEffect, useState } from 'react';
import ICAL from 'ical.js';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { extractMailAddress } from '@utils/MailUtils';
import { Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';

export interface MailCalendarContentProps {
  calendarEvent: string,
}

export default function MailCalendarContent(props: MailCalendarContentProps) {
  const { calendarEvent } = props;
  const [event, setEvent] = useState<ICAL.Event>();
  const { t } = useTranslation();

  useEffect(() => {
    fetch(calendarEvent).then((res) => res.text()).then((icalString) => {
      const calendarICal = ICAL.parse(icalString);
      const component = new ICAL.Component(calendarICal);
      setEvent(new ICAL.Event(component.getFirstSubcomponent('vevent')));
    });
  }, []);
  if (!event) return <></>;
  const attendees = event.attendees
    .map((attendee) => attendee.getValues().map((value: string) => extractMailAddress(value)))
    .flat();

  return (
    <div className="mail-calendar">
      <p style={{ whiteSpace: 'break-spaces' }}>
        <h5>{t('MAIL.CALENDAR_LOCATION')}</h5>
        {event.location}
        <h5>{t('MAIL.CALENDAR_INVITEES')}</h5>
        <div className="invitees">
          {attendees.map((attendee) => (
            <Badge pill color="primary" key={attendee}>{attendee}</Badge>
          ))}
        </div>
        <h5>{t('MAIL.CALENDAR_DESCRIPTION')}</h5>
        {event.description}
      </p>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        editable={false}
        headerToolbar={false}
        allDaySlot={false}
        initialDate={event.startDate.toJSDate()}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: true,
          meridiem: true,
        }}
        titleFormat={{
          dateStyle: 'full',
          meridiem: true,
        }}
        nowIndicator
        events={[{
          title: event.summary,
          start: event.startDate.toJSDate(),
          end: event.endDate.toJSDate(),
        }]}
      />
    </div>
  );
}
