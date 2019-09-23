import React from 'react';
import { render } from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import store from './utils/configureStore';

import './assets/styles/index.less';
import 'react-toastify/dist/ReactToastify.min.css';
// import 'react-toastify/dist/ReactToastify.css';
import AppWrapper from './components/Wrappers/AppWrapper';

const place = document.getElementById('app');

const Application = (
  <Provider store={store}>
    <BrowserRouter>
      <AppWrapper>
        <App />
      </AppWrapper>
    </BrowserRouter>
  </Provider>
);

if (place.hasChildNodes() === true) {
  Loadable.preloadReady().then(() => {
    // Change to hydration
    render(Application, place);
  });
} else {
  render(Application, place);
}
