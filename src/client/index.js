import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from '../common/App';
import store from './configureStore';
import '../common/assets/styles/index.less';

Loadable.preloadReady().then(() => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  );
});
