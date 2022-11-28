import React from 'react';

export interface LocationMessageProps {
  latitude: number,
  longitude: number,
}

export default function LocationMessage(props: LocationMessageProps) {
  const { latitude, longitude } = props;
  const src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;
  return (
    <div className="chat-content">
      <iframe src={src} title="View on map" />
    </div>
  );
}
