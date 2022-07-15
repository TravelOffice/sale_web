import React from 'react';

export default function FooterComponent() {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        COPYRIGHT ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        <a href={process.env.LANDING_PAGE_URL} target="_blank" rel="noopener noreferrer">
          SME Office
        </a>
        <span className="d-none d-sm-inline-block">, All rights Reserved</span>
      </span>
    </p>
  );
}
