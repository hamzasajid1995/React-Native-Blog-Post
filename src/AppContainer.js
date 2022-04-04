import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './navigation/AppNavigator';

function AppContainer() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppNavigator />;
}

export default AppContainer;
