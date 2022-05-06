import React, { Suspense } from 'react';
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

// const LazyApp = lazy(() => import('./features/App/App'));
import App from './features/App/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<FallbackSpinner />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
