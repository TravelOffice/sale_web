import React from 'react';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';
import LocationMessage from '@features/Chat/components/common/LocationMessage';

export default function ZaloLocationMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  const location = JSON.parse(messageData.location);
  const { longitude, latitude } = location;
  return (
    <LocationMessage latitude={parseFloat(latitude)} longitude={parseFloat(longitude)} />
  );
}
