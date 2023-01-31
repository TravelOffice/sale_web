import React, { useEffect } from 'react';

export interface RedirectToExternalUriProps {
  to: string,
}

export default function RedirectToExternalUri(props: RedirectToExternalUriProps) {
  const { to } = props;
  useEffect(() => {
    window.location.replace(to);
  }, []);
  return (
    <></>
  );
}
