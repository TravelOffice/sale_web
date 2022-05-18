import React from 'react';
import Images from '@themes/Images';

export default function FallbackSpinner() {
  return (
    <div className="fallback-spinner app-loader">
      <img className="fallback-logo" src={Images.logo} alt="logo" />
      <div className="loading">
        <div className="effect-1 effects" />
        <div className="effect-2 effects" />
        <div className="effect-3 effects" />
      </div>
    </div>
  );
}
