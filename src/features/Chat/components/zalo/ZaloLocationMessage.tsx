import React from 'react';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';
import LocationMessage from '@features/Chat/components/common/LocationMessage';
import { ZaloReceivedLocationMessage } from '@domain/entities/chat/Message';

export default function ZaloLocationMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  const attachment = messageData.attachments?.[0] as ZaloReceivedLocationMessage;
  const { longitude, latitude } = attachment?.payload.coordinates;
  return (
    <LocationMessage latitude={parseFloat(latitude)} longitude={parseFloat(longitude)} />
  );
}
