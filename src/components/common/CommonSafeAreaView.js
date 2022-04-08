import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

function CommonSafeAreaView({children}) {
  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom', 'left', 'right']}>
      {children}
    </SafeAreaView>
  );
}

export default CommonSafeAreaView;
