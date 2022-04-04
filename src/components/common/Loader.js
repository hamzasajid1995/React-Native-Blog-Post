import React from 'react';
import {ActivityIndicator} from 'react-native';

export default function Loader({show}) {
  if (!show) {
    return null;
  }
  return <ActivityIndicator />;
}
