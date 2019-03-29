/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './components/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './store/index';

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => AppContainer);
