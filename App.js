/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';

import {persistor, store} from './src/redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {setPosts} from './src/redux/postSlice';
import {PersistGate} from 'redux-persist/lib/integration/react';
import Toast from 'react-native-root-toast';
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

function Posts() {
  const {posts = []} = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(data => data.json())
      .then(res => {
        dispatch(setPosts(res));
        Toast.show('Data Fetched');
      })
      .catch(console.log);
  }, []);

  return (
    <SafeAreaView>
      <Text>{posts.length}</Text>
    </SafeAreaView>
  );
}
export default App;
