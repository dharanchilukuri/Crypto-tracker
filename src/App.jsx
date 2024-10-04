import React from 'react'
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from '../utils/store';

import Body from './Body.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
<Provider store={store}>
<PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
      <Body />
      </PersistGate>
  </Provider>
)

