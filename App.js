/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import AppContainer from './src/AppContainer';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
