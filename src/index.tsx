import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import FallbackSpinner from '@components/FallbackSpinner/FallbackSpinner';
import { store } from '@redux/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import '@config/i18n';

// ** PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx.min';

import '@styles/core.scss';
import '@styles/base/components.scss';
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const LazyApp = lazy(() => import('./features/App/App'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<FallbackSpinner />}>
        <LazyApp />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
