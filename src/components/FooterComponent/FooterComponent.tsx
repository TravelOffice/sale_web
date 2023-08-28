import Images from '@themes/Images';
import React from 'react';

export default function FooterComponent() {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        <a
          href={process.env.LANDING_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Travel Office
        </a>
        <span className="d-none d-sm-inline-block">, All rights reserved</span>
        <span className="brand-logo">
          <img src={Images.appLogo} alt="logo" style={{ width: '1rem', height: '1rem', marginLeft: '0.5rem' }} />
        </span>
      </span>
    </p>
  );
}
