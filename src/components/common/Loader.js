import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Layout from '../../constants/layout';

export default function Loader({show}) {
  if (!show) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignContent: 'center',
        zIndex: 100,
      }}>
      <ActivityIndicator color={Layout.primaryColor} size={'large'} />
    </View>
  );
}
